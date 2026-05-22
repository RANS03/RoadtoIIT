"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

interface GlowButtonProps extends Omit<React.ComponentPropsWithoutRef<typeof motion.button>, 'children'> {
  children: React.ReactNode;
  glowColor?: string;
}

export function GlowButton({ 
  children, 
  className, 
  glowColor = "rgba(0, 240, 255, 0.4)", // Default cyan glow
  ...props 
}: GlowButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    setPosition({ x: x * 0.2, y: y * 0.2 }); // Magnetic effect intensity
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(
        "relative px-8 py-4 rounded-full bg-black/50 border border-white/10 text-white font-medium overflow-hidden backdrop-blur-md transition-colors duration-500",
        isHovered ? "border-white/30" : "",
        className
      )}
      {...props}
    >
      {/* Glow effect that follows cursor */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 60%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.5 : 1,
        }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
