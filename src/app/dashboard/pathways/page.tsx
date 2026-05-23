"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  ChevronDown,
  ChevronUp,
  Users,
  Signal,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  MessageSquare,
  BookOpen,
  ArrowUpRight,
  ThumbsUp,
  Bookmark,
  Radio,
  Target,
  Eye,
  Shield,
  RefreshCw,
  TrendingUp,
  Send,
  Star,
  Archive,
} from "lucide-react";
import {
  pathways,
  Pathway,
  FailureSeverity,
  ResourceType,
} from "@/data/pathways";

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function severityColor(s: FailureSeverity) {
  return s === "CRITICAL" ? "#f43f5e" : s === "HIGH" ? "#f59e0b" : "#10b981";
}

function severityWidth(s: FailureSeverity) {
  return s === "CRITICAL" ? "95%" : s === "HIGH" ? "65%" : "35%";
}

function resourceTypeIcon(t: ResourceType) {
  const map: Record<ResourceType, typeof BookOpen> = {
    book: BookOpen,
    course: Target,
    repo: Archive,
    paper: Eye,
    tool: Zap,
  };
  return map[t] ?? BookOpen;
}

function MetricBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between font-mono text-[9px]">
        <span className="text-white/35 uppercase tracking-wider">{label}</span>
        <span style={{ color }} className="font-bold">
          {value}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// TAB DEFINITIONS
// ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "signals",     label: "Live Signals",      icon: Radio },
  { id: "reality",     label: "Reality Check",      icon: Eye },
  { id: "failures",    label: "Failure Points",     icon: AlertTriangle },
  { id: "compat",      label: "Compatibility",       icon: Target },
  { id: "nobody",      label: "Nobody Tells You",   icon: Shield },
  { id: "roadmap",     label: "Roadmap",            icon: Compass },
  { id: "projects",    label: "Projects",           icon: CheckCircle2 },
  { id: "resources",   label: "Resources",          icon: BookOpen },
  { id: "threads",     label: "Threads",            icon: MessageSquare },
  { id: "metrics",     label: "Metrics",            icon: TrendingUp },
] as const;

type TabId = typeof TABS[number]["id"];

