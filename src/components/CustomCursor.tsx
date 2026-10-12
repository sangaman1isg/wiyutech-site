"use client";

import { useEffect, useState } from "react";
import { m, useMotionValue, useSpring } from "framer-motion";

// Cuberto-style custom cursor: an instant dot + a trailing ring.
// Over anything interactive (links, buttons, [data-cursor]) the ring
// grows and fills faintly red for tactile feedback.
//
// Performance rule: the mouse-move handler NEVER touches React state —
// position goes straight to motion values (no re-render). Hover state
// only flips on mouseover/mouseout, i.e. when you actually cross into
// or out of a clickable element. That's what keeps it buttery.
//
// Desktop-only: never mounts on touch or reduced-motion users, so there
// is zero mobile cost and the native cursor is left untouched.
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw position — the dot reads these directly (instant, no spring).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Springed position — the ring trails with a touch of weight.
  const ringX = useSpring(x, { stiffness: 550, damping: 40, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 550, damping: 40, mass: 0.35 });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reduced.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const INTERACTIVE = "a, button, [data-cursor], input, textarea, select";

    // Cheap: just writes to motion values. No React render.
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Only fires when entering an interactive element.
    const over = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest(INTERACTIVE)) setHovering(true);
    };
    // Only fires when leaving one.
    const out = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest(INTERACTIVE)) setHovering(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Instant dot */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full bg-[var(--color-fg)] will-change-transform"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 6,
          height: 6,
        }}
        animate={{ opacity: hovering ? 0 : 1 }}
        transition={{ duration: 0.18 }}
      />

      {/* Trailing ring */}
      <m.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[10000] rounded-full border will-change-transform"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 48 : 30,
          height: hovering ? 48 : 30,
          borderColor: hovering
            ? "var(--color-brand)"
            : "var(--color-line-bright)",
          backgroundColor: hovering
            ? "rgba(239,45,45,0.12)"
            : "rgba(239,45,45,0)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    </>
  );
}
