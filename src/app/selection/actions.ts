"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function selectSoilAction(soilType: string) {
  const user = await requireUser();

  const profile = await prisma.soilProfile.findUnique({ where: { name: soilType } });
  if (!profile) return;

  await prisma.user.update({
    where: { id: user.id },
    data: { soilType },
  });

  revalidatePath("/selection");
  revalidatePath("/dashboard");
}
