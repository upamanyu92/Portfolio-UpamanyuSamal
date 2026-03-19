"use client";
import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, GitMerge, Radio, BarChart3 } from "lucide-react";

const principles = [
  {
    icon: ShieldCheck,
    title: "Reliability Before Features",
    color: "cyan",
    body: "Every system I design starts with failure modes, not happy paths. I instrument before I ship — Prometheus metrics, structured logs, and dead-letter queues are non-negotiable. A feature that silently corrupts data is worse than no feature at all.",
  },
  {
    icon: GitMerge,
    title: "Own the Trade-offs",
    color: "purple",
    body: "I write DECISIONS.md for every significant architectural choice — recording what I chose, what I rejected, and why. This keeps future engineers from re-litigating solved problems and creates an audit trail for compliance-sensitive environments.",
  },
  {
    icon: FlaskConical,
    title: "Experiment Rigorously",
    color: "emerald",
    body: "ML claims without tracked experiments are anecdotes. I use Weights & Biases or MLflow to log every hyperparameter sweep, so accuracy claims are reproducible and comparable across architectures. If I can't show you the W&B run, the number doesn't count.",
  },
  {
    icon: Radio,
    title: "Show the Full Pipeline",
    color: "orange",
    body: "A model in a notebook is not production. I show the complete lifecycle: Kafka/Airflow ingestion → transformation → model serving → Redis caching → Prometheus/Grafana monitoring. Recruiters and collaborators can see exactly where the system breaks under load.",
  },
  {
    icon: BarChart3,
    title: "Handle Non-Determinism Deliberately",
    color: "pink",
    body: "LLMs, distributed queues, and network partitions are all non-deterministic. I design for it: idempotent operations, retry budgets with exponential back-off, circuit breakers, and chaos-tested rollback procedures. When something fails at 2 AM, the runbook is already written.",
  },
];

const colorMap: Record<string, { border: string; icon: string; bg: string }> = {
  cyan:    { border: "border-cyan-500/30",    icon: "text-cyan-400",    bg: "bg-cyan-500/10" },
  purple:  { border: "border-purple-500/30",  icon: "text-purple-400",  bg: "bg-purple-500/10" },
  emerald: { border: "border-emerald-500/30", icon: "text-emerald-400", bg: "bg-emerald-500/10" },
  orange:  { border: "border-orange-500/30",  icon: "text-orange-400",  bg: "bg-orange-500/10" },
  pink:    { border: "border-pink-500/30",    icon: "text-pink-400",    bg: "bg-pink-500/10" },
};

export default function Principles() {
  return (
    <section id="principles" className="section-padding bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Working Methodology</span>
          <h2 className="font-editorial text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Engineering Principles
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            The beliefs that govern how I design systems, make decisions, and handle the inevitable failures in production.
          </p>
        </motion.div>

        {/* Bento principles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((p, i) => {
            const Icon = p.icon;
            const c = colorMap[p.color];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`bento-card p-6 border ${c.border}`}
              >
                <div className={`w-10 h-10 rounded-lg ${c.bg} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${c.icon}`} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
