export function formatPrice(cents: number): string {
  const rupees = cents / 100;
  const formatted = new Intl.NumberFormat("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(rupees);
  return `Rs. ${formatted}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
