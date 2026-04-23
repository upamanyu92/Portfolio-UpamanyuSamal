"use client";
import { profileData, skillCategories, experiences, projects } from "@/data/profile";
import { Mail, Linkedin, Github, MapPin, Download } from "lucide-react";

export default function MobileLayout() {
  return (
    <div
      className="min-h-screen overflow-y-auto px-4 py-8 space-y-6"
      style={{ background: "linear-gradient(180deg, #050a18 0%, #0a1628 50%, #050a18 100%)" }}
    >
      {/* Bio */}
      <div className="bento-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 bg-cyan-400 rounded-full neon-dot" />
          <span className="text-cyan-400/60 text-[10px] tracking-widest uppercase">Portfolio · Open to Work</span>
        </div>
        <h1 className="font-editorial text-3xl font-bold text-white mb-1">{profileData.name}</h1>
        <p className="text-cyan-400 font-semibold mb-3">{profileData.title}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{profileData.summary}</p>
        <div className="flex flex-wrap gap-2">
          <a
            href="/assets/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 text-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
          <a
            href={`mailto:${profileData.email}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-500/50 text-slate-300 hover:bg-slate-500/10 text-sm transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        </div>
      </div>

      {/* Skills */}
      <div className="bento-card p-5">
        <p className="text-[10px] text-purple-400/70 tracking-widest uppercase mb-4">Skills &amp; Technologies</p>
        <div className="space-y-4">
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">{cat.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill) => (
                  <span key={skill} className="px-2 py-0.5 rounded-full text-[11px] bg-slate-800/80 border border-slate-700/50 text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects */}
      <div>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-3 px-1">Projects</p>
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="bento-card overflow-hidden">
              <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />
              <div className="p-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">{project.category}</span>
                <h3 className="text-white font-semibold text-sm mt-0.5 mb-2">{project.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800/80 border border-slate-700/50 text-slate-400">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="bento-card p-5">
        <p className="text-[10px] text-emerald-400/70 tracking-widest uppercase mb-4">Experience</p>
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-cyan-500/30 pl-4">
              <div className="flex justify-between items-start gap-2 mb-1">
                <div>
                  <h4 className="text-white text-sm font-semibold">{exp.role}</h4>
                  <p className="text-cyan-400 text-xs">{exp.company}</p>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0">{exp.period}</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">{exp.description[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bento-card p-5">
        <p className="text-[10px] text-pink-400/70 tracking-widest uppercase mb-4">Get In Touch</p>
        <div className="space-y-2">
          <a href={`mailto:${profileData.email}`} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:border-cyan-500/40 transition-colors">
            <Mail className="w-4 h-4 text-cyan-400" /> {profileData.email}
          </a>
          <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:border-blue-500/40 transition-colors">
            <Linkedin className="w-4 h-4 text-blue-400" /> LinkedIn
          </a>
          <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:border-slate-400/40 transition-colors">
            <Github className="w-4 h-4 text-slate-400" /> GitHub
          </a>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-800/50 text-slate-500 text-sm">
            <MapPin className="w-4 h-4" /> {profileData.location}
          </div>
        </div>
      </div>
    </div>
  );
}
