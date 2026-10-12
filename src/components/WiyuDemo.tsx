"use client";

import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "260774668193";
const WA_FALLBACK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Wiyule, I was chatting with Wiyu on your site and have a question."
)}`;

type Msg = { role: "user" | "assistant"; content: string };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey 👋 I'm Wiyu, Wiyule's AI assistant. Ask me about our websites, WhatsApp AI, or pricing.",
};

const SUGGESTIONS = [
  "How much is a website?",
  "What does AutoReply AI do?",
  "Which product is best for a salon?",
];

export default function WiyuDemo() {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;

    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/wiyu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            data.reply ??
            data.error ??
            "Sorry, something went wrong. Try WhatsApp below.",
        },
      ]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            "I can't reach the server right now. Please message us on WhatsApp below.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[32rem] max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-[var(--color-line-bright)] bg-[var(--color-bg-card)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-[var(--color-line)] px-5 py-4">
        <span className="h-2 w-2 rounded-full bg-[var(--color-brand)] pulse-dot" />
        <span className="text-sm font-medium text-[var(--color-fg)]">Wiyu</span>
        <span className="text-xs text-[var(--color-fg-faint)]">· AI assistant · online</span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <p
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "rounded-br-sm bg-[var(--color-brand)] text-white"
                  : "rounded-bl-sm border border-[var(--color-line)] bg-[var(--color-bg-elev)] text-[var(--color-fg)]"
              }`}
            >
              {m.content}
            </p>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-1.5 rounded-2xl rounded-bl-sm border border-[var(--color-line)] bg-[var(--color-bg-elev)] px-4 py-3.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg-muted)] pulse-dot" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg-muted)] pulse-dot delay-1" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg-muted)] pulse-dot delay-2" />
            </div>
          </div>
        )}
      </div>

      {/* Suggestions (only before the visitor has typed) */}
      {messages.length === 1 && (
        <div className="flex flex-wrap gap-2 px-5 pb-1">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="press rounded-full border border-[var(--color-line-bright)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--color-line)] p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask Wiyu anything…"
          aria-label="Message Wiyu"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="press flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] text-white transition hover:bg-[var(--color-brand-hot)] disabled:opacity-40"
        >
          <span aria-hidden>↑</span>
        </button>
      </form>

      {/* Fallback */}
      <a
        href={WA_FALLBACK}
        target="_blank"
        rel="noopener noreferrer"
        className="border-t border-[var(--color-line)] py-2.5 text-center text-xs text-[var(--color-fg-faint)] transition hover:text-[var(--color-brand)]"
      >
        Prefer a human? Chat with us on WhatsApp →
      </a>
    </div>
  );
}
