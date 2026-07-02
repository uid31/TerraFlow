import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const SESSION_COOKIE = "session";

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

// Call from a Server Action or Route Handler (not a plain Server Component —
// Next only allows setting cookies from those two places).
export function setSessionCookie(userId: number) {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function clearSessionCookie() {
  cookies().delete(SESSION_COOKIE);
}

// Safe to call from Server Components, Server Actions, or Route Handlers.
export function getUserIdFromSession(): number | null {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number };
    return payload.userId;
  } catch {
    return null;
  }
}

// Fetch the full logged-in user record, or null if not logged in.
export async function getCurrentUser() {
  const userId = getUserIdFromSession();
  if (!userId) return null;
  return prisma.user.findUnique({ where: { id: userId } });
}

// Use at the top of a protected Server Component page — redirects to
// /login if there's no valid session, otherwise returns the user.
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
