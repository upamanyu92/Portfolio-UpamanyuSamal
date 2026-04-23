"use client";
import dynamic from "next/dynamic";

const SpatialCanvas = dynamic(() => import("./SpatialCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{ background: "#050a18" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="w-2 h-2 bg-cyan-400 rounded-full neon-dot" />
        <span className="text-slate-500 text-sm tracking-widest uppercase">Loading canvas…</span>
      </div>
    </div>
  ),
});

export default function SpatialCanvasLoader() {
  return <SpatialCanvas />;
}
