import Image from "next/image";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "About Us",
  description:
    "The story behind Aliza's Thread House — a small, handmade crochet and embroidery business based in Pakistan.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <FadeIn>
        <span className="font-script text-3xl text-rose-dark">Our story</span>
        <h1 className="font-display text-3xl text-ink">The art of thread</h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative mx-auto mt-8 aspect-square max-w-sm overflow-hidden rounded-2xl border border-cream-line bg-white shadow-md shadow-rose-soft/30">
          <Image
            src="/brand/logo.png"
            alt="Aliza's Thread House logo"
            fill
            className="object-cover"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.15} className="mt-8 space-y-5 text-ink-soft">
        <p>
          Aliza&apos;s Thread House started with a hoop, a needle, and a lot
          of patience. What began as a way to unwind grew into a small
          collection of embroidery art and crochet pieces — each one stitched
          by hand, one loop or one pass of the needle at a time.
        </p>
        <p>
          Every piece here is made to order rather than mass-produced, so
          quantities are limited and small imperfections are part of the
          charm. If you have something specific in mind — a name, a color
          palette, an occasion — custom pieces are always welcome.
        </p>
        <p>
          Thank you for supporting a small, handmade business. It means the
          world.
        </p>
      </FadeIn>

      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="https://www.instagram.com/_alizas.thread.house_/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/20 px-6 py-2 text-sm text-ink transition hover:border-rose-dark hover:text-rose-dark"
        >
          Instagram
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61581774740153"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-ink/20 px-6 py-2 text-sm text-ink transition hover:border-rose-dark hover:text-rose-dark"
        >
          Facebook
        </a>
      </div>
    </div>
  );
}
