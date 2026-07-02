import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import Sidebar from "@/components/Sidebar";
import { selectSoilAction } from "./actions";

export default async function SelectionPage() {
  const user = await requireUser();
  const profiles = await prisma.soilProfile.findMany();
  const selected = profiles.find((p) => p.name === user.soilType);

  return (
    <div className="app">
      <Sidebar active="selection" />

      <div className="content">
        <div className="eyebrow">Step 1 of 2</div>
        <h1>Choose your soil type</h1>
        <p style={{ marginTop: 8 }}>This calibrates how your dashboard reads moisture and water level.</p>

        <div className="grid">
          {profiles.map((profile) => (
            <form key={profile.id} action={selectSoilAction}>
              <input type="hidden" name="soilType" value={profile.name} />
              <button
                type="submit"
                className={`glass card ${user.soilType === profile.name ? "selected" : ""}`}
                style={{ width: "100%", textAlign: "center", background: "none" }}
              >
                <span className="icon">{profile.icon}</span>
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
              </button>
            </form>
          ))}
        </div>

        <div className="selection-footer">
          <p style={{ margin: 0 }}>
            {selected
              ? `${selected.name} soil selected — ${selected.description}`
              : "Select a soil type to continue."}
          </p>
          {user.soilType ? (
            <Link href="/dashboard">
              <button>Continue → Dashboard</button>
            </Link>
          ) : (
            <button disabled>Continue → Dashboard</button>
          )}
        </div>
      </div>
    </div>
  );
}
