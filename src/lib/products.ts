import { prisma } from "@/lib/prisma";
import type { Product as PrismaProduct } from "@prisma/client";

export type ProductWithImages = Omit<PrismaProduct, "images"> & {
  images: string[];
};

function withImages(product: PrismaProduct): ProductWithImages {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }
  return { ...product, images };
}

export async function getFeaturedProducts(): Promise<ProductWithImages[]> {
  const products = await prisma.product.findMany({
    where: { isFeatured: true, isActive: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
  return products.map(withImages);
}

export type ProductSort = "newest" | "price-asc" | "price-desc";

export async function getActiveProducts(options?: {
  category?: string;
  search?: string;
  sort?: ProductSort;
}): Promise<ProductWithImages[]> {
  const { category, search, sort = "newest" } = options ?? {};

  const orderBy: Record<string, "asc" | "desc"> =
    sort === "price-asc"
      ? { priceCents: "asc" }
      : sort === "price-desc"
        ? { priceCents: "desc" }
        : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      ...(category ? { category: category as PrismaProduct["category"] } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    },
    orderBy,
  });
  return products.map(withImages);
}

export async function getProductBySlug(slug: string): Promise<ProductWithImages | null> {
  const product = await prisma.product.findUnique({ where: { slug } });
  return product ? withImages(product) : null;
}
