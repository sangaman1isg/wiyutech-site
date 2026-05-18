"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much does this actually cost?",
    a: "Our packages start at $350 USD for a Digital Storefront Kit, $500 for Operations OS Lite, and $250 setup + $40/month for AutoReply AI. We accept payment in USD, ZMW, or MWK. Founding clients (our first 3) get deeply discounted founding rates — message us to see if you qualify.",
  },
  {
    q: "How do I pay you? I'm in Zambia / Malawi.",
    a: "We accept Airtel Money in both Zambia and Malawi, MTN Mobile Money, FNB and standard Zambian/Malawian bank transfers, plus international transfers (Wise, Payoneer) for diaspora clients. Payment is split into two installments — 50% to start, 50% on launch — so you're never out of pocket before you see results.",
  },
  {
    q: "What if I don't like the final result?",
    a: "We work in fixed scopes with weekly check-ins, so you see progress and approve direction every step of the way. There are no surprises at the end. If something specific is off after launch, we fix it during your free 30-day support window. We don't take on a project we can't deliver well.",
  },
  {
    q: "How fast can you actually deliver?",
    a: "Digital Storefront Kit: 7–10 days from kickoff. AutoReply AI: 5–7 days. Operations OS Lite: 3–4 weeks because it's a deeper system. We hit these timelines because we've structured every package as a fixed scope. No surprises, no scope creep, no excuses.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-b border-(--color-line) bg-(--color-bg-soft)">
      <div className="relative mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
        <div className="mb-16 max-w-2xl">
          <p className="eyebrow mb-4">— Real questions</p>
          <h2 className="headline text-[clamp(2.5rem,5.5vw,5rem)]">
            Things people <span className="text-(--color-brand)">actually</span> ask us.
          </h2>
        </div>

        <div className="border-t border-(--color-line)">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="border-b border-(--color-line) transition"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left transition hover:opacity-80"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-baseline gap-5">
                    <span className="numeral text-2xl text-(--color-brand)">
                      0{i + 1}
                    </span>
                    <span className="text-base font-medium text-(--color-fg) md:text-lg">
                      {faq.q}
                    </span>
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center border border-(--color-line-bright) text-lg font-light text-(--color-fg-muted) transition ${
                      isOpen ? "rotate-45 border-(--color-brand) text-(--color-brand)" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-7" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="ml-12 max-w-3xl text-sm leading-relaxed text-(--color-fg-muted) md:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-12 max-w-xl text-sm text-(--color-fg-muted)">
        Got a different question?{" "}
<a
  href="https://wa.me/260774668193"
  target="_blank"
  rel="noopener noreferrer"
  className="text-(--color-brand) underline-offset-4 hover:underline"
>
  Message us on WhatsApp
</a>{" "}
          — we reply faster than most agencies&rsquo; receptionists.
        </p>
      </div>
    </section>
  );
}