"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Download, Mail, FolderOpen, ArrowDown, GitBranch, Layers, Zap, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const lines = [
    { w: "w-3/4", color: "bg-cyan-500/40" },
    { w: "w-1/2", color: "bg-purple-500/30" },
    { w: "w-5/6", color: "bg-cyan-400/20" },
    { w: "w-2/3", color: "bg-emerald-500/30" },
    { w: "w-4/5", color: "bg-purple-400/20" },
    { w: "w-1/3", color: "bg-cyan-500/40" },
    { w: "w-3/5", color: "bg-slate-500/30" },
    { w: "w-2/5", color: "bg-emerald-400/20" },
  ];
  return (
    <div className="space-y-2 p-4 font-mono text-xs">
      <div className="text-cyan-400/70 mb-3 text-[10px] tracking-widest uppercase">pipeline.py</div>
      {lines.map((l, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-slate-600 w-4 shrink-0">{i + 1}</span>
          <div className={`h-1.5 rounded-full ${l.w} ${l.color}`} />
        </div>
      ))}
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl motion-safe:animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl motion-safe:animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex justify-center mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
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
                <a href="/assets/cover-letter.pdf" download>
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
            className="md:col-span-4 bento-card overflow-hidden"
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
              className="md:col-span-3 bento-card p-5 flex flex-col justify-between"
            >
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
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
            className="md:col-span-12 bento-card p-5"
          >
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-4">
              End-to-End Pipeline Ownership
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {pipelineSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.label} className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-slate-800/80 rounded-lg px-3 py-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div className="text-white text-xs font-semibold">{step.label}</div>
                        <div className="text-slate-500 text-[10px]">{step.detail}</div>
                      </div>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <span className="text-slate-600 text-lg">→</span>
                    )}
                  </div>
                );
              })}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-slate-600 text-lg">→</span>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
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
          className="flex justify-center mt-10 text-slate-500 animate-bounce cursor-pointer"
          onClick={() => scrollTo("#about")}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}

