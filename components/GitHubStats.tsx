"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Eye, Code2, ExternalLink, GitBranch } from "lucide-react";

interface RepoStats {
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  open_issues_count: number;
  html_url: string;
  topics: string[];
  updated_at: string;
}

interface LanguageData {
  [key: string]: number;
}

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "bg-blue-400",
  TypeScript: "bg-cyan-400",
  JavaScript: "bg-yellow-400",
  Java: "bg-orange-400",
  Jupyter: "bg-emerald-400",
  Go: "bg-sky-400",
  CSS: "bg-purple-400",
  HTML: "bg-red-400",
  Shell: "bg-green-400",
};

export default function GitHubStats() {
  const [repo, setRepo] = useState<RepoStats | null>(null);
  const [languages, setLanguages] = useState<LanguageData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [repoRes, langRes] = await Promise.all([
          fetch("https://api.github.com/repos/upamanyu92/stocksense", {
            signal: controller.signal,
          }),
          fetch("https://api.github.com/repos/upamanyu92/stocksense/languages", {
            signal: controller.signal,
          }),
        ]);

        if (!repoRes.ok) throw new Error("Fetch failed");

        const repoData: RepoStats = await repoRes.json();
        const langData: LanguageData = langRes.ok ? await langRes.json() : {};

        setRepo(repoData);
        setLanguages(langData);
      } catch {
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  const [now] = useState(() => Date.now());

  const totalBytes = Object.values(languages).reduce((a, b) => a + b, 0);

  const updatedAgo = repo
    ? (() => {
        const diff = now - new Date(repo.updated_at).getTime();
        const days = Math.floor(diff / 86400000);
        if (days === 0) return "today";
        if (days === 1) return "yesterday";
        if (days < 30) return `${days}d ago`;
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        return `${Math.floor(months / 12)}y ago`;
      })()
    : null;

  return (
    <section id="github" className="section-padding relative overflow-hidden">
      <div className="mesh-orb orb-float w-[400px] h-[400px] bg-orange-500/[0.03] bottom-0 -right-20" aria-hidden="true" />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">Open Source</span>
          <h2 className="font-editorial text-4xl font-bold mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            GitHub — StockSense
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Live repository stats for the AI stock prediction platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {loading && (
            <div className="bento-card p-8 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-sm">Fetching live stats from GitHub…</p>
            </div>
          )}

          {error && !loading && (
            <div className="bento-card p-8 text-center">
              <Code2 className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400 text-sm">
                Live stats unavailable.{" "}
                <a
                  href="https://github.com/upamanyu92/stocksense"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  View on GitHub ↗
                </a>
              </p>
            </div>
          )}

          {repo && !loading && (
            <div className="bento-card overflow-hidden">
              {/* Repo header */}
              <div className="p-6 border-b border-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Code2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">upamanyu92 /</span>
                        <span className="text-white font-bold">{repo.name}</span>
                      </div>
                      {repo.description && (
                        <p className="text-slate-400 text-sm mt-0.5 max-w-sm">{repo.description}</p>
                      )}
                    </div>
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:border-cyan-500/60 rounded-lg px-3 py-1.5 transition-all shrink-0"
                  >
                    View Repo <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-white/5">
                {[
                  { icon: Star, label: "Stars", value: repo.stargazers_count, color: "text-yellow-400" },
                  { icon: GitFork, label: "Forks", value: repo.forks_count, color: "text-cyan-400" },
                  { icon: Eye, label: "Watchers", value: repo.watchers_count, color: "text-purple-400" },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="p-5 text-center">
                    <Icon className={`w-5 h-5 ${color} mx-auto mb-1.5`} />
                    <div className={`text-2xl font-bold ${color}`}>{value.toLocaleString()}</div>
                    <div className="text-slate-500 text-xs">{label}</div>
                  </div>
                ))}
              </div>

              {/* Language bar */}
              {totalBytes > 0 && (
                <div className="p-6 border-t border-white/5">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    Language Breakdown
                  </p>
                  {/* Bar */}
                  <div className="flex h-2 rounded-full overflow-hidden mb-3">
                    {Object.entries(languages)
                      .sort((a, b) => b[1] - a[1])
                      .map(([lang, bytes]) => (
                        <div
                          key={lang}
                          className={`${LANGUAGE_COLORS[lang] ?? "bg-slate-500"}`}
                          style={{ width: `${(bytes / totalBytes) * 100}%` }}
                          title={`${lang}: ${((bytes / totalBytes) * 100).toFixed(1)}%`}
                        />
                      ))}
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4">
                    {Object.entries(languages)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([lang, bytes]) => (
                        <div key={lang} className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span
                            className={`w-2.5 h-2.5 rounded-full ${LANGUAGE_COLORS[lang] ?? "bg-slate-500"}`}
                          />
                          {lang}{" "}
                          <span className="text-slate-500">
                            {((bytes / totalBytes) * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Topics + metadata */}
              <div className="px-6 pb-6 border-t border-white/5 pt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  {repo.topics.slice(0, 5).map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                  <GitBranch className="w-3.5 h-3.5" />
                  Updated {updatedAgo}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
