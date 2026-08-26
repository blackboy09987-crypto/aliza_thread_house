import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/products";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raw = await prisma.product.findUnique({ where: { id } });
  if (!raw) notFound();

  const product = { ...raw, images: JSON.parse(raw.images || "[]") as string[] };
  const action = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl text-ink">Edit product</h1>
      <div className="mt-6">
        <ProductForm action={action} product={product} />
      </div>
    </div>
  );
}
