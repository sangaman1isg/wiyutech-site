import { NextResponse } from "next/server";
import { getTransactionStatus } from "@/src/lib/pesapal";
import { updateOrderByTxRef } from "@/src/lib/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Pesapal status_code → our order status
function mapStatus(code: number): string {
  if (code === 1) return "successful";
  if (code === 2) return "failed";
  if (code === 3) return "reversed";
  return "pending";
}

// The IPN only hands us an OrderTrackingId — we must NOT trust it as proof of
// payment. We independently call GetTransactionStatus (authenticated with our
// secret) to get the real status, then update the order. Finally we send back
// the acknowledgement shape Pesapal expects.
async function handle(
  orderTrackingId: string | null,
  merchantRef: string | null,
  notifType: string | null
) {
  if (!orderTrackingId || !merchantRef) {
    return NextResponse.json({ error: "missing params" }, { status: 400 });
  }

  const tx = await getTransactionStatus(orderTrackingId);
  await updateOrderByTxRef(merchantRef, {
    status: mapStatus(tx.status_code),
    provider_tracking_id: orderTrackingId,
    raw: tx,
  });

  return NextResponse.json({
    orderNotificationType: notifType ?? "IPNCHANGE",
    orderTrackingId,
    orderMerchantReference: merchantRef,
    status: 200,
  });
}

// Pesapal may deliver the IPN as GET or POST, with params in the query string
// (and sometimes a JSON body for POST). Handle both.
export async function POST(req: Request) {
  const p = new URL(req.url).searchParams;
  let trackingId = p.get("OrderTrackingId");
  let merchantRef = p.get("OrderMerchantReference");
  let notifType = p.get("OrderNotificationType");

  if (!trackingId) {
    try {
      const body = (await req.json()) as Record<string, string>;
      trackingId = body.OrderTrackingId ?? trackingId;
      merchantRef = body.OrderMerchantReference ?? merchantRef;
      notifType = body.OrderNotificationType ?? notifType;
    } catch {
      /* no/!json body — fall through */
    }
  }
  return handle(trackingId, merchantRef, notifType);
}

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  return handle(
    p.get("OrderTrackingId"),
    p.get("OrderMerchantReference"),
    p.get("OrderNotificationType")
  );
}
