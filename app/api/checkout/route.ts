import { NextResponse } from "next/server";
import { resolveCheckoutItem } from "@/src/lib/pricing";
import { insertOrder, updateOrderByTxRef } from "@/src/lib/orders";
import { initiatePayment } from "@/src/lib/paychangu";

export const runtime = "nodejs";

// Promo validated server-side — must mirror CheckoutClient's WIYULE30.
const PROMO_CODE = "WIYULE30";
const PROMO_RATE = 0.3;
const PROMO_EXPIRES = new Date("2026-11-01T00:00:00+02:00");
function applyPromo(amount: number, code?: string): number {
  if (
    code &&
    code.trim().toUpperCase() === PROMO_CODE &&
    new Date() < PROMO_EXPIRES
  ) {
    return Math.round(amount * (1 - PROMO_RATE));
  }
  return amount;
}

// POST /api/checkout
// Body: { slug, currency, name, email, phone, code? }
// Prices server-side, saves a pending order, then routes to the right gateway.
//   MWK → PayChangu   (LIVE)
//   ZMW → Pesapal     (HELD for KYC — rejected here; ZMW uses manual mobile money)
// Returns { redirect_url } for the browser to send the customer to.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, currency, name, email, phone, code } = body as Record<
      string,
      string
    >;

    // Price is resolved here, server-side — the browser never sends an amount.
    const item = resolveCheckoutItem(String(slug ?? ""), String(currency ?? ""));
    if (!item) {
      return NextResponse.json(
        { error: "Invalid product or currency" },
        { status: 400 }
      );
    }
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    // Online payment is live for MWK only. ZMW stays on manual mobile money
    // until Pesapal KYC clears (then restore the Pesapal branch from wave8-hold).
    if (item.currency !== "MWK") {
      return NextResponse.json(
        {
          error:
            "Online card payment isn't available for this currency yet — please use the manual mobile money option below.",
        },
        { status: 400 }
      );
    }

    const amount = applyPromo(item.amount, code);

    const txRef = `WIY-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}`.toUpperCase();

    // 1) Persist a pending order first — so we keep a record even if the
    //    customer abandons the gateway page.
    await insertOrder({
      tx_ref: txRef,
      product_slug: item.slug,
      product_name: item.name,
      currency: item.currency,
      amount,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
    });

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const lastName = rest.join(" ") || firstName;

    // 2) Create the PayChangu hosted payment (MWK).
    const { checkoutUrl } = await initiatePayment({
      txRef,
      amount,
      currency: "MWK",
      email,
      firstName,
      lastName,
      callbackUrl: `${siteUrl}/api/webhooks/paychangu`,
      returnUrl: `${siteUrl}/checkout/success`,
      title: item.name,
      description: item.depositLabel,
    });
    // PayChangu keys the transaction by our tx_ref.
    await updateOrderByTxRef(txRef, { provider_tracking_id: txRef });
    return NextResponse.json({ redirect_url: checkoutUrl });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
