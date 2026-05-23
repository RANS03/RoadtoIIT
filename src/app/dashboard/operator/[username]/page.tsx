"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Award, 
  Layers, 
  Sparkles,
  Calendar,
  BookOpen
} from "lucide-react";
import { getStoredProfiles, UserProfile } from "@/data/users";
import { getStoredFeed, FeedPost } from "@/data/feed";
import { FeedPostCard } from "@/components/ui/FeedPostCard";
import { GlassCard } from "@/components/ui/GlassCard";

// Simulated Contribution Heatmap Component
function ActivityHeatmap({ seedName, activeColor }: { seedName: string; activeColor: string }) {
  const getContributionLevel = (dayIndex: number): number => {
    let hash = 0;
    for (let i = 0; i < seedName.length; i++) {
      hash = seedName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const val = Math.abs(Math.sin(hash + dayIndex) * 100);
    if (val > 88) return 3; // High activity
    if (val > 70) return 2; // Medium activity
    if (val > 45) return 1; // Low activity
    return 0; // No activity
  };

  const getCellColor = (level: number) => {
    switch (level) {
      case 3: return activeColor;
      case 2: return `${activeColor}aa`;
      case 1: return `${activeColor}55`;
      default: return "rgba(255, 255, 255, 0.02)";
    }
  };

  const columns = Array.from({ length: 28 });
  const rows = Array.from({ length: 7 });

  return (
    <div className="bg-white/2 rounded-2xl p-6 border border-white/5 font-mono">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-white/30 flex items-center gap-1.5 font-mono">
          <Calendar className="w-3.5 h-3.5 text-white/20" /> Active Network Activity Log
        </span>
        <span className="text-[9px] text-white/25">
          28-Week Timeline
        </span>
      </div>
      
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex flex-col gap-[3px] min-w-[280px]">
          {rows.map((_, rIndex) => (
            <div key={rIndex} className="flex gap-[3px]">
              {columns.map((_, cIndex) => {
                const dayIndex = rIndex + cIndex * 7;
                const level = getContributionLevel(dayIndex);
                const cellColor = getCellColor(level);
                return (
                  <div
                    key={cIndex}
                    className="w-[10px] h-[10px] rounded-[2px] transition-all duration-300 hover:scale-125 cursor-crosshair"
                    style={{ 
                      backgroundColor: cellColor,
                      boxShadow: level > 1 ? `0 0 6px ${activeColor}40` : undefined
                    }}
                    title={`Index ${dayIndex}: Signal Level ${level}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-3 text-[9px] text-white/25">
        <span>Low Signal</span>
        <div className="w-[8px] h-[8px] rounded-[1.5px]" style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }} />
        <div className="w-[8px] h-[8px] rounded-[1.5px]" style={{ backgroundColor: `${activeColor}55` }} />
        <div className="w-[8px] h-[8px] rounded-[1.5px]" style={{ backgroundColor: `${activeColor}aa` }} />
        <div className="w-[8px] h-[8px] rounded-[1.5px]" style={{ backgroundColor: activeColor }} />
        <span>High Signal</span>
      </div>
    </div>
  );
}

export default function OperatorProfilePage() {
  const { username } = useParams();
  const router = useRouter();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [authored, setAuthored] = useState<FeedPost[]>([]);

  // Calculate dynamic data on load
  useEffect(() => {
    const profiles = getStoredProfiles();
    const foundProfile = profiles.find(
      p => p.name.toLowerCase() === String(username).toLowerCase()
    );
    
    if (foundProfile) {
      setProfile(foundProfile);

      const allPosts = getStoredFeed();
      setPosts(allPosts);
      
      const userAuthored = allPosts.filter(
        p => !p.isAnonymous && p.author && p.author.name.toLowerCase() === foundProfile.name.toLowerCase()
      );
      setAuthored(userAuthored);
    }
  }, [username]);

  if (!profile) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center font-mono text-white/30 pt-32">
        Scanning network database... [Operator Profile Redacted/Not Found]
      </div>
    );
  }

  const getReputationTier = (score: number) => {
    if (score >= 900) return "Elite Operative (Tier 1)";
    if (score >= 800) return "Lead Analyst (Tier 2)";
    if (score >= 700) return "Senior Agent (Tier 3)";
    if (score >= 500) return "Field Specialist (Tier 4)";
    return "Neophyte Agent (Tier 5)";
  };

  const getPathwayColor = (pathway: string) => {
    switch (pathway) {
      case "AI Systems Path": return "#00f0ff";
      case "Quant Explorer": return "#8b5cf6";
      case "Research Operative": return "#8b5cf6";
      case "Startup Track": return "#00f0ff";
      default: return "#ffffff";
    }
  };

  const activeColor = getPathwayColor(profile.missionType);

  const totalAuthored = authored.length;
  const categories = [
    { type: "survivor-log", label: "Logs", count: 0, color: "#8b5cf6" },
    { type: "system-file", label: "System", count: 0, color: "#00f0ff" },
    { type: "mission-update", label: "Missions", count: 0, color: "#10b981" },
    { type: "professor-intel", label: "Academic", count: 0, color: "#f59e0b" },
    { type: "hostel-signal", label: "Hostel", count: 0, color: "#ec4899" },
  ];

  categories.forEach(cat => {
    cat.count = authored.filter(p => p.type === cat.type).length;
  });

  return (
    <div className="py-4 md:p-10 max-w-6xl mx-auto">
      {/* Navigation Return */}
      <div className="mb-8">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          [Return to Signal Feed]
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Operator details Card + Dossier */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 md:p-8 border border-white/5 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 right-0 h-0.5" 
              style={{ background: `linear-gradient(90deg, transparent, ${activeColor}, transparent)` }}
            />
            
            <div className="flex flex-col items-center text-center">
              <div 
                className="w-24 h-24 rounded-2xl border p-1 bg-white/2 mb-5 transition-all duration-500 hover:scale-105"
                style={{ borderColor: `${activeColor}40` }}
              >
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.name} 
                  className="w-full h-full rounded-xl object-cover" 
                />
              </div>

              <h2 className="font-heading font-bold text-2xl text-white mb-1 flex items-center gap-2">
                {profile.name}
                <Award className="w-5 h-5" style={{ color: activeColor }} />
              </h2>
              
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/40 mt-1">
                {profile.institution}
              </span>

              <span 
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-semibold mt-4 block"
                style={{ color: activeColor }}
              >
                {profile.missionType}
              </span>

              <span className="text-[10px] text-white/25 font-mono block mt-1">
                {profile.branch}
              </span>
            </div>

            {/* Reputation Info */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/20 uppercase text-[9px] tracking-wider">Reputation Rank</span>
                <span className="text-white/70">{getReputationTier(profile.intelligenceScore)}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/20 uppercase text-[9px] tracking-wider">Intelligence Rating</span>
                <span className="font-bold" style={{ color: activeColor }}>{profile.intelligenceScore} QIS</span>
              </div>
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-white/20 uppercase text-[9px] tracking-wider">Total Broadcasts</span>
                <span className="text-white/75">{totalAuthored} signals</span>
              </div>
            </div>
          </GlassCard>

          {/* Dossier Academic Specs Widget (Phase 3) */}
          <GlassCard className="p-6 border border-white/5 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00f0ff] block mb-2">
              Dossier Academic Specs
            </span>
            
            {/* Mission Focus Block */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/20 block">
                Core Mission Focus
              </span>
              <p className="text-white/70 text-xs font-light leading-relaxed bg-white/2 p-3 border border-white/5 rounded-xl">
                {profile.missionFocus || "No project goals established in active nodes."}
              </p>
            </div>

            {/* Technical Specialties Matrix (Phase 6 Skill Graph) */}
            <div className="space-y-3 pt-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/25 block">
                Technical Specialties Matrix
              </span>
              <div className="space-y-2.5">
                {(profile.skillsMatrix || []).map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/50">{skill.name}</span>
                      <span className="font-bold" style={{ color: activeColor }}>{skill.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.03] p-[1px]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: activeColor,
                          boxShadow: `0 0 8px ${activeColor}40`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research Interests Tags */}
            <div className="space-y-2 pt-2">
              <span className="text-[9px] font-mono uppercase tracking-wider text-white/20 block">
                Research Specializations
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(profile.researchInterests || []).map((field) => (
                  <span 
                    key={field}
                    className="text-[10px] font-mono px-2 py-1 rounded bg-[#00f0ff]/5 border border-[#00f0ff]/10 text-[#00f0ff]/70"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Classification stats bar */}
          <GlassCard className="p-6 border border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30 block mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-white/20" /> Signal Classifications
            </span>

            <div className="space-y-4 pt-1">
              {categories.map(cat => {
                const percentage = totalAuthored > 0 ? (cat.count / totalAuthored) * 100 : 0;
                return (
                  <div key={cat.type} className="space-y-1.5">
                    <div className="flex justify-between items-center font-mono text-[10px]">
                      <span className="text-white/45">{cat.label}</span>
                      <span className="text-white/30">{cat.count} ({Math.round(percentage)}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-700 origin-left"
                        style={{ 
                          width: `${percentage > 0 ? percentage : 2}%`,
                          backgroundColor: cat.color,
                          boxShadow: `0 0 8px ${cat.color}60`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right Columns: Activity heatmap and post list */}
        <div className="lg:col-span-2 space-y-6">
          {/* Heatmap Section */}
          <ActivityHeatmap seedName={profile.name} activeColor={activeColor} />

          {/* User signals List */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-white/20" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Logged Broadcast Signals ({totalAuthored})
              </span>
            </div>

            {authored.length === 0 ? (
              <div className="glass-card rounded-2xl p-10 border border-white/5 text-center text-white/30 font-light text-sm">
                No active public signals registered for this node in the database.
              </div>
            ) : (
              authored.map(post => (
                <FeedPostCard
                  key={post.id}
                  post={post}
                  onLike={() => {}}
                  onSave={() => {}}
                  onReact={() => {}}
                  onAddComment={() => {}}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
