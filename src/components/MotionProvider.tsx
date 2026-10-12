"use client";

import { LazyMotion, domAnimation } from "framer-motion";

// Ships only Framer Motion's DOM animation feature set (not the full engine)
// and requires the lightweight `m` components everywhere (strict). This trims
// the Framer JavaScript delivered to every visitor. domAnimation covers all we
// use: enter/exit animations, variants, whileHover/Tap/InView, motion values.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
