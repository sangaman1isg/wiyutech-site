"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AnimatedPrice from "@/src/components/AnimatedPrice";

/* ─── Types ─────────────────────────────────────────────────── */
type PayCurrency = "ZMW" | "MWK";

type CheckoutProduct = {
  name: string;
  subtitle: string;
  depositLabel: string;
  // Amounts are NUMBERS, not formatted strings — so we can do maths
  // (discounts) on them. We format with commas only at display time.
  deposit: Record<PayCurrency, number>;
  // Fixed balance due later (null = subscription, no one-off balance).
  balance: Record<PayCurrency, number> | null;
  // For products WITH a balance: the "...is due WHEN" phrase.
  // For subscriptions (balance = null): the full standalone note.
  balanceNote: string;
  features: string[];
  delivery: string;
  guarantee: string;
};

/* ─── Promo code (WIYULE30 — 30% off, expires end of Oct 2026) ─── */
const PROMO_CODE = "WIYULE30";
const PROMO_RATE = 0.3; // 30% off
// Valid through 31 Oct 2026; dies at midnight 1 Nov (CAT, +02:00).
const PROMO_EXPIRES = new Date("2026-11-01T00:00:00+02:00");
const PROMO_IS_LIVE = new Date() < PROMO_EXPIRES;

/** Format a number as "5,600". */
function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/* ─── Product data ───────────────────────────────────────────── */
// Deposit = 50% of setup fee (AutoReply AI, Storefront Kit)
// or full first month (Content Pack).
const PRODUCTS: Record<string, CheckoutProduct> = {
  "autoreply-ai": {
    name: "AutoReply AI",
    subtitle: "AI WhatsApp Assistant",
    depositLabel: "50% deposit to start",
    deposit: { ZMW: 5600, MWK: 349500 },
    balance: { ZMW: 5599, MWK: 349500 },
    balanceNote: "is due when your AI goes live (7 days).",
    features: [
      "AI trained on your exact business",
      "Replies in under 3 seconds, even at 2am",
      "Live in 7 days or full setup refund",
    ],
    delivery: "7 days",
    guarantee: "Live in 7 days or we refund your full setup fee.",
  },
  "storefront-kit": {
    name: "Digital Storefront Kit",
    subtitle: "Website + WhatsApp + Google",
    depositLabel: "50% deposit to start",
    deposit: { ZMW: 9750, MWK: 612500 },
    balance: { ZMW: 9749, MWK: 612499 },
    balanceNote: "is due on your launch day.",
    features: [
      "Mobile-fast website, up to 8 pages",
      "WhatsApp catalog + Google Business Profile",
      "1 month AutoReply AI included FREE",
    ],
    delivery: "10 days",
    guarantee: "Guaranteed live in 10 days, or we refund 25%.",
  },
  "content-pack": {
    name: "Content & Design Pack",
    subtitle: "Social posts + graphic design",
    depositLabel: "First month upfront",
    deposit: { ZMW: 3199, MWK: 199999 },
    balance: null,
    balanceNote: "Renews monthly. Cancel anytime with 7 days' notice.",
    features: [
      "12 branded WhatsApp Status posts/month",
      "4 Facebook posts + 2 posters/flyers",
      "Content calendar delivered every Monday",
    ],
    delivery: "Ongoing",
    guarantee: "Full money-back guarantee on your first month.",
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

  // Discount-code state
  const [codeInput, setCodeInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [codeError, setCodeError] = useState("");

  // Which manual payment method the visitor is viewing
  const [payMethod, setPayMethod] = useState<"momo" | "bank">("momo");

  // Automated "Pay now" form state — MWK only (PayChangu). ZMW stays manual.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  // On MWK, the manual flow is tucked behind an "Or pay manually" toggle.
  const [showManual, setShowManual] = useState(false);

  // Prefill from a previous visit (remember-me).
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("wiyule-customer") || "{}");
      if (typeof saved.name === "string") setName(saved.name);
      if (typeof saved.email === "string") setEmail(saved.email);
      if (typeof saved.phone === "string") setPhone(saved.phone);
    } catch {
      /* ignore */
    }
  }, []);

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

  /* ── Discount code handlers ── */
  function applyCode() {
    const entered = codeInput.trim().toUpperCase();
    if (entered !== PROMO_CODE) {
      setPromoApplied(false);
      setCodeError("That code isn't valid. Double-check and try again.");
      return;
    }
    if (!PROMO_IS_LIVE) {
      setPromoApplied(false);
      setCodeError("This code expired on 31 October. Message us for current offers.");
      return;
    }
    setPromoApplied(true);
    setCodeError("");
  }

  function removeCode() {
    setPromoApplied(false);
    setCodeInput("");
    setCodeError("");
  }

  // Start an automated payment: price is decided server-side; we just send the
  // slug, currency, customer details and (optional) promo code, then redirect.
  async function payNow() {
    setPayError("");
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setPayError("Please add your name, email and phone first.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setPayError("That email doesn't look right — please check it.");
      return;
    }
    // Remember for next time.
    try {
      localStorage.setItem(
        "wiyule-customer",
        JSON.stringify({ name, email, phone })
      );
    } catch {
      /* ignore */
    }
    setPaying(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          currency,
          name,
          email,
          phone,
          code: promoApplied ? PROMO_CODE : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.redirect_url) {
        throw new Error(
          data.error || "Couldn't start the payment. Please try again."
        );
      }
      window.location.href = data.redirect_url;
    } catch (err) {
      setPayError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
      setPaying(false);
    }
  }

  const momo = MOMO[currency];
  const bank = BANK[currency];
  const sym = currency === "ZMW" ? "ZMW " : "MWK ";

  // Apply the 30% discount to every amount when the code is active.
  const mult = promoApplied ? 1 - PROMO_RATE : 1;

  const rawDeposit = product.deposit[currency];
  const depositStr = fmt(rawDeposit * mult);
  const rawDepositStr = fmt(rawDeposit);
  const depositPlain = String(Math.round(rawDeposit * mult)); // plain digits for copy

  // Build the balance line. Products with a fixed balance get the
  // discounted number injected; subscriptions show their note as-is.
  const balanceText = product.balance
    ? `Balance of ${sym}${fmt(product.balance[currency] * mult)} ${product.balanceNote}`
    : product.balanceNote;

  const waText = encodeURIComponent(
    `Hi Wiyule, I just sent ${sym}${depositStr} (${product.depositLabel}${
      promoApplied ? ", code WIYULE30 applied − 30% off" : ""
    }) for ${product.name}. I'm attaching my payment screenshot now.`
  );
  const waUrl = `https://wa.me/260774668193?text=${waText}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">

      {/* Back link */}
      <Link
        href="/#offers"
        className="press mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-line-bright)] px-4 py-2 text-sm font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-fg)]"
      >
        <span aria-hidden>←</span> Back to services
      </Link>

      {/* Header — always first, so there's context before the payment card */}
      <p className="eyebrow mb-3">— Checkout</p>
      <h1 className="headline text-[clamp(2rem,4vw,3.5rem)]">{product.name}</h1>
      <p className="mt-1 text-sm text-[var(--color-fg-faint)]">{product.subtitle}</p>

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_400px] md:gap-12">

        {/* ── Summary (drops below the payment card on mobile) ── */}
        <div className="order-2 md:order-1">
          <ul className="flex flex-col gap-3">
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

          <p className="mt-6 flex gap-2 border-l-2 border-[var(--color-brand)] pl-4 text-xs text-[var(--color-fg-muted)]">
            <span className="text-[var(--color-brand)]">✓</span>
            {product.guarantee}
          </p>
        </div>

        {/* ── Payment (first on mobile) ── */}
        <div className="order-1 md:order-2 flex flex-col gap-6">

          {/* Amount + currency toggle */}
          <div className="border border-[var(--color-line-bright)] p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
              <div className="min-w-0">
                <p className="eyebrow mb-1 text-[var(--color-brand)]">— {product.depositLabel}</p>
                {promoApplied && (
                  <p className="text-sm text-[var(--color-fg-faint)] line-through">
                    {sym}{rawDepositStr}
                  </p>
                )}
                <AnimatedPrice
                  symbol={sym}
                  value={depositStr}
                  className="numeral block text-[clamp(1.75rem,8vw,2.25rem)] text-[var(--color-fg)]"
                />
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
              {balanceText}
            </p>

            {/* Discount code — only while the promo is live */}
            {PROMO_IS_LIVE && (
              <div className="mt-5 border-t border-[var(--color-line)] pt-5">
                {promoApplied ? (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-medium text-[var(--color-brand)]">
                      ✓ WIYULE30 applied, 30% off
                    </p>
                    <button
                      onClick={removeCode}
                      className="text-xs text-[var(--color-fg-faint)] underline underline-offset-2 transition hover:text-[var(--color-fg)]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="eyebrow mb-2 block text-[var(--color-fg-muted)]">
                      — Have a discount code?
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") applyCode();
                        }}
                        placeholder="WIYULE30"
                        aria-label="Discount code"
                        className="min-w-0 flex-1 border border-[var(--color-line-bright)] bg-transparent px-3 py-2 text-sm uppercase text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-brand)] focus:outline-none"
                      />
                      <button
                        onClick={applyCode}
                        className="shrink-0 border border-[var(--color-line-bright)] px-4 py-2 text-sm font-medium text-[var(--color-fg)] press transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                      >
                        Apply
                      </button>
                    </div>
                    {codeError && (
                      <p className="mt-2 text-xs text-[var(--color-brand)]">{codeError}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Pay now — MWK only (PayChangu). ZMW stays on manual. ── */}
          {currency === "MWK" && (
            <div className="border border-[var(--color-brand)] p-6">
              <p className="eyebrow mb-1 text-[var(--color-brand)]">— Pay now</p>
              <p className="mb-4 text-xs text-[var(--color-fg-muted)]">
                Card or mobile money. Confirmed instantly.
              </p>
              <div className="flex flex-col gap-2.5">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  aria-label="Your name"
                  className="w-full border border-[var(--color-line-bright)] bg-transparent px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-brand)] focus:outline-none"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  aria-label="Email address"
                  className="w-full border border-[var(--color-line-bright)] bg-transparent px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-brand)] focus:outline-none"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  aria-label="Phone number"
                  className="w-full border border-[var(--color-line-bright)] bg-transparent px-3 py-2.5 text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg-faint)] focus:border-[var(--color-brand)] focus:outline-none"
                />
              </div>
              {payError && (
                <p className="mt-3 text-xs text-[var(--color-brand)]">{payError}</p>
              )}
              <button
                type="button"
                onClick={payNow}
                disabled={paying}
                className="press mt-4 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-brand)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)] disabled:opacity-50"
              >
                {paying
                  ? "Taking you to secure checkout…"
                  : `Pay ${sym}${depositStr} now →`}
              </button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[var(--color-fg-faint)]">
                <span>✓ Confirmed instantly</span>
                <span>✓ Money-back guarantee</span>
              </div>
              <p className="mt-3 text-center text-[11px] text-[var(--color-fg-faint)]">
                🔒 Secured by PayChangu
              </p>
              <PaymentMarks />
            </div>
          )}

          {/* ── Manual payment ── */}
          {/* MWK: tucked behind a toggle (fallback). ZMW: the primary method, always open. */}
          <div className="border border-[var(--color-line)] p-6">
            {currency === "MWK" ? (
              <button
                type="button"
                onClick={() => setShowManual((v) => !v)}
                aria-expanded={showManual}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <span className="eyebrow">— Or pay manually</span>
                <span
                  className={`text-lg font-light transition-transform duration-200 ${
                    showManual
                      ? "rotate-45 text-[var(--color-brand)]"
                      : "text-[var(--color-fg-muted)]"
                  }`}
                >
                  +
                </span>
              </button>
            ) : (
              <p className="eyebrow mb-5">— How to pay</p>
            )}

            {(currency !== "MWK" || showManual) && (
              <div className={currency === "MWK" ? "mt-5" : undefined}>
                <ManualSteps
                  sym={sym}
                  depositStr={depositStr}
                  depositPlain={depositPlain}
                  momo={momo}
                  bank={bank}
                  payMethod={payMethod}
                  setPayMethod={setPayMethod}
                />

                {/* Trust strip — ZMW manual flow only (MWK has its own in the Pay-now card) */}
                {currency !== "MWK" && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[var(--color-fg-faint)]">
                    <span>✓ Confirmed within 1 hour</span>
                    <span>✓ Money-back guarantee</span>
                    <span>✓ Founder-run</span>
                  </div>
                )}

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press mt-5 inline-flex w-full items-center justify-center gap-2 bg-[var(--color-brand)] px-6 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)]"
                >
                  I&apos;ve paid, send confirmation →
                </a>
              </div>
            )}
          </div>

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

/* ─── PaymentMarks ───────────────────────────────────────────── */
// Accepted-payment badges under the "Pay now" button (PayChangu / MWK).
// The hex values below are the networks' OFFICIAL brand colours (Visa blue,
// Mastercard red/amber, Airtel red, Mpamba green) — hardcoded on purpose so
// the logos read as authentic. These are NOT Wiyule tokens and are the one
// sanctioned exception to the "no hardcoded hex" rule.
function PaymentMarks() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
      {/* Visa */}
      <span className="inline-flex h-6 items-center rounded-[3px] bg-white px-2 shadow-sm">
        <span className="text-[13px] font-extrabold italic leading-none tracking-tight text-[#1434CB]">
          VISA
        </span>
      </span>

      {/* Mastercard */}
      <span className="inline-flex h-6 items-center rounded-[3px] bg-white px-2 shadow-sm">
        <svg width="28" height="17" viewBox="0 0 30 18" aria-label="Mastercard" role="img">
          <circle cx="12" cy="9" r="8" fill="#EB001B" />
          <circle cx="18" cy="9" r="8" fill="#F79E1B" />
          <path d="M15 3.2a8 8 0 0 1 0 11.6 8 8 0 0 1 0-11.6Z" fill="#FF5F00" />
        </svg>
      </span>

      {/* Airtel Money */}
      <span className="inline-flex h-6 items-center rounded-[3px] bg-[#ED1C24] px-2 shadow-sm">
        <span className="text-[11px] font-bold lowercase leading-none text-white">
          airtel
        </span>
      </span>

      {/* TNM Mpamba */}
      <span className="inline-flex h-6 items-center rounded-[3px] bg-white px-2 shadow-sm">
        <span className="text-[11px] font-bold leading-none text-[#00A859]">
          Mpamba
        </span>
      </span>
    </div>
  );
}

/* ─── ManualSteps ────────────────────────────────────────────── */
// The "send money → screenshot → WhatsApp us" instructions. Shared by the
// ZMW primary flow and the MWK "Or pay manually" fallback.
function ManualSteps({
  sym,
  depositStr,
  depositPlain,
  momo,
  bank,
  payMethod,
  setPayMethod,
}: {
  sym: string;
  depositStr: string;
  depositPlain: string;
  momo: { provider: string; number: string; country: string };
  bank: BankDetails;
  payMethod: "momo" | "bank";
  setPayMethod: (m: "momo" | "bank") => void;
}) {
  return (
    <ol className="flex flex-col gap-5">
      {/* Step 1 */}
      <li className="flex gap-3 sm:gap-4">
        <span className="numeral flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-brand)] text-sm text-[var(--color-brand)]">
          1
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-medium text-[var(--color-fg)]">
              Send {sym}{depositStr}
            </p>
            <CopyButton value={depositPlain} srLabel="amount" />
          </div>

          {/* Method tabs */}
          <div className="mt-3 inline-flex rounded-lg border border-[var(--color-line-bright)] p-0.5 text-xs">
            {(
              [
                ["momo", momo.provider],
                ["bank", `${bank.name} transfer`],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPayMethod(key)}
                className={`rounded-md px-3 py-1.5 font-medium transition ${
                  payMethod === key
                    ? "bg-[var(--color-brand)] text-white"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile money panel */}
          {payMethod === "momo" && (
            <div className="mt-3 border border-[var(--color-line)] p-3">
              <p className="eyebrow mb-1 text-[var(--color-fg-muted)]">
                — {momo.provider}
              </p>
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-base text-[var(--color-fg)]">
                  {momo.number}
                </p>
                <CopyButton
                  value={momo.number.replace(/\s/g, "")}
                  srLabel="mobile money number"
                />
              </div>
            </div>
          )}

          {/* Bank transfer panel */}
          {payMethod === "bank" && (
            <div className="mt-3 border border-[var(--color-line)] p-3">
              <p className="eyebrow mb-2 text-[var(--color-fg-muted)]">
                — {bank.name} (bank transfer)
              </p>
              <dl className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="shrink-0 text-[var(--color-fg-faint)]">Account name</dt>
                  <dd className="min-w-0 text-right text-[var(--color-fg)]">{bank.account}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="shrink-0 text-[var(--color-fg-faint)]">Account no.</dt>
                  <dd className="flex min-w-0 items-center gap-2">
                    <span className="font-mono text-[var(--color-fg)]">{bank.number}</span>
                    <CopyButton value={bank.number} srLabel="account number" />
                  </dd>
                </div>
                {bank.branch && (
                  <div className="flex justify-between gap-3">
                    <dt className="shrink-0 text-[var(--color-fg-faint)]">Branch</dt>
                    <dd className="min-w-0 text-right text-[var(--color-fg)]">{bank.branch}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          <p className="mt-2 text-xs text-[var(--color-fg-faint)]">
            Use your name as the payment reference
          </p>
        </div>
      </li>

      {/* Step 2 */}
      <li className="flex gap-3 sm:gap-4">
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
      <li className="flex gap-3 sm:gap-4">
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
  );
}

/* ─── CopyButton ─────────────────────────────────────────────── */
function CopyButton({ value, srLabel }: { value: string; srLabel: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard
          ?.writeText(value)
          .then(() => {
            setDone(true);
            setTimeout(() => setDone(false), 1500);
          })
          .catch(() => {});
      }}
      aria-label={`Copy ${srLabel}`}
      className="press inline-flex shrink-0 items-center gap-1 rounded-md border border-[var(--color-line-bright)] px-2.5 py-1 text-xs font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
    >
      {done ? "✓ Copied" : "Copy"}
    </button>
  );
}
