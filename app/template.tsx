"use client";

import { m } from "framer-motion";

// Re-renders on every navigation (unlike layout.tsx which persists).
// This gives us page-entry animations without any extra setup.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
