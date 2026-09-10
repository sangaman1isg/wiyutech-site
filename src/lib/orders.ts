// Server-ONLY Supabase data access via the REST (PostgREST) API.
//
// Uses the service-role key, which bypasses Row Level Security — so this module
// must never be imported into a client component or it would leak the key.
// It's only imported by route handlers under app/api/**, which run on the server.
//
// No SDK / npm dependency — just native fetch against Supabase's auto-generated
// REST endpoint at {SUPABASE_URL}/rest/v1/{table}.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  if (!SUPABASE_URL || !SERVICE_KEY) {
    throw new Error(
      "Missing Supabase env vars (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)"
    );
  }
  return {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    "Content-Type": "application/json",
  };
}

export type NewOrder = {
  tx_ref: string;
  product_slug: string;
  product_name: string;
  currency: string;
  amount: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
};

export type Order = NewOrder & {
  id: string;
  created_at: string;
  status: string;
  provider_tracking_id: string | null;
  raw: unknown;
};

// Insert a new 'pending' order. Returns the created row.
export async function insertOrder(order: NewOrder): Promise<Order> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify({ ...order, status: "pending" }),
  });
  if (!res.ok) {
    throw new Error(`insertOrder failed: ${res.status} ${await res.text()}`);
  }
  const [row] = (await res.json()) as Order[];
  return row;
}

// Patch the order matching tx_ref (e.g. flip status to 'successful'). Returns
// the updated rows.
export async function updateOrderByTxRef(
  txRef: string,
  patch: Partial<Order>
): Promise<Order[]> {
  const url = `${SUPABASE_URL}/rest/v1/orders?tx_ref=eq.${encodeURIComponent(txRef)}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: { ...headers(), Prefer: "return=representation" },
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    throw new Error(`updateOrderByTxRef failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as Order[];
}

// Look up a single order by our reference (used by the verify endpoint).
export async function getOrderByTxRef(txRef: string): Promise<Order | null> {
  const url = `${SUPABASE_URL}/rest/v1/orders?tx_ref=eq.${encodeURIComponent(txRef)}&select=*`;
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    throw new Error(`getOrderByTxRef failed: ${res.status} ${await res.text()}`);
  }
  const rows = (await res.json()) as Order[];
  return rows[0] ?? null;
}
