import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Architecture from "@/components/Architecture";
import Principles from "@/components/Principles";
import Accolades from "@/components/Accolades";
import GitHubStats from "@/components/GitHubStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ChatBotLoader from "@/components/ChatBotLoader";

function Divider() {
  return <div className="section-divider" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-hidden">
        {/* Ambient floating orbs — visible across the entire page */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div className="mesh-orb orb-float w-[600px] h-[600px] bg-cyan-500/[0.03] top-[10%] -left-[200px]" />
          <div className="mesh-orb orb-float-reverse w-[500px] h-[500px] bg-purple-500/[0.03] top-[40%] -right-[150px]" />
          <div className="mesh-orb orb-float w-[400px] h-[400px] bg-emerald-500/[0.02] top-[70%] left-[20%]" />
          <div className="mesh-orb orb-float-reverse w-[350px] h-[350px] bg-pink-500/[0.02] top-[90%] right-[10%]" />
        </div>

        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Architecture />
        <Divider />
        <Principles />
        <Divider />
        <Accolades />
        <Divider />
        <GitHubStats />
        <Divider />
        <Contact />
      </main>
      <Footer />
      <ChatBotLoader />
    </>
  );
}
