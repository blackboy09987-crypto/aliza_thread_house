"use client";

import { useActionState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { ProductFormState } from "@/lib/actions/products";
import type { ProductWithImages } from "@/lib/products";
import ImageGalleryField from "@/components/admin/ImageGalleryField";

const initialState: ProductFormState = {};

export default function ProductForm({
  action,
  product,
}: {
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
  product?: ProductWithImages;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid max-w-2xl gap-4">
      <Field name="name" label="Name" defaultValue={product?.name} required />
      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Description
        <textarea
          name="description"
          rows={5}
          required
          defaultValue={product?.description}
          className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Field
          name="priceRupees"
          label="Price (Rs.)"
          type="number"
          step="1"
          min="0"
          defaultValue={product ? (product.priceCents / 100).toString() : undefined}
          required
        />
        <Field
          name="stock"
          label="Stock"
          type="number"
          min="0"
          defaultValue={product?.stock?.toString() ?? "1"}
          required
        />
      </div>

      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Category
        <select
          name="category"
          defaultValue={product?.category ?? CATEGORIES[0].value}
          className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </label>

      <ImageGalleryField existingImages={product?.images} />

      <div className="flex flex-wrap gap-6">
        <Checkbox name="isCustom" label="Custom order (no fixed price)" defaultChecked={product?.isCustom} />
        <Checkbox name="isFeatured" label="Featured on homepage" defaultChecked={product?.isFeatured} />
        <Checkbox
          name="isActive"
          label="Active (visible in shop)"
          defaultChecked={product?.isActive ?? true}
        />
      </div>

      {state.error && <p className="text-sm text-terracotta-dark">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 w-fit rounded-full bg-rose-dark px-8 py-3 text-sm font-medium text-cream transition hover:bg-terracotta-dark disabled:opacity-60"
      >
        {pending ? "Saving…" : product ? "Save changes" : "Create product"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  defaultValue,
  step,
  min,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  step?: string;
  min?: string;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-ink-soft">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        step={step}
        min={min}
        className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
      />
    </label>
  );
}

function Checkbox({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink-soft">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}
