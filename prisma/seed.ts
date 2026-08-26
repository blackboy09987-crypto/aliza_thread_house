import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/format";

const prisma = new PrismaClient();

const products = [
  // --- Real current inventory (confirmed by Aliza) ---
  {
    name: "Crochet Rose Bag",
    description:
      "A statement clutch crocheted entirely as a single rose bloom, finished with a pearl beaded chain strap. Fully lined, with a secure clasp closure. One of a kind — no two roses stitch up exactly alike.",
    priceCents: 250000,
    category: "BAGS_ACCESSORIES" as const,
    images: ["/products/bag-rose.svg"],
    stock: 1,
    isFeatured: true,
  },
  {
    name: "Cherry Bag Charm Keychain",
    description:
      "A pair of plump crochet cherries on twisted green stems, finished with a pearl beaded loop. Clips onto bags, backpacks, or keys.",
    priceCents: 75000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-cherry.svg"],
    stock: 6,
    isFeatured: true,
  },
  {
    name: "Sunflower Bag Charm Keychain",
    description:
      "A hand-crocheted sunflower with layered petals and leaves, paired with a pearl beaded loop. A cheerful little charm for any bag.",
    priceCents: 75000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-sunflower.svg"],
    stock: 6,
    isFeatured: false,
  },
  {
    name: "Whale Keychain",
    description:
      "A round, huggable crochet whale keychain with soft safety eyes and a tiny embroidered smile. Priced per piece.",
    priceCents: 40000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-whale.svg"],
    stock: 8,
    isFeatured: true,
  },
  {
    name: "Penguin Keychain",
    description:
      "A pudgy crochet penguin keychain with embroidered wing details and little orange feet. Priced per piece.",
    priceCents: 75000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-penguin.svg"],
    stock: 8,
    isFeatured: false,
  },
  {
    name: "Graduation Keychain",
    description:
      "A round crochet keychain in a graduation cap and sash, holding a tiny rolled diploma. A sweet handmade gift for grad season. Priced per piece.",
    priceCents: 70000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-graduation.svg"],
    stock: 10,
    isFeatured: false,
  },
  {
    name: "Custom Name Keychain",
    description:
      "A crochet tag hand-embroidered with the name of your choice, finished with a small flower accent. Great for bags, keys, or gifting. Tell us the name at checkout in the order note, or reach out beforehand.",
    priceCents: 50000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-nametag.svg"],
    stock: 15,
    isFeatured: true,
  },
  {
    name: "Dark Hero-Inspired Keychain",
    description:
      "A caped crochet hero keychain in charcoal and gold, inspired by the classic caped crusader look. A fun handmade piece for fans and collectors.",
    priceCents: 120000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-dark-hero.svg"],
    stock: 4,
    isFeatured: false,
  },
  {
    name: "Web-Slinger-Inspired Keychain",
    description:
      "A red-and-blue masked crochet keychain inspired by everyone's favorite web-slinger. Hand-stitched web detailing and soft safety eyes.",
    priceCents: 87000,
    category: "KEYCHAINS" as const,
    images: ["/products/keychain-web-hero.svg"],
    stock: 4,
    isFeatured: false,
  },

  {
    name: "Thread House Signature Custom Piece",
    description:
      "Have something specific in mind? This listing is a starting point for bespoke embroidery or crochet commissions — portraits, wedding pieces, matching sets, and more. Submit the custom order form and we'll follow up with a quote.",
    priceCents: 0,
    category: "CUSTOM" as const,
    images: ["/products/custom-placeholder.svg"],
    stock: 999,
    isCustom: true,
    isFeatured: false,
  },
];

// Old fictional demo items that real inventory has replaced.
const removedSlugs = [
  "pip-the-crochet-duckling",
  "luna-the-crochet-bat",
  "blooming-heart-embroidery-hoop",
  "custom-name-embroidery-hoop",
  "cloudy-day-crochet-cardigan",
  "rosewater-granny-square-cardigan",
  "everlasting-rose-bouquet",
  "wildflower-crochet-posy",
  "cottage-kitchen-potholder-set",
];

async function main() {
  await prisma.product.deleteMany({ where: { slug: { in: removedSlugs } } });

  for (const product of products) {
    const slug = slugify(product.name);
    const data = {
      slug,
      name: product.name,
      description: product.description,
      priceCents: product.priceCents,
      category: product.category,
      images: JSON.stringify(product.images),
      stock: product.stock,
      isCustom: "isCustom" in product ? product.isCustom : false,
      isFeatured: product.isFeatured,
    };
    await prisma.product.upsert({
      where: { slug },
      update: data,
      create: data,
    });
  }
  console.log(`Seeded ${products.length} products, removed ${removedSlugs.length} stale demo items.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
