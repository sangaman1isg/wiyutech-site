"use client";

import { useState } from "react";
import Link from "next/link";

type Cur = "MWK" | "ZMW" | "USD";

const SYM: Record<Cur, string> = { MWK: "MWK ", ZMW: "ZMW ", USD: "$" };
// Per-currency defaults: average sale value, AutoReply monthly price, slider shape.
const DEFAULT_VALUE: Record<Cur, number> = { MWK: 30000, ZMW: 480, USD: 17 };
const AUTOREPLY_MONTHLY: Record<Cur, string> = {
  MWK: "124,999",
  ZMW: "1,999",
  USD: "70",
};
const STEP: Record<Cur, number> = { MWK: 5000, ZMW: 50, USD: 1 };
const MAXV: Record<Cur, number> = { MWK: 500000, ZMW: 8000, USD: 300 };

function fmt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

// Interactive lead magnet: shows a business roughly how much revenue late /
// missed WhatsApp replies are costing them, then points to AutoReply AI.
export default function RoiCalculator() {
  const [currency, setCurrency] = useState<Cur>("MWK");
  const [perWeek, setPerWeek] = useState(50); // enquiries a week
  const [missPct, setMissPct] = useState(40); // % after-hours / unanswered
  const [value, setValue] = useState(DEFAULT_VALUE.MWK);

  function changeCurrency(c: Cur) {
    setCurrency(c);
    setValue(DEFAULT_VALUE[c]);
  }

  const missedPerMonth = perWeek * 4.33 * (missPct / 100);
  const lostSales = missedPerMonth * 0.2; // ~1 in 5 missed enquiries was a real sale
  const lostRevenue = lostSales * value;
  const sym = SYM[currency];

  return (
    <section className="relative overflow-hidden border-b border-(--color-line) bg-(--color-bg-soft)">
      <div className="absolute inset-0 glow-soft glow-drift" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-32">
        <div data-animate="fade-up" className="mb-10 max-w-2xl md:mb-14">
          <p className="eyebrow mb-4">— The cost of a slow reply</p>
          <h2
            data-animate="mask"
            className="headline text-[clamp(2.5rem,5.5vw,5rem)]"
          >
            What&rsquo;s a late reply{" "}
            <span className="text-(--color-brand)">costing you?</span>
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Controls */}
          <div data-animate="slide-left" className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <span className="text-xs text-(--color-fg-faint)">Currency</span>
              <div className="relative inline-flex overflow-hidden rounded-full border border-(--color-line-bright) text-xs">
                {(["MWK", "ZMW", "USD"] as Cur[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => changeCurrency(c)}
                    className={`px-3.5 py-1.5 font-medium transition ${
                      currency === c
                        ? "bg-(--color-brand) text-white"
                        : "text-(--color-fg-muted) hover:text-(--color-fg)"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Field label="WhatsApp enquiries a week" value={`${perWeek}`}>
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={perWeek}
                onChange={(e) => setPerWeek(+e.target.value)}
                aria-label="WhatsApp enquiries a week"
                className="w-full accent-[var(--color-brand)]"
              />
            </Field>

            <Field
              label="Share that come after hours / go unanswered"
              value={`${missPct}%`}
            >
              <input
                type="range"
                min={10}
                max={70}
                step={5}
                value={missPct}
                onChange={(e) => setMissPct(+e.target.value)}
                aria-label="Share unanswered"
                className="w-full accent-[var(--color-brand)]"
              />
            </Field>

            <Field label="Average value of one customer" value={`${sym}${fmt(value)}`}>
              <input
                type="range"
                min={0}
                max={MAXV[currency]}
                step={STEP[currency]}
                value={value}
                onChange={(e) => setValue(+e.target.value)}
                aria-label="Average customer value"
                className="w-full accent-[var(--color-brand)]"
              />
            </Field>
          </div>

          {/* Result */}
          <div
            data-animate="slide-right"
            className="flex flex-col justify-center border border-(--color-line-bright) bg-(--color-bg-card) p-7 md:p-10"
          >
            <p className="eyebrow mb-3 text-(--color-brand)">
              — You&rsquo;re losing around
            </p>
            <p className="numeral text-[clamp(2.5rem,7vw,4.5rem)] text-(--color-fg)">
              {sym}
              {fmt(lostRevenue)}
            </p>
            <p className="mt-1 text-sm text-(--color-fg-muted)">per month</p>
            <p className="mt-5 text-sm leading-relaxed text-(--color-fg-muted)">
              That&rsquo;s about{" "}
              <span className="font-medium text-(--color-fg)">
                {Math.round(lostSales)} customers
              </span>{" "}
              a month messaging a competitor because no one replied in time.
            </p>
            <Link
              data-shine
              href="#offers"
              className="press mt-7 inline-flex w-full items-center justify-center gap-2 bg-(--color-brand) px-6 py-4 text-sm font-medium text-white transition hover:bg-(--color-brand-hot)"
            >
              Catch every one with AutoReply AI →
            </Link>
            <p className="mt-3 text-center text-xs text-(--color-fg-faint)">
              Replies 24/7 from {sym}
              {AUTOREPLY_MONTHLY[currency]}/mo
            </p>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-xs text-(--color-fg-faint)">
          A rough estimate for illustration, assuming about 1 in 5 missed
          enquiries was a real sale. Your actual numbers will vary.
        </p>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-sm text-(--color-fg-muted)">{label}</span>
        <span className="numeral text-base text-(--color-brand)">{value}</span>
      </div>
      {children}
    </div>
  );
}
