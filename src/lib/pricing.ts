// Server-side source of truth for checkout amounts.
//
// SECURITY: the payment API looks up the amount HERE by slug + currency. It must
// never trust an amount sent from the browser — otherwise a user could edit the
// request and pay MWK 1 for a MWK 349,500 product. The client only ever sends a
// product slug + currency; the server decides the price.
//
// These deposit figures mirror app/checkout/CheckoutClient.tsx (50% of setup, or
// full first month for the content pack). Keep the two in sync if pricing changes
// — and pricing changes need Tamsanga's sign-off (see CLAUDE.md).

export type PayCurrency = "ZMW" | "MWK";

export type CheckoutItem = {
  slug: string;
  name: string;
  depositLabel: string;
  amount: Record<PayCurrency, number>;
};

export const CHECKOUT_ITEMS: Record<string, CheckoutItem> = {
  "autoreply-ai": {
    slug: "autoreply-ai",
    name: "AutoReply AI",
    depositLabel: "50% deposit",
    amount: { ZMW: 5600, MWK: 349500 },
  },
  "storefront-kit": {
    slug: "storefront-kit",
    name: "Digital Storefront Kit",
    depositLabel: "50% deposit",
    amount: { ZMW: 9750, MWK: 612500 },
  },
  "content-pack": {
    slug: "content-pack",
    name: "Monthly Content Pack",
    depositLabel: "First month",
    amount: { ZMW: 2799, MWK: 174999 },
  },
};

export function isPayCurrency(value: unknown): value is PayCurrency {
  return value === "ZMW" || value === "MWK";
}

// Returns the resolved item (with the single amount for the chosen currency),
// or null if the slug/currency is invalid.
export function resolveCheckoutItem(slug: string, currency: string) {
  const item = CHECKOUT_ITEMS[slug];
  if (!item || !isPayCurrency(currency)) return null;
  return {
    slug: item.slug,
    name: item.name,
    depositLabel: item.depositLabel,
    currency,
    amount: item.amount[currency],
  };
}
