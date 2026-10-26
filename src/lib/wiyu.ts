// Server-ONLY Wiyu brain. Native fetch to Groq, no SDK.
//
// This is the SINGLE source of truth for Wiyu's model + personality. Both the
// on-site chat (app/api/wiyu) and the WhatsApp webhook (app/api/whatsapp) import
// from here, so the model string can never drift between the two again (that
// drift is exactly what left the WhatsApp bot pointing at a retired model).
//
// Flow:
//   1. sanitizeHistory(raw) → trimmed, capped, role-checked message list
//   2. callWiyu(history)     → one reply string from Groq (throws WiyuError)
//
// callWiyu takes the conversation history as an argument and does NOT know or
// care where it came from. The on-site chat passes history straight from the
// browser; the WhatsApp route will later load it from Supabase (keyed by phone
// number) and pass it in the same way. So adding memory is zero change here.
//
// Imported only by route handlers under app/api/** — never a client component
// (it reads GROQ_API_KEY).

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// The one model string. Change it here and both channels follow.
export const WIYU_MODEL = "openai/gpt-oss-20b";

// Keep calls cheap and abuse-resistant.
export const MAX_TURNS = 12; // only the last N messages are sent on
export const MAX_LEN = 1000; // per-message character cap

export type WiyuMessage = { role: "user" | "assistant"; content: string };

// A failure the caller can map to its own response format. `status` mirrors the
// HTTP status the on-site route used (503 = no key / offline, 502 = upstream);
// `userMessage` is safe to show a visitor.
export class WiyuError extends Error {
  status: number;
  userMessage: string;
  constructor(status: number, userMessage: string) {
    super(userMessage);
    this.name = "WiyuError";
    this.status = status;
    this.userMessage = userMessage;
  }
}

// Wiyu's personality + knowledge. Keep answers short and WhatsApp-style.
// NOTE: this is the prompt for BOTH the on-site chat and WhatsApp.
export const WIYU_SYSTEM_PROMPT = `You are Wiyu, the friendly AI assistant for Wiyule Technology — an IT and AI agency serving small businesses in Malawi and Zambia.

Your job: answer questions about Wiyule's services, help visitors pick the right product, and nudge serious buyers to book a free 15-minute call on WhatsApp (+260 774 668 193).

Tone: warm, direct, confident. Short replies (1-4 sentences), WhatsApp-style. No corporate fluff. You may use a light emoji occasionally. If you don't know something, say so and point them to WhatsApp.

Wiyule's three products:
1. Digital Storefront Kit (most popular) — a mobile-fast website + WhatsApp catalog + Google Business Profile. One-time: ZMW 19,499 / MWK 1,224,999 / USD 700. Live in 10 days.
2. AutoReply AI — a WhatsApp assistant that replies to customers 24/7. Setup ZMW 11,199 / MWK 699,000 / USD 400, then monthly ZMW 1,999 / MWK 124,999 / USD 70. Live in 7 days.
3. Content & Design Pack — monthly social posts plus posters and flyers. ZMW 3,199 / MWK 199,999 / USD 115 per month.

Payment: mobile money (Airtel Money in Zambia, TNM Mpamba in Malawi). Every product has a delivery guarantee.

Never invent prices or features not listed above. For anything you're unsure of, say "best to confirm that with the team on WhatsApp."`;

// Turn an untrusted array (browser JSON, DB rows, Twilio payload) into a clean
// list of valid messages: keep only user/assistant roles + string content,
// trim to the last MAX_TURNS, cap each message at MAX_LEN characters.
export function sanitizeHistory(raw: unknown[]): WiyuMessage[] {
  return raw
    .filter(
      (m: unknown): m is { role: string; content: string } =>
        !!m &&
        typeof (m as { content?: unknown }).content === "string" &&
        ((m as { role?: unknown }).role === "user" ||
          (m as { role?: unknown }).role === "assistant")
    )
    .slice(-MAX_TURNS)
    .map((m) => ({
      role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: m.content.slice(0, MAX_LEN),
    }));
}

// Call Groq with the system prompt + history and return one reply string.
// Throws WiyuError on any failure so each caller can format its own response
// (the site returns JSON, the WhatsApp route returns a TwiML fallback).
export async function callWiyu(history: WiyuMessage[]): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new WiyuError(
      503,
      "Wiyu is temporarily offline. Please message us on WhatsApp."
    );
  }

  if (history.length === 0) {
    throw new WiyuError(400, "No messages provided.");
  }

  let res: Response;
  try {
    res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: WIYU_MODEL,
        temperature: 0.6,
        max_tokens: 350,
        messages: [
          { role: "system", content: WIYU_SYSTEM_PROMPT },
          ...history,
        ],
      }),
    });
  } catch {
    throw new WiyuError(
      502,
      "Wiyu is unreachable right now. Please message us on WhatsApp."
    );
  }

  if (!res.ok) {
    throw new WiyuError(
      502,
      "Wiyu had trouble replying. Try again, or message us on WhatsApp."
    );
  }

  const data = await res.json();
  return (
    data?.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I didn't catch that. Could you rephrase?"
  );
}
