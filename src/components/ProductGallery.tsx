"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const gallery = images.length > 0 ? images : ["/products/custom-placeholder.svg"];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-cream-line bg-cream-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={gallery[active]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={gallery[active]}
              alt={name}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 flex gap-3">
          {gallery.map((src, index) => (
            <button
              key={src}
              onClick={() => setActive(index)}
              aria-label={`View photo ${index + 1}`}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                active === index ? "border-rose-dark" : "border-cream-line hover:border-rose"
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
