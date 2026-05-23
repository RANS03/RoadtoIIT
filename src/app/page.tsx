"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  Radio, 
  ArrowRight,
  Activity,
  Cpu,
  Shield,
  Signal,
  Globe,
  Zap,
  ChevronDown
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeedPost, getStoredFeed } from "@/data/feed";
import { FeedPostCard } from "@/components/ui/FeedPostCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

/* ─────────────────────────────────────────
   SEED SIGNALS – shown before real posts load
───────────────────────────────────────── */
const seedSignals: FeedPost[] = [
  {
    id: "home-sig-1",
    type: "survivor-log",
    isAnonymous: false,
    content:
      "Most students optimize for GPA. The real differentiator is proof of work under ambiguity. Your CGPA is noise. Your GitHub is signal.",
    timestamp: "2m ago",
    likes: 142, likedByUser: false, saves: 38, savedByUser: false, comments: [],
    reactions: [
      { emoji: "🤝", count: 28, reactedByUser: false },
      { emoji: "⚡", count: 14, reactedByUser: false }
    ],
    tags: ["placements", "engineering"],
    title: "Proof of Work vs GPA",
    signalStrength: 88, isVerified: true, tacticalRelevance: 9.2,
    verifiers: ["systems_ghost", "quant_lab"],
    sqsScore: 88, usefulnessRank: "B+",
    verificationLevel: "VERIFIED SIGNAL",
    campusDetail: "IIT Madras • CSE Wing, 1:30 AM",
    featured: false, variant: "standard",
    author: {
      id: "anon-op-1", name: "anonymous_operator",
      avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=anon1",
      institution: "IIT Madras", branch: "Computer Science",
      missionType: "AI Systems Path",
      logsShared: 14, intelAdded: 8, pathwaysCompleted: 1, intelligenceScore: 840,
      researchInterests: ["Distributed ML"], reputationGrade: "Lead Analyst",
      missionFocus: "Proof-of-work systems", yearSemester: "Year 3, Sem 5",
      activeMissions: [], buildLogs: [], credibilityRating: 82, skillsMatrix: []
    }
  },
  {
    id: "home-sig-2",
    type: "build-journal",
    isAnonymous: false,
    content:
      "Tutorials gave me confidence. Building from scratch exposed my actual skill level. The gap between 'I understand this' and 'I can build this' is enormous. Most people never cross it.",
    timestamp: "5m ago",
    likes: 89, likedByUser: false, saves: 54, savedByUser: false, comments: [],
    reactions: [
      { emoji: "⚡", count: 18, reactedByUser: false },
      { emoji: "🤝", count: 10, reactedByUser: false }
    ],
    tags: ["projects", "learning"],
    title: "Tutorials vs Building From Scratch",
    signalStrength: 92, isVerified: true, tacticalRelevance: 9.4,
    verifiers: ["quant_lab"],
    sqsScore: 92, usefulnessRank: "A",
    verificationLevel: "FIELD CONFIRMED",
    campusDetail: "IIT Delhi • Lab 302, 2:40 AM",
    featured: false, variant: "standard",
    author: {
      id: "sys-ghost", name: "systems_ghost",
      avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=sys",
      institution: "IIT Delhi", branch: "Electrical Engineering",
      missionType: "Core Engineering",
      logsShared: 22, intelAdded: 15, pathwaysCompleted: 2, intelligenceScore: 910,
      researchInterests: ["OS Design"], reputationGrade: "Systems Builder",
      missionFocus: "Edge systems design", yearSemester: "Year 4, Sem 7",
      activeMissions: [], buildLogs: [], credibilityRating: 90, skillsMatrix: []
    }
  },
  {
    id: "home-sig-3",
    type: "survivor-log",
    isAnonymous: false,
    content:
      "The smartest students are not the loudest. Most serious builders disappear from social media. They resurface 18 months later with something real. Track the quiet ones.",
    timestamp: "8m ago",
    likes: 215, likedByUser: false, saves: 95, savedByUser: false, comments: [],
    reactions: [
      { emoji: "🤝", count: 54, reactedByUser: false },
      { emoji: "👁️", count: 42, reactedByUser: false }
    ],
    tags: ["culture", "systems"],
    title: "The Silent Builder Pattern",
    signalStrength: 96, isVerified: true, tacticalRelevance: 9.6,
    verifiers: ["anonymous_operator"],
    sqsScore: 95, usefulnessRank: "A+",
    verificationLevel: "MULTI-OPERATOR VERIFIED",
    campusDetail: "BITS Pilani • Hostel corridors, late night",
    featured: false, variant: "standard",
    author: {
      id: "quant-lab-u", name: "quant_lab",
      avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=quant",
      institution: "BITS Pilani", branch: "CS + Finance",
      missionType: "Quant Explorer",
      logsShared: 9, intelAdded: 12, pathwaysCompleted: 1, intelligenceScore: 780,
      researchInterests: ["Quantitative Finance"], reputationGrade: "Quant Operative",
      missionFocus: "Arbitrage execution", yearSemester: "Year 3, Sem 6",
      activeMissions: [], buildLogs: [], credibilityRating: 88, skillsMatrix: []
    }
  }
];

