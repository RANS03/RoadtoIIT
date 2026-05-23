"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import {
  Radio,
  Shield,
  Network,
  Compass,
  User,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const mobileItems = [
  { icon: Radio, label: "Feed", href: "/dashboard", color: "#00f0ff" },
  { icon: Shield, label: "Logs", href: "/dashboard/survivor-logs", color: "#8b5cf6" },
  { icon: Network, label: "Intel", href: "/dashboard/intelligence", color: "#38bdf8" },
  { icon: Compass, label: "Missions", href: "/dashboard/pathways", color: "#10b981" },
  { icon: User, label: "Profile", href: "/dashboard/profile", color: "#f59e0b" },
];

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/85 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 flex items-center justify-around pb-safe-bottom">
      {mobileItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <button
            key={item.href}
            onClick={() => router.push(item.href)}
            className="flex flex-col items-center justify-center py-0.5 px-1.5 relative transition-all duration-300 select-none cursor-pointer"
          >
            <item.icon 
              className="w-4 h-4 mb-0.5 transition-transform duration-300"
              style={{
                color: isActive ? item.color : "rgba(255, 255, 255, 0.4)",
                transform: isActive ? "scale(1.1)" : "scale(1)"
              }}
            />
            <span 
              className="text-[8px] font-mono tracking-wider uppercase transition-colors"
              style={{
                color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.3)"
              }}
            >
              {item.label}
            </span>

            {/* Active Glow Accent under icon */}
            {isActive && (
              <motion.div
                layoutId="mobileActiveGlow"
                className="absolute -top-1 w-8 h-[2px] rounded-full shadow-[0_0_10px_2px_rgba(0,240,255,0.4)]"
                style={{ backgroundColor: item.color }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        );
      })}

      {/* Logout / Exit Network */}
      <button
        onClick={logout}
        className="flex flex-col items-center justify-center py-0.5 px-1.5 relative transition-all duration-300 select-none cursor-pointer group"
      >
        <LogOut
          className="w-4 h-4 mb-0.5 transition-all duration-300 group-active:scale-90"
          style={{ color: "rgba(244, 63, 94, 0.6)" }}
        />
        <span
          className="text-[8px] font-mono tracking-wider uppercase"
          style={{ color: "rgba(244, 63, 94, 0.5)" }}
        >
          Exit
        </span>
      </button>
    </div>
  );
}
