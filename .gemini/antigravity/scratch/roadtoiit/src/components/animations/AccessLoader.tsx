"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AccessLoaderProps {
  onComplete: () => void;
}

const lines = [
  "AUTHENTICATING IDENTITY...",
  "DECRYPTING NETWORK LAYER...",
  "LOADING INTELLIGENCE FILES...",
  "ESTABLISHING CLASSIFIED ACCESS...",
  "SYSTEM READY.",
];

export function AccessLoader({ onComplete }: AccessLoaderProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (currentLine < lines.length - 1) {
      const timer = setTimeout(() => setCurrentLine((l) => l + 1), 500);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 600);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
        >
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-5"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          />

          {/* Central logo */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-heading text-2xl font-bold tracking-[0.4em] text-white/30 mb-12"
          >
            ROADTOIIT
          </motion.div>

          {/* Terminal Lines */}
          <div className="font-mono text-xs text-[#00f0ff] space-y-2 w-80">
            {lines.slice(0, currentLine + 1).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: i === currentLine ? 1 : 0.3, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-white/30">›</span>
                <span>{line}</span>
                {i === currentLine && i < lines.length - 1 && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-3 bg-[#00f0ff]"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-12 w-80 h-px bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (currentLine + 1) / lines.length }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="h-full bg-[#00f0ff] origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
