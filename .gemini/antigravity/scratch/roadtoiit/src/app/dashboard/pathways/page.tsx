"use client";

import { motion } from "framer-motion";
import { Compass, ArrowRight, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const pathways = [
  {
    id: "PATH-01", code: "AI SYSTEMS", title: "AI Systems Path",
    timeline: "18–24 months", color: "#00f0ff",
    desc: "From foundations to production ML. Research intuition, implementation depth, and the projects that actually get noticed.",
    skills: ["Linear Algebra", "PyTorch", "Research Papers", "System Design", "MLOps"],
    roadmap: ["Month 1–3: Mathematical foundations", "Month 4–6: Core ML algorithms from scratch", "Month 7–12: Research paper implementation", "Month 13–18: Production ML projects", "Month 19–24: Publications or impactful open source"],
    traps: ["Collecting courses without building", "Skipping math for frameworks", "Avoiding real datasets and messy problems"],
  },
  {
    id: "PATH-02", code: "RESEARCH", title: "Research Operative",
    timeline: "24–36 months", color: "#8b5cf6",
    desc: "The long game. Building a research profile that opens PhD programs, fellowships, and the academic pipeline.",
    skills: ["Literature Review", "LaTeX", "Experimental Design", "Academic Writing"],
    roadmap: ["Month 1–6: Find and work closely with a professor", "Month 7–12: First research contribution", "Month 13–18: Conference submission", "Month 19–24: Internship at research lab", "Month 25–36: Journal publication or strong PhD application"],
    traps: ["Working with the wrong supervisor", "Overcomplicating the first project", "Not networking at conferences"],
  },
  {
    id: "PATH-03", code: "STARTUP", title: "Startup Track",
    timeline: "12–18 months", color: "#00f0ff",
    desc: "How to actually build and ship. Avoiding campus startup theater and finding real users.",
    skills: ["Full Stack", "GTM Strategy", "User Research", "Rapid Iteration"],
    roadmap: ["Month 1–2: Find a real problem (talk to 50 people)", "Month 3–4: Build MVP ruthlessly", "Month 5–8: Launch and iterate on real feedback", "Month 9–12: Revenue or clear growth signal", "Month 13–18: Raise or scale sustainably"],
    traps: ["Building without talking to users", "Campus hackathon as validation", "Waiting for the perfect co-founder"],
  },
  {
    id: "PATH-04", code: "QUANT", title: "Quant Explorer",
    timeline: "18–30 months", color: "#8b5cf6",
    desc: "The most misunderstood and rewarding path. Probability, markets, and the mathematics of everything.",
    skills: ["Probability", "Statistics", "C++/Python", "Financial Mathematics"],
    roadmap: ["Month 1–4: Probability and statistics depth", "Month 5–8: Competitive programming (algorithms)", "Month 9–14: Quant interviews and competitions", "Month 15–18: Quant finance internship", "Month 19–30: HFT or systematic trading role"],
    traps: ["Underestimating the math required", "Starting with trading before understanding statistics", "Ignoring C++ performance requirements"],
  },
  {
    id: "PATH-05", code: "CORE ENGG", title: "Core Engineering",
    timeline: "4 years", color: "#00f0ff",
    desc: "Reclaiming the depth of your actual degree. Engineers who go deep get noticed when everyone else is shallow.",
    skills: ["Domain Mastery", "Industry Projects", "Core Research", "Professional Certifications"],
    roadmap: ["Year 1: Master the fundamentals deeply, not for marks", "Year 2: Find the intersection of core + technology", "Year 3: Industry projects and real-world application", "Year 4: Placement with genuine domain expertise"],
    traps: ["Abandoning core for SDE roles because everyone else does", "Ignoring the technology intersection of your field", "Not building projects that prove real skill"],
  },
  {
    id: "PATH-06", code: "ACADEMIC", title: "Academic Pathway",
    timeline: "5–7 years", color: "#8b5cf6",
    desc: "Choosing the full academic pipeline deliberately — with eyes open, not by default.",
    skills: ["GATE/GRE", "SOP Writing", "Lab Research", "Teaching"],
    roadmap: ["Sem 1–4: Build strong academic foundation", "Sem 5–6: Identify research area and join a lab", "Sem 7–8: Publications and recommendation setup", "Year 5: GATE/GRE + applications", "Year 6–7: PhD program or postdoc"],
    traps: ["Choosing academia as a fallback, not a decision", "Weak SOP from a bad advisor", "Underestimating the time commitment"],
  },
];

export default function PathwaysPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <Compass className="w-4 h-4 text-white/50" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Strategic Navigation Intelligence</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">Mission Pathways</h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          Six identity-driven routes with roadmaps, survival traps, and the intel nobody gives you at orientation.
        </p>
      </motion.div>

      <div className="space-y-4">
        {pathways.map((path, i) => {
          const isOpen = expanded === path.id;
          return (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-card rounded-2xl border border-white/5 hover:border-white/10 transition-colors overflow-hidden"
            >
              {/* Header row */}
              <button
                onClick={() => setExpanded(isOpen ? null : path.id)}
                className="w-full flex items-center justify-between p-7 text-left"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[10px] px-2 py-1 rounded border" style={{ color: path.color, borderColor: `${path.color}40`, background: `${path.color}10` }}>
                    {path.code}
                  </span>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white">{path.title}</h3>
                    <p className="text-white/40 text-sm font-light mt-0.5">{path.desc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="hidden md:flex items-center gap-1.5 text-white/25">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono">{path.timeline}</span>
                  </div>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                </div>
              </button>

              {/* Expanded content */}
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-7 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-7">
                  {/* Roadmap */}
                  <div className="md:col-span-1">
                    <h4 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-mono">Roadmap</h4>
                    <div className="relative pl-5 space-y-3">
                      <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px" style={{ background: `linear-gradient(180deg, ${path.color}60, transparent)` }} />
                      {path.roadmap.map((step, j) => (
                        <div key={j} className="relative flex items-start gap-3">
                          <div className="absolute left-[-14px] top-1.5 w-2 h-2 rounded-full border" style={{ borderColor: `${path.color}60`, background: "black" }} />
                          <p className="text-white/50 text-sm font-light leading-snug">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-white/30 mb-4 font-mono">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((s) => (
                        <span key={s} className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50 border border-white/8">{s}</span>
                      ))}
                    </div>
                  </div>

                  {/* Traps */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-red-500/50 mb-4 font-mono">Survival Traps</h4>
                    <ul className="space-y-2.5">
                      {path.traps.map((trap, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-white/40 font-light leading-snug">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500/50 flex-shrink-0" />
                          {trap}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5">
                      <button className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest group">
                        Full Pathway Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
