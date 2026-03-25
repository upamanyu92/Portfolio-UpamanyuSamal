"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Mail,
  MapPin,
  Building2,
  ChevronRight,
  Briefcase,
  Calendar,
  Trophy,
  Star,
  Sparkles,
  ExternalLink,
  GitBranch,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { profileData, skillCategories, experiences, projects, awards } from "@/data/profile";
import type { Project } from "@/data/profile";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tab = "home" | "experience" | "skills" | "projects" | "architecture";

const tabs: { id: Tab; label: string }[] = [
  { id: "home", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "architecture", label: "Architecture" },
];

// ─── Static data ─────────────────────────────────────────────────────────────

const coreStack = ["AWS", "Python", "Java", "FastAPI", "Docker", "Kafka", "LangChain"];

const impactMetrics = [
  { value: "9+", label: "Years Exp." },
  { value: "40M+", label: "Docs / Day" },
  { value: "80%", label: "Rework Cut" },
  { value: "60%", label: "Latency Cut" },
];

const diagrams = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    description: "Event-driven microservices deployed on AWS ECS with service mesh communication",
    nodes: [
      { id: "gateway", label: "API Gateway", x: 50, y: 10, color: "bg-cyan-500" },
      { id: "auth", label: "Auth Service", x: 5, y: 35, color: "bg-purple-500" },
      { id: "content", label: "Content Service", x: 40, y: 35, color: "bg-blue-500" },
      { id: "search", label: "Search Service", x: 75, y: 35, color: "bg-indigo-500" },
      { id: "queue", label: "SQS Queue", x: 40, y: 58, color: "bg-orange-500" },
      { id: "dynamo", label: "DynamoDB", x: 5, y: 78, color: "bg-yellow-500" },
      { id: "elastic", label: "Elasticsearch", x: 55, y: 78, color: "bg-green-500" },
    ],
    edges: [
      { from: "gateway", to: "auth" },
      { from: "gateway", to: "content" },
      { from: "gateway", to: "search" },
      { from: "content", to: "queue" },
      { from: "queue", to: "dynamo" },
      { from: "queue", to: "elastic" },
    ],
  },
  {
    id: "event-driven",
    title: "Event-Driven Pipeline",
    description: "High-throughput document processing pipeline with Kafka and stream processing",
    nodes: [
      { id: "ingest", label: "Data Ingestion", x: 5, y: 40, color: "bg-cyan-500" },
      { id: "kafka", label: "Kafka Broker", x: 30, y: 40, color: "bg-orange-500" },
      { id: "processor", label: "Stream Processor", x: 55, y: 25, color: "bg-purple-500" },
      { id: "enricher", label: "AI Enricher", x: 55, y: 58, color: "bg-pink-500" },
      { id: "store", label: "Data Store", x: 80, y: 40, color: "bg-emerald-500" },
    ],
    edges: [
      { from: "ingest", to: "kafka" },
      { from: "kafka", to: "processor" },
      { from: "kafka", to: "enricher" },
      { from: "processor", to: "store" },
      { from: "enricher", to: "store" },
    ],
  },
  {
    id: "ai-pipeline",
    title: "AI Processing Flow",
    description: "RAG-based AI pipeline for intelligent document processing and Q&A",
    nodes: [
      { id: "user", label: "User Query", x: 5, y: 40, color: "bg-slate-500" },
      { id: "embed", label: "Embedding Model", x: 25, y: 40, color: "bg-cyan-500" },
      { id: "vector", label: "Vector DB (Pinecone)", x: 50, y: 20, color: "bg-blue-500" },
      { id: "llm", label: "LLM (GPT-4)", x: 50, y: 60, color: "bg-purple-500" },
      { id: "response", label: "Response", x: 80, y: 40, color: "bg-emerald-500" },
    ],
    edges: [
      { from: "user", to: "embed" },
      { from: "embed", to: "vector" },
      { from: "embed", to: "llm" },
      { from: "vector", to: "llm" },
      { from: "llm", to: "response" },
    ],
  },
];

// ─── Skill colour maps ────────────────────────────────────────────────────────

const badgeColorMap: Record<string, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/30",
};

