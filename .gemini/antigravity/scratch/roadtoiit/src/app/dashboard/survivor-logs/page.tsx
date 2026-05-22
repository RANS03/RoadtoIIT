"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Shield, Filter } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const topics = ["All", "Burnout", "Placements", "Identity", "Loneliness", "Coding", "Hostel"];

const logs = [
  { id: "LOG-001", topic: "Identity", text: "I got IIT. Then realized I had no idea who I was without the exam. Three years built around one goal. On day one of campus, that goal was gone." },
  { id: "LOG-002", topic: "Loneliness", text: "Hostel corridors become strangely lonely at 2AM. Everyone looks like they have it figured out. Nobody does. We're all just performing confidence." },
  { id: "LOG-003", topic: "Placements", text: "The placement numbers don't show the anxiety behind them. One offer letter for every 8 breakdowns. That math doesn't make it into the brochure." },
  { id: "LOG-004", topic: "Burnout", text: "Nobody tells you how quiet success feels after JEE. The noise stops and you're just... empty. You forgot to build a self alongside the rank." },
  { id: "LOG-005", topic: "Coding", text: "Everyone on campus codes. But 80% are grinding Leetcode for the same 5 SDE roles. Nobody is building anything. It's just interview theater." },
  { id: "LOG-006", topic: "Identity", text: "My branch is considered dead. Every conversation at home becomes a defense of a decision I didn't fully understand when I made it at 17." },
  { id: "LOG-007", topic: "Hostel", text: "The mess food destroys you by month three. But it's not just physical. The isolation of the room is its own kind of slow erosion." },
  { id: "LOG-008", topic: "Burnout", text: "Semester 4 is when most people quietly give up on their own interests. The curriculum takes everything. You survive. You don't grow." },
  { id: "LOG-009", topic: "Placements", text: "I watched a friend accept a package he hated because saying no felt impossible. The pressure to accept the first offer is enormous and invisible." },
];

export default function SurvivorLogsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = logs.filter((l) => activeFilter === "All" || l.topic === activeFilter);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-4 h-4 text-[#8b5cf6]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Emotional Truth Archives</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Survivor Logs</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          Anonymous logs from students inside the machine. No PR. No filters. Just human reality.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 mb-8 flex-wrap">
        <Filter className="w-3.5 h-3.5 text-white/25" />
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setActiveFilter(t)}
            className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 ${
              activeFilter === t
                ? "border-[#8b5cf6]/60 bg-[#8b5cf6]/20 text-[#8b5cf6]"
                : "border-white/10 text-white/35 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((log, i) => (
            <GlassCard key={log.id} delay={i * 0.07} className="p-7">
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[10px] tracking-widest text-[#8b5cf6]/60">[{log.id}]</span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-[#8b5cf6]/20 text-[#8b5cf6]/50 font-mono">{log.topic}</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed font-light italic">"{log.text}"</p>
            </GlassCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
