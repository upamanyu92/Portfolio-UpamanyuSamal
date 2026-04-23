"use client";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import type { CanvasNodeData } from "@/data/canvas-nodes";

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
  purple: "bg-purple-500/10 border-purple-500/30 text-purple-300",
  emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
  orange: "bg-orange-500/10 border-orange-500/30 text-orange-300",
};

export default function SkillsNode({ data }: { data: CanvasNodeData }) {
  const skills = data.skills!;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bento-card p-5 w-[400px]"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)" }}
    >
      <Handle type="target" position={Position.Right} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />

      <div className="mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-400 rounded-full" />
        <span className="text-purple-400/70 text-[10px] tracking-widest uppercase">Skills &amp; Technologies</span>
      </div>

      <div className="space-y-4">
        {skills.map((category) => {
          const cls = colorMap[category.color] ?? "bg-slate-500/10 border-slate-500/30 text-slate-300";
          return (
            <div key={category.title}>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{category.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span key={skill} className={`px-2 py-0.5 rounded-full text-[11px] border ${cls}`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
