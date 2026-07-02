"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { selectSoilAction } from "@/app/selection/actions";

interface Profile {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export default function SoilSelector({
  profiles,
  initialSelected,
}: {
  profiles: Profile[];
  initialSelected: string | null;
}) {
  const [selected, setSelected] = useState(initialSelected);
  const [, startTransition] = useTransition();

  function handleSelect(profile: Profile) {
    setSelected(profile.name); // instant UI feedback
    startTransition(() => {
      selectSoilAction(profile.name); // saved in the background
    });
  }

  const selectedProfile = profiles.find((p) => p.name === selected);

  return (
    <>
      <div className="grid">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className={`glass card ${selected === profile.name ? "selected" : ""}`}
            onClick={() => handleSelect(profile)}
          >
            <span className="icon">{profile.icon}</span>
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
          </div>
        ))}
      </div>

      <div className="selection-footer">
        <p style={{ margin: 0 }}>
          {selectedProfile
            ? `${selectedProfile.name} soil selected — ${selectedProfile.description}`
            : "Select a soil type to continue."}
        </p>
        {selected ? (
          <Link href="/dashboard">
            <button>Continue → Dashboard</button>
          </Link>
        ) : (
          <button disabled>Continue → Dashboard</button>
        )}
      </div>
    </>
  );
}
