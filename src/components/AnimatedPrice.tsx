"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Counts a price up from 0 whenever it scrolls INTO VIEW, and again when its
// value changes (e.g. the currency switch) — so prices animate as you scroll to
// them, matching the count-up on the big number blocks. Parses the formatted
// string, animates the number, then re-adds grouping commas each frame.
export default function AnimatedPrice({
  value,
  symbol = "",
  className = "",
}: {
  value: string;
  symbol?: string;
  className?: string;
}) {
  const target = Number(value.replace(/,/g, "")) || 0;
  const ref = useRef<HTMLSpanElement>(null);
  // once:false → re-counts each time it re-enters view, like AnimatedNumber.
  const inView = useInView(ref, { once: false, margin: "0px 0px -80px 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // expo-out: fast, then settles
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [target, inView]);

  return (
    <span ref={ref} className={className}>
      {symbol}
      {display.toLocaleString("en-US")}
    </span>
  );
}
