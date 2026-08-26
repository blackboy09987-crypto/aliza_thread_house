export const CATEGORIES = [
  {
    value: "EMBROIDERY",
    slug: "embroidery",
    label: "Embroidery Hoop Art",
    blurb: "Hand-stitched hoops, custom text & floral designs.",
  },
  {
    value: "CROCHET_APPAREL",
    slug: "crochet-apparel",
    label: "Crochet Apparel",
    blurb: "Cardigans, tops, and cozy wearables.",
  },
  {
    value: "AMIGURUMI",
    slug: "amigurumi",
    label: "Amigurumi & Toys",
    blurb: "Tiny crochet critters and keepsakes.",
  },
  {
    value: "KEYCHAINS",
    slug: "keychains",
    label: "Keychains & Bag Charms",
    blurb: "Little crochet charms with pearl chains.",
  },
  {
    value: "BAGS_ACCESSORIES",
    slug: "bags-accessories",
    label: "Bags & Accessories",
    blurb: "Statement crochet bags and clutches.",
  },
  {
    value: "FLOWERS_BOUQUETS",
    slug: "flowers-bouquets",
    label: "Crochet Flowers & Bouquets",
    blurb: "Bouquets that never wilt.",
  },
  {
    value: "HOME_DECOR",
    slug: "home-decor",
    label: "Home Decor",
    blurb: "Potholders, coasters & cozy accents.",
  },
  {
    value: "CUSTOM",
    slug: "custom",
    label: "Custom Orders",
    blurb: "Bring your idea and thread it into reality.",
  },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]["value"];

export function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}

export function categoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
