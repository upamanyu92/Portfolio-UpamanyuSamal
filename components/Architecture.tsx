"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const diagrams = [
  {
    id: "microservices",
    title: "Microservices Architecture",
    description: "Event-driven microservices deployed on AWS ECS with service mesh communication",
    nodes: [
      { id: "gateway", label: "API Gateway", x: 50, y: 10, color: "bg-cyan-500", width: 120 },
      { id: "auth", label: "Auth Service", x: 5, y: 35, color: "bg-purple-500", width: 110 },
      { id: "content", label: "Content Service", x: 40, y: 35, color: "bg-blue-500", width: 130 },
      { id: "search", label: "Search Service", x: 75, y: 35, color: "bg-indigo-500", width: 120 },
      { id: "queue", label: "SQS Queue", x: 40, y: 58, color: "bg-orange-500", width: 110 },
      { id: "dynamo", label: "DynamoDB", x: 5, y: 78, color: "bg-yellow-500", width: 110 },
      { id: "elastic", label: "Elasticsearch", x: 55, y: 78, color: "bg-green-500", width: 130 },
    ],
    edges: [
      { from: "gateway", to: "auth" },
      { from: "gateway", to: "content" },
      { from: "gateway", to: "search" },
      { from: "content", to: "queue" },
      { from: "queue", to: "dynamo" },
      { from: "queue", to: "elastic" },
    ],
  },
  {
    id: "event-driven",
    title: "Event-Driven Pipeline",
    description: "High-throughput document processing pipeline with Kafka and stream processing",
    nodes: [
      { id: "ingest", label: "Data Ingestion", x: 5, y: 40, color: "bg-cyan-500", width: 120 },
      { id: "kafka", label: "Kafka Broker", x: 30, y: 40, color: "bg-orange-500", width: 120 },
      { id: "processor", label: "Stream Processor", x: 55, y: 25, color: "bg-purple-500", width: 140 },
      { id: "enricher", label: "AI Enricher", x: 55, y: 58, color: "bg-pink-500", width: 110 },
      { id: "store", label: "Data Store", x: 80, y: 40, color: "bg-emerald-500", width: 110 },
    ],
    edges: [
      { from: "ingest", to: "kafka" },
      { from: "kafka", to: "processor" },
      { from: "kafka", to: "enricher" },
      { from: "processor", to: "store" },
      { from: "enricher", to: "store" },
    ],
  },
  {
    id: "ai-pipeline",
    title: "AI Processing Flow",
    description: "RAG-based AI pipeline for intelligent document processing and Q&A",
    nodes: [
      { id: "user", label: "User Query", x: 5, y: 40, color: "bg-slate-500", width: 100 },
      { id: "embed", label: "Embedding Model", x: 25, y: 40, color: "bg-cyan-500", width: 140 },
      { id: "vector", label: "Vector DB (Pinecone)", x: 50, y: 20, color: "bg-blue-500", width: 160 },
      { id: "llm", label: "LLM (GPT-4)", x: 50, y: 60, color: "bg-purple-500", width: 120 },
      { id: "response", label: "Response", x: 80, y: 40, color: "bg-emerald-500", width: 100 },
    ],
    edges: [
      { from: "user", to: "embed" },
      { from: "embed", to: "vector" },
      { from: "embed", to: "llm" },
      { from: "vector", to: "llm" },
      { from: "llm", to: "response" },
    ],
  },
];

export default function Architecture() {
  const [active, setActive] = useState(diagrams[0].id);
  const diagram = diagrams.find((d) => d.id === active)!;

  return (
    <section id="architecture" className="section-padding bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">System Design</span>
          <h2 className="text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Architecture Showcase
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Interactive visualizations of real architectural patterns from production systems
          </p>
        </motion.div>

        {/* Tab Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {diagrams.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                active === d.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30"
                  : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {d.title}
            </button>
          ))}
        </div>

        {/* Diagram */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold text-white mb-1">{diagram.title}</h3>
            <p className="text-slate-400 text-sm mb-8">{diagram.description}</p>

            {/* SVG Diagram */}
            <div className="relative bg-slate-900/50 rounded-xl overflow-hidden" style={{ height: "280px" }}>
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                    <polygon points="0 0, 4 2, 0 4" fill="#94a3b8" />
                  </marker>
                </defs>
                {diagram.edges.map((edge, i) => {
                  const from = diagram.nodes.find((n) => n.id === edge.from)!;
                  const to = diagram.nodes.find((n) => n.id === edge.to)!;
                  const x1 = from.x + 6;
                  const y1 = from.y + 4;
                  const x2 = to.x + 6;
                  const y2 = to.y + 4;
                  return (
                    <line
                      key={i}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#475569"
                      strokeWidth="0.5"
                      strokeDasharray="2 1"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })}
              </svg>
              {diagram.nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute ${node.color} text-white text-xs font-medium px-3 py-2 rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-10`}
                  style={{ left: `${node.x + 6}%`, top: `${node.y + 4}%` }}
                >
                  {node.label}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6">
              {diagram.nodes.map((node) => (
                <div key={node.id} className="flex items-center gap-2 text-sm text-slate-400">
                  <div className={`w-3 h-3 rounded ${node.color}`} />
                  {node.label}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
