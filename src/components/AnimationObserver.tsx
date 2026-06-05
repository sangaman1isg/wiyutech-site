"use client";

import { useEffect } from "react";

// Finds every [data-animate] element on the page and adds
// data-visible when it enters the viewport. CSS handles the
// actual animation. Runs once per page load, unobserves after
// each element becomes visible so it never re-triggers.

export default function AnimationObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
