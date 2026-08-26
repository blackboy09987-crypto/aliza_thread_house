"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/auth";

export async function updateOrderStatus(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !status) return;

  await prisma.order.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/orders");
}

export async function confirmOrder(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  const id = String(formData.get("id") || "");
  if (!id) return;

  await prisma.order.update({
    where: { id },
    data: { status: "PAID" },
  });
  revalidatePath("/admin/orders");
}

export async function updateCustomRequestStatus(formData: FormData) {
  if (!(await isAdminAuthenticated())) throw new Error("Unauthorized");
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !status) return;

  await prisma.customOrderRequest.update({
    where: { id },
    data: { status: status as never },
  });
  revalidatePath("/admin/custom-requests");
}
