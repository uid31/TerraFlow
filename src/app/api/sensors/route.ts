import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromSession } from "@/lib/auth";

// POST /api/sensors — record and return a new simulated reading for the logged-in user
export async function POST() {
  const userId = getUserIdFromSession();
  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const moisture = Math.floor(Math.random() * 100);
  const temperature = Math.floor(Math.random() * 40 + 10);
  const waterLevel = Math.floor(Math.random() * 100);

  const reading = await prisma.sensorReading.create({
    data: { userId, moisture, temperature, waterLevel },
  });

  return NextResponse.json(reading);
}
