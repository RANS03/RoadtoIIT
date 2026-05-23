"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Activity } from "lucide-react";
import { stats as metrics } from "@/data/stats";

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
    <div className="p-4 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Activity className="w-4 h-4 text-red-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Community Intelligence Signals</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Reality Index</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          Observational patterns and unofficial sentiment indicators from inside the network. Crucial context the brochures omit.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {metrics.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="glass-card rounded-2xl p-5 md:p-8 border border-white/5 hover:border-white/10 transition-colors group"
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-white/20 block mb-1">{m.id}</span>
                <span className="text-white/55 text-sm font-light leading-snug">{m.label}</span>
              </div>
              <span
                className="font-mono text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border whitespace-nowrap text-right flex-shrink-0"
                style={{
                  color: m.color,
                  borderColor: `${m.color}30`,
                  background: `${m.color}08`,
                  boxShadow: `0 0 12px ${m.color}15`
                }}
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
