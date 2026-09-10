"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ─── WIYULE30 promo strip — sitewide, auto-expires 31 Oct 2026 ───
   Thin bar above the nav announcing the discount code. Renders nothing
   once the promo is over. We gate on mount (useEffect) rather than at
   render so the date is checked in the visitor's browser at runtime —
   a statically-built server component would freeze this at build time. */

// Valid through 31 Oct 2026; dies at midnight 1 Nov (CAT, +02:00).
const PROMO_EXPIRES = new Date("2026-11-01T00:00:00+02:00");

export default function PromoBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (new Date() < PROMO_EXPIRES) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/#offers"
      className="block bg-[var(--color-brand)] text-white transition hover:bg-[var(--color-brand-hot)]"
    >
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-2 text-center text-xs font-medium md:text-sm">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
        <span>
          Limited offer — 30% off any package with code{" "}
          <span className="font-semibold tracking-wide underline underline-offset-2">
            WIYULE30
          </span>
        </span>
        <span className="opacity-80">· ends 31 Oct →</span>
      </p>
    </Link>
  );
}
