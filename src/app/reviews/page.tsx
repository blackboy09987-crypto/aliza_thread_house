import Link from "next/link";
import StarRating from "@/components/StarRating";
import ReviewForm from "@/components/ReviewForm";
import FadeIn from "@/components/FadeIn";
import StaggerGrid from "@/components/StaggerGrid";
import { getApprovedReviews, getAverageRating } from "@/lib/reviews";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Customer Reviews",
  description:
    "Read what customers say about Aliza's Thread House handmade crochet and embroidery pieces, and leave your own review.",
};

export default async function ReviewsPage() {
  const [reviews, { average, count }] = await Promise.all([
    getApprovedReviews(),
    getAverageRating(),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <FadeIn>
        <span className="font-script text-3xl text-rose-dark">Kind words</span>
        <h1 className="font-display text-3xl text-ink">Customer reviews</h1>
        {count > 0 ? (
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={Math.round(average)} />
            <span className="text-sm text-ink-soft">
              {average.toFixed(1)} out of 5 · {count} review{count === 1 ? "" : "s"}
            </span>
          </div>
        ) : (
          <p className="mt-3 text-ink-soft">
            No reviews yet — be the first to share your experience below.
          </p>
        )}
      </FadeIn>

      {reviews.length > 0 && (
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-2 rounded-2xl border border-cream-line bg-cream-soft p-5"
            >
              <StarRating rating={review.rating} size="sm" />
              <p className="text-sm text-ink-soft">{review.comment}</p>
              <p className="mt-auto pt-2 text-xs font-medium text-ink">
                {review.customerName}
                {review.product && (
                  <>
                    {" "}
                    ·{" "}
                    <Link href={`/shop/${review.product.slug}`} className="text-rose-dark hover:underline">
                      {review.product.name}
                    </Link>
                  </>
                )}
              </p>
            </div>
          ))}
        </StaggerGrid>
      )}

      <FadeIn className="mt-14 border-t border-cream-line pt-10">
        <h2 className="font-display text-2xl text-ink">Leave a review</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Ordered something from Aliza&apos;s Thread House? We&apos;d love to hear about it.
        </p>
        <div className="mt-6 max-w-lg">
          <ReviewForm />
        </div>
      </FadeIn>
    </div>
  );
}
