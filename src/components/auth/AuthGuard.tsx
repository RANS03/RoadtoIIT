"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [showChildren, setShowChildren] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Redirection with a slight delay for smooth visual transition
        const timer = setTimeout(() => {
          router.push(`/auth?redirect=${encodeURIComponent(pathname)}`);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        setShowChildren(true);
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !user) {
    return (
      <div className="fixed inset-0 z-[99] bg-black flex flex-col items-center justify-center font-mono">
        {/* Futuristic scanline and grid background overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5 bg-grid-pattern bg-[size:30px_30px]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
          {/* Glowing orbital dot */}
          <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute w-full h-full rounded-full border-t border-b border-r border-[#00f0ff]/40"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute w-10 h-10 rounded-full border-t border-l border-[#8b5cf6]/40"
            />
            <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
          </div>

          {/* Terminal output */}
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#00f0ff] mb-2 font-bold glow-cyan">
            {loading ? "Authenticating Session" : "Access Violation Detected"}
          </div>

          <div className="text-[10px] text-white/40 tracking-wider h-6 font-light uppercase">
            {loading ? (
              <span>Establishing secure connection{dots}</span>
            ) : (
              <span className="text-red-500/80">Unauthorized entry. Rerouting to gateway{dots}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!showChildren) {
    return null;
  }

  return <>{children}</>;
}