/* ─────────────────────────────────────────
   TRENDING DOSSIERS
───────────────────────────────────────── */
const TRENDING = [
  { title: "Off-campus hiring systems", discussions: 34, archives: 142, density: 96, update: "2m ago", color: "#00f0ff" },
  { title: "IIT EE burnout — the real data", discussions: 21, archives: 85, density: 88, update: "12m ago", color: "#8b5cf6" },
  { title: "Hostel productivity systems", discussions: 15, archives: 60, density: 79, update: "1h ago", color: "#10b981" },
  { title: "AI / ML engineering pathways", discussions: 42, archives: 210, density: 98, update: "4m ago", color: "#f59e0b" },
  { title: "What placement statistics hide", discussions: 29, archives: 104, density: 92, update: "18m ago", color: "#f43f5e" },
];

/* ─────────────────────────────────────────
   CAMPUS NODES
───────────────────────────────────────── */
const INITIAL_CAMPUS = [
  { name: "IIT Madras",    code: "IITM",  count: 142, lastActive: "2m ago",  color: "#8b5cf6" },
  { name: "IIT Delhi",     code: "IITD",  count: 185, lastActive: "5m ago",  color: "#00f0ff" },
  { name: "IIT Bombay",    code: "IITB",  count: 210, lastActive: "12m ago", color: "#10b981" },
  { name: "IIT Kharagpur", code: "IITKGP",count: 120, lastActive: "1h ago",  color: "#38bdf8" },
  { name: "BITS Pilani",   code: "BITS",  count: 98,  lastActive: "8m ago",  color: "#f59e0b" },
  { name: "IIIT Hyderabad",code: "IIITH", count: 76,  lastActive: "4h ago",  color: "#f43f5e" },
  { name: "NIT Trichy",    code: "NITT",  count: 54,  lastActive: "2h ago",  color: "#ec4899" },
];

/* ─────────────────────────────────────────
   SECTION DIVIDER COMPONENT
───────────────────────────────────────── */
function SectionDivider({ color = "white" }: { color?: string }) {
  return (
    <div className="max-w-5xl mx-auto px-4 my-24 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/5" />
      <div className="flex items-center gap-1.5 font-mono text-[8px] tracking-widest text-white/15 uppercase">
        <span className="w-1 h-1 rounded-full bg-white/20" />
        <span>GRID SECTOR TRANSITION</span>
        <span className="w-1 h-1 rounded-full bg-white/20" />
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/5" />
    </div>
  );
}

/* ─────────────────────────────────────────
   TICKER LOG COMPONENT (bottom of page)
───────────────────────────────────────── */
const TICKER_EVENTS = [
  "neophyte_operator • IIT Delhi • broadcasted new signal",
  "quant_ghost • IIT Bombay • verified placement dossier",
  "deep_lab • IIT Madras • joined active thread: AI Systems",
  "systems_ghost • IIIT-H • challenged a dissenting log",
  "bootstrap_kid • BITS Pilani • submitted build journal entry",
  "anonymous_operator • IIT KGP • sharded new survivor log",
  "quant_lab • NIT Trichy • resonated 4 signals",
];

