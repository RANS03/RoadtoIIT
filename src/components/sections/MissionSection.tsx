"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const briefings = [
  {
    id: "SYS-001",
    title: "The Manufactured Gap",
    body: "Students spend years preparing for institutions they barely understand. Coaching centers sell a version of these places that serves their business model, not your future.",
  },
  {
    id: "SYS-002",
    title: "The Hidden Emotional Cost",
    body: "The psychological impact of extreme competitive pressure is rarely documented. Identity loss post-JEE, burnout during campus life, and isolation are real and largely invisible.",
  },
  {
    id: "SYS-003",
    title: "What The System Doesn't Teach",
    body: "Nobody tells you how to find the right professor, chase the right internship, or navigate placement season without breaking down. That's what we document.",
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="relative py-12 md:py-32 px-4 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#8b5cf6]/10 blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-16 max-w-2xl"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs uppercase tracking-widest">
          <FileText className="w-3.5 h-3.5" />
          System Files
        </div>
        <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
          The brochure is{" "}
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(90deg, #00f0ff, #8b5cf6)",
            }}
          >
            not reality.
          </span>
        </h2>
        <p className="text-white/50 text-lg font-light leading-relaxed">
          ROADTOIIT exists to document what the system refuses to show — the operational intelligence, emotional realities, and survival knowledge that determine whether you thrive or collapse.
        </p>
      </motion.div>

      {/* Operational briefing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-8 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-[#00f0ff]/20 via-[#8b5cf6]/30 to-[#00f0ff]/20" />

        {briefings.map((briefing, i) => (
          <motion.div
            key={briefing.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="relative glass-card rounded-2xl p-5 md:p-8 border border-white/5 group hover:border-white/10 transition-colors duration-500"
          >
            {/* Node dot */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#00f0ff]/50 bg-black group-hover:border-[#00f0ff] group-hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all duration-500" />

            <div className="mt-8 mb-4">
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
                FILE {briefing.id}
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-white mb-3">
              {briefing.title}
            </h3>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              {briefing.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
