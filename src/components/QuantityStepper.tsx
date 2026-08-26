"use client";

export default function QuantityStepper({
  quantity,
  max,
  onChange,
}: {
  quantity: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-cream-line">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink-soft transition hover:bg-cream-soft disabled:opacity-30"
      >
        −
      </button>
      <span className="min-w-8 text-center text-sm text-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center rounded-full text-lg text-ink-soft transition hover:bg-cream-soft disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
