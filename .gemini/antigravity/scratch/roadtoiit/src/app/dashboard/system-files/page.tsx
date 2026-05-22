"use client";

import { motion } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";

const systemFiles = [
  {
    id: "SYS-001", title: "The Manufactured Gap",
    tag: "FOUNDATIONAL", color: "#00f0ff",
    body: "Students spend years preparing for institutions they barely understand. Coaching centers sell a version of these places that serves their business model, not your future. The gap between brochure and reality is not an accident — it is the product.",
    intel: ["Coaching center revenue depends on aspirational mythology", "Campus reality documentation is deliberately suppressed", "The 'dream IIT' narrative is a manufactured construct"],
  },
  {
    id: "SYS-002", title: "The Hidden Emotional Cost",
    tag: "PSYCHOLOGICAL", color: "#8b5cf6",
    body: "The psychological impact of extreme competitive pressure is rarely documented. Identity loss post-JEE, burnout during campus life, and deep isolation are systemic outcomes — not individual failures. They are features of the system, not exceptions to it.",
    intel: ["68% of students report burnout — none of it enters official statistics", "Identity built entirely around a rank is fragile by design", "Mental health infrastructure on campuses is functionally absent"],
  },
  {
    id: "SYS-003", title: "What The System Doesn't Teach",
    tag: "OPERATIONAL", color: "#00f0ff",
    body: "Nobody tells you how to navigate professor relationships, find the right internship, or survive placement season. The system teaches you how to pass exams. It does not teach you how to build a career, maintain mental health, or understand the world you are entering.",
    intel: ["Internship systems reward those who know the meta-game", "Placement prep culture creates anxiety, not competence", "Real skills rarely align with what gets measured at campus"],
  },
  {
    id: "SYS-004", title: "The Rank ≠ Future Equation",
    tag: "CRITICAL", color: "#8b5cf6",
    body: "A JEE rank is a snapshot of one specific type of performance under one specific type of pressure. It predicts almost nothing about career success, creativity, leadership, or happiness. The system treats it as the only signal that matters.",
    intel: ["Long-term career success correlates poorly with JEE rank", "The highest-ranked students often experience the deepest identity crises", "What gets you in is not what gets you out successfully"],
  },
  {
    id: "SYS-005", title: "The Placement Theater",
    tag: "CAREER", color: "#00f0ff",
    body: "Placement season is a performance. The median package hides a wide distribution. The 'placed' count includes offers that were never joined, roles that don't exist in six months, and packages that shrink dramatically once you calculate in-hand reality.",
    intel: ["Median salary ≠ what most students receive in practice", "Bond clauses and conditions are buried deep", "Off-campus opportunities consistently outperform on-campus for motivated students"],
  },
  {
    id: "SYS-006", title: "The Clarity Doctrine",
    tag: "PHILOSOPHY", color: "#8b5cf6",
    body: "ROADTOIIT does not exist to tell you to give up or to romanticize failure. It exists to give you clarity — the kind of operational clarity that allows you to make better decisions with accurate information. The goal is not rebellion. The goal is navigation.",
    intel: ["Clarity about the system enables better decisions inside it", "Understanding the game is the first step to playing it intelligently", "The most successful students are those who see the system clearly and adapt deliberately"],
  },
];

export default function SystemFilesPage() {
  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <FileText className="w-4 h-4 text-white/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Classified Operational Briefings</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">System Files</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          The foundational intelligence that explains why this network exists. Read before navigating anything else.
        </p>
      </motion.div>

      <div className="space-y-5">
        {systemFiles.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="group relative glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 overflow-hidden cursor-pointer"
            whileHover={{ x: 4 }}
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 group-hover:opacity-100 opacity-30 transition-opacity" style={{ background: file.color }} />
            {/* Top-right corner glow */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-bl-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700" style={{ background: file.color }} />

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* Left: metadata */}
              <div className="md:w-48 flex-shrink-0">
                <span className="font-mono text-[10px] tracking-widest text-white/25 block mb-2">{file.id}</span>
                <span className="text-[10px] font-mono px-2 py-1 rounded border" style={{ color: file.color, borderColor: `${file.color}40`, background: `${file.color}10` }}>
                  {file.tag}
                </span>
              </div>

              {/* Center: content */}
              <div className="flex-1">
                <h3 className="font-heading font-bold text-2xl text-white mb-3">{file.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed mb-5">{file.body}</p>
                <ul className="space-y-2">
                  {file.intel.map((point, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs text-white/35 font-light leading-snug">
                      <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: file.color }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: arrow */}
              <div className="flex-shrink-0">
                <ArrowUpRight className="w-5 h-5 text-white/15 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
