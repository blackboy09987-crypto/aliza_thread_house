"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore, cartTotals } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import { useHasMounted } from "@/lib/use-has-mounted";
import { DELIVERY_FEE_CENTS } from "@/lib/site-config";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const mounted = useHasMounted();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!mounted) return null;

  const { totalCents } = cartTotals(items);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const customer = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      addressLine1: String(formData.get("addressLine1") || ""),
      addressLine2: String(formData.get("addressLine2") || ""),
      city: String(formData.get("city") || ""),
      state: String(formData.get("state") || ""),
      postalCode: String(formData.get("postalCode") || ""),
      country: String(formData.get("country") || "Pakistan"),
      note: String(formData.get("note") || ""),
    };

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      clear();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-ink-soft">Your cart is empty.</p>
        <Link href="/shop" className="mt-4 inline-block text-rose-dark hover:underline">
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="font-display text-3xl text-ink">Checkout</h1>
      <div className="mt-2 space-y-1 text-sm text-ink-soft">
        <p>
          Subtotal: <span className="font-medium text-ink">{formatPrice(totalCents)}</span>
        </p>
        <p>
          Delivery fee: <span className="font-medium text-ink">{formatPrice(DELIVERY_FEE_CENTS)}</span>
        </p>
        <p>
          Total:{" "}
          <span className="font-medium text-ink">
            {formatPrice(totalCents + DELIVERY_FEE_CENTS)}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Full name" required className="sm:col-span-2" />
        <Field name="phone" label="Phone / WhatsApp" required />
        <Field name="email" label="Email (optional)" type="email" />
        <Field name="addressLine1" label="Address" required className="sm:col-span-2" />
        <Field name="addressLine2" label="Apt / suite (optional)" className="sm:col-span-2" />
        <Field name="city" label="City" required />
        <Field name="state" label="Province (optional)" />
        <Field name="postalCode" label="Postal code" required />
        <Field name="country" label="Country" required defaultValue="Pakistan" />

        <label className="flex flex-col gap-1 text-sm text-ink-soft sm:col-span-2">
          Order note (optional)
          <textarea
            name="note"
            rows={3}
            className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
          />
        </label>

        {error && <p className="text-sm text-terracotta-dark sm:col-span-2">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-8 py-3 text-sm font-medium text-cream transition disabled:opacity-60 sm:col-span-2"
        >
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-sm text-ink-soft ${className ?? ""}`}>
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
      />
    </label>
  );
}
