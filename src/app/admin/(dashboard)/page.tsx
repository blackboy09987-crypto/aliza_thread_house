import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { categoryLabel } from "@/lib/categories";
import { deleteProduct } from "@/lib/actions/products";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-ink">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-rose-dark px-5 py-2 text-sm font-medium text-cream hover:bg-terracotta-dark"
        >
          + Add product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-cream-line text-ink-soft">
              <th className="py-2 pr-4">Image</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Category</th>
              <th className="py-2 pr-4">Price</th>
              <th className="py-2 pr-4">Stock</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const images: string[] = JSON.parse(product.images || "[]");
              return (
                <tr key={product.id} className="border-b border-cream-line">
                  <td className="py-3 pr-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-cream-soft">
                      {images[0] && (
                        <Image src={images[0]} alt={product.name} fill className="object-cover" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-medium text-ink">{product.name}</td>
                  <td className="py-3 pr-4 text-ink-soft">{categoryLabel(product.category)}</td>
                  <td className="py-3 pr-4">
                    {product.isCustom ? "Custom" : formatPrice(product.priceCents)}
                  </td>
                  <td className="py-3 pr-4">{product.stock}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        product.isActive
                          ? "bg-sage/20 text-sage-dark"
                          : "bg-ink/10 text-ink-soft"
                      }`}
                    >
                      {product.isActive ? "Active" : "Hidden"}
                    </span>
                    {product.isFeatured && (
                      <span className="ml-1 rounded-full bg-gold/20 px-2 py-1 text-xs text-terracotta-dark">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-rose-dark hover:underline"
                      >
                        Edit
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="text-ink-soft hover:text-terracotta-dark">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
