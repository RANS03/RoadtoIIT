"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield } from "lucide-react";

const topics = ["All", "Burnout", "Placements", "Identity", "Loneliness", "Coding"];

const logs = [
  {
    id: "LOG-001",
    topic: "Identity",
    text: "I got IIT. Then realized I had no idea who I was without the exam. Three years of my life had one goal. On day one of campus, that goal was gone.",
  },
  {
    id: "LOG-002",
    topic: "Loneliness",
    text: "Hostel corridors become strangely lonely at 2AM. Everyone looks like they have it figured out. Nobody does. We're all just performing confidence.",
  },
  {
    id: "LOG-003",
    topic: "Placements",
    text: "The placement numbers don't show the anxiety behind them. One offer letter for every 8 breakdowns. That math doesn't make it into the brochure.",
  },
  {
    id: "LOG-004",
    topic: "Burnout",
    text: "Nobody tells you how quiet success feels after JEE. The noise stops and you're just... empty. You forgot to build a self alongside the rank.",
  },
  {
    id: "LOG-005",
    topic: "Coding",
    text: "Everyone on campus codes. But 80% are grinding Leetcode for the same 5 SDE roles. Nobody is building anything. It's just interview theater.",
  },
  {
    id: "LOG-006",
    topic: "Identity",
    text: "My branch is considered dead. Every conversation at home becomes a defense of a decision I didn't fully understand when I made it at 17.",
  },
];

export function ConfessionsSection() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = logs.filter(
    (l) => activeFilter === "All" || l.topic === activeFilter
  );

  return (
    <section id="confessions" className="relative py-32 px-4 max-w-6xl mx-auto">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#8b5cf6]/8 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 text-[#8b5cf6] text-xs uppercase tracking-widest">
          <Shield className="w-3.5 h-3.5" />
          Survivor Logs
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
          Emotional Truth Archives
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-sm leading-relaxed font-light">
          Anonymous logs from students inside the system. No filters. No PR. Just human reality.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-2 mb-10"
      >
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setActiveFilter(t)}
            className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all duration-300 ${
              activeFilter === t
                ? "border-[#8b5cf6]/60 bg-[#8b5cf6]/20 text-[#8b5cf6]"
                : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
            }`}
          >
            {t}
          </button>
        ))}
      </motion.div>

      {/* Log grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((log, index) => (
            <GlassCard key={log.id} delay={index * 0.1} className="p-7">
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#8b5cf6]/70">
                  [{log.id}]
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/25 font-mono">
                  {log.topic}
                </span>
              </div>
              <p className="text-white/75 text-sm leading-relaxed font-light italic">
                "{log.text}"
              </p>
            </GlassCard>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
