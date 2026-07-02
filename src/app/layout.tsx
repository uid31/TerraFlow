import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerraFlow · Smart Irrigation",
  description: "Soil-aware irrigation monitoring",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