function LiveTicker() {
  const [tickerIdx, setTickerIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [clientTime, setClientTime] = useState<string | null>(null);

  useEffect(() => {
    // Set time only on client to avoid SSR hydration mismatch
    setClientTime(new Date().toLocaleTimeString());

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % TICKER_EVENTS.length);
        setClientTime(new Date().toLocaleTimeString());
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/90 border-t border-white/5 backdrop-blur-md py-2 px-6 flex items-center gap-4 font-mono text-[10px]">
      <div className="flex items-center gap-1.5 text-[#00f0ff] shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
        <span className="uppercase tracking-widest">LIVE FEED</span>
      </div>
      <div className="w-px h-3 bg-white/10 shrink-0" />
      <AnimatePresence mode="wait">
        {visible && clientTime && (
          <motion.span
            key={tickerIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-white/40 truncate"
          >
            [{clientTime}] {TICKER_EVENTS[tickerIdx]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function Home() {
  const router = useRouter();

  // ── Stream state
  const [signals, setSignals]     = useState<FeedPost[]>(seedSignals);
  const signalsRef                = useRef(signals);
  signalsRef.current              = signals;

  // ── Metrics
  const [activeOperators, setActiveOperators] = useState(2483);
  const [signalsToday,    setSignalsToday]    = useState(412);
  const [liveThreads,     setLiveThreads]     = useState(138);
  const activeCampuses                         = 24;

  // ── Preview lock
  const [interactions, setInteractions] = useState(0);
  const [isLocked,     setIsLocked]     = useState(false);

  // ── Campus nodes
  const [campusData, setCampusData] = useState(INITIAL_CAMPUS);

  // ── New signal flash indicator
  const [newSignalFlash, setNewSignalFlash] = useState(false);

  /* ---------- Interaction tracking -------------------- */
  const track = () => {
    if (isLocked) return;
    setInteractions(prev => {
      const next = prev + 1;
      if (next >= 3) setIsLocked(true);
      return next;
    });
  };

  /* ---------- Metric ticks (4.5s) -------------------- */
  useEffect(() => {
    const id = setInterval(() => {
      setActiveOperators(v => Math.max(2400, v + (Math.random() > 0.5 ? 1 : -1) * Math.ceil(Math.random() * 3)));
      if (Math.random() > 0.7) setLiveThreads(v => v + 1);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  /* ---------- Live stream insertion (15s) ------------- */
  useEffect(() => {
    const id = setInterval(() => {
      const stored = getStoredFeed();
      const ids    = new Set(signalsRef.current.map(s => s.id));
      const fresh  = stored.filter(p => !ids.has(p.id));

      const next: FeedPost = fresh.length > 0
        ? { ...fresh[Math.floor(Math.random() * fresh.length)], timestamp: "Just now" }
        : {
            ...stored[Math.floor(Math.random() * stored.length)],
            id: `home-clone-${Date.now()}`,
            timestamp: "Just now",
            likes: 0, likedByUser: false, saves: 0, savedByUser: false, comments: []
          };

      setSignals(prev => [next, ...prev]);
      setSignalsToday(v => v + 1);
      setNewSignalFlash(true);
      setTimeout(() => setNewSignalFlash(false), 2000);
    }, 15000);
    return () => clearInterval(id);
  }, []); // intentionally empty — uses ref

  /* ---------- Campus pulse (6s) ---------------------- */
  useEffect(() => {
    const id = setInterval(() => {
      setCampusData(prev => {
        const i = Math.floor(Math.random() * prev.length);
        return prev.map((c, idx) => idx === i
          ? { ...c, count: Math.max(20, c.count + (Math.random() > 0.5 ? 1 : -1)), lastActive: "Just now" }
          : c
        );
      });
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black pb-12">
      <Navbar />
      <LiveTicker />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <HeroSection />

      {/* ══════════════════════════════════════
          METRICS BAR
      ══════════════════════════════════════ */}
      <section className="relative z-10 max-w-5xl mx-auto w-full px-4 -mt-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="relative border border-white/[0.06] bg-white/[0.015] backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden"
        >
          {/* top scan-line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00f0ff]/40 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
              { label: "Active Operators", value: activeOperators.toLocaleString(), color: "#00f0ff", icon: Activity, live: true },
              { label: "Signals Today",    value: signalsToday.toString(),           color: "#ffffff", icon: Signal,   live: false },
              { label: "Live Threads",     value: liveThreads.toString(),            color: "#8b5cf6", icon: Radio,    live: true },
              { label: "Active Campuses",  value: activeCampuses.toString(),         color: "#10b981", icon: Globe,    live: false },
            ].map(({ label, value, color, icon: Icon, live }) => (
              <div key={label} className="flex flex-col items-center md:px-8 py-3 md:py-0 gap-2">
                <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  <Icon className="w-3 h-3" style={{ color }} />
                  <span>{label}</span>
                  {live && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />}
                </div>
                <span className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════
          LIVE INTELLIGENCE STREAM
      ══════════════════════════════════════ */}
      <section id="live-stream" className="max-w-3xl mx-auto w-full px-4 mb-8 scroll-mt-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00f0ff]/20 bg-[#00f0ff]/5 mb-5">
            <Radio className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
            <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-[0.25em]">
              Grid Network Output • Live
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            LIVE INTELLIGENCE STREAM
          </h2>
          <p className="text-white/40 text-sm font-light max-w-md mx-auto leading-relaxed">
            Realtime operational signals from operators across the network — decrypted and broadcast as received.
          </p>
        </motion.div>

        {/* New signal flash */}
        <AnimatePresence>
          {newSignalFlash && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 flex items-center justify-center gap-2 font-mono text-[10px] text-[#00f0ff] uppercase tracking-widest"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>New signal decrypted and injected into stream</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Cards with lock overlay */}
        <div className="relative">
          <div className={`space-y-5 transition-all duration-700 ${isLocked ? "blur-sm pointer-events-none select-none" : ""}`}>
            <AnimatePresence initial={false}>
              {signals.slice(0, 6).map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: -24, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <FeedPostCard
                    post={post}
                    onLike={track}
                    onSave={track}
                    onReact={track}
                    onAddComment={track}
                    disableCardLink
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── LOCK OVERLAY ── */}
          {isLocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-black/80 backdrop-blur-lg px-8 py-16 text-center shadow-[0_0_100px_rgba(0,240,255,0.04)]"
            >
              {/* Glow ring */}
              <div className="relative mb-8">
                <div className="absolute inset-0 rounded-full bg-[#00f0ff]/10 blur-xl animate-pulse" />
                <div className="relative w-20 h-20 rounded-2xl border border-[#00f0ff]/25 bg-black/60 flex items-center justify-center">
                  <Lock className="w-9 h-9 text-[#00f0ff]" />
                </div>
              </div>

              <span className="font-mono text-[9px] text-[#00f0ff]/70 uppercase tracking-[0.3em] block mb-3">
                Access Protocol Active
              </span>
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                Verified Access Required
              </h3>
              <p className="text-white/45 text-sm max-w-sm mb-10 leading-relaxed font-light">
                Further operational intelligence requires verified access. Initialize your authentication to decrypt the full live signal grid.
              </p>

              <GlowButton
                onClick={() => router.push("/auth")}
                className="text-xs tracking-[0.25em] uppercase px-10 py-4 font-bold shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_50px_rgba(0,240,255,0.35)] transition-shadow"
              >
                INITIALIZE ACCESS
              </GlowButton>

              <button
                onClick={() => { setInteractions(0); setIsLocked(false); }}
                className="mt-5 text-[9px] font-mono text-white/20 hover:text-white/40 uppercase tracking-widest transition-colors"
              >
                [View 1 more preview signal]
              </button>
            </motion.div>
          )}
        </div>


      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════
          TRENDING DOSSIERS
      ══════════════════════════════════════ */}
      <section id="trending" className="max-w-6xl mx-auto w-full px-4 mb-8 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3"
        >
          <div>
            <span className="font-mono text-[9px] text-[#8b5cf6] uppercase tracking-[0.25em] block mb-2 font-semibold">
              High-Signal Briefings
            </span>
            <h2 className="font-heading text-4xl font-bold text-white tracking-tight">
              TRENDING OPERATIONAL DOSSIERS
            </h2>
          </div>
          <p className="text-white/30 text-[10px] font-mono max-w-xs md:text-right leading-relaxed">
            Most-accessed intelligence archives · Updated in realtime
          </p>
        </motion.div>

        {/* Scroll hint */}
        <div className="flex items-center gap-2 mb-6 font-mono text-[9px] text-white/20">
          <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
          <span className="uppercase tracking-widest">Swipe to decrypt more dossiers</span>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
          {TRENDING.map((d, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => { track(); router.push("/auth"); }}
              className="group relative min-w-[280px] md:min-w-[300px] flex-shrink-0 snap-start p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.025] transition-all duration-400 cursor-pointer"
              style={{ boxShadow: `0 0 0 1px transparent` }}
            >
              {/* Color accent top line */}
              <div
                className="absolute top-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: d.color }}
              />

              {/* Category pill */}
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-mono uppercase tracking-widest mb-5 border"
                style={{ borderColor: `${d.color}30`, backgroundColor: `${d.color}08`, color: d.color }}
              >
                <Cpu className="w-2.5 h-2.5" />
                DOSSIER #{idx + 101}
              </div>

              <h4 className="font-heading text-base font-bold text-white mb-6 leading-snug group-hover:text-white/90">
                {d.title}
              </h4>

              <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-[10px]">
                <div className="flex justify-between text-white/35">
                  <span>Active Discussions</span>
                  <span style={{ color: d.color }} className="font-bold">{d.discussions} operators</span>
                </div>
                <div className="flex justify-between text-white/35">
                  <span>Intelligence Archives</span>
                  <span className="text-white/70">{d.archives} saves</span>
                </div>
                <div className="flex justify-between text-white/35">
                  <span>Signal Density</span>
                  <span className="text-emerald-400">{d.density}%</span>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between font-mono text-[9px]">
                <span className="text-white/20">Updated {d.update}</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform" style={{ color: d.color }}>
                  Decrypt <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.div>
          ))}

          {/* Join CTA card */}
          <div
            onClick={() => router.push("/auth")}
            className="group min-w-[200px] flex-shrink-0 snap-start flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 hover:border-white/25 transition-all duration-300 cursor-pointer px-8"
          >
            <div className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center group-hover:border-[#00f0ff]/30 group-hover:bg-[#00f0ff]/5 transition-all">
              <Shield className="w-5 h-5 text-white/30 group-hover:text-[#00f0ff] transition-colors" />
            </div>
            <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest text-center group-hover:text-white/60 transition-colors">
              Unlock All Dossiers
            </span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ══════════════════════════════════════
          CAMPUS GRID
      ══════════════════════════════════════ */}
      <section id="campus-grid" className="max-w-6xl mx-auto w-full px-4 scroll-mt-24 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[9px] text-[#10b981] uppercase tracking-[0.25em] block mb-2 font-semibold">
            Live Topology Map
          </span>
          <h2 className="font-heading text-4xl font-bold text-white tracking-tight mb-3">
            ACTIVE CAMPUS GRID
          </h2>
          <p className="text-white/35 text-sm font-light max-w-md mx-auto">
            Realtime signal streams and active node counts from engineering colleges on the grid.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {campusData.map((node, idx) => (
            <motion.div
              key={node.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              onClick={() => { track(); router.push("/auth"); }}
              className="relative p-5 rounded-2xl border border-white/[0.06] bg-white/[0.01] hover:border-white/12 hover:bg-white/[0.025] transition-all duration-300 cursor-pointer group"
            >
              {/* Pulse indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full animate-ping absolute opacity-60"
                  style={{ backgroundColor: node.color }}
                />
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: node.color }}
                />
              </div>

              {/* Node glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${node.color}08, transparent 70%)` }}
              />

              <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest block mb-1">
                NODE // {node.code}
              </span>
              <h4
                className="font-heading text-sm font-bold text-white mb-4 leading-tight group-hover:transition-colors"
                style={{ color: undefined }}
              >
                {node.name}
              </h4>

              <div className="space-y-1.5 pt-3 border-t border-white/5 font-mono text-[10px]">
                <div className="flex justify-between text-white/35">
                  <span>Active nodes</span>
                  <span className="font-bold text-white/80">{node.count}</span>
                </div>
                <div className="flex justify-between text-white/35">
                  <span>Last signal</span>
                  <span style={{ color: node.color }} className="font-medium">{node.lastActive}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Scanning placeholder */}
          <div className="p-5 rounded-2xl border border-dashed border-white/8 flex flex-col items-center justify-center text-center py-10 select-none">
            <span
              className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping mb-4"
              style={{ animationDuration: "1.5s" }}
            />
            <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest block">
              Scanning nodes
            </span>
            <span className="font-mono text-[7px] text-white/12 mt-1 uppercase tracking-wider">
              Establishing bridge...
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center gap-5"
        >
          <p className="text-white/30 text-xs font-mono tracking-widest text-center max-w-sm">
            You are viewing a read-only preview of the live intelligence network.
          </p>
          <GlowButton
            onClick={() => router.push("/auth")}
            className="text-xs tracking-[0.25em] uppercase px-10 py-4 font-bold shadow-[0_0_30px_rgba(0,240,255,0.1)] hover:shadow-[0_0_50px_rgba(0,240,255,0.3)] transition-shadow"
          >
            INITIALIZE FULL ACCESS
          </GlowButton>
          <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase">
            ENCRYPTED GATEWAY · ROADTOIIT INTELLIGENCE NETWORK
          </span>
        </motion.div>
      </section>
    </main>
  );
}