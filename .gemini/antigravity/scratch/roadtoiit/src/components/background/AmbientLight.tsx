"use client";

import { motion } from "framer-motion";

export function AmbientLight() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {/* Top right subtle cyan glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-glow bg-[#00f0ff] w-[600px] h-[600px] top-[-300px] right-[-200px] opacity-30"
      />
      
      {/* Bottom left subtle purple glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="ambient-glow bg-[#8b5cf6] w-[500px] h-[500px] bottom-[-200px] left-[-100px] opacity-20"
      />
    </div>
  );
}
