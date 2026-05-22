"use client";

import { motion } from "framer-motion";
import { Compass, ArrowRight } from "lucide-react";
import { useState } from "react";

const pathways = [
  {
    id: "PATH-01",
    code: "AI SYSTEMS",
    title: "AI Systems Path",
    timeline: "18–24 months",
    desc: "From foundations to production ML systems. Research intuition, implementation depth, and the projects that actually get noticed.",
    skills: ["Linear Algebra", "PyTorch", "Research Papers", "System Design"],
    glow: "#00f0ff",
  },
  {
    id: "PATH-02",
    code: "RESEARCH OP",
    title: "Research Operative",
    timeline: "24–36 months",
    desc: "The long game. Building a research profile that opens PhD programs, fellowships, and the academic pipeline.",
    skills: ["Literature Review", "LaTeX", "Experimental Design", "Publications"],
    glow: "#8b5cf6",
  },
  {
    id: "PATH-03",
    code: "STARTUP",
    title: "Startup Track",
    timeline: "12–18 months",
    desc: "How to actually build something, find users, and not get distracted by campus startup culture theater.",
    skills: ["Full Stack", "GTM Strategy", "User Research", "Shipping Fast"],
    glow: "#00f0ff",
  },
  {
    id: "PATH-04",
    code: "QUANT ROUTE",
    title: "Quant Explorer",
    timeline: "18–30 months",
    desc: "The least understood and most rewarding path. Probability, markets, and the mathematics of everything.",
    skills: ["Probability", "Statistics", "Python", "Financial Math"],
    glow: "#8b5cf6",
  },
  {
    id: "PATH-05",
    code: "CORE ENGG",
    title: "Core Engineering",
    timeline: "4 years",
    desc: "Reclaiming the depth of your actual degree. The engineers who go deep get noticed when everyone else is shallow.",
    skills: ["Domain Mastery", "Research", "Industry Projects", "Certifications"],
    glow: "#00f0ff",
  },
  {
    id: "PATH-06",
    code: "ACADEMIC",
    title: "Academic Pathway",
    timeline: "5–7 years",
    desc: "The full academic pipeline. Choosing it deliberately with eyes open, not by default.",
    skills: ["GRE/GATE", "SOP Writing", "Lab Work", "Publications"],
    glow: "#8b5cf6",
  },
];

export function MissionPathwaysSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="pathways" className="relative py-32 px-4 max-w-7xl mx-auto z-10">
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] bg-[#8b5cf6]/6 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="mb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 rounded-full border border-white/10 bg-white/5 text-white/50 text-xs uppercase tracking-widest">
          <Compass className="w-3.5 h-3.5" />
          Mission Pathways
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">
          Strategic Navigation Intelligence
        </h2>
        <p className="text-white/40 max-w-lg mx-auto text-sm font-light leading-relaxed">
          Choose your operational route. Each pathway carries its own intelligence — roadmaps, survival traps, hidden realities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pathways.map((path, i) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            onClick={() => setActive(active === path.id ? null : path.id)}
            className="group relative glass-card rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-500 cursor-pointer overflow-hidden"
          >
            {/* Glow on active */}
            <div
              className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${active === path.id ? "opacity-100" : "group-hover:opacity-100"}`}
              style={{
                background: `radial-gradient(circle at top left, ${path.glow}12, transparent 60%)`,
              }}
            />

            <div className="relative z-10 p-7">
              <div className="flex items-start justify-between mb-5">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] px-2 py-1 rounded border"
                  style={{
                    color: path.glow,
                    borderColor: `${path.glow}40`,
                    background: `${path.glow}10`,
                  }}
                >
                  {path.code}
                </span>
                <span className="text-[10px] text-white/25 font-mono">{path.timeline}</span>
              </div>

              <h3 className="font-heading font-bold text-xl text-white mb-3">{path.title}</h3>
              <p className="text-white/45 text-sm font-light leading-relaxed mb-5">{path.desc}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {path.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] tracking-wide px-2 py-1 rounded-full bg-white/5 text-white/40 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* CTA hint */}
              <div className="mt-5 flex items-center gap-1 text-xs text-white/25 group-hover:text-white/50 transition-colors">
                <span className="uppercase tracking-widest">View Pathway</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Bottom line */}
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: `linear-gradient(90deg, ${path.glow}50, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
