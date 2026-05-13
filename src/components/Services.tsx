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
      },
      {
        title: "Status Designer Pack",
        price: "$60",
        priceSub: "or $40/mo",
        delivery: "48 hours",
        outcome: "20 branded WhatsApp Status templates that stop the scroll.",
        bullets: ["Promo & hours templates", "Daily specials format", "Fully editable in Canva"],
      },
      {
        title: "Wiyu Mini",
        price: "$80",
        priceSub: "+ $25/mo",
        delivery: "24 hours",
        outcome: "AI auto-reply on WhatsApp — 24/7. Even at 2am.",
        bullets: ["Answers FAQs instantly", "Captures lead details", "Sends qualified leads to you"],
        highlighted: true,
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
      },
      {
        title: "Digital Storefront Kit",
        price: "from $350",
        priceSub: "one-time",
        delivery: "7–10 days",
        outcome: "A real website built to convert. Mobile-fast, clean, conversion-built.",
        bullets: ["Up to 30 listings", "WhatsApp catalog", "Google Business Profile"],
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
      },
      {
        title: "Operations OS Lite",
        price: "from $500",
        priceSub: "+ $50/mo",
        delivery: "3–4 weeks",
        outcome: "Full business backend. Dashboard, jobs, customers, automation.",
        bullets: ["Customer & job DB", "Owner dashboard", "WhatsApp reminders"],
      },
      {
        title: "Wiyule Care",
        price: "$50/mo",
        priceSub: "ongoing",
        delivery: "Always-on",
        outcome: "Your tech team on call. Updates, fixes, monthly reports.",
        bullets: ["Priority WhatsApp line", "Monthly performance report", "Free minor updates"],
      },
    ],
  },
];

export default function Services() {
  return (
    <section id="offers" className="relative border-b border-[var(--color-line)]">
      <div className="absolute inset-0 glow-soft" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">— Eight products</p>
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
                  tier.products.length === 3
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
        <span>Choose this</span>
        <span aria-hidden>→</span>
      </Link>

      <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-xs">
        <span className="text-[var(--color-fg-muted)]">Delivery</span>
        <span className="font-medium text-[var(--color-fg)]">
          {product.delivery}
        </span>
      </div>
    </div>
  );
}