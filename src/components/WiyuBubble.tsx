"use client";

import { useState } from "react";
import WiyuChat from "@/src/components/WiyuChat";

// Sitewide floating AI assistant. Tap to open the Wiyu chat in a panel.
// Replaces the old floating WhatsApp button — Wiyu's own fallback links to
// WhatsApp, so the "talk to a human" path is still one tap away.
export default function WiyuBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-4 z-[60] w-[min(92vw,22rem)] origin-bottom-right transition-all duration-300 md:right-6 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <WiyuChat className="h-[28rem] max-h-[70vh] shadow-2xl shadow-black/40" />
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Wiyu chat" : "Chat with Wiyu, our AI assistant"}
        aria-expanded={open}
        className="press fixed bottom-5 right-4 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand)] text-white shadow-lg shadow-[var(--color-brand)]/30 transition hover:bg-[var(--color-brand-hot)] md:right-6"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        ) : (
          <>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            {/* Live dot */}
            <span className="pulse-dot absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[var(--color-bg)] bg-[var(--color-brand-hot)]" />
          </>
        )}
      </button>
    </>
  );
}
