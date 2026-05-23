"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  ChevronDown,
  ChevronUp,
  Shield,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  BookOpen,
  MessageSquare,
  Users,
  Archive,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Send,
  Filter,
  BookMarked,
  Cpu,
  FlaskConical,
} from "lucide-react";
import {
  dossiers,
  Dossier,
  DossierTag,
  ALL_DOSSIER_TAGS,
  FrequencyLevel,
  ResourceType,
} from "@/data/dossiers";

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function frequencyColor(f: FrequencyLevel) {
  return f === "HIGH" ? "#f43f5e" : f === "MEDIUM" ? "#f59e0b" : "#10b981";
}

function frequencyWidth(f: FrequencyLevel) {
  return f === "HIGH" ? "85%" : f === "MEDIUM" ? "55%" : "30%";
}

function verificationColor(level: string) {
  if (level === "MULTI-OPERATOR CONFIRMED") return "#10b981";
  if (level === "VERIFIED SIGNAL") return "#00f0ff";
  return "#8b5cf6";
}

function resourceIcon(type: ResourceType) {
  const icons: Record<ResourceType, typeof BookOpen> = {
    book: BookOpen,
    course: Cpu,
    repo: Archive,
    tool: Zap,
    paper: FlaskConical,
  };
  return icons[type] ?? BookOpen;
}

