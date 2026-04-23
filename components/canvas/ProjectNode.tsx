"use client";
import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { CanvasNodeData } from "@/data/canvas-nodes";

export default function ProjectNode({ data }: { data: CanvasNodeData }) {
  const project = data.project!;
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bento-card w-[320px] overflow-hidden cursor-pointer"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)" }}
      onClick={() => setExpanded((e) => !e)}
    >
      <Handle type="target" position={Position.Left} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />

      {/* Gradient accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest">{project.category}</span>
            <h3 className="text-white font-semibold text-sm mt-0.5 leading-tight">{project.title}</h3>
          </div>
          <button className="text-slate-500 hover:text-cyan-400 transition-colors shrink-0 mt-1">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed mb-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/80 border border-slate-700/50 text-slate-400">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/80 border border-slate-700/50 text-slate-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-slate-800/50 pt-3 mt-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Impact</p>
                <ul className="space-y-1">
                  {project.impact.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-xs text-slate-300">
                      <span className="text-cyan-400 mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