const headerColorMap: Record<string, string> = {
  cyan: "from-cyan-400 to-blue-400",
  purple: "from-purple-400 to-pink-400",
  emerald: "from-emerald-400 to-teal-400",
  orange: "from-orange-400 to-red-400",
};

const awardIconMap: Record<string, React.ElementType> = {
  "🏆": Trophy,
  "⚡": Sparkles,
  "✨": Star,
};

// ─── Left panel (permanently anchored) ───────────────────────────────────────

function IdentityPanel() {
  return (
    <aside className="hidden lg:flex shrink-0 w-72 border-r border-white/5 flex-col gap-3 p-3 overflow-y-auto">
      {/* Identity card */}
      <div className="bento-card p-5 flex flex-col gap-4 relative overflow-hidden">
        {/* Subtle glow behind avatar */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
        <div className="relative">
          <div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 blur-md opacity-40" />
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-2xl select-none shadow-lg">
            US
          </div>
        </div>

        <div>
          <h1 className="font-editorial text-xl font-bold text-white leading-tight">
            Upamanyu Samal
          </h1>
          <p className="text-cyan-400 text-sm font-medium mt-0.5">
            Software Architect &amp; Technical Lead
          </p>
        </div>

        <p className="text-slate-400 text-xs leading-relaxed">
          9+ years shipping production AI pipelines, cloud-native distributed systems, and
          agentic architectures at Thomson Reuters.
        </p>

        <div className="space-y-1.5 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 shrink-0 text-slate-500" /> Hyderabad, India
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3 h-3 shrink-0 text-slate-500" />
            <span className="text-cyan-400 font-medium">Thomson Reuters</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={`mailto:${profileData.email}`}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-3 h-3 text-cyan-500/70" /> Email
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-blue-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-blue-500/70" /> LinkedIn
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-purple-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3 text-purple-500/70" /> GitHub
          </a>
        </div>
      </div>

      {/* Core Stack */}
      <div className="bento-card p-4">
        <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mb-3">
          Core Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {coreStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] bg-slate-800/80 border border-slate-700 hover:border-cyan-500/40 hover:text-cyan-400 text-slate-300 px-2 py-0.5 rounded-md transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Impact metrics */}
      <div className="bento-card p-4">
        <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mb-3">
          Impact Metrics
        </p>
        <div className="grid grid-cols-2 gap-3">
          {impactMetrics.map((m) => (
            <div key={m.label} className="group">
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-purple-400">
                {m.value}
              </div>
              <div className="text-slate-500 text-[10px] mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resume download */}
      <a
        href="/assets/resume.pdf"
        download
        className="flex items-center justify-center gap-2 text-xs font-semibold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl py-2.5 transition-all"
      >
        <Download className="w-3.5 h-3.5" /> Download Resume
      </a>
    </aside>
  );
}

// ─── Content panels ───────────────────────────────────────────────────────────

/** Mobile-only compact identity banner shown at top of Overview */
function MobileIdentityBanner() {
  return (
    <div className="lg:hidden bento-card p-4 mb-3 flex items-center gap-4">
      <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-lg select-none">
        US
      </div>
      <div className="min-w-0">
        <h1 className="font-editorial text-base font-bold text-white leading-tight">Upamanyu Samal</h1>
        <p className="text-cyan-400 text-xs font-medium">Software Architect & Technical Lead</p>
        <div className="flex flex-wrap gap-3 mt-1.5">
          <a
            href={`mailto:${profileData.email}`}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <Mail className="w-3 h-3" /> Email
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-purple-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> LinkedIn
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3 h-3" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function OverviewPanel() {
  const featuredProject = projects[0];

  return (
    <div className="flex flex-col gap-3">
      <MobileIdentityBanner />

      {/* Featured Architecture */}
      <div className="bento-card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
        <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mb-3">
          Featured Architecture
        </p>
        <div className={`h-1 rounded-full bg-gradient-to-r ${featuredProject.gradient} mb-4`} />
        <h3 className="text-white font-bold text-base mb-1">{featuredProject.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{featuredProject.description}</p>
        <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 font-mono text-xs text-cyan-300 mb-4">
          {featuredProject.architecture}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {featuredProject.technologies.slice(0, 5).map((t) => (
            <Badge key={t} variant="outline" className="text-xs border-slate-700 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      {/* Metrics + Awards */}
      <div className="grid sm:grid-cols-2 gap-3">
        {/* Key metrics */}
        <div className="bento-card p-4">
          <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mb-3">
            Key Metrics
          </p>
          <div className="space-y-2">
            {featuredProject.impact.slice(0, 4).map((imp) => (
              <div key={imp} className="flex items-start gap-2 text-xs group">
                <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
                <span className="text-slate-300 group-hover:text-white transition-colors">{imp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div className="bento-card p-4">
          <p className="text-slate-500 text-[10px] font-semibold tracking-widest uppercase mb-3">
            Awards
          </p>
          <div className="space-y-2.5">
            {awards.map((award) => {
              const Icon = awardIconMap[award.icon] ?? Trophy;
              return (
                <div key={award.id} className="flex items-center gap-2.5 group">
                  <div
                    className={`w-7 h-7 rounded-lg bg-gradient-to-br ${award.gradient} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-300 text-xs font-medium truncate group-hover:text-white transition-colors">{award.title}</div>
                    <div className="text-slate-500 text-[10px]">{award.year}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperiencePanel() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/30 to-transparent" />

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="relative pl-11">
            {/* Timeline dot */}
            {exp.current ? (
              <div className="absolute left-3.5 top-5 -translate-x-1/2">
                <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-cyan-400 neon-dot" />
              </div>
            ) : (
              <div className="absolute left-3.5 top-5 w-3 h-3 rounded-full border-2 bg-slate-800 border-slate-600 -translate-x-1/2" />
            )}

            <div className={`bento-card p-5 ${exp.current ? "border-cyan-500/20" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-sm">{exp.role}</h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-cyan-400 text-xs font-medium mt-0.5">
                    <Briefcase className="w-3 h-3" /> {exp.company}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {exp.location}
                  </span>
                </div>
              </div>

              <ul className="space-y-1 mb-3">
                {exp.description.slice(0, 3).map((pt, i) => (
                  <li key={i} className="text-slate-300 text-xs flex gap-1.5">
                    <span className="text-cyan-500 mt-0.5 shrink-0">▸</span>
                    {pt}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1">
                {exp.technologies.slice(0, 5).map((t) => (
                  <Badge key={t} variant="outline" className="text-[10px] border-slate-700 text-slate-500 py-0 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {skillCategories.map((cat) => (
        <div key={cat.title} className="bento-card p-5 group relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer" />
          <h3
            className={`text-sm font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${headerColorMap[cat.color]}`}
          >
            {cat.title}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {cat.skills.map((sk) => (
              <Badge
                key={sk}
                variant="outline"
                className={`${badgeColorMap[cat.color]} border text-xs py-0.5 cursor-default hover:scale-105 transition-transform`}
              >
                {sk}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsPanel() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bento-card group cursor-pointer relative overflow-hidden"
            onClick={() => setSelected(proj)}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer" />
            <div className={`h-1.5 bg-gradient-to-r ${proj.gradient} group-hover:h-2 transition-all duration-300`} />
            <div className="p-5">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                {proj.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-1 mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
                {proj.title}
              </h3>
              <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                {proj.description}
              </p>
              <div className="bg-slate-900/80 border border-slate-800 rounded p-2 font-mono text-[10px] text-slate-400 mb-3">
                {proj.architecture}
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {proj.impact.slice(0, 2).map((imp) => (
                  <span
                    key={imp}
                    className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full"
                  >
                    {imp}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-cyan-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all">
                View details <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project detail dialog */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className={`h-1 rounded-full bg-gradient-to-r ${selected.gradient} mb-3`} />
                <Badge variant="outline" className="w-fit text-xs border-slate-600 text-slate-400 mb-2">
                  {selected.category}
                </Badge>
                <DialogTitle className="text-xl font-bold text-white">{selected.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-5">
                <p className="text-slate-300 text-sm leading-relaxed">{selected.longDescription}</p>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Architecture
                  </h4>
                  <div className="bg-slate-800/80 rounded-lg p-3 font-mono text-sm text-cyan-300">
                    {selected.architecture}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selected.impact.map((imp) => (
                      <div key={imp} className="flex items-center gap-2 text-sm">
                        <span className="text-emerald-400">✓</span>
                        <span className="text-slate-300">{imp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selected.decisions && selected.decisions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                      Engineering Decisions
                    </h4>
                    <div className="space-y-2">
                      {selected.decisions.map((d, i) => (
                        <div
                          key={i}
                          className="bg-slate-800/60 border border-slate-700/50 rounded-lg p-3"
                        >
                          <div className="text-purple-300 text-xs font-semibold mb-1">⚡ {d.choice}</div>
                          <div className="text-slate-400 text-xs leading-relaxed">{d.rationale}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.technologies.map((t) => (
                      <Badge key={t} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function ArchitecturePanel() {
  const [active, setActive] = useState(diagrams[0].id);
  const diagram = diagrams.find((d) => d.id === active)!;

  return (
    <div className="space-y-4">
      {/* Diagram selector */}
      <div className="flex flex-wrap gap-2">
        {diagrams.map((d) => (
          <button
            key={d.id}
            onClick={() => setActive(d.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              active === d.id
                ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 scale-105"
                : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600"
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="bento-card p-6"
        >
          <h3 className="text-base font-bold text-white mb-1">{diagram.title}</h3>
          <p className="text-slate-400 text-xs mb-6">{diagram.description}</p>

          {/* SVG diagram */}
          <div
            className="relative bg-slate-900/50 rounded-xl overflow-hidden"
            style={{ height: 240 }}
          >
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <marker
                  id="arrowhead-bd"
                  markerWidth="4"
                  markerHeight="4"
                  refX="2"
                  refY="2"
                  orient="auto"
                >
                  <polygon points="0 0, 4 2, 0 4" fill="#94a3b8" />
                </marker>
              </defs>
              {diagram.edges.map((edge, i) => {
                const from = diagram.nodes.find((n) => n.id === edge.from)!;
                const to = diagram.nodes.find((n) => n.id === edge.to)!;
                return (
                  <line
                    key={i}
                    x1={`${from.x + 6}%`}
                    y1={`${from.y + 4}%`}
                    x2={`${to.x + 6}%`}
                    y2={`${to.y + 4}%`}
                    stroke="#475569"
                    strokeWidth="0.5"
                    strokeDasharray="2 1"
                    markerEnd="url(#arrowhead-bd)"
                  />
                );
              })}
            </svg>
            {diagram.nodes.map((node) => (
              <div
                key={node.id}
                className={`absolute ${node.color} text-white text-[10px] font-medium px-2 py-1.5 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-10`}
                style={{ left: `${node.x + 6}%`, top: `${node.y + 4}%` }}
              >
                {node.label}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4">
            {diagram.nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className={`w-2 h-2 rounded ${node.color}`} />
                {node.label}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function BentoDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div className="h-screen overflow-hidden bg-slate-950 flex flex-col">
      {/* ── Navigation bar ── */}
      <header className="shrink-0 h-14 bg-slate-950/90 backdrop-blur-md border-b border-white/8 flex items-center justify-between px-4 gap-3 shadow-lg shadow-black/20">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-xs select-none shadow-md shadow-cyan-500/20">
            US
          </div>
          <span className="font-semibold text-white text-sm hidden sm:block">Upamanyu Samal</span>
        </div>

        {/* Tab navigation */}
        <nav className="flex items-center gap-0.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-cyan-500/15 text-cyan-400 border border-cyan-500/40 shadow-sm shadow-cyan-500/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Resume CTA */}
        <Button
          size="sm"
          className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold gap-1.5 text-xs hidden sm:flex shadow-md shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-shadow"
          asChild
        >
          <a href="/assets/resume.pdf" download>
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </Button>
      </header>

      {/* ── Body ── */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left panel — anchored identity */}
        <IdentityPanel />

        {/* Right panel — dynamic tab content */}
        <main className="flex-1 overflow-y-auto p-3 lg:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "home" && <OverviewPanel />}
              {activeTab === "experience" && <ExperiencePanel />}
              {activeTab === "skills" && <SkillsPanel />}
              {activeTab === "projects" && <ProjectsPanel />}
              {activeTab === "architecture" && <ArchitecturePanel />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
