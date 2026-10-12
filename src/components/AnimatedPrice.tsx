"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

// Animates a price "ticking up" whenever its value changes — e.g. when the
// user flips the MWK / ZMW / USD currency switch. It strips the commas out
// of the formatted string, counts 0 → value, then re-adds grouping commas
// on every frame so the number tumbles into place.
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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Honour reduced-motion: show the final price without the count.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1], // expo-out: fast, then settles
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [target]);

  return (
    <span className={className}>
      {symbol}
      {display.toLocaleString("en-US")}
    </span>
  );
}
