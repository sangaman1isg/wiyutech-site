import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/src/components/Nav";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Pay your deposit and get started with Wiyule Technology.",
  robots: { index: false, follow: false }, // no need to index a checkout page
};

export default function CheckoutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <Nav />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center">
            <span className="text-sm text-[var(--color-fg-faint)]">Loading…</span>
          </div>
        }
      >
        <CheckoutClient />
      </Suspense>
    </main>
  );
}
