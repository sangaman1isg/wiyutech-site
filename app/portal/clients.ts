// ─────────────────────────────────────────────────────────────
// CLIENT PORTAL DATA
// This is the ONLY file you edit per client.
// 1. Add a new object to the CLIENTS array below.
// 2. Pick a hard-to-guess `code` (it doubles as the private link).
// 3. Share: https://wiyuletech.com/portal/<code>
// No database, no login — the code IS the access key, so keep it private.
// ─────────────────────────────────────────────────────────────

// The 4 stages of every Wiyule project, in order.
export const STAGES = ["Discovery", "Build", "Launch", "Support"] as const;
export type Stage = (typeof STAGES)[number];

export type ClientProject = {
  /** URL slug + private access key. Keep it unguessable. */
  code: string;
  clientName: string;
  /** e.g. "AutoReply AI", "Digital Storefront Kit" */
  product: string;
  /** Which stage they're currently in. */
  currentStage: Stage;
  /** Short human status, e.g. "Day 3 of 7". */
  statusLine: string;
  /** What's been paid, e.g. "50% deposit". */
  paidLabel: string;
  paid: boolean;
  /** Outstanding balance note, e.g. "ZMW 5,600 due on launch". */
  balanceNote: string;
  /** The single next thing happening. */
  nextStep: string;
  /** ISO date, e.g. "2026-06-09". Shown as "last updated". */
  updatedAt: string;
};

export const CLIENTS: ClientProject[] = [
  // No clients yet. Add an object here per client — see the type above.
  // Example shape:
  // {
  //   code: "acme-7f3k",
  //   clientName: "Acme Ltd",
  //   product: "AutoReply AI",
  //   currentStage: "Build",
  //   statusLine: "Day 3 of 7",
  //   paidLabel: "50% deposit",
  //   paid: true,
  //   balanceNote: "ZMW 5,600 due on launch",
  //   nextStep: "We're training Wiyu on your FAQs. Demo link lands Friday.",
  //   updatedAt: "2026-06-10",
  // },
];

/** Look up a project by its code. Returns undefined if not found. */
export function getClient(code: string): ClientProject | undefined {
  return CLIENTS.find((c) => c.code === code);
}
