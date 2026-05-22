"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Activity } from "lucide-react";

const metrics = [
  { id: "RI-01", label: "JEE Acceptance Rate", display: "0.2%", bar: 2, context: "Engineered scarcity. The bottleneck is a feature, not a bug.", color: "#00f0ff" },
  { id: "RI-02", label: "Students Reporting Burnout", display: "68%", bar: 68, context: "Most unreported. Treated as a rite of passage, not a systemic failure.", color: "#8b5cf6" },
  { id: "RI-03", label: "Avg Sleep During Exam Prep", display: "4.5h", bar: 45, context: "Normalized sleep deprivation sold as discipline.", color: "#00f0ff" },
  { id: "RI-04", label: "Identity Crisis Post-JEE", display: "42%", bar: 42, context: "No one prepared them for the silence after the result.", color: "#8b5cf6" },
  { id: "RI-05", label: "Students Regret Branch Choice", display: "55%", bar: 55, context: "Decisions made at 17 under extreme pressure. No guidance.", color: "#00f0ff" },
  { id: "RI-06", label: "Placement Anxiety (Sem 7)", display: "81%", bar: 81, context: "The system creates the anxiety, then sells the solution.", color: "#8b5cf6" },
];

function Bar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: value / 100 } : {}}
        transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full origin-left"
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}
      />
    </div>
  );
}

export default function RealityIndexPage() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-4 h-4 text-red-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Operational Intelligence Visualization</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Reality Index</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          The metrics behind the system's curated image. Data the brochures never show.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-end justify-between mb-5">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-white/20 block mb-1">{m.id}</span>
                <span className="text-white/55 text-sm font-light">{m.label}</span>
              </div>
              <span
                className="font-heading text-4xl font-bold"
                style={{ background: `linear-gradient(180deg, ${m.color}, ${m.color}50)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
              >
                {m.display}
              </span>
            </div>
            <Bar value={m.bar} color={m.color} delay={i * 0.12 + 0.3} />
            <p className="mt-4 text-white/25 text-xs font-light leading-relaxed">{m.context}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
