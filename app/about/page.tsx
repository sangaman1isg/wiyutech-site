import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/src/components/Nav";

export const metadata: Metadata = {
  title: "Our Origin",
  description:
    "Wiyule Technology was built on a workshop floor in Malawi — not in a co-working space. Learn how we got here and why we build for Africa.",
};

const WHATSAPP_NUMBER = "260774668193";
const EMAIL = "wiyuletechnology@gmail.com";
const INSTAGRAM = "https://instagram.com/wiyutechafrica";
const WA_MESSAGE = encodeURIComponent(
  "Hi Wiyule — I read your story and I&apos;d like to apply as a founding client."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <Nav />

      {/* ─── HEADER ─── */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft glow-drift" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:px-10 md:py-32">
          <p className="eyebrow mb-4 fade-up">— Our origin</p>
          <h1 className="headline text-[clamp(2.5rem,6vw,5.5rem)] fade-up delay-1">
            Built on a{" "}
            <span className="text-[var(--color-brand)]">workshop floor</span> —
            not in a co-working space.
          </h1>
        </div>
      </section>

      {/* ─── STORY ─── */}
      <section className="relative border-b border-[var(--color-line)]">
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-20">

            {/* Left — copy */}
            <div className="space-y-8 text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg">
              <p>
                Wiyule was founded by someone who grew up inside a real family
                business — a workshop in Malawi where the conversations were
                about customers, cash flow, and what it actually takes to keep
                a small business alive. That ground-floor exposure is the edge.
                We&rsquo;re not retrofitted for Africa — we were built here.
              </p>
              <p>
                Every product we sell is a direct answer to a problem we watched
                real businesses lose money over: unanswered WhatsApp messages at
                night, no way to take bookings, stock that disappears without a
                trace. We didn&rsquo;t invent these problems from a pitch deck —
                we watched them happen in real time.
              </p>
              <p>
                The name &ldquo;Wiyule&rdquo; comes from a Chichewa word. It
                means something like <em>that one</em> — the business you point
                to and say &ldquo;that&rsquo;s the one that actually does what it
                promises.&rdquo; That&rsquo;s the standard we hold ourselves to.
              </p>

              {/* Founding client box */}
              <div className="border border-[var(--color-line-bright)] p-6">
                <p className="eyebrow mb-3 text-[var(--color-brand)]">
                  — Founding client offer
                </p>
                <p className="text-base text-[var(--color-fg)]">
                  We&rsquo;re taking on{" "}
                  <span className="font-semibold text-[var(--color-brand)]">
                    3 founding clients
                  </span>{" "}
                  at deeply discounted rates. The businesses we work with at this
                  stage become our long-term partners and the case studies that
                  take Wiyule across the continent.
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-brand)] transition hover:text-[var(--color-brand-hot)]"
                >
                  Ask if you qualify →
                </a>
              </div>
            </div>

            {/* Right — stats */}
            <div className="flex flex-col gap-6 border-t border-[var(--color-line)] pt-8 md:border-l md:border-t-0 md:pl-12 md:pt-0">
              <Stat label="Founded" value="2026" />
              <Stat label="Based in" value="Lusaka, ZM" />
              <Stat label="Roots in" value="Malawi" />
              <Stat label="Languages" value="EN · CH" />
              <Stat label="Active markets" value="MW × ZM" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
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
              <span>
                © {new Date().getFullYear()} Wiyule Technology · Built in Lusaka
              </span>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow mb-1.5">— {label}</p>
      <p className="numeral text-xl text-[var(--color-fg)]">{value}</p>
    </div>
  );
}
