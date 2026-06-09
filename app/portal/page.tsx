import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/src/components/Nav";

const WHATSAPP_NUMBER = "260774668193";
const WA_MESSAGE = encodeURIComponent(
  "Hi Wiyule — I'm a client and I'd like the link to my project portal."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default function PortalIndexPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <Nav />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 glow-soft glow-drift" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-6 py-20 md:px-10">
          <p className="eyebrow mb-4 fade-up">— Client portal</p>
          <h1 className="headline text-[clamp(2rem,5vw,4rem)] fade-up delay-1">
            Your project,{" "}
            <span className="text-[var(--color-brand)]">tracked live.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-fg-muted)] md:text-lg fade-up delay-2">
            Every Wiyule client gets a private portal link to follow their
            build — stage by stage, payment to launch. Check the message we
            sent you for your personal link.
          </p>
          <div className="mt-10 fade-up delay-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--color-brand)] px-6 py-3 text-sm font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-[var(--color-bg)]"
            >
              Ask us for your portal link →
            </a>
          </div>
          <Link
            href="/"
            className="mt-10 text-sm text-[var(--color-fg-faint)] transition hover:text-[var(--color-brand)]"
          >
            ← Back to wiyuletech.com
          </Link>
        </div>
      </section>
    </main>
  );
}
