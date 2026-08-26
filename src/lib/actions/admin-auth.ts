"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createAdminSession, destroyAdminSession } from "@/lib/auth";

export type AdminLoginState = { error?: string };

export async function loginAdmin(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const password = String(formData.get("password") || "");
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (!hash) {
    return { error: "Admin login is not configured. Set ADMIN_PASSWORD_HASH." };
  }

  const valid = await bcrypt.compare(password, hash);
  if (!valid) {
    return { error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  "use server";
  await destroyAdminSession();
  redirect("/admin/login");
}
