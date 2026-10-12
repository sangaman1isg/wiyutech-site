import { NextResponse } from "next/server";

export const runtime = "nodejs";

// POST /api/wiyu
// Body: { messages: [{ role: "user" | "assistant", content: string }] }
// Calls Groq (same model as the WhatsApp Wiyu) with a server-side system
// prompt and returns { reply }. The browser never sees the system prompt
// or the API key.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b";

// Keep the demo cheap and abuse-resistant.
const MAX_TURNS = 12; // only the last N messages are sent on
const MAX_LEN = 1000; // per-message character cap

// Wiyu's personality + knowledge. Keep answers short and WhatsApp-style.
// NOTE: sync wording with the n8n Wiyu prompt when it changes.
const SYSTEM_PROMPT = `You are Wiyu, the friendly AI assistant for Wiyule Technology — an IT and AI agency serving small businesses in Malawi and Zambia.

Your job: answer questions about Wiyule's services, help visitors pick the right product, and nudge serious buyers to book a free 15-minute call on WhatsApp (+260 774 668 193).

Tone: warm, direct, confident. Short replies (1-4 sentences), WhatsApp-style. No corporate fluff. You may use a light emoji occasionally. If you don't know something, say so and point them to WhatsApp.

Wiyule's three products:
1. Digital Storefront Kit (most popular) — a mobile-fast website + WhatsApp catalog + Google Business Profile. One-time: ZMW 19,499 / MWK 1,224,999 / USD 700. Live in 10 days.
2. AutoReply AI — a WhatsApp assistant that replies to customers 24/7. Setup ZMW 11,199 / MWK 699,000 / USD 400, then monthly ZMW 1,999 / MWK 124,999 / USD 70. Live in 7 days.
3. Content & Design Pack — monthly social posts plus posters and flyers. ZMW 3,199 / MWK 199,999 / USD 115 per month.

Payment: mobile money (Airtel Money in Zambia, TNM Mpamba in Malawi). Every product has a delivery guarantee.

Never invent prices or features not listed above. For anything you're unsure of, say "best to confirm that with the team on WhatsApp."`;

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Wiyu is temporarily offline. Please message us on WhatsApp." },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const raw: unknown[] = Array.isArray((body as { messages?: unknown })?.messages)
    ? (body as { messages: unknown[] }).messages
    : [];

  // Sanitise: keep only valid roles, trim, cap length, cap turn count.
  const history = raw
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

  if (history.length === 0) {
    return NextResponse.json({ error: "No messages provided." }, { status: 400 });
  }

  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.6,
        max_tokens: 350,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Wiyu had trouble replying. Try again, or message us on WhatsApp." },
        { status: 502 }
      );
    }

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I didn't catch that. Could you rephrase?";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Wiyu is unreachable right now. Please message us on WhatsApp." },
      { status: 502 }
    );
  }
}
