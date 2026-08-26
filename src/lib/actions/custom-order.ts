"use server";

import { prisma } from "@/lib/prisma";
import { customOrderSchema } from "@/lib/schemas";

export type CustomOrderState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitCustomOrder(
  _prevState: CustomOrderState,
  formData: FormData
): Promise<CustomOrderState> {
  const budgetRaw = formData.get("budget");
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    description: formData.get("description"),
    budgetCents:
      budgetRaw && String(budgetRaw).trim() !== ""
        ? Math.round(Number(budgetRaw) * 100)
        : undefined,
  };

  const parsed = customOrderSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  await prisma.customOrderRequest.create({ data: parsed.data });

  return {
    status: "success",
    message: "Thank you! Aliza will follow up by email with a quote soon.",
  };
}
