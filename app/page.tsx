import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import Principles from "@/components/Principles";
import Architecture from "@/components/Architecture";
import Accolades from "@/components/Accolades";
import Contact from "@/components/Contact";
import ChatBotLoader from "@/components/ChatBotLoader";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <GitHubStats />
      <Principles />
      <Architecture />
      <Accolades />
      <Contact />
      <ChatBotLoader />
    </main>
  );
}
