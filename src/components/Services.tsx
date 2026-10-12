"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Link from "next/link";
import AnimatedPrice from "@/src/components/AnimatedPrice";

/* ─── Constants ─────────────────────────────────────────────── */
const WHATSAPP_NUMBER = "260774668193";
const CURRENCIES: Currency[] = ["MWK", "ZMW", "USD"];

function waUrl(label: string) {
  const text = encodeURIComponent(
    `Hi Wiyule, I want to learn more about ${label}. Can we set up a quick call?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

/* ─── Types ─────────────────────────────────────────────────── */
type Currency = "MWK" | "ZMW" | "USD";
type PriceData = Record<Currency, string>;

type Addon = {
  label: string;
  price: PriceData;
};

type Product = {
  index: number;
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  highlighted?: boolean;
  priceType: "setup+monthly" | "onetime" | "monthly";
  setup?: PriceData;
  monthly?: PriceData;
  oneTime?: PriceData;
  plan3?: PriceData;
  quarterly?: PriceData;
  quarterlySave?: PriceData;
  delivery: string;
  features: string[];
  roi: PriceData;
  bestFor: string;
  guarantee: string;
  addons: Addon[];
  cta: string;
};

type ComparisonRow = {
  label: string;
  ai: boolean | string;
  storefront: boolean | string;
  content: boolean | string;
};

/* ─── Data ──────────────────────────────────────────────────── */
const CURRENCY_SYMBOLS: Record<Currency, string> = {
  MWK: "MWK ",
  ZMW: "ZMW ",
  USD: "$",
};

const PRODUCTS: Product[] = [
  {
    index: 2,
    slug: "autoreply-ai",
    title: "AutoReply AI",
    subtitle: "AI WhatsApp Assistant",
    tagline: "Your business never sleeps. AI replies on WhatsApp, 24/7.",
    priceType: "setup+monthly",
    setup: { MWK: "699,000", ZMW: "11,199", USD: "400" },
    monthly: { MWK: "124,999", ZMW: "1,999", USD: "70" },
    plan3: { MWK: "249,999", ZMW: "3,999", USD: "139" },
    delivery: "7 days",
    features: [
      "AI trained on your exact business",
      "Replies in under 3 seconds, even at 2am",
      "Books appointments automatically",
      "Captures lead details while you sleep",
      "English + Chichewa / Bemba support",
    ],
    roi: {
      MWK: "Catch 2 missed leads/month = MWK 50,000–100,000 extra. Monthly fee covered in month 1.",
      ZMW: "Catch 2 missed leads/month = ZMW 800–1,600 extra. Monthly fee covered in month 1.",
      USD: "Catch 2 missed leads/month = $30–$56 extra. Monthly fee covered in month 1.",
    },
    bestFor: "Salons, clinics, driving schools, lodges",
    guarantee: "Live in 7 days or we refund your full setup fee. No forms, no arguments.",
    addons: [
      {
        label: "CRM sync (Google Sheets / Notion)",
        price: { MWK: "124,999", ZMW: "1,999", USD: "70" },
      },
      {
        label: "Monthly AI tune-up & report",
        price: { MWK: "62,499", ZMW: "999", USD: "36" },
      },
    ],
    cta: "Start replying 24/7",
  },
  {
    index: 1,
    slug: "storefront-kit",
    title: "Digital Storefront Kit",
    subtitle: "Website + WhatsApp + Google",
    tagline: "A website that works while you work. Built for Zambian & Malawian businesses.",
    highlighted: true,
    priceType: "onetime",
    oneTime: { MWK: "1,224,999", ZMW: "19,499", USD: "700" },
    plan3: { MWK: "429,999", ZMW: "6,999", USD: "239" },
    delivery: "10 days",
    features: [
      "Mobile-fast website, up to 8 pages",
      "WhatsApp catalog (up to 30 products)",
      "Google Business Profile set up & verified",
      "1 month AutoReply AI included FREE",
      "Shows up on Google searches in your area",
    ],
    roi: {
      MWK: "3–5 new enquiries/month from Google + WhatsApp. At MWK 30,000 avg = MWK 90,000–150,000 extra monthly.",
      ZMW: "3–5 new enquiries/month. At ZMW 480 avg = ZMW 1,440–2,400 extra monthly.",
      USD: "3–5 new enquiries/month. At $17 avg = $51–$85 extra monthly.",
    },
    bestFor: "Retail shops, car dealers, lodges, schools, restaurants",
    guarantee: "Not live in 10 days? We refund 25% of what you paid. No questions, no delays.",
    addons: [
      {
        label: "Online ordering / e-commerce",
        price: { MWK: "312,499", ZMW: "4,999", USD: "178" },
      },
      {
        label: "Extra pages (per 5 pages)",
        price: { MWK: "156,249", ZMW: "2,499", USD: "89" },
      },
    ],
    cta: "Build my storefront",
  },
  {
    index: 3,
    slug: "content-pack",
    title: "Content & Design Pack",
    subtitle: "Social posts + graphic design",
    tagline: "Posters, flyers and posts. All your business design, done monthly.",
    priceType: "monthly",
    monthly: { MWK: "199,999", ZMW: "3,199", USD: "115" },
    quarterly: { MWK: "569,999", ZMW: "8,999", USD: "329" },
    quarterlySave: { MWK: "29,998", ZMW: "598", USD: "16" },
    delivery: "Monthly",
    features: [
      "12 branded WhatsApp Status posts/month",
      "4 Facebook posts/month",
      "2 custom posters or flyers/month",
      "Content calendar delivered every Monday",
      "Zero effort on your end",
    ],
    roi: {
      MWK: "1 new customer/month from consistent posting = MWK 15,000–50,000 extra. Pack pays for itself.",
      ZMW: "1 new customer/month from consistent posting = ZMW 240–800 extra. Pack pays for itself.",
      USD: "1 new customer/month from consistent posting = $8–$29 extra. Pack pays for itself.",
    },
    bestFor: "Restaurants, salons, retail and events needing posters, flyers and posts",
    guarantee: "Not happy with month 1? We redo it free or refund in full. Simple.",
    addons: [
      {
        label: "2 Instagram/Facebook reels/month",
        price: { MWK: "93,749", ZMW: "1,499", USD: "54" },
      },
      {
        label: "Photography session (Lusaka or Blantyre)",
        price: { MWK: "187,499", ZMW: "2,999", USD: "107" },
      },
    ],
    cta: "Start my content",
  },
];

const COMPARISON: ComparisonRow[] = [
  { label: "AI WhatsApp replies",        ai: true,      storefront: "1 mo free", content: false },
  { label: "Website (up to 8 pages)",    ai: false,     storefront: true,        content: false },
  { label: "WhatsApp catalog",           ai: false,     storefront: true,        content: false },
  { label: "Google Business Profile",    ai: false,     storefront: true,        content: false },
  { label: "Social media posts",         ai: false,     storefront: false,       content: true  },
  { label: "WhatsApp Status graphics",   ai: false,     storefront: false,       content: true  },
  { label: "Poster & flyer design",      ai: false,     storefront: false,       content: true  },
  { label: "One-time setup fee",         ai: true,      storefront: true,        content: false },
  { label: "Monthly subscription",       ai: true,      storefront: false,       content: true  },
  { label: "3-month payment plan",       ai: true,      storefront: true,        content: true  },
  { label: "Delivery",                   ai: "7 days",  storefront: "10 days",   content: "Monthly" },
];

// Column map for the mobile stacked view (one card per product).
const COMPARISON_COLS: Array<{
  title: string;
  key: "ai" | "storefront" | "content";
}> = [
  { title: "Storefront Kit", key: "storefront" },
  { title: "AutoReply AI", key: "ai" },
  { title: "Content Pack", key: "content" },
];

const TRUST_BADGES = [
  "7-day delivery guarantee",
  "Pay in 3 installments",
  "No hidden fees",
  "African-built & priced",
];

/* ─── Section ───────────────────────────────────────────────── */
export default function Services() {
  const [currency, setCurrency] = useState<Currency>("MWK");
  const [openInclude, setOpenInclude] = useState<number | null>(null);

  // Remember the visitor's currency choice, and on first visit default to
  // their country via timezone (Zambia → ZMW, Malawi → MWK).
  useEffect(() => {
    const saved = localStorage.getItem("wiyule-currency");
    if (saved === "MWK" || saved === "ZMW" || saved === "USD") {
      setCurrency(saved);
      return;
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz === "Africa/Lusaka") setCurrency("ZMW");
      else if (tz === "Africa/Blantyre") setCurrency("MWK");
    } catch {
      /* Intl unavailable — keep the default */
    }
  }, []);

  const changeCurrency = (c: Currency) => {
    setCurrency(c);
    try {
      localStorage.setItem("wiyule-currency", c);
    } catch {
      /* storage blocked — not critical */
    }
  };
  const currencyIdx = CURRENCIES.indexOf(currency);

  return (
    <section id="offers" className="relative border-b border-[var(--color-line)]">
      <div className="absolute inset-0 glow-soft" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-32">

        {/* Header */}
        <div data-animate="fade-up" className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">— Three products</p>
            <h2
              data-animate="mask"
              className="headline text-[clamp(2.5rem,5.5vw,5rem)]"
            >
              Real prices.<br className="hidden md:block" />
              Real <span className="text-[var(--color-brand)]">products</span>.
            </h2>
          </div>
          <p className="max-w-md text-base text-[var(--color-fg-muted)]">
            No mystery quotes. No retainers you don&rsquo;t need. Pick the one
            that fits, and we ship.
          </p>
        </div>

        {/* Trust badges + Currency toggle */}
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {TRUST_BADGES.map((b) => (
              <span
                key={b}
                className="border border-[var(--color-line)] px-3 py-1.5 text-xs text-[var(--color-fg-muted)]"
              >
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-col items-start gap-1.5 sm:items-end">
            <p className="text-xs text-[var(--color-fg-faint)]">Show prices in:</p>
            <div className="relative inline-flex overflow-hidden rounded-full border border-[var(--color-line-bright)]">
              {/* Sliding pill */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 bg-[var(--color-brand)]"
                style={{
                  width: "33.333%",
                  transform: `translateX(${currencyIdx * 100}%)`,
                  transition: "transform 220ms ease-in-out",
                }}
              />
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => changeCurrency(c)}
                  className={`relative z-10 flex-1 px-6 py-2.5 text-sm font-medium transition-colors duration-200 ${
                    currency === c
                      ? "text-white"
                      : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 gap-px bg-[var(--color-line)] md:grid-cols-3">
          {[...PRODUCTS].sort((a, b) => a.index - b.index).map((p, i) => (
            <ProductCard
              key={p.title}
              product={p}
              currency={currency}
              animDelay={i * 150}
            />
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-20">
          <h3 className="headline mb-8 text-2xl">What&apos;s included</h3>

          {/* Accordion: one dropdown per product. Tapping a product reveals
              its included items with a smooth height + staggered list animation. */}
          <div className="border-t border-[var(--color-line)]">
            {COMPARISON_COLS.map(({ title, key }, i) => {
              const items = COMPARISON.filter((r) => r[key] !== false);
              const isOpen = openInclude === i;
              return (
                <div key={key} className="border-b border-[var(--color-line)]">
                  <button
                    type="button"
                    onClick={() => setOpenInclude(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:opacity-80"
                  >
                    <span className="headline text-lg md:text-xl">{title}</span>
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center border text-lg font-light transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-[var(--color-brand)] text-[var(--color-brand)]"
                          : "border-[var(--color-line-bright)] text-[var(--color-fg-muted)]"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="flex flex-col gap-3 pb-6 text-sm">
                          {items.map((r, j) => (
                            <m.li
                              key={r.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + j * 0.05, duration: 0.3 }}
                              className="flex items-center justify-between gap-3"
                            >
                              <span className="flex items-center gap-3 text-[var(--color-fg-muted)]">
                                <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
                                {r.label}
                              </span>
                              <span className="shrink-0 font-medium text-[var(--color-fg)]">
                                {r[key] === true ? (
                                  <span className="text-[var(--color-brand)]">✓</span>
                                ) : (
                                  r[key]
                                )}
                              </span>
                            </m.li>
                          ))}
                        </ul>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--color-fg-muted)]">
            Custom project? Different problem?{" "}
            <Link
              href={waUrl("a custom project")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-brand)] transition hover:text-[var(--color-brand-hot)]"
            >
              Tell us what you need →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── ProductCard ───────────────────────────────────────────── */
function ProductCard({
  product,
  currency,
  animDelay = 0,
}: {
  product: Product;
  currency: Currency;
  animDelay?: number;
}) {
  const sym = CURRENCY_SYMBOLS[currency];
  // USD can't be collected online — checkout defaults to ZMW for USD viewers
  const checkoutCurrency = currency === "MWK" ? "MWK" : "ZMW";
  const checkoutHref = `/checkout?product=${product.slug}&currency=${checkoutCurrency}`;

  return (
    <m.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.6,
        ease: [0.2, 0.8, 0.2, 1],
        delay: animDelay / 1000,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 350, damping: 22 },
      }}
      whileTap={{ scale: 0.985 }}
      {...(product.highlighted ? { "data-featured": "" } : {})}
      className={`relative flex flex-col p-7 md:p-8 ${
        product.highlighted
          ? "bg-[var(--color-bg-elev)]"
          : "bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-elev)]"
      }`}
    >
      {product.highlighted && (
        <div className="absolute right-7 top-7 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-brand)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
          Most popular
        </div>
      )}

      <div className="mb-6">
        <span className="font-mono text-xs text-[var(--color-fg-faint)]">
          0{product.index}
        </span>
      </div>

      <h4 className="headline text-2xl">{product.title}</h4>
      <p className="mt-1 text-xs text-[var(--color-fg-faint)]">{product.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {product.tagline}
      </p>

      {/* Price */}
      <div className="mt-6 mb-1">
        {product.priceType === "setup+monthly" &&
          product.setup &&
          product.monthly && (
            <>
              <div className="flex items-baseline gap-2">
                <AnimatedPrice
                  symbol={sym}
                  value={product.setup[currency]}
                  className="numeral text-3xl text-[var(--color-fg)]"
                />
                <span className="text-sm text-[var(--color-fg-muted)]">setup</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <AnimatedPrice
                  symbol={`+ ${sym}`}
                  value={product.monthly[currency]}
                  className="numeral text-xl text-[var(--color-fg)]"
                />
                <span className="text-sm text-[var(--color-fg-muted)]">/mo</span>
              </div>
            </>
          )}

        {product.priceType === "onetime" && product.oneTime && (
          <div className="flex items-baseline gap-2">
            <AnimatedPrice
              symbol={sym}
              value={product.oneTime[currency]}
              className="numeral text-3xl text-[var(--color-fg)]"
            />
            <span className="text-sm text-[var(--color-fg-muted)]">one-time</span>
          </div>
        )}

        {product.priceType === "monthly" && product.monthly && (
          <div className="flex items-baseline gap-2">
            <AnimatedPrice
              symbol={sym}
              value={product.monthly[currency]}
              className="numeral text-3xl text-[var(--color-fg)]"
            />
            <span className="text-sm text-[var(--color-fg-muted)]">/mo</span>
          </div>
        )}
      </div>

      {/* Payment plan note */}
      {(product.priceType === "setup+monthly" || product.priceType === "onetime") &&
        product.plan3 && (
          <p className="mb-4 text-xs text-[var(--color-fg-faint)]">
            or {sym}{product.plan3[currency]}/mo for 3 months
          </p>
        )}
      {product.priceType === "monthly" &&
        product.quarterly &&
        product.quarterlySave && (
          <p className="mb-4 text-xs text-[var(--color-fg-faint)]">
            or {sym}{product.quarterly[currency]} quarterly, save {sym}
            {product.quarterlySave[currency]}
          </p>
        )}

      {/* ROI */}
      <p className="mb-5 text-xs italic text-[var(--color-brand)]">
        {product.roi[currency]}
      </p>

      {/* Features */}
      <ul className="mb-6 flex flex-1 flex-col gap-2.5 text-sm">
        {product.features.map((f) => (
          <li key={f} className="flex gap-3 text-[var(--color-fg)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
            {f}
          </li>
        ))}
      </ul>

      {/* Guarantee */}
      <p className="mb-5 border-l-2 border-[var(--color-line-bright)] pl-3 text-xs leading-relaxed text-[var(--color-fg-faint)]">
        {product.guarantee}
      </p>

      {/* Best for */}
      <p className="mb-6 text-xs text-[var(--color-fg-faint)]">
        Best for: {product.bestFor}
      </p>

      {/* CTA */}
      <Link
        href={checkoutHref}
        className={`inline-flex w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 text-center text-sm font-medium press transition ${
          product.highlighted
            ? "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hot)] active:bg-[var(--color-brand-hot)]"
            : "beam border border-[var(--color-line-bright)] text-[var(--color-fg)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] active:border-[var(--color-brand)] active:text-[var(--color-brand)]"
        }`}
      >
        <span>{product.cta}</span>
        <span aria-hidden>→</span>
      </Link>

      {/* Delivery */}
      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-xs">
        <span className="text-[var(--color-fg-muted)]">Delivery</span>
        <span className="font-medium text-[var(--color-fg)]">{product.delivery}</span>
      </div>

      {/* Add-ons */}
      <div className="mt-4 border-t border-[var(--color-line)] pt-4">
        <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-[var(--color-fg-faint)]">
          Optional add-ons
        </p>
        <ul className="flex flex-col gap-1.5">
          {product.addons.map((a) => (
            <li
              key={a.label}
              className="flex items-start justify-between gap-3 text-xs"
            >
              <span className="text-[var(--color-fg-muted)]">{a.label}</span>
              <span className="shrink-0 font-medium text-[var(--color-fg)]">
                +{sym}{a.price[currency]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}
