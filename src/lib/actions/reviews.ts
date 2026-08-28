"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";
import { reviewSchema } from "@/lib/schemas";

export type ReviewFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitReview(
  _prevState: ReviewFormState,
  formData: FormData
): Promise<ReviewFormState> {
  const parsed = reviewSchema.safeParse({
    customerName: formData.get("customerName"),
    rating: formData.get("rating"),
    comment: formData.get("comment"),
    productId: formData.get("productId") || undefined,
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  await prisma.review.create({ data: { ...parsed.data, isApproved: true } });
  revalidatePath("/reviews");

  return {
    status: "success",
    message: "Thank you! Your review is now live.",
  };
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
}

export async function deleteReview(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) return;
  await prisma.review.delete({ where: { id } }).catch(() => null);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}
