"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPassword, setSessionCookie } from "@/lib/auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = (formData.get("username") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();

  if (!username || !password) {
    return { error: "Please fill in both fields." };
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return { error: "Invalid username or password." };
  }

  const valid = await verifyPassword(password, user.password);
  if (!valid) {
    return { error: "Invalid username or password." };
  }

  setSessionCookie(user.id);

  // Always send the user to soil selection right after login,
  // never straight to the dashboard without choosing a soil type.
  redirect("/selection");
}
