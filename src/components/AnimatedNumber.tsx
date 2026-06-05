"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export default function AnimatedNumber({
  to,
  suffix = "",
  duration = 2.2,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo-out: rushes in, slows to stop
      onUpdate(latest) {
        setDisplay(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [isInView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
