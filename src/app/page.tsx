import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="hero">
        <div className="glass" style={{ maxWidth: 620 }}>
          <span className="badge">🌱 Soil Intelligence Platform</span>
          <h1>
            Know your soil.
            <br />
            Water with purpose.
          </h1>
          <div className="leaf-divider"></div>
          <p className="lede">
            Live moisture, temperature and water-level readings paired with soil-aware
            recommendations — so every drop counts.
          </p>
          <div className="actions">
            <Link href="/login">
              <button>Sign in to your system</button>
            </Link>
            <a href="#how">
              <button className="ghost">How it works</button>
            </a>
          </div>
        </div>
      </div>

      <div id="how" className="content" style={{ maxWidth: 900, margin: "0 auto", paddingBottom: 80 }}>
        <div className="eyebrow">How it works</div>
        <h2 style={{ marginBottom: 24 }}>Three steps to a healthier field</h2>
        <div className="grid">
          <div className="glass card" style={{ cursor: "default" }}>
            <span className="icon">🔐</span>
            <h3>Sign in</h3>
            <p>Access your private irrigation dashboard securely.</p>
          </div>
          <div className="glass card" style={{ cursor: "default" }}>
            <span className="icon">🌾</span>
            <h3>Choose soil type</h3>
            <p>Sandy, clay or loamy — calibrate readings to your field.</p>
          </div>
          <div className="glass card" style={{ cursor: "default" }}>
            <span className="icon">📊</span>
            <h3>Monitor live</h3>
            <p>Track moisture, temperature and water level in real time.</p>
          </div>
        </div>
      </div>
    </>
  );
}
