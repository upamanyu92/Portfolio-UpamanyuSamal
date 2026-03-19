"use client";
import { motion } from "framer-motion";
import { skillCategories } from "@/data/profile";
import { Badge } from "@/components/ui/badge";

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
  orange: "bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20",
};

const headerColorMap: Record<string, string> = {
  cyan: "from-cyan-400 to-blue-400",
  purple: "from-purple-400 to-pink-400",
  emerald: "from-emerald-400 to-teal-400",
  orange: "from-orange-400 to-red-400",
};

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Technical Skills</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Expertise &amp; Technologies
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A decade of experience across cloud, backend, AI, and architecture domains
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.1 }}
              className="glass-card p-6 hover:border-white/20 transition-all"
            >
              <h3
                className={`text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${headerColorMap[category.color]}`}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIndex * 0.05 + skillIndex * 0.03 }}
                  >
                    <Badge
                      variant="outline"
                      className={`${colorMap[category.color]} border transition-colors cursor-default text-xs py-1`}
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
