"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/lib/actions/reviews";

const initialState: ReviewFormState = { status: "idle" };

export default function ReviewForm() {
  const [state, action, pending] = useActionState(submitReview, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-sage/40 bg-sage/10 p-6 text-sage-dark">
        {state.message}
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Your name
        <input
          name="customerName"
          required
          className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
        />
      </label>

      <div className="flex flex-col gap-1 text-sm text-ink-soft">
        Rating
        <input type="hidden" name="rating" value={rating} />
        <div className="flex gap-1 text-2xl">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={
                n <= (hoverRating || rating) ? "text-gold" : "text-cream-line hover:text-gold/60"
              }
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <label className="flex flex-col gap-1 text-sm text-ink-soft">
        Your review
        <textarea
          name="comment"
          rows={4}
          required
          minLength={10}
          placeholder="Tell us about the piece you ordered and your experience..."
          className="rounded-lg border border-cream-line bg-cream px-3 py-2 text-ink"
        />
      </label>

      {state.status === "error" && <p className="text-sm text-terracotta-dark">{state.message}</p>}
      {rating === 0 && state.status === "error" && (
        <p className="text-sm text-terracotta-dark">Please pick a star rating.</p>
      )}

      <button
        type="submit"
        disabled={pending || rating === 0}
        className="self-start rounded-full btn-gradient px-8 py-3 text-sm font-medium text-cream transition-transform duration-200 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}
