// Server-ONLY Pesapal API 3.0 client (sandbox or live). Native fetch, no SDK.
//
// Flow:
//   1. getToken()              → short-lived bearer token (~5 min)
//   2. registerIpn(url)        → ONE-TIME: register your webhook, get an ipn_id
//   3. submitOrder(...)        → returns a redirect_url to send the customer to
//   4. getTransactionStatus()  → the authenticated source of truth for a payment
//
// Imported only by route handlers under app/api/** — never a client component
// (it reads the secret consumer key/secret).

const BASE = process.env.PESAPAL_BASE_URL; // sandbox: https://cybqa.pesapal.com/pesapalv3/api
const KEY = process.env.PESAPAL_CONSUMER_KEY;
const SECRET = process.env.PESAPAL_CONSUMER_SECRET;

function assertEnv() {
  if (!BASE || !KEY || !SECRET) {
    throw new Error(
      "Missing Pesapal env (PESAPAL_BASE_URL / PESAPAL_CONSUMER_KEY / PESAPAL_CONSUMER_SECRET)"
    );
  }
}

// 1) Auth. Tokens last ~5 min, so we just fetch a fresh one per operation —
// simpler than caching, and these calls are infrequent.
export async function getToken(): Promise<string> {
  assertEnv();
  const res = await fetch(`${BASE}/Auth/RequestToken`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ consumer_key: KEY, consumer_secret: SECRET }),
  });
  const data = await res.json();
  if (!res.ok || !data.token) {
    throw new Error(`Pesapal auth failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data.token as string;
}

// 2) Register an IPN (webhook) URL — ONE-TIME setup. Returns an ipn_id you store
// in PESAPAL_IPN_ID and reuse on every order.
export async function registerIpn(url: string) {
  const token = await getToken();
  const res = await fetch(`${BASE}/URLSetup/RegisterIPN`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ url, ipn_notification_type: "POST" }),
  });
  const data = await res.json();
  if (!res.ok || !data.ipn_id) {
    throw new Error(`RegisterIPN failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data as { ipn_id: string; url: string; ipn_status: number };
}

export type SubmitOrderInput = {
  txRef: string;
  currency: string;
  amount: number;
  description: string;
  callbackUrl: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  countryCode?: string; // ISO 3166-1 alpha-2, e.g. ZM / MW
};

// 3) Submit an order → returns the redirect_url (send the customer there) plus
// the order_tracking_id (Pesapal's id for this transaction).
export async function submitOrder(input: SubmitOrderInput) {
  const ipnId = process.env.PESAPAL_IPN_ID;
  if (!ipnId) {
    throw new Error("Missing PESAPAL_IPN_ID — run the one-time register-ipn step.");
  }
  const token = await getToken();
  const res = await fetch(`${BASE}/Transactions/SubmitOrderRequest`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: input.txRef, // our merchant reference (max 50 chars)
      currency: input.currency,
      amount: input.amount,
      description: input.description.slice(0, 100),
      callback_url: input.callbackUrl,
      notification_id: ipnId,
      billing_address: {
        email_address: input.email,
        phone_number: input.phone,
        country_code: input.countryCode,
        first_name: input.firstName,
        last_name: input.lastName,
      },
    }),
  });
  const data = await res.json();
  if (!res.ok || !data.redirect_url || data.error) {
    throw new Error(`SubmitOrder failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data as {
    order_tracking_id: string;
    merchant_reference: string;
    redirect_url: string;
  };
}

export type TransactionStatus = {
  payment_status_description: string; // "Completed" | "Failed" | "Reversed" | "Invalid"
  amount: number;
  currency: string;
  confirmation_code?: string;
  payment_method?: string;
  merchant_reference: string;
  status_code: number; // 0 invalid · 1 completed · 2 failed · 3 reversed
};

// 4) The authenticated source of truth: confirm a transaction's real status.
// Called by both the IPN webhook and the success page — we never trust the
// browser redirect alone.
export async function getTransactionStatus(
  orderTrackingId: string
): Promise<TransactionStatus> {
  const token = await getToken();
  const res = await fetch(
    `${BASE}/Transactions/GetTransactionStatus?orderTrackingId=${encodeURIComponent(orderTrackingId)}`,
    { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`GetTransactionStatus failed: ${res.status} ${JSON.stringify(data)}`);
  }
  return data as TransactionStatus;
}
