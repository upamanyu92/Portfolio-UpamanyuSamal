"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileData } from "@/data/profile";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-white/[0.02]">
      <div className="mesh-orb orb-float-reverse w-[500px] h-[500px] bg-slate-300/[0.03] top-1/4 -left-20" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-slate-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500">
            Let&apos;s Connect
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Open to senior architecture roles, consulting, and interesting technical conversations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Let&apos;s build something great</h3>
              <p className="text-slate-400 leading-relaxed">
                Whether you have an exciting technical challenge, want to discuss architecture, or are looking for an
                experienced technical leader — I&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: profileData.email,
                  href: `mailto:${profileData.email}`,
                  color: "text-rose-300",
                  bg: "bg-rose-100/10",
                  border: "border-rose-200/15 hover:border-rose-300/40",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  value: "linkedin.com/in/upamanyu-samal",
                  href: profileData.linkedin,
                  color: "text-sky-300",
                  bg: "bg-sky-100/10",
                  border: "border-sky-200/15 hover:border-sky-300/40",
                },
                {
                  icon: Github,
                  label: "GitHub",
                  value: "github.com/upamanyu92",
                  href: profileData.github,
                  color: "text-violet-300",
                  bg: "bg-violet-100/10",
                  border: "border-violet-200/15 hover:border-violet-300/40",
                },
              ].map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-xl bg-white/[0.04] backdrop-blur-sm p-4 border ${contact.border} transition-all group hover:bg-white/[0.07]`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${contact.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <contact.icon className={`w-5 h-5 ${contact.color}`} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-xs">{contact.label}</div>
                    <div className={`${contact.color} text-sm font-medium group-hover:underline`}>
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="rounded-xl bg-white/[0.04] backdrop-blur-sm p-6 space-y-4 border border-white/10">
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-sm mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..."
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400/30 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full bg-white hover:bg-slate-100 text-slate-900 font-semibold gap-2 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all"
              >
                {status === "loading" ? (
                  <>Sending...</>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" /> Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Message
                  </>
                )}
              </Button>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-emerald-300 text-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Thanks! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-rose-300 text-sm">
                  <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
