"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Mail, FolderOpen, ArrowDown, GitBranch, Layers, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroParticles from "@/components/HeroParticles";

const titles = [
  "Strategic Builder",
  "AI Systems Architect",
  "Agentic AI Engineer",
  "Cloud Solution Architect",
  "Distributed Systems Expert",
];

const stats = [
  { value: "9+", label: "Years Shipping", sublabel: "Production Systems" },
  { value: "40M+", label: "Docs Processed", sublabel: "Daily at 99.9% SLA" },
  { value: "80%", label: "Rework Reduced", sublabel: "via Architecture" },
  { value: "60%", label: "Latency Cut", sublabel: "AI Pipeline Rewrite" },
];

const pipelineSteps = [
  { icon: Database, label: "Ingest", detail: "Kafka / SQS" },
  { icon: Zap, label: "Transform", detail: "AWS Glue / Lambda" },
  { icon: Layers, label: "Enrich", detail: "LLM + Pinecone" },
  { icon: GitBranch, label: "Serve", detail: "FastAPI + Redis" },
];

// CSS-only abstract code visual – no stock images
function AbstractCodeVisual() {
  const tokens = [
    { indent: 0, parts: [{ t: "def ", c: "text-purple-400" }, { t: "process_pipeline", c: "text-cyan-300" }, { t: "(docs):", c: "text-slate-300" }] },
    { indent: 1, parts: [{ t: "embeddings ", c: "text-slate-300" }, { t: "= ", c: "text-purple-400" }, { t: "model", c: "text-cyan-400" }, { t: ".encode(docs)", c: "text-slate-300" }] },
    { indent: 1, parts: [{ t: "results ", c: "text-slate-300" }, { t: "= ", c: "text-purple-400" }, { t: "vectordb", c: "text-cyan-400" }, { t: ".search(", c: "text-slate-300" }] },
    { indent: 2, parts: [{ t: "embeddings,", c: "text-orange-300" }, { t: " top_k", c: "text-slate-300" }, { t: "=", c: "text-purple-400" }, { t: "10", c: "text-emerald-400" }] },
    { indent: 1, parts: [{ t: ")", c: "text-slate-300" }] },
    { indent: 1, parts: [{ t: "return ", c: "text-purple-400" }, { t: "llm", c: "text-cyan-400" }, { t: ".generate(results)", c: "text-slate-300" }] },
  ];
  return (
    <div className="p-4 font-mono text-[11px] h-full flex flex-col justify-between">
      <div className="text-cyan-400/60 text-[10px] tracking-widest uppercase mb-3 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500/70" />
        <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
        <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
        <span className="ml-1">pipeline.py</span>
      </div>
      <div className="space-y-1.5 flex-1">
        {tokens.map((line, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="text-slate-600 w-4 shrink-0 text-right">{i + 1}</span>
            <span style={{ paddingLeft: `${line.indent * 12}px` }} className="flex flex-wrap gap-0">
              {line.parts.map((p, j) => (
                <span key={j} className={p.c}>{p.t}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-[10px] text-slate-500">
        <span className="text-emerald-400">✓</span> No errors · Python 3.11
      </div>
    </div>
  );
}

function TypingText() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = titles[titleIndex];
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      timeoutRef.current = setTimeout(() => {
        setDeleting(false);
        setTitleIndex((i) => (i + 1) % titles.length);
      }, 0);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, titleIndex]);

  return (
    <span className="text-cyan-400">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20"
      style={{ background: "linear-gradient(180deg, #050a18 0%, #0a1628 50%, #050a18 100%)" }}
    >
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mesh gradient orbs — slow-floating ambient color */}
        <div className="mesh-orb orb-float w-[500px] h-[500px] bg-cyan-500/[0.06] top-[5%] left-[10%]" />
        <div className="mesh-orb orb-float-reverse w-[600px] h-[600px] bg-purple-600/[0.05] bottom-[10%] right-[5%]" />
        <div className="mesh-orb orb-float w-[300px] h-[300px] bg-emerald-500/[0.03] top-[60%] left-[50%]" />

        <HeroParticles />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.6) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial vignette */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 45%, transparent 30%, rgba(5,10,24,0.9) 100%)" }} />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 text-sm shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 bg-cyan-400 rounded-full neon-dot" />
            Open to Senior / Staff Engineering Roles
          </span>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">

          {/* [1] Main identity card — spans 8 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-8 bento-card p-8 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <h1 className="font-editorial text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
                Upamanyu Samal
              </h1>
              <div className="text-xl md:text-2xl font-semibold mb-5 h-8">
                <TypingText />
              </div>
              <p className="text-slate-400 text-base md:text-lg max-w-xl leading-relaxed">
                I design and ship <span className="text-white font-medium">production-grade AI systems</span>{" "}
                — from data ingestion to model serving — at{" "}
                <span className="text-cyan-400 font-medium">Thomson Reuters</span>.
                I own the full lifecycle: architecture, trade-offs, deployment, and monitoring.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button
                onClick={() => scrollTo("#projects")}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold gap-2"
              >
                <FolderOpen className="w-4 h-4" /> View Projects
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 gap-2"
                asChild
              >
                <a href="/assets/resume.pdf" download>
                  <Download className="w-4 h-4" /> Resume
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 gap-2"
                asChild
              >
                <a href="/assets/cover-letter.txt" download>
                  <Download className="w-4 h-4" /> Cover Letter
                </a>
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                variant="outline"
                className="border-slate-500/50 text-slate-300 hover:bg-slate-500/10 gap-2"
              >
                <Mail className="w-4 h-4" /> Contact
              </Button>
            </div>
          </motion.div>

          {/* [2] Abstract code visual — spans 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 bento-card overflow-hidden min-h-[200px]"
          >
            <AbstractCodeVisual />
          </motion.div>

          {/* [3] Stats row — each stat is one bento tile */}
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="md:col-span-3 bento-card p-5 flex flex-col justify-between group overflow-hidden relative"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer" />
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-purple-400">
                {stat.value}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{stat.label}</div>
                <div className="text-slate-500 text-xs mt-0.5">{stat.sublabel}</div>
              </div>
            </motion.div>
          ))}

          {/* [4] Pipeline strip — spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="md:col-span-12 bento-card p-5 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.05) 0%, transparent 50%, rgba(168,85,247,0.05) 100%)" }} />
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-4">
              End-to-End Pipeline Ownership
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {pipelineSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/50 rounded-lg px-3 py-2 hover:border-cyan-500/40 transition-colors">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-white text-xs font-semibold">{step.label}</div>
                        <div className="text-slate-500 text-[10px]">{step.detail}</div>
                      </div>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <span className="text-cyan-600/60 text-lg">→</span>
                    )}
                  </div>
                );
              })}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-cyan-600/60 text-lg">→</span>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full neon-dot" />
                  <div>
                    <div className="text-emerald-400 text-xs font-semibold">Monitor</div>
                    <div className="text-slate-500 text-[10px]">Prometheus / Grafana</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="flex flex-col items-center mt-10 text-slate-500 cursor-pointer group"
          onClick={() => scrollTo("#about")}
        >
          <span className="text-xs tracking-widest uppercase mb-2 group-hover:text-cyan-400 transition-colors">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </div>
    </section>
  );
}

