"use client";

import { motion } from "framer-motion";
import { Network, ArrowUpRight } from "lucide-react";

const files = [
  { id: "FILE-01", title: "Professor Intel", tag: "Academic", color: "#00f0ff", entries: 14,
    points: ["Identify professors with flexible grading", "Find who runs real industry projects", "Avoid the grade-inflating trap of easy electives", "Build genuine relationships that open research doors"] },
  { id: "FILE-02", title: "Hostel Survival", tag: "Survival", color: "#8b5cf6", entries: 22,
    points: ["Managing isolation before it becomes depression", "Building a room routine that protects focus", "Navigating mess politics and social hierarchies", "Finding your people in the first 3 months"] },
  { id: "FILE-03", title: "Internship Systems", tag: "Career", color: "#00f0ff", entries: 19,
    points: ["Off-campus hunting before placement season", "Cold email protocols that actually get replies", "The off-season advantage (Jan-March)", "Building a portfolio that bypasses HR filters"] },
  { id: "FILE-04", title: "Placement Realities", tag: "Career", color: "#8b5cf6", entries: 31,
    points: ["What the median package actually means", "The gap between CTC and in-hand reality", "Bonds, conditions, and fine print they hide", "When to say no to the first offer"] },
  { id: "FILE-05", title: "Hidden Opportunities", tag: "Opportunity", color: "#00f0ff", entries: 11,
    points: ["Research fellowships nobody applies for", "International programs with low competition", "Open source paths that build real signal", "Alumni networks most students never activate"] },
  { id: "FILE-06", title: "Coding Pathways", tag: "Technical", color: "#8b5cf6", entries: 17,
    points: ["Building systems vs grinding algorithms", "Open source contributions that get noticed", "The projects that separate signal from noise", "When to stop Leetcoding and start shipping"] },
];

export default function IntelligencePage() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Network className="w-4 h-4 text-[#00f0ff]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Classified Survival Systems</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Intelligence Hub</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          Tactical knowledge built by students who survived the machine. Every file is practical and actionable.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {files.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
            whileHover={{ y: -4 }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-0 group-hover:opacity-[0.07] transition-opacity duration-700" style={{ background: file.color }} />
            <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700" style={{ background: `linear-gradient(90deg, ${file.color}50, transparent)` }} />

            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-widest text-white/25">{file.id}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ color: file.color, borderColor: `${file.color}35`, background: `${file.color}10` }}>{file.tag}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/25 font-mono">{file.entries} entries</span>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
              </div>
            </div>

            <h3 className="font-heading font-bold text-2xl text-white mb-5">{file.title}</h3>

            <ul className="space-y-2.5">
              {file.points.map((point, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-white/45 font-light leading-snug">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: file.color }} />
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
