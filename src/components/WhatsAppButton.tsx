"use client";

import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { WHATSAPP_LINK } from "@/lib/site-config";

export default function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.a
      href={`${WHATSAPP_LINK}?text=${encodeURIComponent("Hi Aliza! I have a question about your crochet & embroidery pieces.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.35a9.87 9.87 0 0 0 4.62 1.15h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.13.11-1.83-.12-.42-.14-.96-.32-1.65-.63-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.58-.36.77-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.19-.15.31-.3.47-.15.16-.31.36-.44.48-.15.14-.3.3-.13.59.17.29.75 1.24 1.62 2.01 1.12.99 2.05 1.3 2.35 1.44.3.15.47.13.65-.08.18-.21.75-.88.96-1.18.2-.3.41-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.35.08.13.08.72-.16 1.4Z" />
      </svg>
    </motion.a>
  );
}
