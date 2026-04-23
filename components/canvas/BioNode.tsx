"use client";
import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { Download, Mail, FolderOpen } from "lucide-react";
import type { CanvasNodeData } from "@/data/canvas-nodes";

const titles = [
  "Strategic Builder",
  "AI Systems Architect",
  "Agentic AI Engineer",
  "Cloud Solution Architect",
  "Distributed Systems Expert",
];

function TypingText() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timer: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timer = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      timer = setTimeout(() => {
        setDeleting(false);
        setTitleIndex((i) => (i + 1) % titles.length);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [displayed, deleting, titleIndex]);

  return (
    <span className="text-cyan-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function BioNode({ data }: { data: CanvasNodeData }) {
  const profile = data.profile!;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bento-card p-8 w-[500px]"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)" }}
    >
      <Handle type="source" position={Position.Right} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />
      <Handle type="source" position={Position.Left} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />

      <div className="mb-2 flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-400 rounded-full neon-dot" />
        <span className="text-cyan-400/60 text-[10px] tracking-widest uppercase">Portfolio · Open to Work</span>
      </div>

      <h1 className="font-editorial text-4xl font-bold text-white mb-2 leading-tight">
        {profile.name}
      </h1>

      <div className="text-xl font-semibold mb-4 h-8">
        <TypingText />
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        {profile.summary.length > 200 ? profile.summary.slice(0, 200) + "…" : profile.summary}
      </p>

      <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-6">
        <span className="px-2 py-1 rounded-full bg-slate-800/80 border border-slate-700/50">📍 {profile.location}</span>
        <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">9+ Years</span>
        <span className="px-2 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400">Thomson Reuters</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href="#projects"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors"
        >
          <FolderOpen className="w-3.5 h-3.5" /> Projects
        </a>
        <a
          href="/assets/resume.pdf"
          download
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5" /> Resume
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-500/50 text-slate-300 hover:bg-slate-500/10 text-sm transition-colors"
        >
          <Mail className="w-3.5 h-3.5" /> Contact
        </a>
      </div>
    </motion.div>
  );
}
