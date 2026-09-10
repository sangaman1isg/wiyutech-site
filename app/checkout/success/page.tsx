import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/src/components/Nav";
import { getTransactionStatus } from "@/src/lib/pesapal";
import { updateOrderByTxRef, getOrderByTxRef } from "@/src/lib/orders";

export const metadata: Metadata = {
  title: "Payment status",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function mapStatus(code: number): string {
  if (code === 1) return "successful";
  if (code === 2) return "failed";
  if (code === 3) return "reversed";
  return "pending";
}

type State = "successful" | "failed" | "pending" | "error";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    OrderTrackingId?: string;
    OrderMerchantReference?: string;
  }>;
}) {
  const { OrderTrackingId, OrderMerchantReference } = await searchParams;

  let state: State = "pending";

  if (OrderTrackingId && OrderMerchantReference) {
    try {
      const tx = await getTransactionStatus(OrderTrackingId);
      const mapped = mapStatus(tx.status_code);
      state =
        mapped === "successful"
          ? "successful"
          : mapped === "failed" || mapped === "reversed"
            ? "failed"
            : "pending";

      // Persist here too — covers local dev where the webhook can't reach us.
      await updateOrderByTxRef(OrderMerchantReference, {
        status: mapped,
        provider_tracking_id: OrderTrackingId,
        raw: tx,
      });
      await getOrderByTxRef(OrderMerchantReference); // (kept for future receipt display)
    } catch {
      state = "error";
    }
  }

  const copy: Record<State, { eyebrow: string; title: string; body: string }> = {
    successful: {
      eyebrow: "— Payment received",
      title: "You're all set.",
      body: "We've got your payment and your project is now in our queue. We'll message you on WhatsApp shortly to kick things off.",
    },
    pending: {
      eyebrow: "— Payment pending",
      title: "Almost there.",
      body: "Your payment is still processing. This can take a moment for mobile money — refresh in a bit, or message us and we'll confirm.",
    },
    failed: {
      eyebrow: "— Payment not completed",
      title: "That didn't go through.",
      body: "No charge was completed. You can try again, or message us on WhatsApp and we'll sort it out together.",
    },
    error: {
      eyebrow: "— Couldn't confirm",
      title: "We couldn't confirm that yet.",
      body: "Something went wrong checking your payment status. If money left your account, don't worry — message us and we'll verify it manually.",
    },
  };

  const c = copy[state];
  const isGood = state === "successful";

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <Nav />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
        <p
          className={`eyebrow mb-4 ${isGood ? "text-[var(--color-brand)]" : ""}`}
        >
          {c.eyebrow}
        </p>
        <h1 className="headline text-[clamp(2.25rem,5vw,3.5rem)]">{c.title}</h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--color-fg-muted)]">
          {c.body}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/260774668193"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-brand)] px-7 py-4 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)] active:scale-[0.98]"
          >
            Message us on WhatsApp →
          </a>
          <Link
            href="/#offers"
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-line-bright)] px-7 py-4 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] active:scale-[0.98]"
          >
            Back to services
          </Link>
        </div>
      </div>
    </main>
  );
}
