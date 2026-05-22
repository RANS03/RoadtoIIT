"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 mx-auto max-w-7xl"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-white/70" />
        <span className="font-heading font-bold tracking-widest text-sm text-white/90">
          ROADTOIIT
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 glass-panel px-8 py-3 rounded-full">
        {[
          { label: "System Files", href: "#mission" },
          { label: "Survivor Logs", href: "#confessions" },
          { label: "Intelligence Hub", href: "#intelligence" },
          { label: "Pathways", href: "#pathways" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <button className="text-xs uppercase tracking-widest text-white/50 hover:text-[#00f0ff] transition-colors">
        Classified Access
      </button>
    </motion.nav>
  );
}
