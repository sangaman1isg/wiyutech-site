import Image from "next/image";
import Link from "next/link";
import FAQ from "@/src/components/FAQ";

const WHATSAPP_NUMBER = "260774668193";
const EMAIL = "wiyuletechnology@gmail.com";
const INSTAGRAM = "https://instagram.com/wiyutechafrica";
const WA_MESSAGE = encodeURIComponent(
  "Hi Wiyule Technology — I'd like a free 15-min discovery call about a website / WhatsApp AI for my business."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;
function offerWaUrl(offerName: string) {
  const text = encodeURIComponent(
    `Hi Wiyule Technology — I'm interested in the ${offerName} offer. Can we set up a 15-min discovery call to discuss it?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

const offers = [
  {
    title: "Digital Storefront Kit",
    forWho: "For dealers, retailers, hire companies & service providers",
    example: "Best for: car dealers, restaurants, equipment hire, retail shops",
    price: "From $350",
    bullets: [
      "Premium business website",
      "Up to 30 listings (cars, menu items, products, services)",
      "WhatsApp catalog integration",
      "Google Business Profile setup",
      "1 month support after launch",
    ],
    delivery: "7–10 days",
    cta: offerWaUrl("Digital Storefront Kit"),
  },
  {
    title: "Operations OS Lite",
    forWho: "For businesses managing customers, jobs, or inventory",
    example: "Best for: workshops, salons, schools, parts shops",
    price: "From $500",
    bullets: [
      "Customer & job database",
      "Digital service / job cards",
      "WhatsApp reminders & follow-ups",
      "Inventory or attendance tracking",
      "Owner dashboard with insights",
    ],
    delivery: "3–4 weeks",
    cta: offerWaUrl("Operations OS Lite"),
  },
  {
    title: "AutoReply AI",
    forWho: "For any business losing leads on WhatsApp",
    example: "Best for: anyone with more inquiries than time to reply",
    price: "$250 setup · $40/mo",
    bullets: [
      "AI assistant trained on your business",
      "Replies to inquiries 24/7",
      "Books appointments automatically",
      "Sends qualified leads to you",
      "Zambia & Malawi number support",
    ],
    delivery: "5–7 days",
    highlighted: true,
    cta: offerWaUrl("AutoReply AI"),
  },
];

const processSteps = [
  { t: "Discovery", d: "A 15-minute conversation. We learn your business, your customers, and what's actually broken." },
  { t: "Build",     d: "We build fast and you see the work mid-way to shape it. No 6-month deathmarches." },
  { t: "Launch",    d: "We deploy, train your team, and route your first inquiries the day we go live." },
  { t: "Support",   d: "30 days of free support after launch. Optional monthly retainers from $40." },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      {/* ─── NAV ─── */}
      <header className="relative z-30 border-b border-[var(--color-line)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 overflow-hidden">
              <Image
                src="/wiyule-mark.jpg"
                alt="Wiyule Technology"
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm font-semibold tracking-wide">
              Wiyule <span className="text-[var(--color-fg-muted)]">Technology</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm text-[var(--color-fg-muted)] md:flex">
            <Link href="#problem" className="transition hover:text-[var(--color-fg)]">The problem</Link>
            <Link href="#offers" className="transition hover:text-[var(--color-fg)]">Offers</Link>
            <Link href="#process" className="transition hover:text-[var(--color-fg)]">Process</Link>
            <Link href="#faq" className="transition hover:text-[var(--color-fg)]">FAQ</Link>
            <Link href="#founder" className="transition hover:text-[var(--color-fg)]">Origin</Link>
          </nav>

          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)] md:inline-flex"
          >
            Book a call →
          </Link>
        </div>
      </header>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft glow-drift" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-32 lg:py-40">
          <div className="flex items-center gap-3 fade-up">
            <span className="flex items-center gap-2 text-xs text-[var(--color-fg-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
              Now serving Malawi &amp; Zambia
            </span>
          </div>

          <h1 className="headline mt-6 max-w-5xl text-[clamp(3rem,8.5vw,7.5rem)] fade-up delay-1">
            Built for{" "}
            <span className="text-[var(--color-brand)]">your</span>{" "}
            business.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-fg-muted)] md:text-xl fade-up delay-2">
            We build websites, booking systems, and AI WhatsApp assistants for
            businesses across Malawi and Zambia — so you never lose another
            customer to a slow reply. Whatever you sell, we've got you.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row fade-up delay-3">
            <Link
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand)] px-7 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)]"
            >
              Book a free 15-min call
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#offers"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-line-bright)] px-7 py-4 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              View our offers
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-bg-soft)] py-6">
        <div className="flex">
          <div className="marquee-track flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 text-base text-[var(--color-fg-faint)] md:text-lg">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex shrink-0 items-center gap-10">
                <span>Restaurants</span><Dot />
                <span>Car dealers</span><Dot />
                <span>Schools</span><Dot />
                <span>Workshops</span><Dot />
                <span>Salons</span><Dot />
                <span>Retail shops</span><Dot />
                <span>Logistics</span><Dot />
                <span>Driving schools</span><Dot />
                <span>Hotels &amp; lodges</span><Dot />
                <span>Parts shops</span><Dot />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NUMERICAL SECTION 1 — 73% ═══════════════ */}
      <NumericSection
        id="problem"
        eyebrow="The problem"
        numeral="73%"
        numeralSize="text-[clamp(8rem,28vw,22rem)]"
        title={
          <>
            of after-hours WhatsApp inquiries to small businesses{" "}
            <span className="text-[var(--color-brand)]">go unanswered</span>{" "}
            until morning.
          </>
        }
        body={
          <>
            By the time the owner wakes up and replies, the customer has already
            messaged a competitor. Your slowest reply is the one that costs you
            the sale — whether you're selling cars, food, services, or anything
            else. We build the system that replies instantly, even at 3am.
          </>
        }
        align="left"
      />

      {/* ═══════════════ NUMERICAL SECTION 2 — 7 DAYS ═══════════════ */}
      <NumericSection
        eyebrow="Our pace"
        numeral="7"
        numeralSuffix="days"
        numeralSize="text-[clamp(10rem,32vw,26rem)]"
        title={
          <>
            From first WhatsApp to <span className="text-[var(--color-brand)]">live website</span>.
          </>
        }
        body={
          <>
            Most agencies take three months and then ghost you. We ship in a
            week because we work in fixed scopes, not open-ended retainers. You
            see progress every day. You sign off in real time. You launch
            before the next month's rent is due.
          </>
        }
        align="right"
        bg="elev"
      />

      {/* ═══════════════ OFFERS ═══════════════ */}
      <section id="offers" className="relative border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">— Three offers</p>
              <h2 className="headline text-[clamp(2.5rem,5.5vw,5rem)]">
                Pick the one <br className="hidden md:block" />
                that <span className="text-[var(--color-brand)]">fits</span>.
              </h2>
            </div>
            <p className="max-w-md text-base text-[var(--color-fg-muted)]">
              Fixed scope. Fixed price. Delivered fast. Whatever industry you're
              in, one of these maps to your business.
            </p>
          </div>

          <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-3">
            {offers.map((o, i) => (
              <div
                key={o.title}
                className={`relative flex flex-col p-9 transition ${
                  o.highlighted
                    ? "bg-[var(--color-bg-elev)]"
                    : "bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-elev)]"
                }`}
              >
                {o.highlighted && (
                  <div className="absolute right-9 top-9 inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--color-brand)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)] pulse-dot" />
                    Recurring
                  </div>
                )}
                <div className="mb-10">
                  <span className="font-mono text-xs text-[var(--color-fg-faint)]">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="headline text-3xl">{o.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-fg-muted)]">
                  {o.forWho}
                </p>
                <p className="mt-1 text-xs text-[var(--color-fg-faint)] italic">
                  {o.example}
                </p>
                <div className="mt-8 mb-8 numeral text-5xl text-[var(--color-fg)]">
                  {o.price.includes("/mo") ? (
                    <>
                      $250
                      <span className="ml-2 numeral text-2xl text-[var(--color-fg-muted)]">
                        + $40/mo
                      </span>
                    </>
                  ) : (
                    o.price
                  )}
                </div>
                <ul className="flex flex-1 flex-col gap-3 text-sm">
                  {o.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[var(--color-fg)]">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-brand)]" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={offerWaUrl(o.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-10 inline-flex w-full items-center justify-center gap-2 whitespace-nowrap px-5 py-3.5 text-center text-sm font-medium transition ${
                    o.highlighted
                      ? "bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hot)]"
                      : "border border-[var(--color-line-bright)] text-[var(--color-fg)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
                  }`}
                >
                  <span>Choose this offer</span>
                  <span aria-hidden>→</span>
                </Link>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-5 text-xs">
                  <span className="text-[var(--color-fg-muted)]">Delivery</span>
                  <span className="font-medium text-[var(--color-fg)]">{o.delivery}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NUMERICAL SECTION 3 — 24/7 ═══════════════ */}
      <NumericSection
        eyebrow="What AutoReply does"
        numeral="24/7"
        numeralSize="text-[clamp(7rem,22vw,18rem)]"
        title={
          <>
            We replace the receptionist who <span className="text-[var(--color-brand)]">never</span> sleeps.
          </>
        }
        body={
          <>
            AutoReply AI is trained on your business — your products, your
            prices, your opening hours, your tone. It answers customers in
            plain English or Chichewa, captures their details, and books
            appointments straight to your calendar. Whether you sell cars,
            cook food, run classes, or fix anything — you wake up to qualified
            leads, not 47 unread messages.
          </>
        }
        align="left"
      />

      {/* ═══════════════ PROCESS ═══════════════ */}
      <section id="process" className="relative border-b border-[var(--color-line)] bg-[var(--color-bg-soft)]">
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
          <div className="mb-16 max-w-2xl">
            <p className="eyebrow mb-4">— How we work</p>
            <h2 className="headline text-[clamp(2.5rem,5.5vw,5rem)]">
              Four steps. <br />
              <span className="text-[var(--color-brand)]">Two weeks.</span>
            </h2>
          </div>

          <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-4">
            {processSteps.map((p, i) => (
              <div key={p.t} className="bg-[var(--color-bg-soft)] p-8">
                <div className="numeral mb-8 text-6xl text-[var(--color-brand)]">
                  0{i + 1}
                </div>
                <h3 className="headline text-2xl">{p.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {p.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NUMERICAL SECTION 4 — 2 ═══════════════ */}
      <NumericSection
        eyebrow="Where we work"
        numeral="2"
        numeralSuffix="countries"
        numeralSize="text-[clamp(11rem,34vw,28rem)]"
        title={
          <>
            Currently serving Malawi and Zambia. <span className="text-[var(--color-brand)]">Africa next.</span>
          </>
        }
        body={
          <>
            We're based in Lusaka with roots in Lilongwe — which means we
            understand the realities of running a business between two
            currencies, three mobile money services, and customers who switch
            between English and Chichewa mid-sentence. Wiyule was built for
            that, not retrofitted.
          </>
        }
        align="right"
        bg="elev"
      />

      {/* ═══════════════ FAQ ═══════════════ */}
      <FAQ />

      {/* ═══════════════ FOUNDER / ORIGIN ═══════════════ */}
      <section id="founder" className="relative border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-bottom glow-drift" />
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
          <p className="eyebrow mb-4">— Our origin</p>
          <h2 className="headline text-[clamp(2rem,4.5vw,3.75rem)]">
            Wiyule was built on a <span className="text-[var(--color-brand)]">workshop floor</span> — not in a co-working space.
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-[1fr_auto] md:gap-16">
            <div className="space-y-6 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              <p>
                Wiyule Technology was started by a young African founder who
                grew up inside a real family business — a workshop in Malawi
                run by a late automotive entrepreneur. From an early age, the
                conversations at home were about customers, cash flow, lost
                inquiries, broken systems, and what it actually takes to keep
                a small business alive in this part of the world.
              </p>
              <p>
                That ground-floor exposure became the company&rsquo;s edge.
                Wiyule isn&rsquo;t built by people who learned business from a
                textbook — it&rsquo;s built by people who watched it happen
                across dinner tables, on workshop floors, and in the long
                Saturdays small business owners know all too well.
              </p>
              <p>
                Today, Wiyule&rsquo;s ambition is simple but serious: become{" "}
                <span className="text-[var(--color-fg)]">
                  one of the most trusted technology companies for small
                  businesses across Africa
                </span>
                — starting with Malawi and Zambia, expanding from there.
                Restaurants, schools, retail, services, transport, automotive,
                logistics. If you have customers and you&rsquo;re losing them
                to slow systems, we want to be the team you call.
              </p>
              <p>
                Right now we&rsquo;re taking on{" "}
                <span className="text-[var(--color-brand)] font-medium">
                  3 founding clients
                </span>{" "}
                at deeply discounted rates — the businesses we work with at
                this stage become our long-term partners and the case studies
                that take Wiyule across the continent.
              </p>
            </div>
            <div className="flex flex-col gap-4 border-t border-[var(--color-line)] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <Stat label="Founded" value="2026" />
              <Stat label="Based in" value="Lusaka, ZM" />
              <Stat label="Roots in" value="Malawi" />
              <Stat label="Languages" value="EN · CH" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft glow-drift" />
        <div className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-44">
          <p className="eyebrow mb-4">— Ready when you are</p>
          <h2 className="headline text-[clamp(2.75rem,7vw,6rem)]">
            Ready to <span className="text-[var(--color-brand)]">grow</span>{" "}
            <br className="hidden md:block" />
            your business?
          </h2>
          <p className="mt-8 max-w-xl text-lg text-[var(--color-fg-muted)]">
            15 minutes. No deck. No commitment. Just a real conversation about
            what's broken in your business and whether we can fix it.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand)] px-8 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)]"
            >
              Message us on WhatsApp →
            </Link>
            <Link
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-line-bright)] px-8 py-4 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
            >
              Send us an email
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="eyebrow mb-3">— WhatsApp</p>
              <Link
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="numeral text-2xl text-[var(--color-fg)] transition hover:text-[var(--color-brand)]"
              >
                +260 774 668 193
              </Link>
            </div>
            <div>
              <p className="eyebrow mb-3">— Instagram</p>
              <Link
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="numeral text-2xl text-[var(--color-fg)] transition hover:text-[var(--color-brand)]"
              >
                @wiyutechafrica
              </Link>
            </div>
            <div>
              <p className="eyebrow mb-3">— Email</p>
              <Link
                href={`mailto:${EMAIL}`}
                className="numeral text-xl text-[var(--color-fg)] transition hover:text-[var(--color-brand)]"
              >
                {EMAIL}
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-4 border-t border-[var(--color-line)] pt-8 text-xs text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-5 w-5 overflow-hidden">
                <Image
                  src="/wiyule-mark.jpg"
                  alt="Wiyule Technology"
                  fill
                  sizes="20px"
                  className="object-contain"
                />
              </div>
              <span>© {new Date().getFullYear()} Wiyule Technology · Built in Lusaka</span>
            </div>
            <span className="text-[var(--color-fg-faint)]">
              Made for businesses in MW × ZM
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ═══════════════════════════════════════════
   COMPONENT — Numerical Section
   ═══════════════════════════════════════════ */
function NumericSection({
  id,
  eyebrow,
  numeral,
  numeralSuffix,
  numeralSize,
  title,
  body,
  align = "left",
  bg = "default",
}: {
  id?: string;
  eyebrow: string;
  numeral: string;
  numeralSuffix?: string;
  numeralSize: string;
  title: React.ReactNode;
  body: React.ReactNode;
  align?: "left" | "right";
  bg?: "default" | "elev";
}) {
  const bgClass =
    bg === "elev" ? "bg-[var(--color-bg-soft)]" : "bg-[var(--color-bg)]";

  return (
    <section id={id} className={`relative overflow-hidden border-b border-[var(--color-line)] ${bgClass}`}>
      <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <div
          className={`flex items-end ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <div className="flex items-end gap-4 md:gap-6">
            <span
              className={`numeral text-[var(--color-brand)] ${numeralSize}`}
              style={{ textShadow: "0 0 80px rgba(239, 45, 45, 0.25)" }}
            >
              {numeral}
            </span>
            {numeralSuffix && (
              <span className="mb-3 text-lg font-medium text-[var(--color-fg-muted)] md:mb-6 md:text-2xl">
                {numeralSuffix}
              </span>
            )}
          </div>
        </div>

        <div
          className={`mt-12 max-w-3xl ${
            align === "right" ? "ml-auto md:text-right" : ""
          }`}
        >
          <p className="eyebrow mb-4">— {eyebrow}</p>
          <h2 className="headline text-[clamp(1.75rem,3.5vw,3rem)]">{title}</h2>
          <p className="mt-8 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow mb-1.5">— {label}</p>
      <p className="numeral text-xl text-[var(--color-fg)]">{value}</p>
    </div>
  );
}

function Dot() {
  return <span className="text-[var(--color-brand)]">·</span>;
}