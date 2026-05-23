"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  Activity,
  Network,
  Compass,
  Database,
  LogOut,
  Sparkles,
  ChevronRight,
  Radio,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { icon: Radio, label: "Intelligence Stream", href: "/dashboard" },
  { icon: Shield, label: "Survivor Logs", href: "/dashboard/survivor-logs" },
  { icon: Database, label: "Dossiers", href: "/dashboard/system-files" },
  { icon: Compass, label: "Mission Pathways", href: "/dashboard/pathways" },
  { icon: Activity, label: "Reality Index", href: "/dashboard/reality-index" },
  { icon: Network, label: "Intelligence Hub", href: "/dashboard/intelligence" },
  { icon: User, label: "Operator Dossier", href: "/dashboard/profile" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex flex-col h-screen glass-panel border-r border-white/5 transition-all duration-500 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white/60" />
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-heading font-bold tracking-widest text-sm text-white/90"
          >
            ROADTOIIT
          </motion.span>
        )}
      </div>

      {/* Status */}
      {!collapsed && (
        <div className="px-5 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono">
              System Active
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300 group relative ${
                isActive
                  ? "bg-white/8 text-white border border-white/10"
                  : "text-white/40 hover:text-white/70 hover:bg-white/5"
              }`}
            >
              <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#00f0ff]" : ""}`} />
              {!collapsed && (
                <span className="flex-1 text-left text-xs tracking-wide">
                  {item.label}
                </span>
              )}
              {!collapsed && isActive && (
                <ChevronRight className="w-3 h-3 text-white/30" />
              )}
              {/* Active glow */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#00f0ff] rounded-full shadow-[0_0_8px_#00f0ff]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-4 border-t border-white/5 space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all text-xs tracking-wide"
        >
          <ChevronRight
            className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
          />
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/30 hover:text-white/60 hover:bg-white/5 transition-all text-xs tracking-wide"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Exit Network</span>}
        </button>
      </div>
    </motion.aside>
  );
}
