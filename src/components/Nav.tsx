"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const WHATSAPP_NUMBER = "260774668193";
const WA_MESSAGE = encodeURIComponent(
  "Hi Wiyule Technology — I'd like a free 15-min discovery call about a website / WhatsApp AI for my business."
);
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WA_MESSAGE}`;

const navLinks = [
  { label: "The problem", href: "#problem" },
  { label: "Offers", href: "#offers" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Origin", href: "#founder" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* ─── NAV BAR ─── */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-bg)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-7 w-7 overflow-hidden">
              <Image
                src="/wiyule-mark.jpg"
                alt="Wiyule Technology"
                fill
                sizes="28px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm font-semibold tracking-wide">
              Wiyule{" "}
              <span className="text-[var(--color-fg-muted)]">Technology</span>
            </span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <nav className="hidden items-center gap-9 text-sm text-[var(--color-fg-muted)] md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--color-fg)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — hidden on mobile */}
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 bg-[var(--color-brand)] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--color-brand-hot)] md:inline-flex"
          >
            Book a call →
          </Link>

          {/* Mobile hamburger — visible only below md */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center text-[var(--color-fg)] transition md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              /* × close icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            ) : (
              /* ☰ hamburger icon */
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="2" y1="5" x2="18" y2="5" />
                <line x1="2" y1="10" x2="18" y2="10" />
                <line x1="2" y1="15" x2="18" y2="15" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ─── MOBILE MENU DRAWER ─── */}
      {/*
        Positioned fixed, starting exactly below the nav bar (top-[69px]).
        Fills the rest of the viewport height.
        Fades + slides in when open, fades + slides out when closed.
        pointer-events-none when closed so nothing below is blocked.
      */}
      <div
        className={`fixed inset-x-0 top-[69px] z-40 flex h-[calc(100vh-69px)] flex-col bg-[var(--color-bg)] transition-all duration-300 md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
      >
        {/* Section links */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-6 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center border-b border-[var(--color-line)] py-5 text-xl font-medium text-[var(--color-fg)] transition hover:translate-x-1 hover:text-[var(--color-brand)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA pinned to the bottom */}
        <div className="px-6 pb-10 pt-6">
          <Link
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center justify-center gap-2 bg-[var(--color-brand)] py-4 text-base font-semibold text-white transition hover:bg-[var(--color-brand-hot)]"
          >
            Book a free 15-min call →
          </Link>
          <p className="mt-3 text-center text-xs text-[var(--color-fg-faint)]">
            No commitment. Just a real conversation.
          </p>
        </div>
      </div>
    </>
  );
}
