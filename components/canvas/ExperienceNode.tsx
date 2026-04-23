"use client";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import type { CanvasNodeData } from "@/data/canvas-nodes";

export default function ExperienceNode({ data }: { data: CanvasNodeData }) {
  const experiences = data.experiences!;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bento-card p-5 w-[400px]"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)" }}
    >
      <Handle type="target" position={Position.Right} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />

      <div className="mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-emerald-400 rounded-full neon-dot" />
        <span className="text-emerald-400/70 text-[10px] tracking-widest uppercase">Experience Timeline</span>
      </div>

      <div className="relative pl-4">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent" />

        <div className="space-y-5">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-cyan-400 bg-slate-900" />
              <div className="flex items-start justify-between gap-2 mb-1">
                <div>
                  <h4 className="text-white text-sm font-semibold leading-tight">{exp.role}</h4>
                  <p className="text-cyan-400 text-xs">{exp.company}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">{exp.period}</span>
                  {exp.current && (
                    <div className="mt-0.5 flex justify-end">
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        Current
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-slate-500 text-[10px]">{exp.location}</p>
              <ul className="mt-1.5 space-y-0.5">
                {exp.description.slice(0, 2).map((d, i) => (
                  <li key={i} className="text-slate-400 text-[11px] leading-relaxed flex gap-1.5">
                    <span className="text-cyan-600 shrink-0 mt-0.5">▸</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
