import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Upamanyu Samal | Software Architect & Technical Lead",
  description: "Portfolio of Upamanyu Samal – Software Architect with 9+ years experience in cloud-native systems, AI pipelines, and distributed architectures at Thomson Reuters.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif" }} className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
