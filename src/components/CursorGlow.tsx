"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// Lazy red glow blob that follows the cursor on desktop.
// Hidden on touch devices — useEffect only adds the mousemove
// listener, so there's zero cost on mobile.
export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);

  // Spring makes it lag behind the cursor — gives it weight
  const springX = useSpring(x, { stiffness: 70, damping: 18 });
  const springY = useSpring(y, { stiffness: 70, damping: 18 });

  useEffect(() => {
    // Only wire up on non-touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(239,45,45,0.13) 0%, transparent 70%)",
      }}
    />
  );
}
