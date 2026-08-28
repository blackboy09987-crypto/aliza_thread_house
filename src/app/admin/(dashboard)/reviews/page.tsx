import { prisma } from "@/lib/prisma";
import StarRating from "@/components/StarRating";
import { approveReview, deleteReview } from "@/lib/actions/reviews";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { name: true } } },
  });

  const pending = reviews.filter((r) => !r.isApproved);
  const approved = reviews.filter((r) => r.isApproved);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Reviews</h1>

      {reviews.length === 0 ? (
        <p className="mt-6 text-ink-soft">No reviews yet.</p>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-lg text-terracotta-dark">
                Pending approval ({pending.length})
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {pending.map((review) => (
                  <ReviewRow key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}

          {approved.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-lg text-ink">Approved ({approved.length})</h2>
              <div className="mt-3 flex flex-col gap-3">
                {approved.map((review) => (
                  <ReviewRow key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function ReviewRow({
  review,
}: {
  review: {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    isApproved: boolean;
    product: { name: string } | null;
  };
}) {
  return (
    <div className="rounded-2xl border border-cream-line bg-cream p-4">
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
        <div className="flex gap-2">
          {!review.isApproved && (
            <form action={approveReview}>
              <input type="hidden" name="id" value={review.id} />
              <button
                type="submit"
                className="rounded-full bg-sage-dark px-3 py-1 text-xs text-cream hover:opacity-90"
              >
                Approve
              </button>
            </form>
          )}
          <form action={deleteReview}>
            <input type="hidden" name="id" value={review.id} />
            <button
              type="submit"
              className="rounded-full border border-cream-line px-3 py-1 text-xs text-ink-soft hover:text-terracotta-dark"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
