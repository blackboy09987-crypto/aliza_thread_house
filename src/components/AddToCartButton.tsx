"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCartStore } from "@/lib/cart-store";
import QuantityStepper from "@/components/QuantityStepper";

export default function AddToCartButton({
  productId,
  slug,
  name,
  priceCents,
  image,
  stock,
}: {
  productId: string;
  slug: string;
  name: string;
  priceCents: number;
  image: string | null;
  stock: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const soldOut = stock <= 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-ink-soft">Quantity</span>
        <QuantityStepper
          quantity={quantity}
          max={Math.max(1, Math.min(stock, 10))}
          onChange={setQuantity}
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => {
          addItem({ productId, slug, name, priceCents, image, stock }, quantity);
          setAdded(true);
          setTimeout(() => setAdded(false), 2500);
        }}
        disabled={soldOut}
        className="w-fit rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-8 py-3 text-sm font-medium text-cream transition disabled:cursor-not-allowed disabled:bg-ink/30"
      >
        {soldOut ? "Sold out" : "Add to cart"}
      </motion.button>

      <AnimatePresence>
        {added && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-sage-dark"
          >
            Added to cart.{" "}
            <Link href="/cart" className="underline">
              View cart →
            </Link>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
