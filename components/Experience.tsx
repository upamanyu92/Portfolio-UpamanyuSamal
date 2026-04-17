"use client";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experiences } from "@/data/profile";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="mesh-orb orb-float-reverse w-[400px] h-[400px] bg-emerald-500/[0.03] bottom-0 -right-20" aria-hidden="true" />
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Architecture Roadmap</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Career Timeline · 2015 – Present
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/60 via-purple-500/40 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Timeline Dot */}
                {exp.current ? (
                  <div className="absolute left-4 top-5 -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-cyan-400 neon-dot" />
                  </div>
                ) : (
                  <div className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 bg-slate-800 border-slate-600 -translate-x-1/2" />
                )}

                <div className={`glass-card p-6 transition-all ${exp.current ? "hover:border-cyan-500/40" : "hover:border-white/20"}`}>
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-cyan-400 font-medium mt-0.5">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-1.5 mb-4">
                    {exp.description.map((point, i) => (
                      <li key={i} className="text-slate-300 text-sm flex gap-2">
                        <span className="text-cyan-500 mt-1.5 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="text-xs bg-slate-800/50 border-slate-700 text-slate-400 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
