"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Activity,
  Network,
  Compass,
  FileText,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

const quickStats = [
  { label: "Survivor Logs", value: "247", unit: "entries", color: "#8b5cf6" },
  { label: "Intel Files", value: "38", unit: "active", color: "#00f0ff" },
  { label: "Pathways", value: "6", unit: "routes", color: "#8b5cf6" },
  { label: "Reality Metrics", value: "12", unit: "tracked", color: "#00f0ff" },
];

const modules = [
  {
    icon: FileText,
    title: "System Files",
    desc: "Operational briefings on the education system's hidden mechanics.",
    href: "/dashboard/system-files",
    tag: "NEW INTEL",
    color: "#00f0ff",
  },
  {
    icon: Shield,
    title: "Survivor Logs",
    desc: "247 anonymous entries from students inside the machine.",
    href: "/dashboard/survivor-logs",
    tag: "ACTIVE",
    color: "#8b5cf6",
  },
  {
    icon: Activity,
    title: "Reality Index",
    desc: "Visualized metrics on burnout, placements, sleep, and pressure.",
    href: "/dashboard/reality-index",
    tag: "UPDATED",
    color: "#00f0ff",
  },
  {
    icon: Network,
    title: "Intelligence Hub",
    desc: "Professor intel, hostel hacks, and classified campus knowledge.",
    href: "/dashboard/intelligence",
    tag: "CLASSIFIED",
    color: "#8b5cf6",
  },
  {
    icon: Compass,
    title: "Mission Pathways",
    desc: "Six identity-driven routes with roadmaps and survival intelligence.",
    href: "/dashboard/pathways",
    tag: "STRATEGIC",
    color: "#00f0ff",
  },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            Antigravity OS • Intelligence Network
          </span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Welcome to the Network
        </h1>
        <p className="text-white/40 text-base font-light max-w-xl leading-relaxed">
          You now have classified access. This is not a coaching platform. It is the truth layer beneath the education system.
        </p>
      </motion.div>

      {/* Quick Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
      >
        {quickStats.map((stat, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-5 border border-white/5"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-white/35 text-xs tracking-wide">{stat.label}</span>
              <TrendingUp className="w-3.5 h-3.5 text-white/20" />
            </div>
            <div
              className="font-heading text-3xl font-bold"
              style={{
                background: `linear-gradient(135deg, ${stat.color}, ${stat.color}60)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {stat.value}
            </div>
            <div className="text-white/25 text-[10px] font-mono uppercase tracking-widest mt-1">
              {stat.unit}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Module Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mb-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
          Intelligence Modules
        </span>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((mod, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
            whileHover={{ y: -4 }}
            onClick={() => router.push(mod.href)}
            className="group relative glass-card rounded-2xl p-7 border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-500 overflow-hidden"
          >
            {/* Hover glow */}
            <div
              className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-0 group-hover:opacity-8 transition-opacity duration-700"
              style={{ background: mod.color }}
            />
            {/* Bottom line */}
            <div
              className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
              style={{ background: `linear-gradient(90deg, ${mod.color}60, transparent)` }}
            />

            <div className="flex items-start justify-between mb-5 relative z-10">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10"
                  style={{ background: `${mod.color}15` }}
                >
                  <mod.icon className="w-4 h-4" style={{ color: mod.color }} />
                </div>
                <span
                  className="text-[10px] font-mono tracking-widest px-2 py-0.5 rounded border"
                  style={{ color: mod.color, borderColor: `${mod.color}40`, background: `${mod.color}10` }}
                >
                  {mod.tag}
                </span>
              </div>
              <ArrowUpRight
                className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
              />
            </div>

            <h3 className="font-heading font-bold text-xl text-white mb-2 relative z-10">
              {mod.title}
            </h3>
            <p className="text-white/40 text-sm font-light leading-relaxed relative z-10">
              {mod.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-white/15 text-[11px] font-mono uppercase tracking-[0.3em]">
          Antigravity OS • All data anonymous • No coaching affiliation
        </p>
      </motion.div>
    </div>
  );
}
