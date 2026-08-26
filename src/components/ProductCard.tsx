"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { categoryLabel } from "@/lib/categories";
import { useCartStore } from "@/lib/cart-store";
import type { ProductWithImages } from "@/lib/products";

export default function ProductCard({ product }: { product: ProductWithImages }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const image = product.images[0] ?? "/products/custom-placeholder.svg";
  const secondImage = product.images[1];
  const soldOut = product.stock <= 0 && !product.isCustom;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-cream-line bg-cream transition hover:-translate-y-1 hover:shadow-lg hover:shadow-rose-soft/60"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-soft">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {secondImage && (
          <Image
            src={secondImage}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover opacity-0 transition duration-300 group-hover:opacity-100 group-hover:scale-105"
          />
        )}
        {soldOut && (
          <span className="absolute top-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-cream">
            Sold out
          </span>
        )}

        {!soldOut && !product.isCustom && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(
                {
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  priceCents: product.priceCents,
                  image,
                  stock: product.stock,
                },
                1
              );
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="absolute right-3 bottom-3 flex min-h-11 items-center rounded-full bg-cream px-4 text-xs font-medium text-ink shadow transition duration-200 hover:bg-rose-dark hover:text-cream sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
          >
            {added ? "Added ✓" : "+ Quick add"}
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs uppercase tracking-widest text-sage-dark">
          {categoryLabel(product.category)}
        </span>
        <h3 className="font-display text-lg text-ink">{product.name}</h3>
        <p className="mt-auto pt-2 font-medium text-rose-dark">
          {product.isCustom ? "Custom quote" : formatPrice(product.priceCents)}
        </p>
      </div>
    </Link>
  );
}
