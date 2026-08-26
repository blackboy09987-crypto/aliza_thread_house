import CustomOrderForm from "@/components/CustomOrderForm";

export const metadata = {
  title: "Custom Crochet & Embroidery Orders",
  description:
    "Request a custom handmade crochet or embroidery piece — names, colors, portraits, and more, made to order in Pakistan.",
  keywords: ["custom crochet order", "personalized embroidery", "custom keychain Pakistan"],
};

export default function CustomOrderPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <span className="font-script text-3xl text-rose-dark">Bring your idea</span>
      <h1 className="font-display text-3xl text-ink">Request a custom piece</h1>
      <p className="mt-3 text-ink-soft">
        Portraits, matching sets, wedding pieces, or anything else you can
        imagine in thread and yarn — tell us about it and we&apos;ll follow up
        with a quote and timeline.
      </p>

      <CustomOrderForm />
    </div>
  );
}
