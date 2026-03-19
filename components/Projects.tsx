"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { projects } from "@/data/profile";
import { Project } from "@/data/profile";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Portfolio</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Featured Projects
          </h2>
          <p className="text-slate-400 mt-4">Click any project for detailed architecture breakdown</p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-card group cursor-pointer hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              onClick={() => setSelected(project)}
            >
              {/* Gradient Bar */}
              <div className={`h-1.5 rounded-t-xl bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6">
                {/* Category */}
                <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                  {project.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Architecture snippet */}
                <div className="bg-slate-900/80 rounded-lg p-3 mb-4 font-mono text-xs text-slate-400">
                  {project.architecture}
                </div>

                {/* Impact badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.impact.slice(0, 2).map((imp) => (
                    <span
                      key={imp}
                      className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full"
                    >
                      {imp}
                    </span>
                  ))}
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs border-slate-700 text-slate-500">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs border-slate-700 text-slate-500">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* View Details */}
                <div className="flex items-center gap-1 mt-4 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white max-h-[90vh] overflow-y-auto">
            {selected && (
              <>
                <DialogHeader>
                  <div className={`h-1 rounded-full bg-gradient-to-r ${selected.gradient} mb-3`} />
                  <Badge variant="outline" className="w-fit text-xs border-slate-600 text-slate-400 mb-2">
                    {selected.category}
                  </Badge>
                  <DialogTitle className="text-2xl font-bold text-white">{selected.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <p className="text-slate-300 leading-relaxed">{selected.longDescription}</p>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                      Architecture
                    </h4>
                    <div className="bg-slate-800/80 rounded-lg p-4 font-mono text-sm text-cyan-300">
                      {selected.architecture}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Impact</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selected.impact.map((imp) => (
                        <div key={imp} className="flex items-center gap-2 text-sm">
                          <span className="text-emerald-400">✓</span>
                          <span className="text-slate-300">{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
