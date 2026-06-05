import Image from "next/image";
import Link from "next/link";
import Nav from "@/src/components/Nav";
import AuditCTA from "@/src/components/AuditCTA";
import Services from "@/src/components/Services";
import FAQ from "@/src/components/FAQ";
import HowWeWork from "@/src/components/HowWeWork";
import AnimatedNumber from "@/src/components/AnimatedNumber";

const WHATSAPP_NUMBER = "260774668193";
const EMAIL = "wiyuletechnology@gmail.com";
const INSTAGRAM = "https://instagram.com/wiyutechafrica";
const WA_MESSAGE = encodeURIComponent(
  "Hi Wiyule Technology — I'd like a free 15-min discovery call about a website / WhatsApp AI for my business."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;


export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      {/* ─── NAV ─── */}
      <Nav />

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
            customer to a slow reply. Whatever you sell, we&rsquo;ve got you.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row fade-up delay-3">
            <Link
              data-shine
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

      {/* ═══════════════ NUMERICAL SECTION 1 — 73% ═══════════════ */}
      <NumericSection
        id="problem"
        eyebrow="The problem"
        numeral={73}
        numeralSuffix="%"
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
            By the time you wake up and reply, the customer has already messaged
            a competitor. We build the system that replies instantly — even at 3am.
          </>
        }
        align="left"
      />

      {/* ═══════════════ NUMERICAL SECTION 2 — 7 DAYS ═══════════════ */}
      <NumericSection
        eyebrow="Our pace"
        numeral={7}
        numeralSuffix="days"
        numeralSize="text-[clamp(10rem,32vw,26rem)]"
        title={
          <>
            From first WhatsApp to <span className="text-[var(--color-brand)]">live website</span>.
          </>
        }
        body={
          <>
            Most agencies take three months and then ghost you. We work in
            fixed scopes — you see progress every day and launch before next
            month&rsquo;s rent is due.
          </>
        }
        align="right"
        bg="elev"
      />

      {/* ═══════════════ SERVICES (8 PRODUCTS) ═══════════════ */}
      <Services />

      {/* ═══════════════ HOW WE WORK ═══════════════ */}
      <HowWeWork />

      {/* ═══════════════ FREE AUDIT CTA ═══════════════ */}
      <AuditCTA />

      {/* ═══════════════ FAQ ═══════════════ */}
      <FAQ />

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft glow-drift" />
        <div data-animate="fade-up" className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-44">
          <p className="eyebrow mb-4">— Ready when you are</p>
          <h2 className="headline text-[clamp(2.75rem,7vw,6rem)]">
            Ready to <span className="text-[var(--color-brand)]">grow</span>{" "}
            <br className="hidden md:block" />
            your business?
          </h2>
          <p className="mt-8 max-w-xl text-lg text-[var(--color-fg-muted)]">
            15 minutes. No deck. No commitment. Just a real conversation about
            what&rsquo;s broken in your business and whether we can fix it.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              data-shine
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
            <div className="flex items-center gap-6">
              <Link
                href="/about"
                className="text-[var(--color-fg-faint)] transition hover:text-[var(--color-fg)]"
              >
                Our origin
              </Link>
              <span className="text-[var(--color-fg-faint)]">
                Made for businesses in MW × ZM
              </span>
            </div>
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
  numeral: number;
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
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-32">
        <div
          className={`flex items-end ${
            align === "right" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            data-animate={align === "right" ? "slide-right" : "slide-left"}
            className="flex items-end gap-4 md:gap-6"
          >
            <AnimatedNumber
              to={numeral}
              suffix={numeralSuffix && align !== "right" ? "" : ""}
              duration={numeral > 20 ? 2.2 : 1.4}
              className={`numeral text-[var(--color-brand)] ${numeralSize}`}
            />
            {numeralSuffix && (
              <span className="mb-3 text-lg font-medium text-[var(--color-fg-muted)] md:mb-6 md:text-2xl">
                {numeralSuffix}
              </span>
            )}
          </div>
        </div>

        <div
          data-animate="fade-up"
          data-delay="150"
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

