import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/src/components/Nav";
import { STAGES, getClient } from "../clients";

const WHATSAPP_NUMBER = "260774668193";

// Private pages — never let search engines index a client's portal.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PortalPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const client = getClient(code);

  if (!client) notFound();

  const currentIndex = STAGES.indexOf(client.currentStage);
  const waMessage = encodeURIComponent(
    `Hi Wiyule — it's ${client.clientName}. A question about my ${client.product} project.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;
  const updated = new Date(client.updatedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <Nav />

      {/* ─── HEADER ─── */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <div className="absolute inset-0 glow-soft glow-drift" />
        <div className="relative mx-auto max-w-4xl px-6 py-16 md:px-10 md:py-24">
          <p className="eyebrow mb-4 fade-up">— Client portal</p>
          <h1 className="headline text-[clamp(2rem,5vw,4rem)] fade-up delay-1">
            {client.clientName} ×{" "}
            <span className="text-[var(--color-brand)]">{client.product}</span>
          </h1>
          <p className="mt-4 text-sm text-[var(--color-fg-faint)] fade-up delay-2">
            Last updated {updated}
          </p>
        </div>
      </section>

      {/* ─── STATUS ─── */}
      <section className="relative border-b border-[var(--color-line)]">
        <div className="relative mx-auto max-w-4xl px-6 py-14 md:px-10 md:py-24">
          {/* Stage tracker */}
          <p className="eyebrow mb-6">— Progress</p>
          <ol className="flex items-center justify-between gap-2">
            {STAGES.map((stage, i) => {
              const done = i <= currentIndex;
              const isCurrent = i === currentIndex;
              return (
                <li
                  key={stage}
                  className="flex flex-1 flex-col items-center gap-3 text-center"
                >
                  <div className="flex w-full items-center">
                    {/* left connector */}
                    <span
                      className={`h-px flex-1 ${
                        i === 0
                          ? "opacity-0"
                          : i <= currentIndex
                            ? "bg-[var(--color-brand)]"
                            : "bg-[var(--color-line)]"
                      }`}
                    />
                    <span
                      className={`h-3 w-3 shrink-0 rounded-full border ${
                        done
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                          : "border-[var(--color-line-bright)] bg-transparent"
                      } ${isCurrent ? "pulse-dot" : ""}`}
                    />
                    {/* right connector */}
                    <span
                      className={`h-px flex-1 ${
                        i === STAGES.length - 1
                          ? "opacity-0"
                          : i < currentIndex
                            ? "bg-[var(--color-brand)]"
                            : "bg-[var(--color-line)]"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium md:text-sm ${
                      done
                        ? "text-[var(--color-fg)]"
                        : "text-[var(--color-fg-faint)]"
                    }`}
                  >
                    {stage}
                  </span>
                </li>
              );
            })}
          </ol>

          {/* Detail grid */}
          <div className="mt-14 grid gap-px overflow-hidden border border-[var(--color-line)] bg-[var(--color-line)] md:grid-cols-2">
            <Cell label="Current stage" value={`${client.currentStage} · ${client.statusLine}`} />
            <Cell
              label="Payment"
              value={`${client.paidLabel} ${client.paid ? "✓" : "— pending"}`}
            />
            <Cell label="Balance" value={client.balanceNote} />
            <Cell label="Next step" value={client.nextStep} />
          </div>

          {/* CTA */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 border border-[var(--color-brand)] px-6 py-3 text-sm font-medium text-[var(--color-brand)] transition hover:bg-[var(--color-brand)] hover:text-[var(--color-bg)]"
          >
            Message us about this project →
          </a>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative">
        <div className="mx-auto max-w-4xl px-6 py-12 md:px-10 md:py-16">
          <div className="flex flex-col gap-4 border-t border-[var(--color-line)] pt-8 text-xs text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
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
            <Link
              href="/"
              className="text-[var(--color-fg-faint)] transition hover:text-[var(--color-brand)]"
            >
              ← Back to wiyuletech.com
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--color-bg-card)] p-6">
      <p className="eyebrow mb-2">— {label}</p>
      <p className="text-base text-[var(--color-fg)]">{value}</p>
    </div>
  );
}
