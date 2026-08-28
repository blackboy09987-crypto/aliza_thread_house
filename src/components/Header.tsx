"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { useHasMounted } from "@/lib/use-has-mounted";
import { CartIcon } from "@/components/icons";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/custom-order", label: "Custom Orders" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const items = useCartStore((s) => s.items);
  const mounted = useHasMounted();
  const [menuOpen, setMenuOpen] = useState(false);

  const { totalItems } = cartTotals(items);

  return (
    <header className="sticky top-0 z-40 border-b border-cream-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-script text-3xl text-rose-dark">Aliza&apos;s</span>
          <span className="font-display text-lg tracking-[0.15em] text-ink uppercase -mt-1">
            Thread House
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-sm tracking-wide text-ink-soft transition hover:text-rose-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative flex items-center gap-2 rounded-full border border-cream-line bg-cream-soft px-4 py-2 text-sm text-ink transition hover:border-rose"
          >
            <CartIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Cart</span>
            {mounted && totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-dark px-1 text-xs font-medium text-cream"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          <button
            className="flex h-11 w-11 items-center justify-center text-2xl md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1 overflow-hidden border-t border-cream-line bg-cream px-5 md:hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm text-ink-soft"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <div className="stitch-divider" />
    </header>
  );
}
