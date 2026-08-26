"use client";

import { useActionState } from "react";
import { submitCustomOrder, type CustomOrderState } from "@/lib/actions/custom-order";

const initialState: CustomOrderState = { status: "idle" };

export default function CustomOrderForm() {
  const [state, action, pending] = useActionState(submitCustomOrder, initialState);

  if (state.status === "success") {
    return (
      <div className="mt-8 rounded-2xl border border-sage/40 bg-sage/10 p-6 text-sage-dark">
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <Field name="name" label="Your name" required />
      <Field name="email" label="Email" type="email" required />
      <Field name="phone" label="Phone (optional)" />
      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Describe your idea
        <textarea
          name="description"
          rows={5}
          required
          minLength={10}
          placeholder="Style, colors, size, occasion, reference photos you can share via email..."
          className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
        />
      </label>
      <Field name="budget" label="Budget in Rs. (optional)" type="number" />

      {state.status === "error" && (
        <p className="text-sm text-terracotta-dark">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full btn-gradient transition-transform duration-200 hover:scale-[1.03] px-8 py-3 text-sm font-medium text-cream transition disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-ink-soft">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
      />
    </label>
  );
}
