import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const COOKIE_NAME = "aliza_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getJwtSecret(): string {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET is not set in your environment.");
  }
  return secret;
}

export async function createAdminSession() {
  const token = jwt.sign({ role: "admin" }, getJwtSecret(), {
    expiresIn: SESSION_TTL_SECONDS,
  });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    jwt.verify(token, getJwtSecret());
    return true;
  } catch {
    return false;
  }
}
