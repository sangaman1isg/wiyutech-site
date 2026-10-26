import crypto from "crypto";
import { callWiyu, sanitizeHistory, type WiyuMessage } from "@/src/lib/wiyu";

export const runtime = "nodejs";

// POST /api/whatsapp  — Twilio WhatsApp webhook.
//
// Twilio POSTs here (application/x-www-form-urlencoded) whenever a WhatsApp
// message arrives: `Body` is the user's text, `From` is their number
// ("whatsapp:+260..."). We ask Wiyu (shared brain in src/lib/wiyu.ts) for a
// reply and hand it back as TwiML — a tiny XML document Twilio relays to the
// user. That means NO Twilio credentials and NO outbound API call: the reply
// rides back on the webhook response itself.
//
// Replaces the old n8n "Wiyu — WhatsApp AI" workflow. Same Groq model + prompt
// as the on-site chat, because both import from src/lib/wiyu.ts.

// Wrap a reply as TwiML. Wiyu's text can contain & or < (e.g. prices, emoji),
// so it must be XML-escaped or Twilio rejects the document.
function twiml(message: string): Response {
  const safe = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${safe}</Message></Response>`;
  return new Response(xml, {
    status: 200,
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

// SECURITY (drop-in #1): verify the request really came from Twilio.
// Twilio signs each request with HMAC-SHA1 over (webhook URL + sorted POST
// params) using your Auth Token, and sends it as X-Twilio-Signature. Without
// this, anyone who finds the URL could POST and burn Groq tokens.
//
// Stays DISABLED until TWILIO_AUTH_TOKEN is set in the environment — so v1
// works immediately, and flipping on the check later is just adding the env var
// (no code change).
//
// The signed URL must EXACTLY match the one configured in the Twilio console.
// Our canonical host is www.wiyuletech.com (the apex 308-redirects to it), so we
// rebuild the URL from the request's forwarded host/proto headers — i.e. the
// exact host Twilio called — rather than from NEXT_PUBLIC_SITE_URL (which is the
// apex and shared with PayChangu). Self-configuring, no host to keep in sync.
function signatureOk(req: Request, params: Record<string, string>): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return true; // check not enabled yet
  const signature = req.headers.get("x-twilio-signature");
  if (!signature) return false;

  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
  const { pathname, search } = new URL(req.url);
  const url = `${proto}://${host}${pathname}${search}`;

  const data = Object.keys(params)
    .sort()
    .reduce((acc, key) => acc + key + params[key], url);
  const expected = crypto
    .createHmac("sha1", authToken)
    .update(Buffer.from(data, "utf-8"))
    .digest("base64");

  // Constant-time compare to avoid leaking the signature via timing.
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  // Twilio sends form-encoded data, not JSON.
  const form = await req.formData().catch(() => null);
  if (!form) return twiml("Sorry, I couldn't read that. Please try again.");

  const params: Record<string, string> = {};
  for (const [k, v] of form.entries()) params[k] = typeof v === "string" ? v : "";

  if (!signatureOk(req, params)) {
    // Not a genuine Twilio request — reject without calling Groq.
    return new Response("Forbidden", { status: 403 });
  }

  const userText = (params.Body ?? "").trim();
  const from = params.From ?? ""; // "whatsapp:+260..." — the user's number
  if (!userText) {
    return twiml("Hi! I'm Wiyu 👋 Ask me anything about Wiyule Technology.");
  }

  // MEMORY (drop-in #2): v1 is single-turn — each message is answered fresh,
  // because Twilio webhooks carry no history. To add memory later, load this
  // user's past turns from Supabase here (keyed by `from`) and prepend them:
  //   const past = await loadHistory(from);   // WiyuMessage[] from Supabase
  //   const history = sanitizeHistory([...past, { role: "user", content: userText }]);
  // ...then after replying, persist the new user + assistant turns. The brain
  // (callWiyu) already accepts arbitrary history, so no lib change is needed.
  void from; // reserved for the Supabase memory key (drop-in #2)
  const history: WiyuMessage[] = sanitizeHistory([
    { role: "user", content: userText },
  ]);

  try {
    const reply = await callWiyu(history);
    return twiml(reply);
  } catch {
    // Always reply with something human on WhatsApp rather than an HTTP error.
    return twiml(
      "Sorry, I had trouble replying just now. Please message the team on WhatsApp: +260 774 668 193."
    );
  }
}
