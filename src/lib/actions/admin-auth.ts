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
  const plainPassword = process.env.ADMIN_PASSWORD;
  const hash = process.env.ADMIN_PASSWORD_HASH;

  let valid = false;
  if (plainPassword) {
    valid = password === plainPassword;
  } else if (hash) {
    valid = await bcrypt.compare(password, hash);
  } else {
    return { error: "Admin login is not configured. Set ADMIN_PASSWORD." };
  }

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
