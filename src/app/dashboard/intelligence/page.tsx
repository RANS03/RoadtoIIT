"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Compass, 
  Sliders, 
  ShieldAlert, 
  BookOpen, 
  ArrowUpRight, 
  Star, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Info,
  ChevronDown,
  ChevronUp,
  MapPin,
  Flame,
  Search
} from "lucide-react";
import { useState } from "react";
import { 
  dilemmas, 
  mistakes, 
  skillSignals, 
  curatedResources, 
  campusBriefs,
  Dilemma,
  Mistake,
  SkillSignal,
  CuratedResource,
  CampusBrief
} from "@/data/intelligence";
import { pathways } from "@/data/pathways";

type TabId = "briefs" | "decisions" | "failures" | "resources";

export default function IntelligenceHubPage() {
  const [activeTab, setActiveTab] = useState<TabId>("briefs");
  
  // Tab 1 (Briefs) states
  const [briefFilter, setBriefFilter] = useState<string>("all");
  const [expandedBrief, setExpandedBrief] = useState<string | null>(null);

  // Tab 2 (Decisions) states
  const [selectedDilemma, setSelectedDilemma] = useState<string>(dilemmas[0]?.id || "");

  // Tab 4 (Resources) states
  const [selectedPathwayFilter, setSelectedPathwayFilter] = useState<string>("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("all");

  const activeDilemma = dilemmas.find(d => d.id === selectedDilemma) || dilemmas[0];

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto space-y-6 md:space-y-8">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2.5 mb-2.5">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00f0ff]/60">Student Operating Intelligence</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Intelligence Hub
        </h1>
        <p className="text-white/40 text-xs md:text-sm font-light max-w-2xl leading-relaxed">
          Tactical briefs, decision engines, and failure preventative metrics. The truth layer beneath standard guidelines.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex overflow-x-auto scrollbar-none flex-nowrap gap-1.5 p-1 bg-white/[0.02] border border-white/5 rounded-xl -mx-2 px-2 md:mx-0 md:px-1">
        {(
          [
            { id: "briefs", label: "Tactical Briefs", icon: Compass },
            { id: "decisions", label: "Decision Engine", icon: Sliders },
            { id: "failures", label: "Failure & Skills", icon: ShieldAlert },
            { id: "resources", label: "Resource Drops", icon: BookOpen }
          ] as const
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono transition-all relative flex-shrink-0 ${
                isActive 
                  ? "text-white" 
                  : "text-white/40 hover:text-white/70 hover:bg-white/[0.01]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-[#00f0ff]/5 border border-[#00f0ff]/20 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#00f0ff]" : "text-white/35"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Area */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* TAB 1: TACTICAL BRIEFS */}
            {activeTab === "briefs" && (
              <div className="space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: "all", label: "All Briefs" },
                    { id: "branch", label: "Branch Realities" },
                    { id: "professors", label: "Professor Intel" },
                    { id: "survival", label: "Campus Survival" }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => {
                        setBriefFilter(f.id);
                        setExpandedBrief(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-mono tracking-wider transition-all border ${
                        briefFilter === f.id
                          ? "bg-white/10 text-white border-white/20"
                          : "bg-transparent text-white/45 border-white/5 hover:border-white/10"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>

                {/* Briefs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {campusBriefs
                    .filter((b) => briefFilter === "all" || b.category === briefFilter)
                    .map((brief) => {
                      const isExpanded = expandedBrief === brief.id;
                      const badgeColor = 
                        brief.category === "branch" ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" :
                        brief.category === "professors" ? "text-purple-400 border-purple-500/20 bg-purple-500/5" :
                        "text-amber-400 border-amber-500/20 bg-amber-500/5";

                      return (
                        <div
                          key={brief.id}
                          className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                            isExpanded ? "border-white/15 bg-white/[0.02]" : "border-white/5 hover:border-white/10 bg-white/[0.01]"
                          }`}
                        >
                          <div 
                            onClick={() => setExpandedBrief(isExpanded ? null : brief.id)}
                            className="p-6 cursor-pointer flex justify-between items-start gap-4"
                          >
                            <div className="space-y-3 flex-1">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-[9px] tracking-wider text-white/35">{brief.id}</span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
                                  {brief.category}
                                </span>
                              </div>
                              <h3 className="font-heading font-bold text-lg text-white leading-tight">
                                {brief.title}
                              </h3>
                              <p className="text-white/50 text-xs font-light leading-relaxed">
                                {brief.summary}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 pt-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                                <span>Source: {brief.intelSource}</span>
                                {brief.rating && (
                                  <div className="flex items-center gap-1 text-amber-400/80 ml-2">
                                    <Star className="w-3 h-3 fill-current" />
                                    <span>{brief.rating} Priority</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="p-1 rounded-lg bg-white/5 text-white/40 mt-1">
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </div>
                          </div>

                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden border-t border-white/5 bg-black/[0.15]"
                              >
                                <div className="p-6 space-y-3.5">
                                  <h4 className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                                    Classified Log Details
                                  </h4>
                                  <ul className="space-y-3">
                                    {brief.details.map((detail, index) => (
                                      <li key={index} className="flex items-start gap-2.5 text-xs text-white/70 font-light leading-relaxed">
                                        <span className="mt-1.5 w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                                        <span>{detail}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* TAB 2: DECISION ENGINE */}
            {activeTab === "decisions" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
                {/* Dilemmas Select List */}
                <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto scrollbar-none flex-nowrap gap-2.5 pb-2 lg:pb-0 mb-4 lg:mb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/30 block px-1 flex-shrink-0 self-center lg:self-start">Active Dilemmas</span>
                  {dilemmas.map((dilemma) => {
                    const isSelected = selectedDilemma === dilemma.id;
                    return (
                      <button
                        key={dilemma.id}
                        onClick={() => setSelectedDilemma(dilemma.id)}
                        className={`w-auto min-w-[200px] lg:w-full p-3 lg:p-4 rounded-xl text-left border transition-all duration-300 flex-shrink-0 lg:flex-shrink ${
                          isSelected 
                            ? "bg-white/[0.03] border-white/15 text-white" 
                            : "bg-transparent border-white/5 text-white/50 hover:border-white/10 hover:text-white/80"
                        }`}
                      >
                        <span className="font-mono text-[9px] text-[#00f0ff]/60 tracking-wider block mb-1">
                          {dilemma.id}
                        </span>
                        <h4 className="font-heading font-bold text-sm leading-snug">
                          {dilemma.title}
                        </h4>
                      </button>
                    );
                  })}
                </div>

                {/* Comparative View Console */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="glass-card rounded-2xl border border-white/5 p-6 md:p-8 space-y-6 bg-white/[0.01]">
                    {/* Header */}
                    <div>
                      <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest block mb-1">
                        Comparative Analysis Dossier
                      </span>
                      <h2 className="font-heading font-bold text-xl text-white">
                        {activeDilemma.title}
                      </h2>
                      <p className="text-white/55 text-xs font-light mt-2 leading-relaxed border-l-2 border-red-500/20 pl-3 italic">
                        {activeDilemma.consequence}
                      </p>
                    </div>

                    {/* Options Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                      {/* Option A */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <span className="font-mono text-[9px] text-white/35 uppercase tracking-widest block mb-2">Option Alpha</span>
                        <h4 className="font-heading font-bold text-sm text-[#00f0ff] mb-4">
                          {activeDilemma.optionA.name}
                        </h4>
                        
                        <div className="space-y-4">
                          <div>
                            <span className="font-mono text-[8px] uppercase text-[#00f0ff]/50 tracking-wider block mb-1.5">Strategic Pros</span>
                            <ul className="space-y-1.5">
                              {activeDilemma.optionA.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/60 font-light leading-snug">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-mono text-[8px] uppercase text-red-400/50 tracking-wider block mb-1.5">Strategic Cons</span>
                            <ul className="space-y-1.5">
                              {activeDilemma.optionA.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/60 font-light leading-snug">
                                  <XCircle className="w-3.5 h-3.5 text-red-500/40 mt-0.5 flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Option B */}
                      <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                        <span className="font-mono text-[9px] text-white/35 uppercase tracking-widest block mb-2">Option Beta</span>
                        <h4 className="font-heading font-bold text-sm text-[#8b5cf6] mb-4">
                          {activeDilemma.optionB.name}
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <span className="font-mono text-[8px] uppercase text-[#8b5cf6]/50 tracking-wider block mb-1.5">Strategic Pros</span>
                            <ul className="space-y-1.5">
                              {activeDilemma.optionB.pros.map((pro, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/60 font-light leading-snug">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500/60 mt-0.5 flex-shrink-0" />
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="font-mono text-[8px] uppercase text-red-400/50 tracking-wider block mb-1.5">Strategic Cons</span>
                            <ul className="space-y-1.5">
                              {activeDilemma.optionB.cons.map((con, idx) => (
                                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/60 font-light leading-snug">
                                  <XCircle className="w-3.5 h-3.5 text-red-500/40 mt-0.5 flex-shrink-0" />
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Verdict */}
                    <div className="p-5 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-[3px] h-full bg-amber-500/40" />
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-widest text-amber-400/80 block mb-1">
                            The Operative Verdict
                          </span>
                          <p className="text-white/80 text-xs font-light leading-relaxed">
                            {activeDilemma.verdict}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Context */}
                    <div className="p-4 rounded-xl border border-white/5 bg-black/[0.15] flex gap-3 items-start">
                      <Info className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 block mb-1">
                          Reality Check
                        </span>
                        <p className="text-white/50 text-[11px] font-light leading-relaxed">
                          {activeDilemma.context}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: FAILURE & SKILLS */}
            {activeTab === "failures" && (
              <div className="space-y-8">
                {/* Top Section: Mistakes Register */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Mistakes Register</h3>
                    <p className="text-white/40 text-xs font-light mt-1">
                      Common failure loops that waste semesters and how to bypass them.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {mistakes.map((mistake) => (
                      <div
                        key={mistake.id}
                        className="glass-card rounded-2xl border border-white/5 p-6 space-y-4.5 bg-white/[0.01]"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[9px] tracking-wider text-red-400/50">{mistake.id}</span>
                            <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-red-500/5 border border-red-500/20 text-red-400 uppercase tracking-wider">
                              {mistake.category}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-heading font-bold text-base text-white leading-tight">
                            {mistake.title}
                          </h4>
                          <p className="text-white/40 text-[11px] font-light italic mt-1.5">
                            &ldquo;{mistake.realityCheck}&rdquo;
                          </p>
                        </div>

                        {/* Symptoms */}
                        <div className="space-y-1.5">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-white/30 block">Typical Symptoms</span>
                          <ul className="space-y-1">
                            {mistake.symptoms.map((symptom, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-[11px] text-white/50 font-light leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-red-400/50 flex-shrink-0" />
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prevention */}
                        <div className="p-3.5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02]">
                          <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400/80 block mb-1">Preventative Action</span>
                          <p className="text-white/70 text-xs font-light leading-relaxed">
                            {mistake.prevention}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: Skill Matrix */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">Skill Signal Matrix</h3>
                    <p className="text-white/40 text-xs font-light mt-1">
                      Distinguishing what creates genuine hiring conviction vs what looks like generic checklist clutter.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {skillSignals.map((section, idx) => (
                      <div key={idx} className="glass-card rounded-2xl border border-white/5 p-6 bg-white/[0.01] space-y-4">
                        <h4 className="font-heading font-bold text-md text-[#00f0ff] uppercase tracking-wider text-sm">
                          {section.category}
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* High Signal Column */}
                          <div className="space-y-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              High-Signal Proof (Hiring Conviction)
                            </span>

                            <div className="space-y-3">
                              {section.highSignals.map((sig, sIdx) => (
                                <div key={sIdx} className="p-3.5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.01] space-y-1">
                                  <h5 className="font-heading font-bold text-xs text-white">{sig.name}</h5>
                                  <p className="text-white/50 text-[11px] font-light leading-relaxed">{sig.proof}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Low Signal Column */}
                          <div className="space-y-3">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-red-400 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                              Low-Signal Trap (Generic Clutter)
                            </span>

                            <div className="space-y-3">
                              {section.lowSignals.map((sig, sIdx) => (
                                <div key={sIdx} className="p-3.5 rounded-xl border border-red-500/10 bg-red-500/[0.01] space-y-1">
                                  <h5 className="font-heading font-bold text-xs text-white">{sig.name}</h5>
                                  <p className="text-white/50 text-[11px] font-light leading-relaxed">{sig.trap}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: RESOURCE DROPS */}
            {activeTab === "resources" && (
              <div className="space-y-6">
                {/* Filters Row */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                  <div className="flex flex-wrap gap-4 items-center">
                    {/* Pathway filter */}
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block">Mission Pathway</label>
                      <select
                        value={selectedPathwayFilter}
                        onChange={(e) => setSelectedPathwayFilter(e.target.value)}
                        className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/80 font-light font-mono focus:outline-none focus:border-[#00f0ff]/50"
                      >
                        <option value="all">All Pathways</option>
                        {pathways.map((p) => (
                          <option key={p.id} value={p.id}>{p.code}</option>
                        ))}
                      </select>
                    </div>

                    {/* Category Type Filter */}
                    <div className="space-y-1">
                      <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block">Resource Type</label>
                      <select
                        value={selectedTypeFilter}
                        onChange={(e) => setSelectedTypeFilter(e.target.value)}
                        className="bg-black/60 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white/80 font-light font-mono focus:outline-none focus:border-[#00f0ff]/50"
                      >
                        <option value="all">All Types</option>
                        <option value="book">Books</option>
                        <option value="course">Courses</option>
                        <option value="github">GitHub / Tools</option>
                      </select>
                    </div>
                  </div>

                  {/* Active Match Counter */}
                  <div className="font-mono text-[10px] text-white/30">
                    Showing {
                      curatedResources.filter((res) => {
                        const pathMatch = selectedPathwayFilter === "all" || res.pathwayId === selectedPathwayFilter;
                        const typeMatch = selectedTypeFilter === "all" || res.category === selectedTypeFilter;
                        return pathMatch && typeMatch;
                      }).length
                    } high-signal matches
                  </div>
                </div>

                {/* Resources Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {curatedResources
                    .filter((res) => {
                      const pathMatch = selectedPathwayFilter === "all" || res.pathwayId === selectedPathwayFilter;
                      const typeMatch = selectedTypeFilter === "all" || res.category === selectedTypeFilter;
                      return pathMatch && typeMatch;
                    })
                    .map((res) => {
                      const pathInfo = pathways.find((p) => p.id === res.pathwayId);
                      const badgeColor = 
                        res.category === "course" ? "text-cyan-400 border-cyan-500/20 bg-cyan-500/5" :
                        res.category === "book" ? "text-purple-400 border-purple-500/20 bg-purple-500/5" :
                        "text-emerald-400 border-emerald-500/20 bg-emerald-500/5";

                      return (
                        <div
                          key={res.id}
                          className="glass-card rounded-2xl border border-white/5 p-6 bg-white/[0.01] hover:border-white/10 transition-colors flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[9px] tracking-wider text-white/30">{res.id}</span>
                                <span className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${badgeColor}`}>
                                  {res.category}
                                </span>
                              </div>
                              {pathInfo && (
                                <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white/40">
                                  {pathInfo.code}
                                </span>
                              )}
                            </div>

                            <div>
                              <h4 className="font-heading font-bold text-base text-white">
                                {res.title}
                              </h4>
                              <p className="text-white/50 text-xs font-light mt-1.5 leading-relaxed">
                                {res.description}
                              </p>
                            </div>

                            {/* Why this resource? */}
                            <div className="p-3 rounded-lg bg-black/40 border border-white/[0.03] space-y-1">
                              <span className="font-mono text-[8px] uppercase tracking-wider text-[#00f0ff] flex items-center gap-1">
                                <Flame className="w-3 h-3 text-[#00f0ff] fill-current" />
                                High-Signal Value
                              </span>
                              <p className="text-white/60 text-[10px] font-light leading-relaxed">
                                {res.signal}
                              </p>
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-white/[0.03] flex justify-end">
                            <a
                              href={res.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-mono text-white/40 hover:text-white/80 transition-colors"
                            >
                              <span>Inspect Source</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
