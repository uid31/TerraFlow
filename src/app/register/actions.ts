"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie } from "@/lib/auth";

export interface RegisterState {
  error?: string;
}

export async function registerAction(_prevState: RegisterState, formData: FormData): Promise<RegisterState> {
  const username = (formData.get("username") as string || "").trim();
  const password = (formData.get("password") as string || "").trim();
  const confirm = (formData.get("confirm") as string || "").trim();

  if (!username || !password || !confirm) {
    return { error: "Please fill in all fields." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) {
    return { error: "Username already taken." };
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({ data: { username, password: hashed } });

  setSessionCookie(user.id);
  redirect("/selection");
}
