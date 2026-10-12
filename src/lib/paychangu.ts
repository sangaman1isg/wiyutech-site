// Server-ONLY PayChangu client (Malawi / MWK). Native fetch, no SDK.
//
// Flow:
//   1. initiatePayment(...)  → returns a hosted checkout_url to redirect to
//   2. verifyPayment(txRef)  → the authenticated source of truth for a payment
//
// Imported only by route handlers under app/api/** — never a client component
// (it reads the secret key). Endpoints confirmed against the live test API.

const BASE = "https://api.paychangu.com";
const SECRET = process.env.PAYCHANGU_SECRET_KEY;

function assertEnv() {
  if (!SECRET) throw new Error("Missing PAYCHANGU_SECRET_KEY");
}

export type InitiateInput = {
  txRef: string;
  amount: number;
  currency: string; // "MWK"
  email: string;
  firstName: string;
  lastName?: string;
  callbackUrl: string; // webhook URL
  returnUrl: string; // where PayChangu sends the customer back
  title: string;
  description: string;
};

// 1) Create a hosted payment session → returns the checkout_url.
export async function initiatePayment(
  input: InitiateInput
): Promise<{ checkoutUrl: string }> {
  assertEnv();
  const res = await fetch(`${BASE}/payment`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      amount: String(input.amount),
      currency: input.currency,
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName ?? input.firstName,
      tx_ref: input.txRef,
      callback_url: input.callbackUrl,
      return_url: input.returnUrl,
      customization: {
        title: input.title.slice(0, 50),
        description: input.description.slice(0, 100),
      },
    }),
  });
  const data = await res.json().catch(() => ({}));
  const checkoutUrl = data?.data?.checkout_url;
  if (!res.ok || data?.status !== "success" || !checkoutUrl) {
    throw new Error(
      `PayChangu initiate failed: ${res.status} ${JSON.stringify(data)}`
    );
  }
  return { checkoutUrl: checkoutUrl as string };
}

export type PayChanguStatus = {
  status: string; // "success" | "failed" | "pending" | ...
  amount: number;
  currency: string;
  txRef: string;
};

// 2) Verify a transaction — called by the webhook AND the success page.
// We never trust the browser redirect or the webhook body alone.
export async function verifyPayment(txRef: string): Promise<PayChanguStatus> {
  assertEnv();
  const res = await fetch(`${BASE}/verify-payment/${encodeURIComponent(txRef)}`, {
    headers: { Authorization: `Bearer ${SECRET}`, Accept: "application/json" },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `PayChangu verify failed: ${res.status} ${JSON.stringify(data)}`
    );
  }
  const d = (data?.data ?? {}) as Record<string, unknown>;
  return {
    status: String(d.status ?? "pending"),
    amount: Number(d.amount ?? 0),
    currency: String(d.currency ?? ""),
    txRef: String(d.tx_ref ?? txRef),
  };
}
