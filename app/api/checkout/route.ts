import { NextResponse } from "next/server";
import { resolveCheckoutItem } from "@/src/lib/pricing";
import { insertOrder, updateOrderByTxRef } from "@/src/lib/orders";
import { submitOrder } from "@/src/lib/pesapal";

export const runtime = "nodejs";

// POST /api/checkout
// Body: { slug, currency, name, email, phone }
// Prices the item server-side, saves a pending order, creates the Pesapal
// payment, and returns { redirect_url } for the browser to send the user to.
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { slug, currency, name, email, phone } = body as Record<string, string>;

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

    const txRef = `WIY-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 8)}`.toUpperCase();

    // 1) Persist a pending order first — so we keep a record even if the
    //    customer abandons the Pesapal page.
    await insertOrder({
      tx_ref: txRef,
      product_slug: item.slug,
      product_name: item.name,
      currency: item.currency,
      amount: item.amount,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
    });

    // 2) Create the Pesapal payment.
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const order = await submitOrder({
      txRef,
      currency: item.currency,
      amount: item.amount,
      description: `${item.name} — ${item.depositLabel}`,
      callbackUrl: `${siteUrl}/checkout/success`,
      email,
      phone,
      firstName,
      lastName: rest.join(" ") || firstName,
      countryCode: item.currency === "ZMW" ? "ZM" : "MW",
    });

    // 3) Save Pesapal's tracking id against our order.
    await updateOrderByTxRef(txRef, {
      provider_tracking_id: order.order_tracking_id,
    });

    // 4) Hand the redirect URL back to the client.
    return NextResponse.json({ redirect_url: order.redirect_url });
  } catch (err) {
    console.error("checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
