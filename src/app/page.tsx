import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import StaggerGrid from "@/components/StaggerGrid";
import FadeIn from "@/components/FadeIn";
import { CATEGORY_ICONS } from "@/components/icons";
import { getFeaturedProducts } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";

// Render at request time — prerendering this at build time would make every
// deploy depend on the database being reachable during the build step.
export const dynamic = "force-dynamic";

const VALUE_PROPS = [
  {
    title: "Made by hand, to order",
    description: "Every piece is stitched one at a time — no factories, no mass production.",
  },
  {
    title: "Custom designs welcome",
    description: "Names, colors, or a completely original idea — just ask.",
  },
  {
    title: "Ships from Pakistan",
    description: "Reach out via Instagram or the order form to arrange delivery.",
  },
];

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 sm:py-24 lg:grid-cols-2">
        <FadeIn>
          <span className="font-script text-3xl text-rose-dark">The art of thread</span>
          <h1 className="mt-2 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Handmade embroidery &amp; crochet, stitched just for you.
          </h1>
          <p className="mt-5 max-w-md text-ink-soft">
            Every piece from Aliza&apos;s Thread House is made one stitch at a
            time — hoop art, cozy cardigans, tiny crochet friends, and
            bouquets that never wilt. Custom designs always welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-7 py-3 text-sm font-medium text-cream transition"
            >
              Shop the collection
            </Link>
            <Link
              href="/custom-order"
              className="rounded-full border border-ink/20 px-7 py-3 text-sm font-medium text-ink transition hover:border-rose-dark hover:text-rose-dark"
            >
              Request a custom piece
            </Link>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} y={24}>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-cream-line bg-white shadow-lg shadow-rose-soft/40">
            <Image
              src="/brand/logo.png"
              alt="Aliza's Thread House"
              fill
              className="object-cover"
              priority
            />
          </div>
        </FadeIn>
      </section>

      <div className="stitch-divider mx-auto max-w-6xl" />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <FadeIn>
          <h2 className="font-display text-2xl text-ink">Shop by category</h2>
        </FadeIn>
        <StaggerGrid className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.value];
            return (
              <Link
                key={cat.value}
                href={`/shop?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-cream-line bg-cream-soft px-3 py-6 text-center transition hover:border-rose hover:-translate-y-0.5"
              >
                {Icon && <Icon className="h-7 w-7 text-rose-dark" />}
                <span className="font-display text-sm text-ink">{cat.label}</span>
                <span className="text-xs text-ink-soft">{cat.blurb}</span>
              </Link>
            );
          })}
        </StaggerGrid>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-16">
          <FadeIn>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl text-ink">Featured pieces</h2>
              <Link href="/shop" className="text-sm text-rose-dark hover:underline">
                View all →
              </Link>
            </div>
          </FadeIn>
          <StaggerGrid className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggerGrid>
        </section>
      )}

      <section className="border-y border-cream-line bg-cream-soft">
        <StaggerGrid className="mx-auto grid max-w-5xl gap-8 px-5 py-14 sm:grid-cols-3">
          {VALUE_PROPS.map((prop) => (
            <div key={prop.title} className="text-center">
              <h3 className="font-display text-lg text-ink">{prop.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{prop.description}</p>
            </div>
          ))}
        </StaggerGrid>
      </section>

      <section className="border-b border-cream-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-14 text-center">
          <span className="font-script text-3xl text-rose-dark">Follow along</span>
          <p className="max-w-md text-ink-soft">
            See the newest pieces, works in progress, and customer reviews
            over on Instagram.
          </p>
          <a
            href="https://www.instagram.com/_alizas.thread.house_/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-7 py-3 text-sm font-medium text-cream transition hover:bg-rose-dark"
          >
            @_alizas.thread.house_
          </a>
        </div>
      </section>
    </>
  );
}