// ─────────────────────────────────────────────────────────────
// PATHWAY CARD
// ─────────────────────────────────────────────────────────────
function PathwayCard({ pathway }: { pathway: Pathway }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("signals");
  const [upvoted, setUpvoted] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [threadInput, setThreadInput] = useState("");
  const [threadSubmitted, setThreadSubmitted] = useState(false);

  const handleUpvote = (id: string) =>
    setUpvoted((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSave = (id: string) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleThreadSubmit = () => {
    if (threadInput.trim().length < 10) return;
    setThreadSubmitted(true);
    setThreadInput("");
    setTimeout(() => setThreadSubmitted(false), 2500);
  };

  const c = pathway.color;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden group"
    >
      {/* Left accent */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40 group-hover:opacity-80 transition-opacity"
        style={{ background: c }}
      />
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-25"
        style={{ background: `linear-gradient(to right, transparent, ${c}60, transparent)` }}
      />

      {/* ── Header ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-start justify-between p-4 md:p-8 text-left"
      >
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 flex-1 min-w-0">
          {/* Code badge */}
          <span
            className="font-mono text-[9px] px-2.5 py-1.5 rounded-lg border uppercase tracking-widest flex-shrink-0 mt-0.5"
            style={{ color: c, borderColor: `${c}35`, background: `${c}08` }}
          >
            {pathway.code}
          </span>

          <div className="min-w-0">
            <h3 className="font-heading font-bold text-xl md:text-2xl text-white tracking-tight">
              {pathway.title}
            </h3>
            <p className="text-white/40 text-sm font-light mt-1 leading-relaxed max-w-xl">
              {pathway.desc}
            </p>

            {/* Live stats */}
            <div className="flex flex-wrap items-center gap-4 mt-4 font-mono text-[9px]">
              <div className="flex items-center gap-1.5 text-white/30">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: c }}
                />
                <span style={{ color: c }} className="font-bold">
                  {pathway.activeOperators}
                </span>
                <span>operators</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/30">
                <Signal className="w-3 h-3" />
                <span className="text-white/55 font-bold">{pathway.totalSignals}</span>
                <span>signals</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/25">
                <Clock className="w-3 h-3" />
                <span>{pathway.timeline}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center flex-shrink-0 transition-all group-hover:border-white/15 mt-1"
          style={expanded ? { borderColor: `${c}30`, color: c } : { color: "rgba(255,255,255,0.3)" }}
        >
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      {/* ── Expanded Panel ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5">
              {/* Tab bar — scrollable */}
              <div className="flex overflow-x-auto border-b border-white/5 px-4 md:px-8 scrollbar-none flex-nowrap">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className="relative flex items-center gap-1.5 px-4 py-3 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0"
                    style={{
                      color: activeTab === id ? c : "rgba(255,255,255,0.22)",
                    }}
                  >
                    <Icon className="w-3 h-3" />
                    {label}
                    {activeTab === id && (
                      <motion.div
                        layoutId={`tab-ul-${pathway.id}`}
                        className="absolute bottom-0 left-0 right-0 h-px"
                        style={{ background: c }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-4 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >

                    {/* ── LIVE SIGNALS ── */}
                    {activeTab === "signals" && (
                      <div className="space-y-4">
                        {pathway.signals.map((sig) => (
                          <div
                            key={sig.id}
                            className="p-5 rounded-xl border border-white/5 bg-white/[0.015] space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-2 font-mono text-[9px]">
                                <span className="text-white/55 font-medium">{sig.operator}</span>
                                <span className="text-white/20">·</span>
                                <span className="text-white/30">{sig.institute}</span>
                              </div>
                              <span className="font-mono text-[8px] text-white/20">{sig.timestamp}</span>
                            </div>

                            <p className="text-white/70 text-sm font-light leading-relaxed">{sig.content}</p>

                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex flex-wrap gap-1.5">
                                {sig.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="font-mono text-[8px] px-2 py-0.5 rounded-full border border-white/8 text-white/25"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleUpvote(sig.id)}
                                  className="flex items-center gap-1.5 font-mono text-[9px] transition-colors"
                                  style={{ color: upvoted.has(sig.id) ? c : "rgba(255,255,255,0.25)" }}
                                >
                                  <ThumbsUp className="w-3.5 h-3.5" />
                                  {sig.upvotes + (upvoted.has(sig.id) ? 1 : 0)}
                                </button>
                                <button
                                  onClick={() => handleSave(sig.id)}
                                  className="flex items-center gap-1.5 font-mono text-[9px] transition-colors"
                                  style={{ color: saved.has(sig.id) ? c : "rgba(255,255,255,0.25)" }}
                                >
                                  <Bookmark className="w-3.5 h-3.5" />
                                  {sig.saves + (saved.has(sig.id) ? 1 : 0)}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="text-center font-mono text-[9px] text-white/20 uppercase tracking-widest pt-2">
                          {pathway.totalSignals - pathway.signals.length} more signals · Join to view full feed
                        </div>
                      </div>
                    )}

                    {/* ── REALITY CHECK ── */}
                    {activeTab === "reality" && (
                      <div className="space-y-4">
                        {pathway.realityCheckpoints.map((cp, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-xl overflow-hidden border border-white/5"
                          >
                            <div className="p-5 bg-white/[0.01] border-b md:border-b-0 md:border-r border-white/5">
                              <span className="font-mono text-[8px] text-emerald-400/70 uppercase tracking-widest block mb-2">
                                Expected
                              </span>
                              <p className="text-white/55 text-sm font-light leading-relaxed italic">
                                "{cp.expected}"
                              </p>
                            </div>
                            <div className="p-5 bg-white/[0.02]">
                              <span className="font-mono text-[8px] text-red-400/70 uppercase tracking-widest block mb-2">
                                Reality
                              </span>
                              <p className="text-white/75 text-sm font-light leading-relaxed">
                                {cp.reality}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── FAILURE POINTS ── */}
                    {activeTab === "failures" && (
                      <div className="space-y-6">
                        {pathway.failurePoints.map((fp, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-start gap-2.5">
                                <AlertTriangle
                                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                  style={{ color: severityColor(fp.severity) }}
                                />
                                <p className="text-white/70 text-sm font-light">{fp.pattern}</p>
                              </div>
                              <span
                                className="font-mono text-[8px] px-2 py-0.5 rounded border uppercase tracking-widest flex-shrink-0"
                                style={{
                                  color: severityColor(fp.severity),
                                  borderColor: `${severityColor(fp.severity)}30`,
                                  background: `${severityColor(fp.severity)}08`,
                                }}
                              >
                                {fp.severity}
                              </span>
                            </div>

                            <div className="h-0.5 bg-white/5 rounded-full overflow-hidden ml-6">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: severityWidth(fp.severity),
                                  background: severityColor(fp.severity),
                                }}
                              />
                            </div>

                            <p className="text-white/35 text-xs font-light ml-6 flex items-start gap-1.5">
                              <RefreshCw className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                              {fp.avoidance}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── COMPATIBILITY ── */}
                    {activeTab === "compat" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.03] space-y-3">
                          <div className="flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest font-semibold">
                              Thrives Here
                            </span>
                          </div>
                          {pathway.compatibility.thrives.map((t, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 flex-shrink-0 mt-2" />
                              <p className="text-white/65 text-sm font-light leading-relaxed">{t}</p>
                            </div>
                          ))}
                        </div>

                        <div className="p-6 rounded-xl border border-red-500/10 bg-red-500/[0.03] space-y-3">
                          <div className="flex items-center gap-2 mb-4">
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest font-semibold">
                              Struggles Here
                            </span>
                          </div>
                          {pathway.compatibility.struggles.map((s, i) => (
                            <div key={i} className="flex items-start gap-2.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0 mt-2" />
                              <p className="text-white/65 text-sm font-light leading-relaxed">{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── NOBODY TELLS YOU ── */}
                    {activeTab === "nobody" && (
                      <div className="space-y-4">
                        <div
                          className="flex items-center gap-2 mb-6 pb-4 border-b"
                          style={{ borderColor: `${c}15` }}
                        >
                          <Shield className="w-4 h-4" style={{ color: c }} />
                          <span
                            className="font-mono text-[9px] uppercase tracking-widest font-semibold"
                            style={{ color: c }}
                          >
                            Brutally honest intelligence from operators on this path
                          </span>
                        </div>
                        {pathway.nobodyTellsYou.map((insight, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-4 p-5 rounded-xl border bg-white/[0.015]"
                            style={{ borderColor: `${c}15` }}
                          >
                            <span
                              className="font-mono text-[9px] flex-shrink-0 mt-0.5 font-bold"
                              style={{ color: c }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-white/70 text-sm font-light leading-relaxed">{insight}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── ROADMAP ── */}
                    {activeTab === "roadmap" && (
                      <div className="relative pl-6">
                        <div
                          className="absolute left-2 top-1 bottom-1 w-px"
                          style={{ background: `linear-gradient(180deg, ${c}60, transparent)` }}
                        />
                        <div className="space-y-6">
                          {pathway.roadmap.map((step, i) => (
                            <div key={i} className="relative flex items-start gap-4">
                              <div
                                className="absolute left-[-22px] top-1.5 w-2.5 h-2.5 rounded-full border-2 bg-black"
                                style={{ borderColor: c }}
                              />
                              <div>
                                <span
                                  className="font-mono text-[8px] uppercase tracking-widest block mb-1"
                                  style={{ color: `${c}80` }}
                                >
                                  Phase {i + 1}
                                </span>
                                <p className="text-white/60 text-sm font-light leading-relaxed">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* ── PROJECTS ── */}
                    {activeTab === "projects" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {pathway.projectProgression.map((level, i) => (
                            <div
                              key={i}
                              className="p-5 rounded-xl bg-white/[0.01] border border-white/[0.04] hover:border-white/8 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-mono text-[9px] text-white/30 tracking-wider">
                                  LEVEL 0{i + 1}
                                </span>
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: c, opacity: 0.3 + i * 0.2 }}
                                />
                              </div>
                              <p className="text-white/60 text-[11px] font-light leading-relaxed">{level}</p>
                            </div>
                          ))}
                        </div>
                        <div
                          className="p-5 rounded-xl border relative overflow-hidden"
                          style={{ borderColor: `${c}20`, background: `${c}04` }}
                        >
                          <div
                            className="absolute top-0 left-0 w-0.5 h-full"
                            style={{ background: c }}
                          />
                          <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-2 pl-3">
                            Internship Outreach Protocol
                          </span>
                          <p className="text-white/60 text-xs font-light leading-relaxed pl-3">
                            {pathway.internshipStrategy}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ── RESOURCES ── */}
                    {activeTab === "resources" && (
                      <div className="space-y-3">
                        {pathway.communityResources.map((res, i) => {
                          const Icon = resourceTypeIcon(res.type);
                          return (
                            <div
                              key={i}
                              onClick={() => res.url && window.open(res.url, "_blank")}
                              className="flex items-start gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors cursor-pointer group"
                            >
                              <div
                                className="w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0"
                                style={{ borderColor: `${c}25`, background: `${c}08` }}
                              >
                                <Icon className="w-4 h-4" style={{ color: c }} />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <span className="font-mono text-[8px] text-white/25 uppercase tracking-widest">
                                    {res.type}
                                  </span>
                                  {res.isHighSignal && (
                                    <span
                                      className="flex items-center gap-1 font-mono text-[7px] px-1.5 py-0.5 rounded border uppercase tracking-widest"
                                      style={{ color: c, borderColor: `${c}35`, background: `${c}08` }}
                                    >
                                      <Star className="w-2 h-2" />
                                      HIGH SIGNAL
                                    </span>
                                  )}
                                  {res.isOutdated && (
                                    <span className="font-mono text-[7px] px-1.5 py-0.5 rounded border border-orange-500/30 text-orange-400 uppercase tracking-widest bg-orange-500/05">
                                      VERIFY DATE
                                    </span>
                                  )}
                                  {res.url && (
                                    <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors ml-auto" />
                                  )}
                                </div>
                                <p className="text-white/70 text-sm font-medium mb-1">{res.title}</p>
                                <p className="text-white/35 text-[11px] font-light leading-relaxed">
                                  {res.description}
                                </p>
                              </div>

                              <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/25 flex-shrink-0">
                                <ThumbsUp className="w-3 h-3" />
                                <span>{res.upvotes}</span>
                              </div>
                            </div>
                          );
                        })}
                        <p className="text-center font-mono text-[9px] text-white/15 uppercase tracking-widest pt-2">
                          Operator-verified · community ranked
                        </p>
                      </div>
                    )}

                    {/* ── THREADS ── */}
                    {activeTab === "threads" && (
                      <div className="space-y-3">
                        {pathway.threads.map((thread) => (
                          <div
                            key={thread.id}
                            className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors cursor-pointer group"
                          >
                            <div className="flex items-start gap-3">
                              <MessageSquare
                                className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                style={{ color: c }}
                              />
                              <p className="text-white/65 text-sm font-light leading-relaxed">
                                {thread.topic}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-1 flex-shrink-0 font-mono text-[9px]">
                              <span style={{ color: c }} className="font-bold">
                                {thread.responses}
                              </span>
                              <span className="text-white/20">{thread.lastActive}</span>
                            </div>
                          </div>
                        ))}

                        {/* Post a thread */}
                        <div className="pt-4 border-t border-white/5">
                          <p className="font-mono text-[9px] text-white/25 uppercase tracking-widest mb-3">
                            Open a discussion thread
                          </p>
                          {threadSubmitted ? (
                            <div className="flex items-center gap-2 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 font-mono text-[10px] text-emerald-400">
                              <CheckCircle2 className="w-4 h-4" />
                              Thread submitted for review
                            </div>
                          ) : (
                            <div className="flex gap-3">
                              <input
                                value={threadInput}
                                onChange={(e) => setThreadInput(e.target.value)}
                                placeholder="Ask a specific operational question..."
                                className="flex-1 bg-white/[0.02] border border-white/8 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 outline-none focus:border-white/15 transition-colors font-light"
                              />
                              <button
                                onClick={handleThreadSubmit}
                                disabled={threadInput.trim().length < 10}
                                className="px-5 py-3 rounded-xl border text-xs font-mono uppercase tracking-widest transition-all disabled:opacity-30 flex items-center gap-1.5"
                                style={{ borderColor: `${c}35`, color: c, background: `${c}08` }}
                              >
                                <Send className="w-3.5 h-3.5" />
                                Post
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── METRICS ── */}
                    {activeTab === "metrics" && (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                          <div className="space-y-5">
                            <MetricBar
                              label="Learning Curve"
                              value={pathway.rewardProfile.learningCurve}
                              color={c}
                            />
                            <MetricBar
                              label="Burnout Risk"
                              value={pathway.rewardProfile.burnoutRisk}
                              color="#f43f5e"
                            />
                            <MetricBar
                              label="Salary Potential"
                              value={pathway.rewardProfile.salaryPotential}
                              color="#10b981"
                            />
                          </div>
                          <div className="space-y-5">
                            <MetricBar
                              label="Career Uncertainty"
                              value={pathway.rewardProfile.uncertainty}
                              color="#f59e0b"
                            />
                            <MetricBar
                              label="Depth Required"
                              value={pathway.rewardProfile.depthRequired}
                              color="#8b5cf6"
                            />
                            <div className="pt-2">
                              <span className="font-mono text-[9px] text-white/30 uppercase tracking-wider block mb-2">
                                Years to Mastery
                              </span>
                              <span
                                className="font-heading text-2xl font-bold tracking-tight"
                                style={{ color: c }}
                              >
                                {pathway.rewardProfile.yearsToMastery}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] font-mono text-[9px] text-white/30 uppercase tracking-widest text-center">
                          Metrics are operator-aggregated estimates · Not guarantees
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function PathwaysPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const totalOperators = pathways.reduce((s, p) => s + p.activeOperators, 0);
  const totalSignals   = pathways.reduce((s, p) => s + p.totalSignals, 0);

  const filtered = pathways.filter((p) => {
    const byCode   = activeFilter === "all" || p.code.toLowerCase().includes(activeFilter);
    const bySearch = search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.code.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase());
    return byCode && bySearch;
  });

  return (
    <div className="py-4 md:p-10 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-8 md:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Compass className="w-4 h-4 text-white/30" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
            Strategic Navigation Intelligence · Phase 9B
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          MISSION PATHWAYS
        </h1>
        <p className="text-white/35 text-sm font-light max-w-xl leading-relaxed mb-6 md:mb-8">
          Living operational ecosystems — not static roadmaps. Each pathway evolves continuously through verified operator intelligence.
        </p>

        {/* Live stats */}
        <div className="flex flex-wrap gap-6 font-mono text-[10px]">
          <div className="flex items-center gap-2 text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-[#00f0ff] font-bold">{totalOperators.toLocaleString()}</span>
            <span>active operators</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Signal className="w-3 h-3" />
            <span className="text-white/55 font-bold">{totalSignals.toLocaleString()}</span>
            <span>signals archived</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Users className="w-3 h-3" />
            <span className="text-white/55 font-bold">{pathways.length}</span>
            <span>active pathways</span>
          </div>
        </div>
      </motion.div>

      {/* ── Search ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mb-5"
      >
        <Compass className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="Search pathways by name, skill, or domain..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-white/10 transition-all font-light"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/30 hover:text-white/60 uppercase tracking-widest"
          >
            [CLEAR]
          </button>
        )}
      </motion.div>

      {/* ── Filter pills ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex overflow-x-auto scrollbar-none flex-nowrap gap-2 mb-6 md:mb-10 -mx-2 px-2 md:mx-0 md:px-0"
      >
        {["all", "ai systems", "research", "startup", "quant", "core engg", "academic"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-[8px] px-3 py-1.5 rounded-full border uppercase tracking-widest transition-all flex-shrink-0 ${
                activeFilter === f
                  ? "border-white/20 text-white/70 bg-white/5"
                  : "border-white/8 text-white/25 hover:border-white/15"
              }`}
            >
              {f === "all" ? "All Pathways" : f}
            </button>
          )
        )}
      </motion.div>

      {/* ── Pathway cards ── */}
      <div className="space-y-5">
        {filtered.map((pathway, i) => (
          <motion.div
            key={pathway.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            <PathwayCard pathway={pathway} />
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 font-mono text-sm text-white/20 uppercase tracking-widest">
            No pathways match this filter
          </div>
        )}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-16 pt-8 border-t border-white/5 text-center"
      >
        <p className="font-mono text-[9px] text-white/15 uppercase tracking-widest">
          All pathway intelligence is operator-verified · ROADTOIIT Navigation Network
        </p>
      </motion.div>
    </div>
  );
}
