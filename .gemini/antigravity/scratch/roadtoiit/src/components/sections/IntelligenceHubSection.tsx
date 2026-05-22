"use client";

import { motion } from "framer-motion";
import { Network, ArrowUpRight } from "lucide-react";

const intel = [
  {
    id: "FILE-01",
    title: "Professor Intel",
    desc: "Grading curves, project flexibility, and who actually cares about teaching.",
    tag: "Academic",
    glow: "#00f0ff",
  },
  {
    id: "FILE-02",
    title: "Hostel Survival",
    desc: "Managing isolation, mess politics, and building your own mental infrastructure.",
    tag: "Survival",
    glow: "#8b5cf6",
  },
  {
    id: "FILE-03",
    title: "Internship Systems",
    desc: "Off-campus hunting, cold emailing protocols, and the off-season advantage.",
    tag: "Career",
    glow: "#00f0ff",
  },
  {
    id: "FILE-04",
    title: "Placement Realities",
    desc: "What the stats hide. Actual offer rates, anxiety timelines, and survival strategies.",
    tag: "Career",
    glow: "#8b5cf6",
  },
  {
    id: "FILE-05",
    title: "Hidden Opportunities",
    desc: "Research programs, fellowships, and paths that never appear on any notice board.",
    tag: "Opportunity",
    glow: "#00f0ff",
  },
  {
    id: "FILE-06",
    title: "Coding Pathways",
    desc: "Beyond Leetcode grinding — building real systems, open source, and signal over noise.",
    tag: "Technical",
    glow: "#8b5cf6",
  },
];

export function IntelligenceHubSection() {
  return (
    <section id="intelligence" className="relative py-32 px-4 max-w-7xl mx-auto z-10">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] bg-[#00f0ff]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs uppercase tracking-widest">
          <Network className="w-3.5 h-3.5" />
          Intelligence Hub
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
          Classified Survival Systems
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-sm font-light leading-relaxed">
          Tactical knowledge built by students who navigated the system. Every file is practical, honest, and actionable.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {intel.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative glass-card rounded-2xl p-7 border border-white/5 hover:border-white/12 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Corner glow on hover */}
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-10 transition-opacity duration-700"
              style={{ background: item.glow }}
            />

            <div className="flex items-start justify-between mb-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/25">
                {item.id}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/25">
                  {item.tag}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                />
              </div>
            </div>

            <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="text-white/45 text-sm font-light leading-relaxed">
              {item.desc}
            </p>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: `linear-gradient(90deg, ${item.glow}60, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
