import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Principles from "@/components/Principles";
import Architecture from "@/components/Architecture";
import Contact from "@/components/Contact";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Principles />
      <Architecture />
      <Contact />
      <ChatBot />
    </main>
  );
}
