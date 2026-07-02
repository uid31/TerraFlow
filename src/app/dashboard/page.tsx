import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import LiveStats from "@/components/LiveStats";

export default async function DashboardPage() {
  const user = await requireUser();

  const initialReading = await prisma.sensorReading.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="app">
      <Sidebar active="dashboard" />

      <div className="content">
        <div className="eyebrow">Step 2 of 2</div>
        <h1>Live system</h1>
        <p style={{ marginTop: 8 }}>
          Soil profile: <strong style={{ color: "var(--leaf-soft)" }}>{user.soilType || "Not selected"}</strong>
        </p>

        <LiveStats initialReading={initialReading} />
      </div>
    </div>
  );
}
