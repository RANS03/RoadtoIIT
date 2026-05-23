"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 mx-auto max-w-7xl"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
        <Sparkles className="w-5 h-5 text-white/70" />
        <span className="font-heading font-bold tracking-widest text-sm text-white/90">
          ROADTOIIT
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 glass-panel px-8 py-3 rounded-full">
        {[
          { label: "Live Stream", href: "#live-stream" },
          { label: "Trending Dossiers", href: "#trending" },
          { label: "Campus Grid", href: "#campus-grid" }
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors font-medium cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Enter Terminal</span>
            </button>
            <div className="w-px h-3.5 bg-white/10" />
            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors font-mono cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/auth")}
            className="text-xs uppercase tracking-widest text-white/50 hover:text-[#00f0ff] transition-colors cursor-pointer"
          >
            Classified Access
          </button>
        )}
      </div>
    </motion.nav>
  );
}
