import { NextResponse } from "next/server";
import { callWiyu, sanitizeHistory, WiyuError } from "@/src/lib/wiyu";

export const runtime = "nodejs";

// POST /api/wiyu
// Body: { messages: [{ role: "user" | "assistant", content: string }] }
// Sanitises the browser-supplied history, asks Wiyu (Groq) for a reply, and
// returns { reply }. The model, system prompt, and Groq call all live in
// src/lib/wiyu.ts — shared with the WhatsApp webhook so they never drift.

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const raw: unknown[] = Array.isArray((body as { messages?: unknown })?.messages)
    ? (body as { messages: unknown[] }).messages
    : [];

  const history = sanitizeHistory(raw);

  try {
    const reply = await callWiyu(history);
    return NextResponse.json({ reply });
  } catch (err) {
    if (err instanceof WiyuError) {
      return NextResponse.json({ error: err.userMessage }, { status: err.status });
    }
    return NextResponse.json(
      { error: "Wiyu is unreachable right now. Please message us on WhatsApp." },
      { status: 502 }
    );
  }
}
