import { NextResponse } from "next/server";
import { resolveCheckoutItem } from "@/src/lib/pricing";
import { insertOrder, updateOrderByTxRef } from "@/src/lib/orders";
import { submitOrder } from "@/src/lib/pesapal";
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
// Prices server-side, saves a pending order, then routes to the right gateway:
//   MWK → PayChangu   ·   ZMW → Pesapal
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

    // 2) Route to the gateway that serves this currency.
    if (item.currency === "MWK") {
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
    }

    // ZMW → Pesapal
    const order = await submitOrder({
      txRef,
      currency: item.currency,
      amount,
      description: `${item.name} (${item.depositLabel})`,
      callbackUrl: `${siteUrl}/checkout/success`,
      email,
      phone,
      firstName,
      lastName,
      countryCode: "ZM",
    });
    await updateOrderByTxRef(txRef, {
      provider_tracking_id: order.order_tracking_id,
    });
    return NextResponse.json({ redirect_url: order.redirect_url });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
