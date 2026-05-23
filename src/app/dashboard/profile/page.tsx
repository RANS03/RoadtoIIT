"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Settings, 
  FileText, 
  Bookmark, 
  Edit3, 
  Award,
  BookOpen,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Activity,
  Flame,
  Radio,
  Clock,
  Send
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUserProfile, updateUserProfile, UserProfile, BuildLog } from "@/data/users";
import { getStoredFeed, createFeedPost, FeedPost } from "@/data/feed";
import { FeedPostCard } from "@/components/ui/FeedPostCard";
import { GlassCard } from "@/components/ui/GlassCard";

type ProfileTab = "signals" | "saved" | "missions";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [myPosts, setMyPosts] = useState<FeedPost[]>([]);
  const [savedPosts, setSavedPosts] = useState<FeedPost[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>("signals");
  
  // Preview / Editing state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState("");
  const [institution, setInstitution] = useState("");
  const [branch, setBranch] = useState("");
  const [missionType, setMissionType] = useState("");
  const [missionFocus, setMissionFocus] = useState("");
  const [interestsText, setInterestsText] = useState("");
  const [yearSemesterInput, setYearSemesterInput] = useState("");

  // Missions & Build Log Editor states
  const [newMissionInput, setNewMissionInput] = useState("");
  const [newBuildProject, setNewBuildProject] = useState("");
  const [newBuildTask, setNewBuildTask] = useState("");
  const [newBuildStatus, setNewBuildStatus] = useState<"completed" | "in-progress" | "pending">("pending");

  const missionOptions = [
    "AI Systems Path",
    "Research Operative",
    "Quant Explorer",
    "Startup Track",
    "Core Engineering",
    "Academic Pathway"
  ];

  const loadData = () => {
    if (user?.email) {
      const uProfile = getCurrentUserProfile(user.email);
      setProfile(uProfile);
      
      // Initialize edit inputs
      setAlias(uProfile.name);
      setInstitution(uProfile.institution);
      setBranch(uProfile.branch);
      setMissionType(uProfile.missionType);
      setMissionFocus(uProfile.missionFocus || "");
      setInterestsText((uProfile.researchInterests || []).join(", "));
      setYearSemesterInput(uProfile.yearSemester || "Year 1, Sem 1");

      // Load all posts
      const allPosts = getStoredFeed();
      // User posts are those where author is not null and matches current profile id or name
      const userPostsList = allPosts.filter(
        post => !post.isAnonymous && post.author && (post.author.id === uProfile.id || post.author.name === uProfile.name)
      );
      setMyPosts(userPostsList);

      // Bookmarked posts
      const bookmarked = allPosts.filter(post => post.savedByUser);
      setSavedPosts(bookmarked);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    // Parse interests text comma separated
    const parsedInterests = interestsText
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const updated = updateUserProfile(user.email, {
      name: alias.trim(),
      institution: institution.trim(),
      branch: branch.trim(),
      missionType: missionType,
      missionFocus: missionFocus.trim(),
      researchInterests: parsedInterests,
      yearSemester: yearSemesterInput.trim()
    });

    setProfile(updated);
    setIsEditing(false);
    loadData(); // Reload feeds to reflect updated author details
  };

  // Add / Remove active missions
  const handleAddMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMissionInput.trim() || !profile || !user?.email) return;
    const updatedMissions = [...(profile.activeMissions || []), newMissionInput.trim()];
    const updated = updateUserProfile(user.email, { activeMissions: updatedMissions });
    setProfile(updated);
    setNewMissionInput("");
  };

  const handleRemoveMission = (missionName: string) => {
    if (!profile || !user?.email) return;
    const updatedMissions = (profile.activeMissions || []).filter(m => m !== missionName);
    const updated = updateUserProfile(user.email, { activeMissions: updatedMissions });
    setProfile(updated);
  };

  // Add / Remove build logs
  const handleAddBuildLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuildProject.trim() || !newBuildTask.trim() || !profile || !user?.email) return;
    const newLog: BuildLog = {
      id: `log-${Date.now()}`,
      project: newBuildProject.trim(),
      task: newBuildTask.trim(),
      status: newBuildStatus,
      timestamp: "Just now"
    };
    const updatedLogs = [...(profile.buildLogs || []), newLog];
    const updated = updateUserProfile(user.email, { buildLogs: updatedLogs });
    setProfile(updated);
    setNewBuildTask("");
  };

  const handleUpdateBuildStatus = (logId: string, nextStatus: "completed" | "in-progress" | "pending") => {
    if (!profile || !user?.email) return;
    const updatedLogs = (profile.buildLogs || []).map(log => 
      log.id === logId ? { ...log, status: nextStatus } : log
    );
    const updated = updateUserProfile(user.email, { buildLogs: updatedLogs });
    setProfile(updated);
  };

  const handleRemoveBuildLog = (logId: string) => {
    if (!profile || !user?.email) return;
    const updatedLogs = (profile.buildLogs || []).filter(log => log.id !== logId);
    const updated = updateUserProfile(user.email, { buildLogs: updatedLogs });
    setProfile(updated);
  };

  // Broadcast build log checklist as a Feed Signal
  const handleBroadcastBuild = (projectName: string) => {
    if (!profile || !user?.email) return;
    const projectTasks = (profile.buildLogs || []).filter(log => log.project === projectName);
    if (projectTasks.length === 0) return;

    createFeedPost({
      type: "build-journal",
      title: `Build Journal: ${projectName}`,
      content: `Operating update on project ${projectName}. Checklist of sharded tasks broadcasted.`,
      isAnonymous: false,
      author: profile,
      tags: [projectName.replace(/\s+/g, ""), "BuildJournal", "OperatorLog"],
      buildJournalData: {
        project: projectName,
        checklist: projectTasks.map(t => ({ task: t.task, status: t.status }))
      }
    });

    // Award QIS points for broadcasting
    const updated = updateUserProfile(user.email, {
      intelligenceScore: profile.intelligenceScore + 30
    });
    setProfile(updated);
    loadData();
    alert(`Signal Broadcasted: project '${projectName}' logs injected into network feed (+30 QIS)`);
  };

  // Unique project names for dropdown selection
  const uniqueProjects = Array.from(new Set((profile?.buildLogs || []).map(log => log.project)));

  return (
    <div className="py-4 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <User className="w-4 h-4 text-[#8b5cf6]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                ROADTOIIT OS • My Profile
              </span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              My Profile
            </h1>
            <p className="text-white/40 text-sm font-light max-w-xl leading-relaxed">
              Manage your network node variables, active missions, and project logs.
            </p>
          </div>
          <button
            onClick={() => {
              setIsPreviewMode(!isPreviewMode);
              setIsEditing(false); // Force exit edit mode
            }}
            className={`px-4 py-2 rounded-xl font-mono text-[10px] uppercase tracking-wider border transition-all self-start md:self-center ${
              isPreviewMode 
                ? "bg-[#00f0ff]/10 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/20" 
                : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
          >
            {isPreviewMode ? "[Exit Public Preview]" : "[Public Preview Mode]"}
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Operator Details & Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {profile && (
            <GlassCard className="p-4 md:p-8 border border-white/5 relative overflow-hidden">
              {/* Scanline decoration */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent animate-scan" />

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-2xl border border-white/10 p-1 bg-white/2 mb-4 relative group">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-full h-full rounded-xl object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-[10px] font-mono text-white/70">
                    ONLINE
                  </div>
                </div>

                {!isEditing ? (
                  <>
                    <h2 className="font-heading font-bold text-xl text-white mb-1 flex items-center gap-2">
                      {profile.name}
                      <Award className="w-4 h-4 text-[#8b5cf6]" />
                    </h2>
                    <p className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-wider mb-5">
                      {profile.missionType}
                    </p>
                    {!isPreviewMode && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition-all font-mono text-[9px] uppercase tracking-wider"
                      >
                        <Edit3 className="w-3 h-3" />
                        Modify Dossier
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-4">
                    Modifying Node Variables
                  </span>
                )}
              </div>

              {/* Information / Edit Form */}
              <AnimatePresence mode="wait">
                {!isEditing ? (
                  <div className="space-y-5 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Institution</span>
                      <span className="text-white/75 font-light">{profile.institution}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Branch</span>
                      <span className="text-white/75 font-light">{profile.branch}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Current Year</span>
                      <span className="text-white/75 font-light">{profile.yearSemester}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Intelligence Rating</span>
                      <span className="text-[#00f0ff] font-semibold">{profile.intelligenceScore} QIS</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Credibility Level</span>
                      <span className="text-emerald-400 font-semibold">{profile.credibilityRating || 75}% verified</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-white/20 uppercase text-[9px] tracking-wider">Operator Rank</span>
                      <span className="text-white/70">{profile.reputationGrade}</span>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleProfileSave}
                    className="space-y-4 pt-4 border-t border-white/5"
                  >
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Codename Alias
                      </label>
                      <input 
                        type="text" 
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        required
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        College / Institution
                      </label>
                      <input 
                        type="text" 
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Specialization Branch
                      </label>
                      <input 
                        type="text" 
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Year & Semester
                      </label>
                      <input 
                        type="text" 
                        value={yearSemesterInput}
                        onChange={(e) => setYearSemesterInput(e.target.value)}
                        placeholder="e.g. Year 3, Sem 5"
                        required
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Mission Pathway
                      </label>
                      <select
                        value={missionType}
                        onChange={(e) => setMissionType(e.target.value)}
                        className="w-full bg-black/90 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/10"
                      >
                        {missionOptions.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Mission Focus Text
                      </label>
                      <textarea
                        rows={2}
                        value={missionFocus}
                        onChange={(e) => setMissionFocus(e.target.value)}
                        placeholder="Define your primary project or study goals..."
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-white/10 resize-none font-light"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">
                        Research Fields (Comma separated)
                      </label>
                      <input 
                        type="text" 
                        value={interestsText}
                        onChange={(e) => setInterestsText(e.target.value)}
                        placeholder="e.g., Low Level C++, Distributed AI"
                        className="w-full bg-white/2 border border-white/5 rounded-xl px-3 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 font-mono text-[9px] uppercase tracking-widest text-white/30 py-2 border border-white/5 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 font-mono text-[9px] uppercase tracking-widest text-[#8b5cf6] py-2 border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 rounded-xl hover:bg-[#8b5cf6]/20 transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </GlassCard>
          )}

          {/* Dossier Academic Specs */}
          {profile && !isEditing && (
            <GlassCard className="p-4 md:p-6 border border-white/5 space-y-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00f0ff] block mb-2">
                Dossier Academic Specs
              </span>
              
              {/* Streaks Widget */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Flame className="w-4 h-4 text-orange-500 fill-current" />
                  <span>Mission Streak:</span>
                </div>
                <span className="font-mono text-xs text-orange-400 font-bold">12-Day Sprint</span>
              </div>

              {/* Mission Focus Block */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/20 block">
                  Core Mission Focus
                </span>
                <p className="text-white/70 text-xs font-light leading-relaxed bg-white/2 p-3 border border-white/5 rounded-xl">
                  {profile.missionFocus || "No project goals established. Click modify credentials to outline your pathway focus."}
                </p>
              </div>

              {/* Technical Specialties Matrix (Phase 6 Skill Graph) */}
              <div className="space-y-3 pt-2">
                <span className="text-[9px] font-mono uppercase tracking-wider text-white/25 block">
                  Technical Specialties Matrix
                </span>
                <div className="space-y-2.5">
                  {(profile.skillsMatrix || [
                    { name: "Math Rigor", value: 60 },
                    { name: "Systems Dev", value: 55 },
                    { name: "Full Stack", value: 50 },
                    { name: "Hardware", value: 45 }
                  ]).map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-mono">
                        <span className="text-white/50">{skill.name}</span>
                        <span className="text-[#00f0ff] font-bold">{skill.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/[0.03] p-[1px]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#00f0ff] rounded-full shadow-[0_0_8px_rgba(0,240,255,0.35)]"
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
          )}

          {/* QIS Credibility Node & History Audit Logs */}
          {profile && !isEditing && (
            <GlassCard className="p-4 md:p-6 border border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 block">
                  QIS Credibility Node
                </span>
                <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-0.5 rounded">
                  {profile.credibilityRating || 75}% Verified
                </span>
              </div>
              
              <p className="text-[11px] text-white/40 font-light leading-relaxed">
                Reputation weight is calibrated dynamically based on verified dispatches, peer resonance ratio, and senior validations.
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-[8px] font-mono uppercase tracking-wider text-white/20 block">
                  Verification Audit Log
                </span>
                
                <div className="space-y-2.5">
                  {[
                    { event: "AI Systems Node Verifier approved log #post-3", change: "+14% Credibility", date: "2d ago" },
                    { event: "Campus Coordinator verified IIT Delhi CS Enrollment", change: "System Confirmed", date: "5d ago" },
                    { event: "Initial Node Verification baseline established", change: "70% Base", date: "10d ago" }
                  ].map((audit, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-3 p-2 rounded bg-white/[0.01] border border-white/[0.03] text-[10px] font-mono">
                      <div>
                        <span className="text-white/60 block leading-tight">{audit.event}</span>
                        <span className="text-[8px] text-white/20 mt-0.5 block">{audit.date}</span>
                      </div>
                      <span className="text-emerald-400 font-semibold text-right whitespace-nowrap">{audit.change}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Right Columns: Contribution & Build Journal tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab selector */}
          <div className="flex border-b border-white/5 overflow-x-auto scrollbar-none flex-nowrap -mx-2 px-2 md:mx-0 md:px-0">
            <button
              onClick={() => setActiveTab("signals")}
              className={`px-5 py-3.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "signals" 
                  ? "border-[#8b5cf6] text-white" 
                  : "border-transparent text-white/35 hover:text-white/60"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              My Signals ({myPosts.length})
            </button>
            <button
              onClick={() => setActiveTab("missions")}
              className={`px-5 py-3.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "missions" 
                  ? "border-[#8b5cf6] text-white" 
                  : "border-transparent text-white/35 hover:text-white/60"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Builds & Missions
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-3.5 font-mono text-xs uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                activeTab === "saved" 
                  ? "border-[#8b5cf6] text-white" 
                  : "border-transparent text-white/35 hover:text-white/60"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Saved Intelligence ({savedPosts.length})
            </button>
          </div>

          {/* List display */}
          <div className="space-y-5">
            {activeTab === "signals" && (
              myPosts.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 border border-white/5 text-center text-white/30 font-light text-sm">
                  You have not published any public signals yet. Go to the Intelligence Feed to broadcast a message.
                </div>
              ) : (
                myPosts.map(post => (
                  <FeedPostCard
                    key={post.id}
                    post={post}
                    onLike={() => {}}
                    onSave={() => {}}
                    onReact={() => {}}
                    onAddComment={() => {}}
                  />
                ))
              )
            )}

            {activeTab === "saved" && (
              savedPosts.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 border border-white/5 text-center text-white/30 font-light text-sm">
                  No bookmarked archives found. Save posts from the feed to access them here.
                </div>
              ) : (
                savedPosts.map(post => (
                  <FeedPostCard
                    key={post.id}
                    post={post}
                    onLike={() => {}}
                    onSave={() => {}}
                    onReact={() => {}}
                    onAddComment={() => {}}
                  />
                ))
              )
            )}

            {activeTab === "missions" && profile && (
              <div className="space-y-6">
                {/* 1. Active Missions Tracker */}
                <GlassCard className="p-4 md:p-6 border border-white/5 space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Active Missions</h3>
                    <p className="text-white/40 text-xs font-light mt-0.5">Focus objectives and milestones currently being sharded.</p>
                  </div>

                  {!isPreviewMode && (
                    <form onSubmit={handleAddMission} className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Add new objective (e.g. Build Custom Compiler)"
                        value={newMissionInput}
                        onChange={(e) => setNewMissionInput(e.target.value)}
                        className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                      />
                      <button 
                        type="submit"
                        disabled={!newMissionInput.trim()}
                        className="px-4 py-2 rounded-xl bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 text-[#8b5cf6] text-xs font-mono uppercase tracking-wider hover:bg-[#8b5cf6]/35 transition-all disabled:opacity-40"
                      >
                        Shard Objective
                      </button>
                    </form>
                  )}

                  <div className="space-y-2">
                    {(profile.activeMissions || []).length === 0 ? (
                      <span className="text-white/20 font-mono text-[10px] italic">No active missions running.</span>
                    ) : (
                      (profile.activeMissions || []).map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/[0.03]">
                          <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
                            <span className="text-xs text-white/70 font-light">{m}</span>
                          </div>
                          {!isPreviewMode && (
                            <button 
                              onClick={() => handleRemoveMission(m)}
                              className="p-1 rounded text-white/30 hover:text-red-400 hover:bg-white/5 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </GlassCard>

                {/* 2. Build Journal Logging */}
                <GlassCard className="p-4 md:p-6 border border-white/5 space-y-4">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">Project Build Journal</h3>
                    <p className="text-white/40 text-xs font-light mt-0.5">Log low-level builds, check off tasks, and broadcast progress to the network.</p>
                  </div>

                  {/* Add Build Task Form */}
                  {!isPreviewMode && (
                    <form onSubmit={handleAddBuildLog} className="space-y-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">Add Build Task Log</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-mono text-[8px] uppercase text-white/40 block mb-1">Project Name</label>
                          <input 
                            type="text"
                            placeholder="e.g. Distributed DB Engine"
                            value={newBuildProject}
                            onChange={(e) => setNewBuildProject(e.target.value)}
                            list="projects-dossier"
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#8b5cf6]/50"
                          />
                          <datalist id="projects-dossier">
                            {uniqueProjects.map(proj => (
                              <option key={proj} value={proj} />
                            ))}
                          </datalist>
                        </div>
                        <div>
                          <label className="font-mono text-[8px] uppercase text-white/40 block mb-1">Task Description</label>
                          <input 
                            type="text"
                            placeholder="e.g. Implement persistent WAL"
                            value={newBuildTask}
                            onChange={(e) => setNewBuildTask(e.target.value)}
                            required
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#8b5cf6]/50"
                          />
                        </div>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-2">
                          <label className="font-mono text-[8px] uppercase text-white/40">Initial Status:</label>
                          <select
                            value={newBuildStatus}
                            onChange={(e) => setNewBuildStatus(e.target.value as any)}
                            className="bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white/70 outline-none font-mono"
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <button 
                          type="submit"
                          className="px-4 py-1.5 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 text-[#8b5cf6] text-[10px] font-mono uppercase tracking-wider hover:bg-[#8b5cf6]/30 transition-all"
                        >
                          Log Task
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Display Logs Grouped by Project */}
                  <div className="space-y-5">
                    {uniqueProjects.length === 0 ? (
                      <span className="text-white/20 font-mono text-[10px] italic">No project builds logged yet.</span>
                    ) : (
                      uniqueProjects.map(projectName => {
                        const projectTasks = (profile.buildLogs || []).filter(log => log.project === projectName);
                        const completedCount = projectTasks.filter(t => t.status === "completed").length;
                        const progressPercent = Math.round((completedCount / projectTasks.length) * 100);

                        return (
                          <div key={projectName} className="p-4 rounded-xl border border-white/5 bg-white/[0.005] space-y-3">
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-white/5 pb-2">
                              <div>
                                <h4 className="font-heading font-bold text-sm text-white">{projectName}</h4>
                                <span className="font-mono text-[9px] text-[#00f0ff] uppercase tracking-wider mt-0.5 block">{progressPercent}% Sharded</span>
                              </div>
                              
                              {/* Broadcast to Feed Button */}
                              {!isPreviewMode && (
                                <button
                                  onClick={() => handleBroadcastBuild(projectName)}
                                  className="px-3 py-1 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-[9px] font-mono uppercase tracking-wider rounded-lg hover:bg-[#00f0ff]/20 transition-all flex items-center gap-1.5 self-start sm:self-center"
                                >
                                  <Radio className="w-3 h-3 animate-pulse" />
                                  Broadcast to Grid
                                </button>
                              )}
                            </div>

                            {/* Task List */}
                            <div className="space-y-2 pt-1">
                              {projectTasks.map(task => (
                                <div key={task.id} className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/[0.02]">
                                  <div className="flex items-center gap-3">
                                    {/* Task Check/Progress Selector */}
                                    <div className="flex items-center gap-1.5">
                                      {isPreviewMode ? (
                                        <div className={`w-3.5 h-3.5 rounded border text-[8px] flex items-center justify-center transition-all ${
                                          task.status === 'completed' 
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold' 
                                            : task.status === 'in-progress'
                                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                              : 'border-white/10 text-transparent'
                                        }`}>
                                          {task.status === 'completed' ? '✓' : task.status === 'in-progress' ? '⧗' : ''}
                                        </div>
                                      ) : (
                                        <>
                                          <button 
                                            onClick={() => handleUpdateBuildStatus(task.id, "completed")}
                                            className={`w-3.5 h-3.5 rounded border text-[8px] flex items-center justify-center transition-all ${
                                              task.status === 'completed' 
                                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold' 
                                                : 'border-white/10 text-transparent hover:border-emerald-500/30'
                                            }`}
                                          >
                                            ✓
                                          </button>
                                          <button 
                                            onClick={() => handleUpdateBuildStatus(task.id, "in-progress")}
                                            className={`w-3.5 h-3.5 rounded border text-[8px] flex items-center justify-center transition-all ${
                                              task.status === 'in-progress' 
                                                ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 animate-pulse' 
                                                : 'border-white/10 text-transparent hover:border-blue-500/30'
                                            }`}
                                          >
                                            ⧗
                                          </button>
                                        </>
                                      )}
                                    </div>
                                    <span className={`text-xs ${task.status === 'completed' ? 'line-through text-white/30' : 'text-white/70'}`}>
                                      {task.task}
                                    </span>
                                  </div>
                                  {!isPreviewMode && (
                                    <button 
                                      onClick={() => handleRemoveBuildLog(task.id)}
                                      className="text-white/20 hover:text-red-400 p-1"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </GlassCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
