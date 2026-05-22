"use client";

import { motion } from "framer-motion";
import { Map, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function RoadmapPreviewSection() {
  return (
    <section id="roadmap" className="relative py-32 px-4 max-w-7xl mx-auto z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 w-full relative h-[400px]">
          {/* Abstract Roadmap Visualization */}
          <GlassCard className="absolute inset-0 p-8 flex flex-col justify-center gap-6 overflow-hidden">
            <div className="absolute top-0 left-8 w-px h-full bg-gradient-to-b from-[#00f0ff] via-[#8b5cf6] to-transparent opacity-50" />
            
            {[
              { title: "Phase 01: Deconstruction", desc: "Unlearning the toxic productivity culture." },
              { title: "Phase 02: Tactical Survival", desc: "Navigating grading curves and isolation." },
              { title: "Phase 03: System Mastery", desc: "Operating above the engineered rat race." }
            ].map((node, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.3 }}
                className="relative pl-12"
              >
                <div className="absolute left-[-5px] top-2 w-3 h-3 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]" />
                <h3 className="font-heading font-bold text-lg text-white/90">{node.title}</h3>
                <p className="text-white/50 text-sm">{node.desc}</p>
              </motion.div>
            ))}
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] text-xs uppercase tracking-widest">
            <Map className="w-4 h-4" />
            Interactive Engine
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Mission Pathways
          </h2>
          <p className="text-white/60 text-lg mb-8 font-light">
            Stop following generic study plans. Our pathways are designed to help you build practical survival knowledge, from handling burnout to finding underground research opportunities.
          </p>
          
          <button className="flex items-center gap-2 text-[#00f0ff] hover:text-white transition-colors group">
            <span className="uppercase tracking-widest text-sm">Preview Architecture</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
