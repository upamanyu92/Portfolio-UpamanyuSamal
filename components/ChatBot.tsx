"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Download } from "lucide-react";
import { chatbotQA } from "@/data/profile";

interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      type: "bot",
      text: "Hi! I'm Upamanyu's RAG-powered career assistant. Ask me about his time-series experience, production AI systems, architectural decisions, or anything else about his background!",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestion = (question: string) => {
    const userMsg: Message = { id: nextId.current++, type: "user", text: question };
    const qa = chatbotQA.find((q) => q.question === question);
    const botMsg: Message = {
      id: nextId.current++,
      type: "bot",
      text:
        qa?.answer ??
        "I'm not sure about that, but feel free to reach out directly at upamanyu.samal@email.com!",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const typed = input.trim();
    const userMsg: Message = { id: nextId.current++, type: "user", text: typed };
    const matched = chatbotQA.find((q) =>
      typed.toLowerCase().includes(q.question.toLowerCase().split(" ")[0])
    );
    const botMsg: Message = {
      id: nextId.current++,
      type: "bot",
      text:
        matched?.answer ??
        "Great question! For detailed answers, feel free to email me at upamanyu.samal@email.com or check my projects section.",
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center text-white hover:shadow-xl hover:shadow-cyan-500/40 transition-all"
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-slate-700 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white text-sm">RAG Career Assistant</div>
                <div className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" /> Ask about experience, projects, or decisions
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "280px" }}>
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-2 ${msg.type === "user" ? "flex-row-reverse" : ""}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.type === "bot"
                        ? "bg-gradient-to-br from-cyan-400 to-purple-500"
                        : "bg-slate-600"
                    }`}
                  >
                    {msg.type === "bot" ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.type === "bot"
                        ? "bg-slate-800 text-slate-200"
                        : "bg-cyan-500/20 text-cyan-100 border border-cyan-500/30"
                    }`}
                  >
                    {msg.text}
                    {msg.type === "bot" && msg.text.includes("download") && (
                      <a
                        href="/assets/resume.pdf"
                        download
                        className="flex items-center gap-1.5 mt-2 text-cyan-400 text-xs font-medium hover:underline"
                      >
                        <Download className="w-3.5 h-3.5" /> Download Resume
                      </a>
                    )}
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Suggested Questions */}
            <div className="px-4 py-2 border-t border-slate-800">
              <p className="text-slate-500 text-xs mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-1.5">
                {chatbotQA.map((qa) => (
                  <button
                    key={qa.question}
                    onClick={() => handleQuestion(qa.question)}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/40 transition-all"
                  >
                    {qa.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 border-t border-slate-800 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="w-9 h-9 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
