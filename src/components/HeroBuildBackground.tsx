"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ────────────────────────────────────────────────────────────────────────
   HeroBuildBackground
   A looping "website assembling itself" animation that sits BEHIND the hero
   copy as an ambient background. Pure Framer Motion — no images, no network.

   How the loop stays in sync: instead of per-element `delay` (which Framer
   only applies on the FIRST repeat, causing drift), every block shares the
   same `duration` + infinite `repeat`, and we stagger the build by placing
   each block's fade-in at a different point on the normalised timeline via
   `times`. Result: a seamless, perfectly-repeating build cycle.
   ──────────────────────────────────────────────────────────────────────── */

const CYCLE = 7; // seconds per full build → hold → reset loop

// Build the animate/transition pair for a block that "appears" at fraction `at`
// (0–1 of the cycle), holds, then fades out near the end.
function appear(at: number) {
  return {
    animate: { opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, 6] },
    transition: {
      duration: CYCLE,
      times: [0, at, Math.min(at + 0.05, 0.99), 0.9, 1],
      ease: "easeOut" as const,
      repeat: Infinity,
    },
  };
}

export default function HeroBuildBackground() {
  const reduce = useReducedMotion();

  // Reduced motion: render the finished mock, fully static.
  const block = (at: number) =>
    reduce ? { animate: { opacity: 1, y: 0 } } : appear(at);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* The mock browser window — pushed to the right so hero text stays clear.
          Faded heavily so it reads as ambient, never competes with the copy.
          Mobile: smaller + fainter, tucked into the bottom-right corner so it
          peeks behind the CTAs without crowding the headline.
          md+: larger, centred vertically on the right. */}
      <div className="absolute bottom-[-6%] right-[-28%] w-[30rem] max-w-[115vw] opacity-[0.08] md:inset-y-0 md:bottom-auto md:right-[-8%] md:top-1/2 md:w-[46rem] md:max-w-[60vw] md:-translate-y-1/2 md:opacity-[0.22] lg:opacity-30">
        <div className="rounded-xl border border-[var(--color-line-bright)] bg-[var(--color-bg-elev)] shadow-2xl">
          {/* Browser chrome bar */}
          <motion.div
            {...block(0.02)}
            className="flex items-center gap-2 border-b border-[var(--color-line)] px-4 py-3"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-brand)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg-faint)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg-faint)]" />
            <span className="ml-3 h-2.5 w-48 rounded bg-[var(--color-line-bright)]" />
          </motion.div>

          {/* Page body */}
          <div className="space-y-5 p-6">
            {/* Top nav row */}
            <motion.div {...block(0.12)} className="flex items-center justify-between">
              <span className="h-3 w-24 rounded bg-[var(--color-fg-faint)]" />
              <div className="flex gap-3">
                <span className="h-3 w-12 rounded bg-[var(--color-line-bright)]" />
                <span className="h-3 w-12 rounded bg-[var(--color-line-bright)]" />
                <span className="h-3 w-12 rounded bg-[var(--color-line-bright)]" />
              </div>
            </motion.div>

            {/* Hero headline lines */}
            <div className="space-y-3 pt-4">
              <motion.div {...block(0.2)} className="h-6 w-3/4 rounded bg-[var(--color-fg-muted)]" />
              <motion.div {...block(0.26)} className="h-6 w-2/3 rounded bg-[var(--color-fg-muted)]" />
              <motion.div {...block(0.32)} className="h-4 w-1/2 rounded bg-[var(--color-fg-faint)]" />
            </div>

            {/* CTA button (brand red) */}
            <motion.div {...block(0.4)} className="h-9 w-40 rounded bg-[var(--color-brand)]" />

            {/* Card row */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <motion.div {...block(0.48)} className="h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-card)]" />
              <motion.div {...block(0.54)} className="h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-card)]" />
              <motion.div {...block(0.6)} className="h-24 rounded-lg border border-[var(--color-line)] bg-[var(--color-bg-card)]" />
            </div>
          </div>

          {/* Red "scan" sweep — a soft vertical light that passes across as the
              page builds, suggesting active rendering. */}
          {!reduce && (
            <motion.div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[var(--color-brand)] to-transparent"
              style={{ opacity: 0.12 }}
              animate={{ x: ["-20%", "650%"] }}
              transition={{ duration: CYCLE, ease: "easeInOut", repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
