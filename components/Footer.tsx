"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";
import { profileData } from "@/data/profile";

const socials = [
  { icon: Mail, href: `mailto:${profileData.email}`, label: "Email", color: "hover:text-cyan-400" },
  { icon: Linkedin, href: profileData.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: Github, href: profileData.github, label: "GitHub", color: "hover:text-purple-400" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#030712] border-t border-white/[0.04]">
      {/* Subtle gradient line at top */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-sm select-none shadow-md shadow-cyan-500/20">
                US
              </div>
              <span className="font-semibold text-white">Upamanyu Samal</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs text-center md:text-left">
              Strategic Builder · AI Systems · Cloud Architecture
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-10 h-10 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 ${s.color} hover:border-white/20 hover:bg-slate-700/50 transition-all`}
              >
                <s.icon className="w-4.5 h-4.5" />
              </a>
            ))}
          </motion.div>

          {/* Back to top */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
          >
            Back to top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} Upamanyu Samal. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500" /> using Next.js, Tailwind & Framer Motion
          </span>
        </div>
      </div>
    </footer>
  );
}

