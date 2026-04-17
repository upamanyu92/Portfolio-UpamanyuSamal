"use client";
import { motion } from "framer-motion";
import { Trophy, Star, Sparkles } from "lucide-react";
import { awards } from "@/data/profile";

const iconComponents: Record<string, React.ElementType> = {
  "🏆": Trophy,
  "⚡": Sparkles,
  "✨": Star,
};

export default function Accolades() {
  return (
    <section id="accolades" className="section-padding relative overflow-hidden">
      <div className="mesh-orb orb-float-reverse w-[400px] h-[400px] bg-yellow-500/[0.03] -top-10 left-1/4" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-yellow-400 text-sm font-semibold tracking-widest uppercase">Recognition</span>
          <h2 className="font-editorial text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Accolades &amp; Awards
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Organizational recognition for technical leadership, innovation, and measurable impact
          </p>
        </motion.div>

        {/* Award Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {awards.map((award, i) => {
            const Icon = iconComponents[award.icon] ?? Trophy;
            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bento-card group flex flex-col overflow-hidden"
              >
                {/* Gradient header bar */}
                <div className={`h-1.5 bg-gradient-to-r ${award.gradient}`} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Icon + year */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${award.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-slate-500 text-sm font-medium">{award.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg mb-1 leading-snug group-hover:text-cyan-400 transition-colors">
                    {award.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-cyan-400 text-sm font-medium mb-3">{award.issuer}</p>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{award.description}</p>

                  {/* Highlight badge */}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${award.gradient}`} />
                      <span className="text-slate-300">{award.highlight}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
