"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { GlowButton } from "@/components/ui/GlowButton";
import { ParticleBackground } from "@/components/background/ParticleBackground";
import { GridOverlay } from "@/components/background/GridOverlay";
import { AmbientLight } from "@/components/background/AmbientLight";
import { AccessLoader } from "@/components/animations/AccessLoader";
import { ChevronDown } from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    setLoading(true);
  };

  const handleLoadComplete = () => {
    router.push("/dashboard");
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
            className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-4 font-light tracking-wide leading-relaxed"
          >
            The truth layer beneath the education system.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-sm md:text-base text-white/30 max-w-xl mx-auto mb-14 font-light tracking-widest uppercase"
          >
            Understand the system. Navigate it intelligently.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col items-center gap-4"
          >
            <GlowButton
              className="text-sm tracking-[0.25em] uppercase px-12 py-5"
              onClick={handleEnter}
            >
              Enter The Network
            </GlowButton>
            <span className="text-xs text-white/20 tracking-widest font-mono">
              NO REGISTRATION REQUIRED
            </span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/25">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-white/25" />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
