"use client";

import Link from "next/link";

const WHATSAPP_NUMBER = "260774668193";

function offerWaUrl(name: string) {
  const text = encodeURIComponent(
    `Hi Wiyule — I'm interested in the ${name} offer. Can we set up a 15-min discovery call?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

type Product = {
  title: string;
  price: string;
  priceSub?: string;
  delivery: string;
  outcome: string;
  bullets: string[];
  cta: string;
  bestFor: string;
  paymentNote?: string;
  roi?: string;
  highlighted?: boolean;
};

type Tier = {
  label: string;
  sublabel: string;
  products: Product[];
};

const tiers: Tier[] = [
  {
    label: "Quick wins",
    sublabel: "Start fast. Test the water.",
    products: [
      {
        title: "WhatsApp Audit",
        price: "FREE",
        priceSub: "limited slots",
        delivery: "24 hours",
        outcome: "A 3-minute video showing exactly what to fix in your WhatsApp setup.",
        bullets: ["Live screen walkthrough", "What's broken & why", "What we'd fix first"],
        cta: "Claim my free audit",
        bestFor: "Any business on WhatsApp",
      },
      {
        title: "WhatsApp Catalog Setup",
        price: "$60",
        priceSub: "one-time",
        delivery: "48 hours",
        outcome: "Your products listed inside WhatsApp — customers browse and order without leaving the chat.",
        bullets: ["Up to 30 products with photos", "Prices & descriptions written", "Shareable catalog link"],
        cta: "List my products",
        bestFor: "Retail shops, restaurants, parts dealers",
        paymentNote: "50% to start · 50% on delivery",
      },
      {
        title: "Status Designer Pack",
        price: "$60",
        priceSub: "or $40/mo",
        delivery: "48 hours",
        outcome: "20 branded WhatsApp Status templates that stop the scroll.",
        bullets: ["Promo & hours templates", "Daily specials format", "Fully editable in Canva"],
        cta: "Get my templates",
        bestFor: "Restaurants, retail, salons",
        paymentNote: "50% to start · 50% on delivery",
      },
      {
        title: "Wiyu Mini",
        price: "$80",
        priceSub: "+ $25/mo",
        delivery: "24 hours",
        outcome: "AI auto-reply on WhatsApp — 24/7. Even at 2am.",
        bullets: ["Answers FAQs instantly", "Captures lead details", "Sends qualified leads to you"],
        cta: "Start replying 24/7",
        bestFor: "Any business missing after-hours leads",
        paymentNote: "50% to start · 50% on launch",
        highlighted: true,
      },
      {
        title: "Booking Link Setup",
        price: "$80",
        priceSub: "+ $15/mo",
        delivery: "24 hours",
        outcome: "A branded appointment booking page linked straight from your WhatsApp.",
        bullets: ["Custom booking page", "Auto-confirmation message", "No more back-and-forth scheduling"],
        cta: "Set up my bookings",
        bestFor: "Salons, clinics, driving schools, lodges",
        paymentNote: "50% to start · 50% on launch",
      },
    ],
  },
  {
    label: "Growth products",
    sublabel: "When the basics aren&rsquo;t enough.",
    products: [
      {
        title: "GMB Boost",
        price: "$80",
        priceSub: "+ $30/mo",
        delivery: "3 days",
        outcome: "Get found on Google Maps. Fix your listing, photos, and reviews.",
        bullets: ["Full profile build", "Photos & description", "First 5 reviews managed"],
        cta: "Boost my listing",
        bestFor: "Shops, workshops, schools, lodges",
        paymentNote: "50% to start · 50% on launch",
      },
      {
        title: "Digital Storefront Kit",
        price: "from $350",
        priceSub: "one-time",
        delivery: "7–10 days",
        outcome: "A real website built to convert. Mobile-fast, clean, conversion-built.",
        bullets: ["Up to 30 listings", "WhatsApp catalog", "Google Business Profile"],
        cta: "Build my site",
        bestFor: "Retail, car dealers, lodges, schools",
        paymentNote: "50% to start · 50% on launch",
      },
      {
        title: "Monthly Content Pack",
        price: "$80",
        priceSub: "/mo",
        delivery: "Monthly",
        outcome: "Done-for-you content — we post so you don&apos;t have to think about it.",
        bullets: ["12 WhatsApp Status posts/mo", "4 Facebook posts/mo", "Promos, specials & announcements"],
        cta: "Start my content",
        bestFor: "Restaurants, salons, retail, any busy owner",
      },
    ],
  },
  {
    label: "Full systems",
    sublabel: "For when you&rsquo;re ready to scale.",
    products: [
      {
        title: "AutoReply AI",
        price: "$250",
        priceSub: "+ $40/mo",
        delivery: "5–7 days",
        outcome: "Full AI WhatsApp: replies, books, takes payments, routes leads.",
        bullets: ["Trained on your business", "EN + Chichewa support", "Live in a week"],
        cta: "Get my AI assistant",
        bestFor: "Salons, clinics, driving schools, logistics",
        paymentNote: "50% to start · 50% on launch",
        roi: "Close 2 extra leads/month from WhatsApp — this pays for itself.",
      },
      {
        title: "Operations OS Lite",
        price: "from $500",
        priceSub: "+ $50/mo",
        delivery: "3–4 weeks",
        outcome: "Full business backend. Dashboard, jobs, customers, automation.",
        bullets: ["Customer & job DB", "Owner dashboard", "WhatsApp reminders"],
        cta: "Build my system",
        bestFor: "Workshops, logistics, multi-staff businesses",
        paymentNote: "50% to start · 50% on launch",
        roi: "One recovered job or client pays this back. Most businesses see it in month one.",
      },
      {
        title: "Wiyule Care",
        price: "$50/mo",
        priceSub: "ongoing",
        delivery: "Always-on",
        outcome: "Your tech team on call. Updates, fixes, monthly reports.",
        bullets: ["Priority WhatsApp line", "Monthly performance report", "Free minor updates"],
        cta: "Get ongoing support",
        bestFor: "Any business that already has a Wiyule product",
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="offers" className="relative border-b border-[var(--color-line)]">
      <div className="absolute inset-0 glow-soft" />
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-32">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">— Eleven products</p>
            <h2 className="headline text-[clamp(2.5rem,5.5vw,5rem)]">
              Real prices. <br className="hidden md:block" />
              Real <span className="text-[var(--color-brand)]">products</span>.
            </h2>
          </div>
          <p className="max-w-md text-base text-[var(--color-fg-muted)]">
            No mystery quotes. No retainers you don&rsquo;t need. Pick the size
            that fits — we ship.
          </p>
        </div>

        {/* Tiers */}
        <div className="space-y-16">
          {tiers.map((tier, ti) => (
            <div key={tier.label}>
              {/* Bundle callout — shown after Quick Wins (index 0) */}
              {ti === 1 && (
                <div className="mb-16 flex flex-col items-start justify-between gap-4 border border-[var(--color-line-bright)] p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="eyebrow mb-1 text-[var(--color-brand)]">— Popular together</p>
                    <p className="text-base font-medium text-[var(--color-fg)]">
                      Wiyu Mini + WhatsApp Catalog Setup
                      <span className="ml-3 numeral text-xl text-[var(--color-fg)]">$120</span>
                      <span className="ml-2 text-sm text-[var(--color-fg-muted)] line-through">$140</span>
                      <span className="ml-2 text-sm font-medium text-[var(--color-brand)]">save $20</span>
                    </p>
                    <p className="mt-1 text-sm text-[var(--color-fg-muted)]">
                      AI replies + a full product catalog — your WhatsApp does the selling.
                    </p>
                  </div>
                  <Link
                    href={offerWaUrl("the Wiyu Mini + Catalog bundle")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 border border-[var(--color-brand)] px-5 py-3 text-sm font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-white"
                  >
                    Get the bundle →
                  </Link>
                </div>
              )}
              {/* Tier divider */}
              <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4">
                <h3 className="numeral text-xl text-[var(--color-fg)] md:text-2xl">
                  {tier.label}
                </h3>
                <p
                  className="hidden text-sm italic text-[var(--color-fg-faint)] md:block"
                  dangerouslySetInnerHTML={{ __html: tier.sublabel }}
                />
              </div>

              {/* Cards grid */}
              <div
                className={`grid gap-px bg-[var(--color-line)] ${
                  tier.products.length >= 4
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : tier.products.length === 3
                    ? "md:grid-cols-3"
                    : "md:grid-cols-2"
                }`}
              >
                {tier.products.map((p, i) => (
                  <ProductCard
                    key={p.title}
                    product={p}
                    index={ti * 3 + i + 1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-[var(--color-fg-muted)]">
            Custom project? Different problem?{" "}
            <Link
              href={offerWaUrl("a custom project")}
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

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <div
      className={`relative flex flex-col p-7 transition md:p-8 ${
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
          0{index}
        </span>
      </div>

      <h4 className="headline text-2xl">{product.title}</h4>
      <p className="mt-1.5 text-xs text-[var(--color-fg-faint)]">
        Best for: {product.bestFor}
      </p>

      <div className="mt-5 mb-6">
        <span className="numeral text-4xl text-[var(--color-fg)]">
          {product.price}
        </span>
        {product.priceSub && (
          <span className="ml-2 numeral text-base text-[var(--color-fg-muted)]">
            {product.priceSub}
          </span>
        )}
      </div>

      {product.roi && (
        <p className="mb-3 text-xs italic text-[var(--color-brand)]">
          {product.roi}
        </p>
      )}

      <p className="mb-5 text-sm leading-relaxed text-[var(--color-fg-muted)]">
        {product.outcome}
      </p>

      <ul className="mb-7 flex flex-1 flex-col gap-2.5 text-sm">
        {product.bullets.map((b) => (
          <li key={b} className="flex gap-3 text-[var(--color-fg)]">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
            {b}
          </li>
        ))}
      </ul>

      <Link
        href={offerWaUrl(product.title)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 text-center text-sm font-medium transition ${
          product.highlighted
            ? "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hot)]"
            : "border border-[var(--color-line-bright)] text-[var(--color-fg)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
        }`}
      >
        <span>{product.cta}</span>
        <span aria-hidden>→</span>
      </Link>

      {product.paymentNote && (
        <p className="mt-2.5 text-center text-[11px] text-[var(--color-fg-faint)]">
          {product.paymentNote}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-xs">
        <span className="text-[var(--color-fg-muted)]">Delivery</span>
        <span className="font-medium text-[var(--color-fg)]">
          {product.delivery}
        </span>
      </div>
    </div>
  );
}