// ─────────────────────────────────────────────────────────────
// CONTRIBUTE MODAL
// ─────────────────────────────────────────────────────────────
function ContributeModal({
  dossier,
  onClose,
}: {
  dossier: Dossier;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (text.trim().length < 20) return;
    setSubmitted(true);
    setTimeout(onClose, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#080808] border border-white/10 rounded-2xl p-8 relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent, ${dossier.color}60, transparent)`,
          }}
        />

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <p className="font-mono text-sm text-white/70 uppercase tracking-widest">
              Signal submitted for verification
            </p>
          </div>
        ) : (
          <>
            <span
              className="font-mono text-[9px] uppercase tracking-[0.3em] block mb-1"
              style={{ color: dossier.color }}
            >
              Contribute Intelligence
            </span>
            <h3 className="font-heading text-xl font-bold text-white mb-6">
              {dossier.title}
            </h3>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share a verified experience, tactical observation, or failure pattern. Be specific — vague signals don't help operators navigate..."
              className="w-full h-36 bg-white/[0.03] border border-white/8 rounded-xl p-4 text-sm text-white/80 placeholder-white/20 outline-none resize-none focus:border-white/15 transition-colors font-light leading-relaxed"
            />

            <div className="flex items-center justify-between mt-4">
              <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                {text.length < 20
                  ? `${20 - text.length} more characters`
                  : "Ready to submit"}
              </span>
              <button
                onClick={handleSubmit}
                disabled={text.trim().length < 20}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-widest border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  borderColor: `${dossier.color}40`,
                  color: dossier.color,
                  background: `${dossier.color}10`,
                }}
              >
                <Send className="w-3.5 h-3.5" />
                Submit Signal
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOSSIER CARD
// ─────────────────────────────────────────────────────────────
function DossierCard({ dossier }: { dossier: Dossier }) {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "signals" | "failures" | "guidance" | "recovery" | "resources" | "threads"
  >("signals");
  const [contributing, setContributing] = useState(false);

  const tabs = dossier.isPhilosophy
    ? (["guidance"] as const)
    : (["signals", "failures", "guidance", "recovery", "resources", "threads"] as const);

  const tabLabels: Record<string, string> = {
    signals: "Verified Signals",
    failures: "Failure Patterns",
    guidance: dossier.isPhilosophy ? "Core Doctrine" : "Tactical Guidance",
    recovery: "Recovery Systems",
    resources: "Resource Drops",
    threads: "Active Threads",
  };

  return (
    <>
      <AnimatePresence>
        {contributing && (
          <ContributeModal
            dossier={dossier}
            onClose={() => setContributing(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden group"
      >
        {/* Left accent bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 opacity-40 group-hover:opacity-80 transition-opacity"
          style={{ background: dossier.color }}
        />

        {/* Top glow sweep */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{
            background: `linear-gradient(to right, transparent, ${dossier.color}50, transparent)`,
          }}
        />

        {/* ── Card Header (always visible) ── */}
        <div
          className="p-4 md:p-8 cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
            {/* Left meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="font-mono text-[8px] text-white/25 tracking-widest">
                  {dossier.id}
                </span>
                <span
                  className="font-mono text-[8px] px-2 py-0.5 rounded border uppercase tracking-widest"
                  style={{
                    color: dossier.color,
                    borderColor: `${dossier.color}35`,
                    background: `${dossier.color}08`,
                  }}
                >
                  {dossier.tag}
                </span>
                {dossier.isPhilosophy && (
                  <span className="font-mono text-[8px] px-2 py-0.5 rounded border border-white/10 text-white/30 uppercase tracking-widest">
                    Foundation
                  </span>
                )}
              </div>

              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                {dossier.title}
              </h3>

              <p className="text-white/40 text-sm font-light leading-relaxed max-w-2xl">
                {dossier.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {dossier.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[8px] px-2 py-0.5 rounded-full border border-white/8 text-white/25 uppercase tracking-widest"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: stats + toggle */}
            <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3 flex-shrink-0">
              {!dossier.isPhilosophy && (
                <div className="flex md:flex-col items-center md:items-end gap-3 font-mono text-[9px]">
                  <div className="flex items-center gap-1.5 text-white/30">
                    <Users className="w-3 h-3" />
                    <span style={{ color: dossier.color }} className="font-bold">
                      {dossier.activeOperators}
                    </span>
                    <span>operators</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/30">
                    <Archive className="w-3 h-3" />
                    <span className="text-white/60 font-bold">
                      {dossier.archivedSignals}
                    </span>
                    <span>signals</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/25">
                    <Clock className="w-3 h-3" />
                    <span>{dossier.lastUpdated}</span>
                  </div>
                </div>
              )}

              <div
                className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-white/30 group-hover:border-white/15 group-hover:text-white/60 transition-all flex-shrink-0"
                style={
                  expanded
                    ? { borderColor: `${dossier.color}30`, color: dossier.color }
                    : {}
                }
              >
                {expanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </div>
          </div>
        </div>

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
                {/* Tab bar */}
                <div className="flex gap-0 overflow-x-auto border-b border-white/5 px-4 md:px-8 scrollbar-none flex-nowrap">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as typeof activeTab)}
                      className="relative px-4 py-3 font-mono text-[9px] uppercase tracking-widest whitespace-nowrap transition-colors flex-shrink-0"
                      style={{
                        color:
                          activeTab === tab
                            ? dossier.color
                            : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {tabLabels[tab]}
                      {activeTab === tab && (
                        <motion.div
                          layoutId={`tab-underline-${dossier.id}`}
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ background: dossier.color }}
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
                      transition={{ duration: 0.25 }}
                    >
                      {/* SIGNALS TAB */}
                      {activeTab === "signals" && (
                        <div className="space-y-4">
                          {dossier.signals.map((sig) => (
                            <div
                              key={sig.id}
                              className="relative p-5 rounded-xl border border-white/5 bg-white/[0.015]"
                            >
                              {/* Verification badge */}
                              <div className="flex items-center gap-2 mb-3">
                                <Shield
                                  className="w-3 h-3"
                                  style={{
                                    color: verificationColor(
                                      sig.verificationLevel
                                    ),
                                  }}
                                />
                                <span
                                  className="font-mono text-[8px] uppercase tracking-widest"
                                  style={{
                                    color: verificationColor(
                                      sig.verificationLevel
                                    ),
                                  }}
                                >
                                  {sig.verificationLevel}
                                </span>
                                <span className="font-mono text-[8px] text-white/20 ml-auto">
                                  {sig.timestamp}
                                </span>
                              </div>

                              <p className="text-white/70 text-sm font-light leading-relaxed mb-4">
                                {sig.content}
                              </p>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 font-mono text-[9px] text-white/30">
                                  <span className="font-medium text-white/50">
                                    {sig.operator}
                                  </span>
                                  <span>·</span>
                                  <span>{sig.institution}</span>
                                </div>
                                <div
                                  className="flex items-center gap-1 font-mono text-[9px]"
                                  style={{
                                    color: verificationColor(
                                      sig.verificationLevel
                                    ),
                                  }}
                                >
                                  <Zap className="w-3 h-3" />
                                  <span>{sig.resonances} resonances</span>
                                </div>
                              </div>
                            </div>
                          ))}

                          {/* Contribute CTA */}
                          <button
                            onClick={() => setContributing(true)}
                            className="w-full p-4 rounded-xl border border-dashed border-white/10 hover:border-white/20 transition-colors flex items-center justify-center gap-2 font-mono text-[9px] text-white/25 hover:text-white/50 uppercase tracking-widest"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            Contribute a verified signal
                          </button>
                        </div>
                      )}

                      {/* FAILURES TAB */}
                      {activeTab === "failures" && (
                        <div className="space-y-5">
                          {dossier.failurePatterns.map((fp, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-2.5">
                                  <AlertTriangle
                                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                    style={{
                                      color: frequencyColor(fp.frequency),
                                    }}
                                  />
                                  <p className="text-white/70 text-sm font-light">
                                    {fp.pattern}
                                  </p>
                                </div>
                                <span
                                  className="font-mono text-[8px] uppercase tracking-widest flex-shrink-0 px-2 py-0.5 rounded border"
                                  style={{
                                    color: frequencyColor(fp.frequency),
                                    borderColor: `${frequencyColor(fp.frequency)}30`,
                                    background: `${frequencyColor(fp.frequency)}08`,
                                  }}
                                >
                                  {fp.frequency}
                                </span>
                              </div>

                              {/* Frequency bar */}
                              <div className="h-0.5 bg-white/5 rounded-full overflow-hidden ml-6">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: frequencyWidth(fp.frequency),
                                    background: frequencyColor(fp.frequency),
                                  }}
                                />
                              </div>

                              <p className="text-white/35 text-xs font-light ml-6 flex items-start gap-1.5">
                                <RefreshCw className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                {fp.recovery}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* GUIDANCE TAB */}
                      {activeTab === "guidance" && (
                        <ul className="space-y-3">
                          {dossier.tacticalGuidance.map((g, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-white/65 font-light leading-relaxed"
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                                style={{ background: dossier.color }}
                              />
                              {g}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* RECOVERY TAB */}
                      {activeTab === "recovery" && (
                        <ul className="space-y-3">
                          {dossier.recoverySystems.map((r, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-white/65 font-light leading-relaxed"
                            >
                              <RefreshCw className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* RESOURCES TAB */}
                      {activeTab === "resources" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {dossier.resourceDrops.map((res, i) => {
                            const Icon = resourceIcon(res.type);
                            return (
                              <div
                                key={i}
                                className="p-4 rounded-xl border border-white/5 bg-white/[0.015] flex gap-3 group hover:border-white/10 transition-colors cursor-pointer"
                                onClick={() =>
                                  res.url && window.open(res.url, "_blank")
                                }
                              >
                                <div
                                  className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0"
                                  style={{
                                    borderColor: `${dossier.color}25`,
                                    background: `${dossier.color}08`,
                                  }}
                                >
                                  <Icon
                                    className="w-4 h-4"
                                    style={{ color: dossier.color }}
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-white/25">
                                      {res.type}
                                    </span>
                                    {res.url && (
                                      <ArrowUpRight className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors" />
                                    )}
                                  </div>
                                  <p className="text-white/70 text-xs font-medium leading-snug mb-1">
                                    {res.title}
                                  </p>
                                  <p className="text-white/30 text-[11px] font-light leading-relaxed">
                                    {res.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* THREADS TAB */}
                      {activeTab === "threads" && (
                        <div className="space-y-3">
                          {dossier.threads.map((thread) => (
                            <div
                              key={thread.id}
                              className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-start gap-3">
                                <MessageSquare
                                  className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                                  style={{ color: dossier.color }}
                                />
                                <p className="text-white/65 text-sm font-light leading-relaxed">
                                  {thread.question}
                                </p>
                              </div>
                              <div className="flex flex-col items-end gap-1 flex-shrink-0 font-mono text-[9px]">
                                <span
                                  className="font-bold"
                                  style={{ color: dossier.color }}
                                >
                                  {thread.responses} responses
                                </span>
                                <span className="text-white/20">
                                  {thread.lastActive}
                                </span>
                              </div>
                            </div>
                          ))}

                          {/* Add thread CTA */}
                          <button
                            onClick={() => setContributing(true)}
                            className="w-full p-4 rounded-xl border border-dashed border-white/10 hover:border-white/20 transition-colors flex items-center justify-center gap-2 font-mono text-[9px] text-white/25 hover:text-white/50 uppercase tracking-widest"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            Open a new response thread
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Contribute footer (non-philosophy) */}
                {!dossier.isPhilosophy && (
                  <div className="px-6 md:px-8 pb-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">
                      {dossier.archivedSignals} intelligence fragments archived
                    </span>
                    <button
                      onClick={() => setContributing(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-mono uppercase tracking-widest border transition-all hover:bg-white/5"
                      style={{
                        borderColor: `${dossier.color}30`,
                        color: dossier.color,
                      }}
                    >
                      <Lightbulb className="w-3 h-3" />
                      Contribute
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
export default function OperationalDossiersPage() {
  const [activeTag, setActiveTag] = useState<DossierTag | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = dossiers.filter((d) => {
    const tagMatch = activeTag === "all" || d.tags.includes(activeTag);
    const queryMatch =
      searchQuery.trim() === "" ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some((t) => t.includes(searchQuery.toLowerCase()));
    return tagMatch && queryMatch;
  });

  const totalOperators = dossiers
    .filter((d) => !d.isPhilosophy)
    .reduce((sum, d) => sum + d.activeOperators, 0);
  const totalSignals = dossiers
    .filter((d) => !d.isPhilosophy)
    .reduce((sum, d) => sum + d.archivedSignals, 0);

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
          <Database className="w-4 h-4 text-white/30" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/25">
            Living Intelligence Database · Phase 9
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          OPERATIONAL DOSSIERS
        </h1>
        <p className="text-white/35 text-sm font-light max-w-xl leading-relaxed mb-6 md:mb-8">
          Community-powered tactical intelligence hubs. Each dossier is continuously updated by verified operators — not admin-written content.
        </p>

        {/* Live stats */}
        <div className="flex flex-wrap gap-6 font-mono text-[10px]">
          <div className="flex items-center gap-2 text-white/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-[#00f0ff] font-bold">{totalOperators.toLocaleString()}</span>
            <span>active operators</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Archive className="w-3 h-3" />
            <span className="text-white/60 font-bold">{totalSignals.toLocaleString()}</span>
            <span>signals archived</span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <BookMarked className="w-3 h-3" />
            <span className="text-white/60 font-bold">{dossiers.length}</span>
            <span>active dossiers</span>
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
        <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input
          type="text"
          placeholder="Query dossiers by title, topic, or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-white/20 outline-none focus:border-white/10 transition-all font-light"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-[9px] text-white/30 hover:text-white/60 uppercase tracking-widest"
          >
            [CLEAR]
          </button>
        )}
      </motion.div>

      {/* ── Tag Filter ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex overflow-x-auto scrollbar-none flex-nowrap items-center gap-2 mb-6 md:mb-10 -mx-2 px-2 md:mx-0 md:px-0"
      >
        <Filter className="w-3.5 h-3.5 text-white/20 flex-shrink-0" />
        <button
          onClick={() => setActiveTag("all")}
          className={`font-mono text-[8px] px-3 py-1.5 rounded-full border uppercase tracking-widest transition-all flex-shrink-0 ${
            activeTag === "all"
              ? "border-white/20 text-white/70 bg-white/5"
              : "border-white/8 text-white/25 hover:border-white/15"
          }`}
        >
          All Dossiers
        </button>
        {ALL_DOSSIER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`font-mono text-[8px] px-3 py-1.5 rounded-full border uppercase tracking-widest transition-all flex-shrink-0 ${
              activeTag === tag
                ? "border-white/20 text-white/70 bg-white/5"
                : "border-white/8 text-white/25 hover:border-white/15"
            }`}
          >
            {tag}
          </button>
        ))}
      </motion.div>

      {/* ── Dossier Cards ── */}
      <div className="space-y-5">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-white/25 font-mono text-sm uppercase tracking-widest"
            >
              No dossiers match this filter
            </motion.div>
          ) : (
            filtered.map((dossier, i) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <DossierCard dossier={dossier} />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer note ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-16 pt-8 border-t border-white/5 text-center"
      >
        <p className="font-mono text-[9px] text-white/15 uppercase tracking-widest">
          All intelligence is operator-contributed and community-verified · ROADTOIIT Intelligence Network
        </p>
      </motion.div>
    </div>
  );
}
