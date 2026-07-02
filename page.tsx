import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import SoilSelector from "@/components/SoilSelector";

export default async function SelectionPage() {
  const user = await requireUser();
  const profiles = await prisma.soilProfile.findMany();

  return (
    <div className="app">
      <Sidebar active="selection" />

      <div className="content">
        <div className="eyebrow">Step 1 of 2</div>
        <h1>Choose your soil type</h1>
        <p style={{ marginTop: 8 }}>This calibrates how your dashboard reads moisture and water level.</p>

        <SoilSelector profiles={profiles} initialSelected={user.soilType} />
      </div>
    </div>
  );
}
