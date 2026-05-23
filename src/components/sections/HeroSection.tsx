"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ParticleBackground } from "@/components/background/ParticleBackground";
import { GridOverlay } from "@/components/background/GridOverlay";
import { AmbientLight } from "@/components/background/AmbientLight";
import { AccessLoader } from "@/components/animations/AccessLoader";
import { useAuth } from "@/context/AuthContext";

export function HeroSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleEnter = () => {
    setLoading(true);
  };

  const handleLoadComplete = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };

  return (
    <>
      {loading && <AccessLoader onComplete={handleLoadComplete} />}

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AmbientLight />
        <GridOverlay />
        <ParticleBackground />

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-8 px-4 py-1.5 rounded-full border border-white/10 glass-panel flex items-center gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-white/70">
              Network Online • Classified Access
            </span>
            <div className="w-px h-3 bg-white/20" />
            <span className="text-xs font-mono text-white/40">ANTIGRAVITY OS</span>
          </motion.div>

          {/* Massive Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-none mb-4"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0.2) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
              filter: "drop-shadow(0 0 60px rgba(255,255,255,0.15))",
            }}
          >
            ROADTOIIT
          </motion.h1>

          {/* Powered by badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-10 text-[10px] uppercase tracking-[0.4em] text-white/25 font-mono"
          >
            Powered by Antigravity
          </motion.div>

          {/* Emotional Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-4 font-light tracking-wide leading-relaxed"
          >
            The operational truth layer beneath engineering education.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm md:text-base text-white/40 max-w-xl mx-auto mb-14 font-light tracking-wider"
          >
            Live student intelligence. Tactical survival systems. Real engineering pathways.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row items-center gap-5 justify-center"
          >
            <GlowButton
              className="text-xs tracking-[0.2em] uppercase px-8 py-4 font-bold shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-shadow duration-300"
              onClick={handleEnter}
            >
              ACCESS LIVE INTELLIGENCE
            </GlowButton>
            <button
              onClick={() => {
                const el = document.getElementById("live-stream");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs tracking-[0.2em] uppercase px-8 py-4.5 border border-white/10 rounded-xl bg-white/2 text-white/70 hover:text-white hover:border-white/20 transition-all font-semibold font-mono hover:scale-105"
            >
              VIEW LIVE SIGNALS
            </button>
          </motion.div>
        </div>


      </section>
    </>
  );
}
