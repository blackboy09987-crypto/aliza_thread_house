import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center">
      <h1 className="font-display text-3xl text-ink">Checkout cancelled</h1>
      <p className="mt-3 text-ink-soft">
        No worries — your cart is still saved if you&apos;d like to try again.
      </p>
      <Link
        href="/cart"
        className="mt-8 inline-block rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-7 py-3 text-sm font-medium text-cream"
      >
        Back to cart
      </Link>
    </div>
  );
}
