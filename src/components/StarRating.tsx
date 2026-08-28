export default function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const starSize = size === "sm" ? "text-sm" : "text-lg";
  return (
    <div className={`flex gap-0.5 ${starSize}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "text-gold" : "text-cream-line"} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}
