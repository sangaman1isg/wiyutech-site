"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

/* ─── Types ─────────────────────────────────────────────────── */
type PayCurrency = "ZMW" | "MWK";

type CheckoutProduct = {
  name: string;
  subtitle: string;
  depositLabel: string;
  deposit: Record<PayCurrency, string>;
  balanceNote: Record<PayCurrency, string>;
  features: string[];
  delivery: string;
  guarantee: string;
};

/* ─── Product data ───────────────────────────────────────────── */
// Deposit amounts match 50% of setup fee (AutoReply AI, Storefront Kit)
// or full first month (Content Pack).
const PRODUCTS: Record<string, CheckoutProduct> = {
  "autoreply-ai": {
    name: "AutoReply AI",
    subtitle: "AI WhatsApp Assistant",
    depositLabel: "50% deposit to start",
    deposit: { ZMW: "5,600", MWK: "349,500" },
    balanceNote: {
      ZMW: "Balance of ZMW 5,599 is due when your AI goes live (7 days).",
      MWK: "Balance of MWK 349,500 is due when your AI goes live (7 days).",
    },
    features: [
      "AI trained on your exact business",
      "Replies in under 3 seconds — even at 2am",
      "Live in 7 days or full setup refund",
    ],
    delivery: "7 days",
    guarantee: "Live in 7 days or we refund your full setup fee.",
  },
  "storefront-kit": {
    name: "Digital Storefront Kit",
    subtitle: "Website + WhatsApp + Google",
    depositLabel: "50% deposit to start",
    deposit: { ZMW: "9,750", MWK: "612,500" },
    balanceNote: {
      ZMW: "Balance of ZMW 9,749 is due on your launch day.",
      MWK: "Balance of MWK 612,499 is due on your launch day.",
    },
    features: [
      "Mobile-fast website — up to 8 pages",
      "WhatsApp catalog + Google Business Profile",
      "1 month AutoReply AI included FREE",
    ],
    delivery: "10 days",
    guarantee: "Not live in 10 days? We refund 25% — no questions.",
  },
  "content-pack": {
    name: "Monthly Content Pack",
    subtitle: "Done-for-you content",
    depositLabel: "First month upfront",
    deposit: { ZMW: "2,799", MWK: "174,999" },
    balanceNote: {
      ZMW: "Renews monthly. Cancel anytime with 7 days' notice.",
      MWK: "Renews monthly. Cancel anytime with 7 days' notice.",
    },
    features: [
      "12 branded WhatsApp Status posts/month",
      "4 Facebook posts + 1 promo graphic",
      "Content calendar delivered every Monday",
    ],
    delivery: "Ongoing",
    guarantee: "Not happy with month 1? Full refund.",
  },
};

/* ─── Mobile money details ───────────────────────────────────── */
const MOMO = {
  ZMW: { provider: "Airtel Money", number: "0774 668 193", country: "Zambia" },
  MWK: { provider: "TNM Mpamba",   number: "0893 306 186", country: "Malawi" },
};

/* ─── Bank transfer details ──────────────────────────────────── */
type BankDetails = {
  name: string;
  account: string;
  number: string;
  branch?: string;
};
const BANK: Record<PayCurrency, BankDetails> = {
  ZMW: {
    name: "FNB",
    account: "TAMSANGA KAYUNI",
    number: "63212718449",
    branch: "Acacia Premier Branch",
  },
  MWK: {
    name: "National Bank",
    account: "TAMSANGA KAYUNI",
    number: "1010466567",
  },
};

