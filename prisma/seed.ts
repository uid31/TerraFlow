import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const soilProfiles = [
  { name: "Sandy", icon: "🌾", description: "Drains fast, needs frequent light watering." },
  { name: "Clay", icon: "🪨", description: "Holds water well, watch for waterlogging." },
  { name: "Loamy", icon: "🌿", description: "Balanced texture, ideal moisture retention." },
];

// Demo users — passwords are hashed before insert, never stored plain.
const demoUsers = [
  { username: "fieldmanager01", password: "TerraFlow123!", soilType: "Loamy" },
  { username: "shahad", password: "ChangeMe123!", soilType: "Sandy" },
];

async function main() {
  console.log("Seeding soil profiles...");
  for (const profile of soilProfiles) {
    await prisma.soilProfile.upsert({
      where: { name: profile.name },
      update: profile,
      create: profile,
    });
  }

  console.log("Seeding demo users...");
  for (const u of demoUsers) {
    const hashed = await bcrypt.hash(u.password, 10);
    const user = await prisma.user.upsert({
      where: { username: u.username },
      update: { soilType: u.soilType },
      create: { username: u.username, password: hashed, soilType: u.soilType },
    });

    await prisma.sensorReading.createMany({
      data: [
        { userId: user.id, moisture: 42, temperature: 27, waterLevel: 68 },
        { userId: user.id, moisture: 38, temperature: 29, waterLevel: 61 },
        { userId: user.id, moisture: 55, temperature: 24, waterLevel: 74 },
      ],
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
