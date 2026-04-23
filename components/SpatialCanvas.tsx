"use client";
import { useCallback, useState, useEffect, useRef } from "react";
import { ReactFlow,
  Background,
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  MarkerType,
  useReactFlow,
  BackgroundVariant,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { canvasNodes, canvasEdges } from "@/data/canvas-nodes";
import { profileData, skillCategories, experiences } from "@/data/profile";
import BioNode from "@/components/canvas/BioNode";
import ProjectNode from "@/components/canvas/ProjectNode";
import SkillsNode from "@/components/canvas/SkillsNode";
import ExperienceNode from "@/components/canvas/ExperienceNode";
import ContactNode from "@/components/canvas/ContactNode";
import MobileLayout from "@/components/MobileLayout";

const nodeTypes = {
  bioNode: BioNode,
  projectNode: ProjectNode,
  skillsNode: SkillsNode,
  experienceNode: ExperienceNode,
  contactNode: ContactNode,
};

const styledEdges: Edge[] = canvasEdges.map((e) => ({
  ...e,
  type: "default",
  animated: false,
  style: { stroke: "rgba(6,182,212,0.25)", strokeWidth: 1.5 },
  markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(6,182,212,0.4)", width: 12, height: 12 },
}));

const navItems = [
  { label: "Bio", x: 0, y: 0, zoom: 0.8 },
  { label: "Projects", x: 700, y: 100, zoom: 0.65 },
  { label: "Skills", x: -650, y: -200, zoom: 0.85 },
  { label: "Experience", x: -650, y: 300, zoom: 0.85 },
  { label: "Contact", x: 0, y: 700, zoom: 1 },
];

function CanvasInner() {
  const [nodes, , onNodesChange] = useNodesState(canvasNodes);
  const [edges, , onEdgesChange] = useEdgesState(styledEdges);
  const [search, setSearch] = useState("");
  const { setCenter } = useReactFlow();
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      setTimeout(() => setCenter(0, 0, { zoom: 0.8, duration: 600 }), 200);
    }
  }, [setCenter]);

  const panTo = useCallback(
    (x: number, y: number, zoom: number) => {
      setCenter(x, y, { zoom, duration: 700 });
    },
    [setCenter]
  );

  const displayNodes = nodes.map((n) => {
    if (!search) return n;
    const q = search.toLowerCase();
    const project = n.data.project;
    const bioText = [profileData.name, profileData.title, profileData.summary].join(" ").toLowerCase();
    const skillText = skillCategories.flatMap((c) => [c.title, ...c.skills]).join(" ").toLowerCase();
    const expText = experiences.flatMap((e) => [e.role, e.company, ...e.description]).join(" ").toLowerCase();
    const matches =
      project?.title.toLowerCase().includes(q) ||
      project?.description.toLowerCase().includes(q) ||
      project?.technologies.some((t) => t.toLowerCase().includes(q)) ||
      (n.id === "bio" && bioText.includes(q)) ||
      (n.id === "skills" && skillText.includes(q)) ||
      (n.id === "experience" && expText.includes(q)) ||
      (n.id === "contact" && ["contact", "email", "linkedin", "github"].some((kw) => kw.includes(q)));
    return {
      ...n,
      style: {
        ...n.style,
        opacity: matches ? 1 : 0.25,
        transition: "opacity 0.3s ease",
      },
    };
  });

  return (
    <div className="w-screen h-screen" style={{ background: "#050a18" }}>
      {/* Top navigation overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(5,10,24,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-white font-semibold text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full neon-dot" />
            Upamanyu Samal
          </span>
          <span className="text-slate-600 text-xs hidden sm:block">· Infinite Canvas Portfolio</span>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => panTo(item.x, item.y, item.zoom)}
              className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-32 sm:w-48 px-3 py-1.5 rounded-lg text-xs bg-slate-800/60 border border-slate-700/50 text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50"
          />
        </div>
      </div>

      <ReactFlow
        nodes={displayNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        minZoom={0.2}
        maxZoom={2}
        fitView={false}
        style={{ background: "#050a18" }}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(6,182,212,0.08)"
          style={{ background: "#050a18" }}
        />
        <MiniMap
          style={{ background: "#0a1628", border: "1px solid rgba(255,255,255,0.06)" }}
          nodeColor={() => "rgba(6,182,212,0.4)"}
          maskColor="rgba(5,10,24,0.7)"
          position="bottom-right"
        />
        <Controls
          position="bottom-left"
          style={{ background: "rgba(10,22,40,0.9)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "0.5rem" }}
        />
      </ReactFlow>
    </div>
  );
}

export default function SpatialCanvas() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) return <MobileLayout />;

  return (
    <ReactFlowProvider>
      <CanvasInner />
    </ReactFlowProvider>
  );
}