/* ─── Component ──────────────────────────────────────────────── */
export default function CheckoutClient() {
  const params = useSearchParams();
  const slug = params.get("product") ?? "";
  const rawCurrency = params.get("currency");

  // We only collect ZMW or MWK — USD is cash-only
  const initial: PayCurrency = rawCurrency === "MWK" ? "MWK" : "ZMW";
  const [currency, setCurrency] = useState<PayCurrency>(initial);

  const product = PRODUCTS[slug];

  /* ── Not found ── */
  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="eyebrow mb-4">— Checkout</p>
        <h1 className="headline mb-6 text-3xl">Product not found</h1>
        <Link
          href="/#offers"
          className="text-sm font-medium text-[var(--color-brand)] hover:text-[var(--color-brand-hot)]"
        >
          ← Back to services
        </Link>
      </div>
    );
  }

  const momo = MOMO[currency];
  const bank = BANK[currency];
  const sym = currency === "ZMW" ? "ZMW " : "MWK ";
  const amount = product.deposit[currency];

  const waText = encodeURIComponent(
    `Hi Wiyule — I just sent ${sym}${amount} (${product.depositLabel}) for ${product.name}. I'm attaching my payment screenshot now.`
  );
  const waUrl = `https://wa.me/260774668193?text=${waText}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">

      {/* Back link */}
      <Link
        href="/#offers"
        className="mb-10 inline-flex items-center gap-2 text-xs text-[var(--color-fg-faint)] transition hover:text-[var(--color-fg)]"
      >
        ← Back to services
      </Link>

      <div className="grid gap-12 md:grid-cols-[1fr_400px]">

        {/* ── Left: product summary ── */}
        <div>
          <p className="eyebrow mb-3">— Checkout</p>
          <h1 className="headline text-[clamp(2rem,4vw,3.5rem)]">{product.name}</h1>
          <p className="mt-1 text-sm text-[var(--color-fg-faint)]">{product.subtitle}</p>

          <ul className="mt-8 flex flex-col gap-3">
            {product.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-[var(--color-fg-muted)]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-fg-muted)]">
            <span>Delivery</span>
            <span className="font-medium text-[var(--color-fg)]">{product.delivery}</span>
          </div>

          <p className="mt-6 border-l-2 border-[var(--color-line-bright)] pl-4 text-xs text-[var(--color-fg-faint)]">
            {product.guarantee}
          </p>
        </div>

        {/* ── Right: payment card ── */}
        <div className="flex flex-col gap-6">

          {/* Amount + currency toggle */}
          <div className="border border-[var(--color-line-bright)] p-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow mb-1 text-[var(--color-brand)]">— {product.depositLabel}</p>
                <p className="numeral text-4xl text-[var(--color-fg)]">
                  {sym}{amount}
                </p>
              </div>

              {/* ZMW / MWK toggle */}
              <div className="relative inline-flex overflow-hidden rounded-full border border-[var(--color-line-bright)] text-xs">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 w-1/2 bg-[var(--color-brand)] transition-transform duration-200"
                  style={{ transform: `translateX(${currency === "ZMW" ? "0%" : "100%"})` }}
                />
                {(["ZMW", "MWK"] as PayCurrency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`relative z-10 px-4 py-2 font-medium transition-colors duration-200 ${
                      currency === c ? "text-white" : "text-[var(--color-fg-muted)]"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-[var(--color-fg-faint)]">
              {product.balanceNote[currency]}
            </p>
          </div>

          {/* Manual payment */}
          <div className="border border-[var(--color-line)] p-6">
            <p className="eyebrow mb-5">— How to pay</p>
            <ol className="flex flex-col gap-5">
              {/* Step 1 */}
              <li className="flex gap-4">
                <span className="numeral flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand)] text-sm text-[var(--color-brand)]">
                  1
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--color-fg)]">
                    Send {sym}{amount} — pick one:
                  </p>

                  {/* Mobile money */}
                  <div className="mt-3 border border-[var(--color-line)] p-3">
                    <p className="eyebrow mb-1 text-[var(--color-fg-muted)]">
                      — {momo.provider}
                    </p>
                    <p className="font-mono text-base text-[var(--color-fg)]">
                      {momo.number}
                    </p>
                  </div>

                  {/* Bank transfer */}
                  <div className="mt-2 border border-[var(--color-line)] p-3">
                    <p className="eyebrow mb-2 text-[var(--color-fg-muted)]">
                      — {bank.name} (bank transfer)
                    </p>
                    <dl className="flex flex-col gap-1 text-xs">
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-fg-faint)]">Account name</dt>
                        <dd className="text-right text-[var(--color-fg)]">{bank.account}</dd>
                      </div>
                      <div className="flex justify-between gap-3">
                        <dt className="text-[var(--color-fg-faint)]">Account no.</dt>
                        <dd className="text-right font-mono text-[var(--color-fg)]">{bank.number}</dd>
                      </div>
                      {bank.branch && (
                        <div className="flex justify-between gap-3">
                          <dt className="text-[var(--color-fg-faint)]">Branch</dt>
                          <dd className="text-right text-[var(--color-fg)]">{bank.branch}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <p className="mt-2 text-xs text-[var(--color-fg-faint)]">
                    Use your name as the payment reference
                  </p>
                </div>
              </li>

              {/* Step 2 */}
              <li className="flex gap-4">
                <span className="numeral flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand)] text-sm text-[var(--color-brand)]">
                  2
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--color-fg)]">
                    Screenshot your confirmation
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-fg-faint)]">
                    The SMS or app confirmation screen
                  </p>
                </div>
              </li>

              {/* Step 3 */}
              <li className="flex gap-4">
                <span className="numeral flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand)] text-sm text-[var(--color-brand)]">
                  3
                </span>
                <div>
                  <p className="text-sm font-medium text-[var(--color-fg)]">
                    Tap the button below and send us your screenshot
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-fg-faint)]">
                    We confirm within 1 hour and start your project
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* WhatsApp confirm button */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 bg-[var(--color-brand)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)]"
          >
            I&apos;ve paid — send confirmation →
          </a>

          <p className="text-center text-xs text-[var(--color-fg-faint)]">
            Questions?{" "}
            <a
              href="https://wa.me/260774668193"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-fg-muted)] underline underline-offset-2 hover:text-[var(--color-fg)]"
            >
              Message us on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
