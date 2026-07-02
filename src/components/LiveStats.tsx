"use client";

import { useEffect, useState } from "react";

interface Reading {
  moisture: number;
  temperature: number;
  waterLevel: number;
}

export default function LiveStats({ initialReading }: { initialReading: Reading | null }) {
  const [reading, setReading] = useState<Reading | null>(initialReading);

  useEffect(() => {
    async function fetchReading() {
      try {
        const res = await fetch("/api/sensors", { method: "POST" });
        if (res.ok) setReading(await res.json());
      } catch {
        // silently skip a failed tick; next interval retries
      }
    }
    const id = setInterval(fetchReading, 5000);
    return () => clearInterval(id);
  }, []);

  const moisture = reading?.moisture ?? null;
  const isDry = moisture !== null && moisture < 25;

  return (
    <div className="stat-grid">
      <div className="glass stat-card">
        <div className="stat-top">
          <span className="stat-icon">🌱</span>
        </div>
        <div className="stat-label">Moisture</div>
        <h2 className="stat-value">{reading ? `${reading.moisture}%` : "--"}</h2>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${reading?.moisture ?? 0}%` }} />
        </div>
        <span className={`stat-status ${isDry ? "status-warn" : "status-good"}`}>
          {reading ? (isDry ? "Soil is too dry" : "Within range") : "Reading…"}
        </span>
      </div>

      <div className="glass stat-card">
        <div className="stat-top">
          <span className="stat-icon">🌡</span>
        </div>
        <div className="stat-label">Temperature</div>
        <h2 className="stat-value">{reading ? `${reading.temperature}°C` : "--"}</h2>
        <div className="bar-track">
          <div
            className="bar-fill"
            style={{ width: `${Math.min(100, Math.round(((reading?.temperature ?? 0) / 50) * 100))}%` }}
          />
        </div>
      </div>

      <div className="glass stat-card">
        <div className="stat-top">
          <span className="stat-icon">💧</span>
        </div>
        <div className="stat-label">Water level</div>
        <h2 className="stat-value">{reading ? `${reading.waterLevel}%` : "--"}</h2>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${reading?.waterLevel ?? 0}%` }} />
        </div>
      </div>
    </div>
  );
}
