"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { productFormSchema } from "@/lib/schemas";
import { slugify } from "@/lib/format";

export type ProductFormState = { error?: string };

const CATEGORY_PLACEHOLDER: Record<string, string> = {
  EMBROIDERY: "/products/embroidery-heart.svg",
  CROCHET_APPAREL: "/products/cardigan-cream.svg",
  AMIGURUMI: "/products/amigurumi-duckling.svg",
  KEYCHAINS: "/products/keychain-cherry.svg",
  BAGS_ACCESSORIES: "/products/bag-rose.svg",
  FLOWERS_BOUQUETS: "/products/bouquet-roses.svg",
  HOME_DECOR: "/products/potholder-set.svg",
  CUSTOM: "/products/custom-placeholder.svg",
};

// Vercel's deployed functions run on a read-only filesystem (only /tmp is
// writable, and it's wiped between invocations and never served publicly),
// so uploaded photos can't be saved to disk like in local dev. Instead we
// store them as base64 data URLs directly in the database — no extra
// storage service to set up. Keep the limit modest since these bytes ride
// along on every page load that shows the image.
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

async function requireAdmin() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    throw new Error("Unauthorized");
  }
}

async function saveUploadedImage(file: File): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Image is too large (max 2MB).");
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Image must be a JPG, PNG, WEBP, or GIF file.");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${bytes.toString("base64")}`;
}

function parseForm(formData: FormData) {
  return productFormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    priceRupees: formData.get("priceRupees"),
    category: formData.get("category"),
    stock: formData.get("stock"),
    isCustom: formData.get("isCustom") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    isActive: formData.get("isActive") === "on",
  });
}

async function resolveImages(formData: FormData, category: string): Promise<string[]> {
  let kept: string[] = [];
  try {
    const raw = JSON.parse(String(formData.get("existingImages") || "[]"));
    if (Array.isArray(raw)) kept = raw.filter((v): v is string => typeof v === "string");
  } catch {
    kept = [];
  }

  const files = formData.getAll("imageFiles").filter(
    (f): f is File => f instanceof File && f.size > 0
  );
  const uploaded = await Promise.all(files.map((file) => saveUploadedImage(file)));

  const images = [...kept, ...uploaded];
  return images.length > 0 ? images : [CATEGORY_PLACEHOLDER[category]];
}

async function uniqueSlug(name: string, excludeId?: string): Promise<string> {
  const base = slugify(name) || "product";
  let slug = base;
  let counter = 1;
  while (
    await prisma.product.findFirst({
      where: { slug, ...(excludeId ? { id: { not: excludeId } } : {}) },
    })
  ) {
    slug = `${base}-${++counter}`;
  }
  return slug;
}

export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;
  const slug = await uniqueSlug(data.name);

  let images: string[];
  try {
    images = await resolveImages(formData, data.category);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not save image" };
  }

  await prisma.product.create({
    data: {
      slug,
      name: data.name,
      description: data.description,
      priceCents: Math.round(data.priceRupees * 100),
      category: data.category,
      stock: data.stock,
      images: JSON.stringify(images),
      isCustom: data.isCustom,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  redirect("/admin");
}

export async function updateProduct(
  id: string,
  _prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  await requireAdmin();
  const parsed = parseForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) {
    return { error: "Product not found" };
  }

  const slug = await uniqueSlug(data.name, id);

  let images: string[];
  try {
    images = await resolveImages(formData, data.category);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Could not save image" };
  }

  await prisma.product.update({
    where: { id },
    data: {
      slug,
      name: data.name,
      description: data.description,
      priceCents: Math.round(data.priceRupees * 100),
      category: data.category,
      stock: data.stock,
      images: JSON.stringify(images),
      isCustom: data.isCustom,
      isFeatured: data.isFeatured,
      isActive: data.isActive,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
  revalidatePath(`/shop/${slug}`);
  redirect("/admin");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.product.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin");
  revalidatePath("/shop");
  revalidatePath("/");
}
