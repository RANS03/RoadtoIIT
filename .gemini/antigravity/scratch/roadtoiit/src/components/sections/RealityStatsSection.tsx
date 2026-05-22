"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Activity } from "lucide-react";

const metrics = [
  {
    id: "RI-01",
    label: "JEE Acceptance Rate",
    value: 0.2,
    unit: "%",
    display: "0.2%",
    context: "Engineered scarcity driving mass anxiety",
    color: "#00f0ff",
  },
  {
    id: "RI-02",
    label: "Students Report Burnout",
    value: 68,
    unit: "%",
    display: "68%",
    context: "Unreported in any official metric",
    color: "#8b5cf6",
  },
  {
    id: "RI-03",
    label: "Average Sleep (Exam Year)",
    value: 4.5,
    unit: "hrs",
    display: "4.5h",
    context: "Normalized sleep deprivation",
    color: "#00f0ff",
  },
  {
    id: "RI-04",
    label: "Identity Crisis Post-JEE",
    value: 42,
    unit: "%",
    display: "42%",
    context: "Undocumented psychological fallout",
    color: "#8b5cf6",
  },
];

function StatBar({
  value,
  color,
  delay,
}: {
  value: number;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: value / 100 } : { scaleX: 0 }}
        transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full rounded-full origin-left"
        style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}60` }}
      />
    </div>
  );
}

export function RealityStatsSection() {
  return (
    <section className="relative py-32 px-4 max-w-6xl mx-auto z-10">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00f0ff]/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-xs uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5" />
          Reality Index
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
          The Numbers They Hide
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-sm font-light leading-relaxed">
          Operational intelligence visualization. The real metrics behind the education system's curated image.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="glass-card rounded-2xl p-8 border border-white/5 group hover:border-white/10 transition-colors duration-500"
          >
            <div className="flex items-end justify-between mb-5">
              <div>
                <span className="font-mono text-[10px] tracking-widest text-white/25 block mb-1">
                  {metric.id}
                </span>
                <span className="text-white/60 text-sm font-light">{metric.label}</span>
              </div>
              <span
                className="font-heading text-5xl font-bold"
                style={{
                  background: `linear-gradient(180deg, ${metric.color} 0%, ${metric.color}50 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {metric.display}
              </span>
            </div>
            <StatBar value={metric.value > 10 ? metric.value : metric.value * 20} color={metric.color} delay={i * 0.2 + 0.3} />
            <p className="mt-4 text-white/30 text-xs font-light tracking-wide">
              {metric.context}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
