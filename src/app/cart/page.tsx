"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { useHasMounted } from "@/lib/use-has-mounted";
import QuantityStepper from "@/components/QuantityStepper";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const mounted = useHasMounted();

  if (!mounted) return null;

  const { totalCents, totalItems } = cartTotals(items);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Your cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-cream-line bg-cream-soft p-10 text-center">
          <span className="text-4xl">🧺</span>
          <p className="mt-3 text-ink-soft">Your cart is empty.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-6 py-2 text-sm font-medium text-cream"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <ul className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center gap-4 overflow-hidden rounded-2xl border border-cream-line bg-cream p-4"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-soft">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-display text-ink hover:text-rose-dark"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-ink-soft">{formatPrice(item.priceCents)} each</p>
                    <div className="mt-2 flex items-center gap-4">
                      <QuantityStepper
                        quantity={item.quantity}
                        max={Math.min(item.stock || 10, 10)}
                        onChange={(next) => setQuantity(item.productId, next)}
                      />
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-sm text-ink-soft underline hover:text-rose-dark"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="font-medium text-ink">
                    {formatPrice(item.priceCents * item.quantity)}
                  </p>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="h-fit rounded-2xl border border-cream-line bg-cream-soft p-6">
            <div className="flex justify-between text-sm text-ink-soft">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="mt-2 flex justify-between font-display text-lg text-ink">
              <span>Subtotal</span>
              <span>{formatPrice(totalCents)}</span>
            </div>
            <p className="mt-2 text-xs text-ink-soft">Shipping calculated at checkout.</p>
            <Link
              href="/checkout"
              className="mt-6 block rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-6 py-3 text-center text-sm font-medium text-cream"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
