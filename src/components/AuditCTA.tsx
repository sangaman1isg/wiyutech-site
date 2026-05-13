"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "260774668193";
const AUDIT_MESSAGE = encodeURIComponent(
  "Hi Wiyule — I'd like my free WhatsApp Business audit. My business number is: "
);
const AUDIT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${AUDIT_MESSAGE}`;

export default function AuditCTA() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg-soft)]">
      <div className="absolute inset-0 glow-soft" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
              <span className="eyebrow text-[var(--color-brand)]">
                Free · This week only
              </span>
            </div>

            <h2 className="headline text-[clamp(2rem,4.5vw,4rem)]">
              Get a free WhatsApp <br className="hidden md:block" />
              Business{" "}
              <span className="text-[var(--color-brand)]">audit</span>.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              We&rsquo;ll review your WhatsApp Business setup and send you a
              3-minute video showing exactly what to fix to stop losing
              after-hours customers. No strings, no obligation.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <Link
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand)] px-7 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)]"
            >
              Claim my free audit →
            </Link>
            <p className="text-xs text-[var(--color-fg-faint)] md:text-right">
              Delivered within 24 hours · 5 slots / week
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}