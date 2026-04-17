"use client";
import { motion } from "framer-motion";
import { Cloud, Brain, Zap, Users } from "lucide-react";

const highlights = [
  {
    icon: Cloud,
    title: "40M+ Documents",
    description: "Cloud-native processing pipelines at scale",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Zap,
    title: "80% Rework Reduction",
    description: "Architectural improvements driving efficiency",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Brain,
    title: "AI-Powered Pipelines",
    description: "ML integration for intelligent content processing",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Users,
    title: "Cross-Continent Teams",
    description: "Leading engineering across 3 time zones",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

const coreTech = [
  "Python",
  "Java",
  "AWS",
  "Docker",
  "Kubernetes",
  "Kafka",
  "Elasticsearch",
  "FastAPI",
  "Spring Boot",
  "React",
  "LangChain",
  "PostgreSQL",
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Ambient glow */}
      <div className="mesh-orb orb-float-reverse w-[400px] h-[400px] bg-cyan-500/[0.04] -top-20 -right-20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Architect. Builder. Leader.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Avatar + Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 blur-md opacity-50" />
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
                  US
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Upamanyu Samal</h3>
                <p className="text-cyan-400 text-sm">Associate Technical Lead</p>
                <p className="text-slate-400 text-sm">Thomson Reuters · Hyderabad, India</p>
              </div>
            </div>

            {/* Highlight Cards */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((h) => (
                <div key={h.title} className={`glass-card p-4 ${h.bg} hover:scale-[1.02] transition-transform`}>
                  <div className={`w-8 h-8 rounded-lg ${h.bg} border border-current/20 flex items-center justify-center mb-2`}>
                    <h.icon className={`w-4 h-4 ${h.color}`} />
                  </div>
                  <div className={`font-bold ${h.color} text-sm`}>{h.title}</div>
                  <div className="text-slate-400 text-xs mt-1">{h.description}</div>
                </div>
              ))}
            </div>

            {/* Core Tech */}
            <div>
              <p className="text-slate-400 text-sm mb-3 font-medium">Core Technologies</p>
              <div className="flex flex-wrap gap-2">
                {coreTech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5 text-slate-300 leading-relaxed"
          >
            <p className="text-lg">
              I&apos;m a{" "}
              <span className="text-cyan-400 font-medium">Software Architect and Technical Lead</span> with over 9
              years of experience designing and building systems that operate at enterprise scale. Currently at{" "}
              <span className="text-white font-medium">Thomson Reuters</span>, I lead the architecture of
              cloud-native content processing platforms that handle tens of millions of legal documents daily.
            </p>
            <p>
              My expertise sits at the intersection of{" "}
              <span className="text-purple-400 font-medium">cloud architecture</span>,{" "}
              <span className="text-cyan-400 font-medium">AI/ML integration</span>, and{" "}
              <span className="text-emerald-400 font-medium">distributed systems engineering</span>. I believe
              that great architecture is invisible — it enables teams to move fast, systems to scale effortlessly,
              and businesses to innovate without fear.
            </p>
            <p>
              Over the past few years, I&apos;ve led the migration of 40+ years of legacy legal content to modern
              cloud infrastructure, built AI-powered document processing pipelines, and transformed monolithic
              applications into event-driven microservices architectures — all while achieving 80% reduction in
              system rework and maintaining 99.9% uptime.
            </p>
            <p>
              I&apos;m passionate about mentoring engineers, establishing engineering standards, and creating the
              technical foundations that allow organizations to build and ship with confidence.
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { label: "Current Company", value: "Thomson Reuters" },
                { label: "Role", value: "Associate Technical Lead" },
                { label: "Experience", value: "9+ Years" },
                { label: "Location", value: "Hyderabad, India" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-slate-500 text-xs uppercase tracking-wide">{item.label}</div>
                  <div className="text-white font-medium text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
