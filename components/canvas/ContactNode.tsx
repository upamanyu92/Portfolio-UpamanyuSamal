"use client";
import { Handle, Position } from "@xyflow/react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import type { CanvasNodeData } from "@/data/canvas-nodes";

export default function ContactNode({ data }: { data: CanvasNodeData }) {
  const contact = data.contact!;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bento-card p-5 w-[300px]"
      style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)" }}
    >
      <Handle type="target" position={Position.Top} style={{ background: "rgba(6,182,212,0.6)", border: "none" }} />

      <div className="mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-pink-400 rounded-full" />
        <span className="text-pink-400/70 text-[10px] tracking-widest uppercase">Get In Touch</span>
      </div>

      <div className="space-y-3">
        <a
          href={`mailto:${contact.email}`}
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/40 transition-colors group"
        >
          <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-slate-300 text-sm truncate group-hover:text-white transition-colors">{contact.email}</span>
        </a>
        <a
          href={contact.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/40 transition-colors group"
        >
          <Linkedin className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">LinkedIn</span>
        </a>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-400/40 transition-colors group"
        >
          <Github className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">GitHub</span>
        </a>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800/50">
          <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="text-slate-500 text-sm">{contact.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
