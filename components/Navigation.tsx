"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Awards", href: "#accolades" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: detect which section is in view
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050a18]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-lg shadow-cyan-500/20">
            US
          </div>
          <span className="font-semibold text-white hidden sm:block">Upamanyu Samal</span>
        </motion.div>

        {/* Desktop Nav */}
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hidden lg:flex items-center gap-1"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </motion.ul>

        {/* Resume Button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3"
        >
          <Button
            size="sm"
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold gap-1.5 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-shadow"
            asChild
          >
            <a href="/assets/resume.pdf" download>
              <Download className="w-4 h-4" />
              Resume
            </a>
          </Button>
        </motion.div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-slate-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050a18]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? "text-cyan-400 bg-cyan-500/10 border-l-2 border-cyan-400"
                        : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
              <a
                href="/assets/resume.pdf"
                download
                className="flex items-center gap-2 mt-2 px-3 py-2 bg-cyan-500 text-slate-950 rounded-md font-semibold text-sm"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
