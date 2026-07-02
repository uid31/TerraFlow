import Link from "next/link";
import { logoutAction } from "@/app/actions";

export default function Sidebar({ active }: { active: "selection" | "dashboard" }) {
  return (
    <div className="sidebar glass">
      <div className="brand">🌿 TerraFlow</div>
      <nav>
        <Link href="/selection" className={active === "selection" ? "active" : ""}>
          🌱 Soil Selection
        </Link>
        <Link href="/dashboard" className={active === "dashboard" ? "active" : ""}>
          📊 Dashboard
        </Link>
      </nav>
      <form action={logoutAction}>
        <button className="logout-btn" type="submit">
          🚪 Logout
        </button>
      </form>
    </div>
  );
}
