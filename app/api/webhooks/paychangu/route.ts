import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifyPayment } from "@/src/lib/paychangu";
import { updateOrderByTxRef } from "@/src/lib/orders";

export const runtime = "nodejs";

// POST /api/webhooks/paychangu
// PayChangu posts a signed event here. We verify the Signature header
// (HMAC-SHA256 of the raw body with our webhook secret), then RE-VERIFY the
// payment via PayChangu's own endpoint before trusting it — never the webhook
// body alone. We return 200 once handled so PayChangu doesn't retry endlessly;
// the /checkout/success page is the backup reconciliation path.
export async function POST(req: Request) {
  const raw = await req.text();
  const secret = process.env.PAYCHANGU_WEBHOOK_SECRET;
  const signature = req.headers.get("signature") ?? "";

  if (secret) {
    const expected = crypto
      .createHmac("sha256", secret)
      .update(raw)
      .digest("hex");
    if (expected !== signature) {
      return new NextResponse("invalid signature", { status: 401 });
    }
  }

  let event: Record<string, unknown> = {};
  try {
    event = JSON.parse(raw);
  } catch {
    return new NextResponse("bad payload", { status: 400 });
  }

  const txRef =
    (event.reference as string | undefined) ??
    (event.tx_ref as string | undefined) ??
    (event.data as { tx_ref?: string } | undefined)?.tx_ref;

  if (txRef) {
    try {
      const status = await verifyPayment(txRef);
      await updateOrderByTxRef(txRef, {
        status:
          status.status.toLowerCase() === "success"
            ? "successful"
            : status.status,
        raw: event,
      });
    } catch (err) {
      console.error("paychangu webhook verify error:", err);
    }
  }

  return new NextResponse("ok", { status: 200 });
}
