import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ShopFilters from "@/components/ShopFilters";
import { getActiveProducts, type ProductSort } from "@/lib/products";
import { CATEGORIES, categoryBySlug } from "@/lib/categories";

export const metadata = {
  title: "Shop All Handmade Crochet & Embroidery",
  description:
    "Browse handmade crochet keychains, bag charms, embroidery hoop art, and custom pieces — made to order in Pakistan.",
  keywords: ["crochet keychains", "embroidery hoop art", "crochet bag charms", "handmade Pakistan"],
};

const VALID_SORTS: ProductSort[] = ["newest", "price-asc", "price-desc"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) {
  const { category: categorySlug, q, sort } = await searchParams;
  const activeCategory = categorySlug ? categoryBySlug(categorySlug) : undefined;
  const resolvedSort = VALID_SORTS.includes(sort as ProductSort) ? (sort as ProductSort) : "newest";
  const products = await getActiveProducts({
    category: activeCategory?.value,
    search: q?.trim(),
    sort: resolvedSort,
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8">
        <span className="font-script text-3xl text-rose-dark">The shop</span>
        <h1 className="font-display text-3xl text-ink">
          {activeCategory ? activeCategory.label : "All handmade pieces"}
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-4 py-2 text-sm transition ${
            !activeCategory
              ? "border-rose-dark bg-rose-soft text-rose-dark"
              : "border-cream-line text-ink-soft hover:border-rose"
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.value}
            href={`/shop?category=${cat.slug}`}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              activeCategory?.value === cat.value
                ? "border-rose-dark bg-rose-soft text-rose-dark"
                : "border-cream-line text-ink-soft hover:border-rose"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      <ShopFilters />

      {products.length === 0 ? (
        <p className="text-ink-soft">
          {q
            ? `No pieces match "${q}" — try a different search, or `
            : "No pieces in this category just yet — check back soon, or "}
          <Link href="/custom-order" className="text-rose-dark hover:underline">
            request a custom design
          </Link>
          .
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
