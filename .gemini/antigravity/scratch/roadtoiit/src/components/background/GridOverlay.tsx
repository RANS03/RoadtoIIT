"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GridOverlay({ className }: { className?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className={cn("absolute inset-0 bg-grid-pattern", className)}
      />
      
      {/* Soft overlay gradient to fade grid out at edges */}
      <div className="absolute inset-0 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />
    </div>
  );
}
