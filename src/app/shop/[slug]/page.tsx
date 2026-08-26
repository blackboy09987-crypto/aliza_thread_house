import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { categoryLabel } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import FadeIn from "@/components/FadeIn";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description.slice(0, 155),
    keywords: [product.name, categoryLabel(product.category), "handmade Pakistan"],
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.isActive) {
    notFound();
  }

  const lowStock = !product.isCustom && product.stock > 0 && product.stock <= 3;
  const soldOut = !product.isCustom && product.stock <= 0;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/shop" className="text-sm text-ink-soft hover:text-rose-dark">
        ← Back to shop
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <FadeIn>
          <ProductGallery images={product.images} name={product.name} />
        </FadeIn>

        <FadeIn delay={0.1}>
          <span className="text-xs uppercase tracking-widest text-sage-dark">
            {categoryLabel(product.category)}
          </span>
          <h1 className="mt-1 font-display text-3xl text-ink">{product.name}</h1>
          <p className="mt-3 text-xl font-medium text-rose-dark">
            {product.isCustom ? "Custom quote" : formatPrice(product.priceCents)}
          </p>

          {soldOut && (
            <span className="mt-3 inline-block rounded-full bg-ink/80 px-3 py-1 text-xs text-cream">
              Sold out
            </span>
          )}
          {lowStock && (
            <span className="mt-3 inline-block rounded-full bg-terracotta/20 px-3 py-1 text-xs text-terracotta-dark">
              Only {product.stock} left
            </span>
          )}

          <p className="mt-5 max-w-prose whitespace-pre-line text-ink-soft">
            {product.description}
          </p>

          <div className="mt-8">
            {product.isCustom ? (
              <Link
                href="/custom-order"
                className="inline-block rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-8 py-3 text-sm font-medium text-cream transition"
              >
                Start a custom order
              </Link>
            ) : (
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                name={product.name}
                priceCents={product.priceCents}
                image={product.images[0] ?? null}
                stock={product.stock}
              />
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
