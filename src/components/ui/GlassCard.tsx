"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function GlassCard({ children, className, delay = 0, hoverEffect = true, style, onClick }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={hoverEffect ? { y: -5, scale: 1.01, transition: { duration: 0.3 } } : undefined}
      style={style}
      onClick={onClick}
      className={cn(
        "relative rounded-2xl glass-card overflow-hidden group",
        hoverEffect && "hover:border-white/10 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]",
        className
      )}
    >
      {/* Subtle hover gradient */}
      {hoverEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      )}
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
