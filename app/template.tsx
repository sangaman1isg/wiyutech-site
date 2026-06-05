"use client";

import { motion } from "framer-motion";

// Re-renders on every navigation (unlike layout.tsx which persists).
// This gives us page-entry animations without any extra setup.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
