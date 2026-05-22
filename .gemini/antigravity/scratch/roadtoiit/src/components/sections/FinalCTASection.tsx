"use client";

import { motion } from "framer-motion";
import { GlowButton } from "@/components/ui/GlowButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AccessLoader } from "@/components/animations/AccessLoader";

export function FinalCTASection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <AccessLoader onComplete={() => router.push("/dashboard")} />}

      <section className="relative min-h-[70vh] flex items-center justify-center py-32 px-4 z-10 overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#8b5cf6]/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#00f0ff]/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-3xl mx-auto"
        >
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 glass-panel"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-mono">
              Network Access Available
            </span>
          </motion.div>

          <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
            See clearly.{" "}
            <br className="hidden md:block" />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #00f0ff 0%, #8b5cf6 100%)",
              }}
            >
              Navigate intelligently.
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-14 font-light max-w-xl mx-auto leading-relaxed">
            Stop chasing an illusion. Start understanding the system. The intelligence network is ready.
          </p>

          <GlowButton
            glowColor="rgba(139, 92, 246, 0.5)"
            className="text-sm tracking-[0.3em] uppercase px-14 py-5"
            onClick={() => setLoading(true)}
          >
            Initialize Access
          </GlowButton>

          <p className="mt-6 text-xs text-white/15 tracking-widest font-mono uppercase">
            Anonymous • Free • No Coaching Affiliation
          </p>
        </motion.div>
      </section>
    </>
  );
}
