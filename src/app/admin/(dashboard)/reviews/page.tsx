import { prisma } from "@/lib/prisma";
import StarRating from "@/components/StarRating";
import { deleteReview } from "@/lib/actions/reviews";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Reviews ({reviews.length})</h1>

      {reviews.length === 0 ? (
        <p className="mt-6 text-ink-soft">No reviews yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-2xl border border-cream-line bg-cream p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="font-medium text-ink">{review.customerName}</span>
                    {review.product && (
                      <span className="text-xs text-ink-soft">— {review.product.name}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{review.comment}</p>
                </div>
                <form action={deleteReview}>
                  <input type="hidden" name="id" value={review.id} />
                  <button
                    type="submit"
                    className="rounded-full border border-cream-line px-3 py-1 text-xs text-ink-soft hover:border-terracotta-dark hover:text-terracotta-dark"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
