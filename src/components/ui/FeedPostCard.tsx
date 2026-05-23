"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  ShieldAlert, 
  User, 
  Terminal, 
  FileText, 
  Cpu, 
  BookOpen, 
  Home,
  Send,
  Download,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Loader2,
  MapPin,
  TrendingUp,
  Award,
  Bookmark,
  MessageSquare,
  AlertTriangle,
  Compass,
  Radio
} from "lucide-react";
import { FeedPost, Comment, getStoredFeed, saveStoredFeed } from "@/data/feed";
import { GlassCard } from "./GlassCard";

interface FeedPostCardProps {
  post: FeedPost;
  onLike: (postId: string) => void; // Used for Endorsement
  onSave: (postId: string) => void; // Used for Archiving
  onReact: (postId: string, emoji: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onVote?: (postId: string, optionId: string) => void;
  onRepost?: (postData: any) => void;
  disableCardLink?: boolean;
}

function parseMarkdown(text: string) {
  if (!text) return "";
  
  // Basic markdown parsing: **bold**, *italic*, `code`
  const tokens = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
  return tokens.map((token, idx) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={idx} className="font-semibold text-white">{token.slice(2, -2)}</strong>;
    }
    if (token.startsWith("*") && token.endsWith("*")) {
      return <em key={idx} className="italic text-white/80">{token.slice(1, -1)}</em>;
    }
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code key={idx} className="font-mono bg-white/5 border border-white/10 px-1 py-0.5 rounded text-[11px] text-[#00f0ff]">
          {token.slice(1, -1)}
        </code>
      );
    }
    return token;
  });
}

export function FeedPostCard({ 
  post, 
  onLike, 
  onSave, 
  onReact, 
  onAddComment,
  onVote,
  onRepost,
  disableCardLink = false
}: FeedPostCardProps) {
  const router = useRouter();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isTypingComment, setIsTypingComment] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDecryptedSections, setShowDecryptedSections] = useState(false);

  // Challenge / Dissent local states
  const [isChallenging, setIsChallenging] = useState(false);
  const [dissentText, setDissentText] = useState("");
  const [localDissent, setLocalDissent] = useState<{ author: string; content: string } | undefined>(post.dissentingLog);

  // Mobile detection
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRepost = () => {
    const authorAlias = post.isAnonymous ? "anonymous_operator" : (post.author?.name || "anonymous_operator");
    const repostPost = {
      type: post.type,
      title: post.title ? `Repost: ${post.title}` : `Reposted Signal from ${authorAlias}`,
      content: post.content,
      isAnonymous: false,
      author: null, // Resolves by creator
      tags: [...post.tags, "repost"],
      repostSource: {
        authorName: authorAlias,
        signalId: post.id,
        title: post.title || "Core Reflection"
      },
      emotionalSignal: post.emotionalSignal,
      environmentalContext: post.environmentalContext,
      systemicCause: post.systemicCause,
      recoveryPattern: post.recoveryPattern,
      operatorInsight: post.operatorInsight,
      imageAttachment: post.imageAttachment,
      buildJournalData: post.buildJournalData
    };
    
    if (onRepost) {
      onRepost(repostPost);
    } else {
      const stored = getStoredFeed();
      const profilesStr = localStorage.getItem("roadtoiit_user_profiles");
      let activeProfile: any = null;
      if (profilesStr) {
        const profiles = JSON.parse(profilesStr);
        activeProfile = profiles.find((p: any) => p.id.startsWith("curr-"));
      }
      
      const newPost = {
        ...repostPost,
        id: `post-${Date.now()}`,
        timestamp: "Just now",
        likes: 0,
        likedByUser: false,
        saves: 0,
        savedByUser: false,
        comments: [],
        reactions: [
          { emoji: "🤝", count: 0, reactedByUser: false },
          { emoji: "⚡", count: 0, reactedByUser: false },
        ],
        featured: false,
        variant: "standard" as const,
        campusDetail: "Sharded Repost Node",
        signalStrength: 60,
        isVerified: false,
        tacticalRelevance: 7.5,
        verifiers: [],
        sqsScore: post.sqsScore || 70,
        usefulnessRank: post.usefulnessRank || "B",
        author: activeProfile
      };
      
      const nextFeed = [newPost, ...stored];
      saveStoredFeed(nextFeed);
      alert(`Signal sharded successfully! Injected repost into timeline.`);
      window.location.reload();
    }
  };

  const getPostStyles = (type: string) => {
    switch (type) {
      case "survivor-log":
        return {
          label: "Survivor Log",
          color: "#8b5cf6", // Purple
          icon: ShieldAlert,
          bg: "rgba(139, 92, 246, 0.05)",
          border: "rgba(139, 92, 246, 0.15)",
        };
      case "tactical-brief":
        return {
          label: "Tactical Brief",
          color: "#00f0ff", // Cyan
          icon: Compass,
          bg: "rgba(0, 240, 255, 0.05)",
          border: "rgba(0, 240, 255, 0.15)",
        };
      case "mission-update":
        return {
          label: "Mission Update",
          color: "#10b981", // Emerald
          icon: Cpu,
          bg: "rgba(16, 185, 129, 0.05)",
          border: "rgba(16, 185, 129, 0.15)",
        };
      case "professor-intel":
        return {
          label: "Professor Intel",
          color: "#f59e0b", // Amber
          icon: BookOpen,
          bg: "rgba(245, 158, 11, 0.05)",
          border: "rgba(245, 158, 11, 0.15)",
        };
      case "placement-signal":
        return {
          label: "Placement Signal",
          color: "#38bdf8", // Sky blue
          icon: TrendingUp,
          bg: "rgba(56, 189, 248, 0.05)",
          border: "rgba(56, 189, 248, 0.15)",
        };
      case "build-journal":
        return {
          label: "Build Journal",
          color: "#6366f1", // Indigo
          icon: Terminal,
          bg: "rgba(99, 102, 241, 0.05)",
          border: "rgba(99, 102, 241, 0.15)",
        };
      case "research-dispatch":
        return {
          label: "Research Dispatch",
          color: "#f43f5e", // Rose
          icon: Award,
          bg: "rgba(244, 63, 94, 0.05)",
          border: "rgba(244, 63, 94, 0.15)",
        };
      case "hostel-signal":
        return {
          label: "Hostel Signal",
          color: "#ec4899", // Pink
          icon: Home,
          bg: "rgba(236, 72, 153, 0.05)",
          border: "rgba(236, 72, 153, 0.15)",
        };
      default:
        return {
          label: "Signal",
          color: "#ffffff",
          icon: Radio,
          bg: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.15)",
        };
    }
  };

  const style = getPostStyles(post.type);
  const TypeIcon = style.icon;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isTypingComment) return;

    setIsTypingComment(true);
    setTimeout(() => {
      onAddComment(post.id, newComment.trim());
      setNewComment("");
      setIsTypingComment(false);
    }, 750);
  };

  const handleVoteSubmit = (optionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onVote) {
      onVote(post.id, optionId);
    }
  };

  const handleDissentSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!dissentText.trim()) return;

    const authorAlias = "peer_operator";
    const newDissent = { author: authorAlias, content: dissentText.trim() };
    
    // Save locally
    const stored = getStoredFeed();
    const nextList = stored.map(p => {
      if (p.id === post.id) {
        return { ...p, dissentingLog: newDissent };
      }
      return p;
    });
    saveStoredFeed(nextList);

    setLocalDissent(newDissent);
    setDissentText("");
    setIsChallenging(false);

    // Call onReact to trigger parent refresh
    onReact(post.id, "👁️");
  };

  const targetCharLimit = (mounted && isMobile)
    ? (post.featured ? 180 : 120)
    : (post.featured ? 380 : 220);
  const isLongContent = post.content.length > targetCharLimit && post.variant !== "quote";
  const displayContent = isExpanded || !isLongContent 
    ? post.content 
    : `${post.content.substring(0, targetCharLimit)}...`;

  // Render Quote Variant Card
  if (post.variant === "quote") {
    return (
      <GlassCard 
        className={`pl-5 pr-4 py-4 md:p-7 relative border hover:border-white/10 transition-all duration-500 overflow-hidden ${
          !disableCardLink ? "cursor-pointer hover:shadow-[0_0_40px_rgba(139,92,246,0.04)]" : ""
        }`}
        style={{ borderColor: "rgba(139,92,246,0.15)", background: "rgba(139,92,246,0.02)" }}
        onClick={() => {
          if (!disableCardLink) {
            router.push(`/dashboard/signal/${post.id}`);
          }
        }}
      >
        <div className="absolute top-0 left-0 bottom-0 w-0.5 bg-[#8b5cf6] opacity-50" />

        {post.repostSource && (
          <div className="mb-3 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg font-mono text-[8px] uppercase tracking-wider text-white/40 flex items-center gap-1.5 select-none w-fit pl-2">
            <Radio className="w-3 h-3 text-[#00f0ff] animate-pulse" />
            <span>
              SHARDED REPOST:{" "}
              <span 
                onClick={(e) => {
                  if (post.repostSource?.authorName && post.repostSource.authorName !== "anonymous_operator") {
                    e.stopPropagation();
                    router.push(`/dashboard/operator/${post.repostSource.authorName}`);
                  }
                }}
                className={post.repostSource.authorName !== "anonymous_operator" ? "cursor-pointer hover:text-[#00f0ff] transition-colors underline decoration-[#00f0ff]/30 underline-offset-2" : ""}
              >
                {post.repostSource.authorName}
              </span>{" "}
              &gt; {post.repostSource.title}
            </span>
          </div>
        )}

        {/* Quote content layout */}
        <div className="pl-2 mb-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8b5cf6]/50 block mb-3">
            ARCHIVED CORE REFLECTION
          </span>
          <p className="font-heading text-lg md:text-xl font-light italic leading-relaxed text-white/90">
            "{post.content}"
          </p>
        </div>

        {/* Quote Footer: location & tags */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 pl-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 text-white/30" />
            </div>
            <span className="text-[10px] font-mono text-white/45">
              anonymous_operator
            </span>
            {post.campusDetail && (
              <span className="text-[9px] font-mono text-white/20 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/15" />
                {post.campusDetail}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onLike(post.id);
              }}
              className="flex items-center gap-1.5 text-[11px] font-mono text-[#00f0ff]/80 hover:text-[#00f0ff]"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{post.signalStrength}% Strength</span>
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSave(post.id);
              }}
              className="flex items-center gap-1 text-[11px] font-mono"
              style={{ color: post.savedByUser ? "#8b5cf6" : "rgba(255,255,255,0.3)" }}
            >
              <Bookmark className={`w-3.5 h-3.5 ${post.savedByUser ? "fill-[#8b5cf6]" : ""}`} />
              {post.savedByUser ? "Saved" : "Save"}
            </button>
          </div>
        </div>

        {/* Conflicting Viewpoint inside Quote card if any */}
        {localDissent && (
          <div className="mt-4 p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] flex items-start gap-3 pl-2" onClick={(e) => e.stopPropagation()}>
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400/80 block mb-0.5">
                Dissenting Operator Log
              </span>
              <p className="text-white/60 text-xs font-light leading-relaxed">
                <span className="font-mono text-[10px] text-white/40 mr-1.5">{localDissent.author}:</span>
                {localDissent.content}
              </p>
            </div>
          </div>
        )}
      </GlassCard>
    );
  }

  // Render Featured / Standard / Compact layout configurations
  const paddingClass = post.featured 
    ? "p-3.5 md:p-9" 
    : post.variant === "compact" 
      ? "p-2.5 md:p-5" 
      : "p-3 md:p-7";

  return (
    <GlassCard 
      className={`${paddingClass} relative border hover:border-white/10 transition-all duration-500 overflow-hidden ${
        !disableCardLink ? "cursor-pointer hover:shadow-[0_0_30px_rgba(0,240,255,0.02)]" : ""
      } ${post.featured ? "bg-gradient-to-br from-white/[0.015] to-transparent shadow-[0_0_50px_rgba(0,240,255,0.03)]" : ""}`}
      style={{ 
        borderColor: post.featured 
          ? `${style.color}45` 
          : post.likedByUser 
            ? `${style.color}40` 
            : "rgba(255,255,255,0.05)" 
      }}
      onClick={() => {
        if (!disableCardLink) {
          router.push(`/dashboard/signal/${post.id}`);
        }
      }}
    >
      {/* Decorative vertical category accent line */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-50"
        style={{ backgroundColor: style.color }}
      />
      {/* Top glow sweep */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-25"
        style={{ background: `linear-gradient(to right, transparent, ${style.color}60, transparent)` }}
      />

      {/* Featured Header Badge */}
      {post.featured && (
        <div className="absolute top-0 right-0 px-4 py-1 bg-white/5 border-bl border-white/5 font-mono text-[8px] uppercase tracking-[0.25em] text-[#00f0ff] rounded-bl-xl border-l border-b border-white/5">
          Featured System Broadcast
        </div>
      )}

      {/* Content wrapper — pushes all content clear of the left accent bar on mobile */}
      <div className="pl-4 md:pl-0">

      {post.repostSource && (
        <div className="mb-4 px-3 py-1.5 bg-white/[0.02] border border-white/5 rounded-lg font-mono text-[8px] uppercase tracking-wider text-white/40 flex items-center gap-1.5 select-none w-fit pl-2">
          <Radio className="w-3 h-3 text-[#00f0ff] animate-pulse" />
          <span>
            SHARDED REPOST:{" "}
            <span 
              onClick={(e) => {
                if (post.repostSource?.authorName && post.repostSource.authorName !== "anonymous_operator") {
                  e.stopPropagation();
                  router.push(`/dashboard/operator/${post.repostSource.authorName}`);
                }
              }}
              className={post.repostSource.authorName !== "anonymous_operator" ? "cursor-pointer hover:text-[#00f0ff] transition-colors underline decoration-[#00f0ff]/30 underline-offset-2" : ""}
            >
              {post.repostSource.authorName}
            </span>{" "}
            &gt; {post.repostSource.title}
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className={`flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3 md:mb-4`}>
        <div 
          className={`flex items-center gap-3 ${(!post.isAnonymous && post.author) ? "cursor-pointer group/author" : ""}`}
          onClick={(e) => {
            if (!post.isAnonymous && post.author) {
              e.stopPropagation();
              router.push(`/dashboard/operator/${post.author.name}`);
            }
          }}
        >
          {/* Avatar */}
          <div 
            className={`${post.variant === 'compact' ? 'w-8 h-8 rounded-lg' : 'w-8.5 h-8.5 md:w-9 md:h-9 rounded-xl'} flex items-center justify-center border transition-all`}
            style={{ 
              background: post.isAnonymous ? "rgba(255,255,255,0.02)" : `${style.color}10`,
              borderColor: post.isAnonymous ? "rgba(255,255,255,0.08)" : `${style.color}30`
            }}
          >
            {post.isAnonymous ? (
              <User className="w-4 h-4 text-white/40" />
            ) : (
              <img 
                src={post.author?.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${post.author?.name}`} 
                alt={post.author?.name} 
                className="w-full h-full rounded-xl object-cover"
              />
            )}
          </div>

          {/* Author metadata */}
          <div className="flex-1">
            {/* Mobile metadata row stack */}
            <div className="md:hidden space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-medium text-[13px] text-white/80">
                  {post.isAnonymous ? "anonymous_operator" : post.author?.name}
                </span>
                {post.isAnonymous && (
                  <span className="text-[7px] font-mono uppercase bg-white/5 border border-white/10 px-1 py-0.2 rounded text-white/30 tracking-wider">
                    Sharded
                  </span>
                )}
              </div>
              <div className="text-[9px] text-white/35 font-mono leading-none">
                {post.isAnonymous ? "DECRYPTED NODE" : `${post.author?.institution} • ${post.author?.branch}`}
              </div>
              {/* Mobile badges row below */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {post.verificationLevel ? (
                  <span className={`text-[7px] font-mono uppercase px-1 py-0.2 rounded tracking-wider flex items-center gap-0.5 font-semibold ${
                    post.verificationLevel === 'MULTI-OPERATOR VERIFIED' 
                      ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400'
                      : post.verificationLevel === 'FIELD CONFIRMED'
                        ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-2 h-2" /> {post.verificationLevel}
                  </span>
                ) : post.isVerified ? (
                  <span className="text-[7px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 px-1 py-0.2 rounded text-emerald-400 tracking-wider flex items-center gap-0.5 font-semibold">
                    <CheckCircle2 className="w-2 h-2" /> Verified
                  </span>
                ) : null}

                <div className="flex items-center gap-0.5 font-mono text-[7px] border border-white/5 bg-white/5 rounded px-1.5 py-0.2 select-none">
                  <span className="text-white/45 uppercase tracking-wider">SQS:</span>
                  <span className="text-[#00f0ff] font-semibold">{post.usefulnessRank || "B"} ({post.sqsScore || 70})</span>
                </div>

                <div 
                  className="flex items-center gap-1 px-1.5 py-0.2 rounded-full border text-[7px] font-mono uppercase tracking-wider"
                  style={{ 
                    color: style.color, 
                    borderColor: `${style.color}30`, 
                    backgroundColor: `${style.color}08` 
                  }}
                >
                  <TypeIcon className="w-2 h-2" />
                  {style.label}
                </div>
              </div>
            </div>

            {/* Desktop metadata inline layout */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <span className={`font-heading font-medium text-white/80 text-sm ${(!post.isAnonymous && post.author) ? "group-hover/author:text-[#00f0ff] transition-colors" : ""}`}>
                  {post.isAnonymous ? "anonymous_operator" : post.author?.name}
                </span>
                {post.isAnonymous && (
                  <span className="text-[8px] font-mono uppercase bg-white/5 border border-white/10 px-1 py-0.5 rounded text-white/30 tracking-wider">
                    Sharded
                  </span>
                )}
                {post.verificationLevel ? (
                  <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded tracking-wider flex items-center gap-1 font-semibold ${
                    post.verificationLevel === 'MULTI-OPERATOR VERIFIED' 
                      ? 'bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.15)]'
                      : post.verificationLevel === 'FIELD CONFIRMED'
                        ? 'bg-blue-500/10 border border-blue-500/30 text-blue-400'
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  }`}>
                    <CheckCircle2 className="w-2.5 h-2.5" /> {post.verificationLevel}
                  </span>
                ) : post.isVerified ? (
                  <span className="text-[8px] font-mono uppercase bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded text-emerald-400 tracking-wider flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                  </span>
                ) : null}
              </div>
              <span className="text-[9px] text-white/35 font-mono">
                {post.isAnonymous ? "DECRYPTED NODE" : `${post.author?.institution} • ${post.author?.branch}`}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop context details & pills */}
        <div className="hidden md:flex flex-wrap items-center gap-3">
          <div className="flex flex-col items-end text-right font-mono text-[9px] text-white/20">
            {post.campusDetail && (
              <span className="flex items-center gap-1 text-white/35 font-light">
                <MapPin className="w-3 h-3 text-[#00f0ff]/40 flex-shrink-0" />
                {post.campusDetail}
              </span>
            )}
            <span className="mt-0.5 text-white/20">{post.timestamp}</span>
          </div>
          
          {/* SQS Console Pill */}
          <div className="flex flex-col items-end text-right font-mono text-[9px] border border-white/5 bg-white/5 rounded px-2.5 py-0.5 flex-shrink-0 select-none">
            <span className="text-white/45 text-[7px] uppercase tracking-wider block leading-none mb-0.5">SIG GRADE</span>
            <span className="text-[#00f0ff] font-semibold leading-none">{post.usefulnessRank || "B"} ({post.sqsScore || 70} SQS)</span>
          </div>

          <div 
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-mono uppercase tracking-widest"
            style={{ 
              color: style.color, 
              borderColor: `${style.color}30`, 
              backgroundColor: `${style.color}08` 
            }}
          >
            <TypeIcon className="w-3 h-3" />
            {style.label}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className={`pl-1 mb-3.5 ${post.variant === 'compact' ? 'mb-2.5' : ''}`}>
        {/* Signal Title */}
        {post.title && (
          <h4 className="font-heading font-bold text-[14px] md:text-base text-white mb-1.5 leading-tight">
            {post.title}
          </h4>
        )}
        <div className={`text-white/70 leading-snug md:leading-relaxed font-light ${
          post.featured 
            ? 'text-[13px] md:text-base font-normal text-white/80' 
            : post.variant === 'compact' 
              ? 'text-[11px] md:text-xs' 
              : 'text-[12.5px] md:text-sm'
        } ${post.type === 'survivor-log' ? 'italic font-mono text-white/60 pl-2 border-l border-white/10' : ''}`}>
          {post.type === 'survivor-log' ? <span>"{parseMarkdown(displayContent)}"</span> : parseMarkdown(displayContent)}
        </div>
      </div>

      {/* Truncated Log Toggle */}
      {isLongContent && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="mt-1.5 md:mt-2 text-[9px] font-mono text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider flex items-center gap-1"
        >
          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          {isExpanded ? "[Condense Signal]" : "[Read Full Signal]"}
        </button>
      )}

      {/* UGC Image Attachment */}
      {post.imageAttachment && (
        <div className="mt-4 rounded-xl border border-white/10 overflow-hidden max-h-72 bg-black/40 relative" onClick={(e) => e.stopPropagation()}>
          <img 
            src={post.imageAttachment} 
            alt="Signal attachment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-2 left-3 font-mono text-[8px] text-white/40 tracking-wider">
            ATTACHED INTEL DATASET SHARD
          </div>
        </div>
      )}

      {/* Collapsible Decrypt Node Sections */}
      {(post.emotionalSignal || post.environmentalContext || post.systemicCause || post.recoveryPattern || post.operatorInsight) && (
        <div className="mt-4" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={() => setShowDecryptedSections(!showDecryptedSections)}
            className="text-[9px] font-mono text-[#00f0ff]/70 hover:text-[#00f0ff] transition-colors uppercase tracking-widest flex items-center gap-1 bg-[#00f0ff]/5 border border-[#00f0ff]/20 px-3 py-1.5 rounded-lg select-none"
          >
            <span>{showDecryptedSections ? "[-] Hide Intel Dossier Sections" : "[+] Decrypt Dossier Sections"}</span>
          </button>
          
          <AnimatePresence>
            {showDecryptedSections && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 overflow-hidden border-l-2 border-[#00f0ff]/30 pl-3 space-y-3 pt-1"
              >
                {post.emotionalSignal && (
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-purple-400 block font-semibold">A. Emotional Signal</span>
                    <p className="text-white/60 text-xs font-light mt-0.5 leading-relaxed">{post.emotionalSignal}</p>
                  </div>
                )}
                {post.environmentalContext && (
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-blue-400 block font-semibold">B. Environmental Context</span>
                    <p className="text-white/60 text-xs font-light mt-0.5 leading-relaxed">{post.environmentalContext}</p>
                  </div>
                )}
                {post.systemicCause && (
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-red-400 block font-semibold">C. Systemic Cause</span>
                    <p className="text-white/60 text-xs font-light mt-0.5 leading-relaxed">{post.systemicCause}</p>
                  </div>
                )}
                {post.recoveryPattern && (
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400 block font-semibold">D. Recovery Pattern</span>
                    <p className="text-white/60 text-xs font-light mt-0.5 leading-relaxed">{post.recoveryPattern}</p>
                  </div>
                )}
                {post.operatorInsight && (
                  <div>
                    <span className="font-mono text-[8px] uppercase tracking-wider text-amber-400 block font-semibold">E. Operator Insight</span>
                    <p className="text-white/60 text-xs font-light mt-0.5 leading-relaxed">{post.operatorInsight}</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

        {/* ----------------- PHASE 6 BUILD JOURNAL CHECKLISTS ----------------- */}
        {post.buildJournalData && (
          <div 
            className="mt-4 space-y-2 bg-white/[0.01] border border-white/5 rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between font-mono text-[9px]">
              <span className="text-white/30 uppercase tracking-wider">Project: {post.buildJournalData.project}</span>
              <span className="text-[#00f0ff]/70 uppercase tracking-wider">Progress Log</span>
            </div>
            <div className="space-y-2 pt-2">
              {post.buildJournalData.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-white/60 font-light">
                  {item.status === 'completed' ? (
                    <span className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-mono text-[8px] font-bold">✓</span>
                  ) : item.status === 'in-progress' ? (
                    <span className="w-4 h-4 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/40 text-[#00f0ff] flex items-center justify-center font-mono text-[8px] animate-pulse">⧗</span>
                  ) : (
                    <span className="w-4 h-4 rounded border border-white/10 flex-shrink-0" />
                  )}
                  <span className={item.status === 'completed' ? "line-through text-white/35" : "text-white/60"}>{item.task}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- PHASE 3 SIGNAL SCHEMAS ----------------- */}

        {/* A. Poll Signals */}
        {post.poll && (
          <div 
            className="mt-4 space-y-2 bg-white/2 border border-white/5 rounded-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-[10px] font-mono uppercase text-white/25 block mb-1">
              {post.poll.question}
            </span>
            {post.poll.options.map((opt) => {
              const totalVotes = post.poll?.options.reduce((acc, curr) => acc + curr.votes, 0) || 1;
              const percent = Math.round((opt.votes / totalVotes) * 100);
              const isVoted = post.poll?.votedOptionId === opt.id;
              
              return (
                <button
                  key={opt.id}
                  onClick={(e) => handleVoteSubmit(opt.id, e)}
                  disabled={!!post.poll?.votedOptionId}
                  className="w-full relative py-2.5 px-4 rounded-xl border border-white/5 bg-transparent overflow-hidden text-left flex justify-between items-center group/pollopt transition-all hover:bg-white/5"
                >
                  {post.poll?.votedOptionId && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-0 top-0 bottom-0 bg-white/5 pointer-events-none"
                    />
                  )}
                  <span className="text-xs text-white/70 z-10 flex items-center gap-2">
                    {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-[#00f0ff]" />}
                    {opt.label}
                  </span>
                  {post.poll?.votedOptionId && (
                    <span className="text-xs font-mono font-semibold text-white/50 z-10">
                      {percent}% ({opt.votes})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* B. Resource Drops */}
        {post.resource && (
          <div 
            className="mt-4 flex items-start gap-4 p-4 rounded-2xl bg-white/2 border border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white/50">
              <Download className="w-4 h-4 text-[#00f0ff]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-white/80 block truncate">
                {post.resource.title}
              </span>
              <span className="text-[10px] font-mono text-white/25 block mt-0.5 uppercase tracking-wide">
                {post.resource.fileType} • {post.resource.size}
              </span>
              <p className="text-[11px] text-white/40 font-light mt-2 leading-relaxed">
                {post.resource.description}
              </p>
              <button className="mt-3 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[#00f0ff] hover:text-[#00f0ff]/80 transition-colors">
                [Download Attachment]
              </button>
            </div>
          </div>
        )}

        {/* C. Event Signals */}
        {post.event && (
          <div 
            className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#00f0ff]/2 border border-[#00f0ff]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#00f0ff] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-semibold text-white block">
                  {post.event.name}
                </span>
                <span className="text-[10px] font-mono text-white/35 uppercase tracking-wider mt-0.5 block">
                  Date: {post.event.date} • Type: {post.event.eventType}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 sm:text-right">
              <span className="text-[9px] font-mono text-red-400 uppercase tracking-widest block">
                Deadline: {post.event.deadline}
              </span>
              <button className="px-3.5 py-1 text-[9px] font-mono uppercase tracking-wider rounded border border-[#00f0ff]/30 text-[#00f0ff] bg-[#00f0ff]/5 hover:bg-[#00f0ff]/10 transition-all">
                Register Node
              </button>
            </div>
          </div>
        )}

        {/* D. Mission Updates (Milestones) */}
        {post.milestone && !post.buildJournalData && (
          <div className="mt-4 space-y-2 bg-white/2 border border-white/5 rounded-2xl p-4">
            <div className="flex justify-between items-center font-mono text-[10px]">
              <span className="text-white/25 uppercase">Milestone Progress</span>
              <span className="text-[#10b981] font-semibold">{post.milestone.progressPercent}% Completed</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">{post.milestone.title}</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" 
                style={{ width: `${post.milestone.progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* E. Intel Threads (Multi-step) */}
        {post.thread && (
          <div className="mt-4 space-y-2.5 pl-2 border-l border-[#f59e0b]/30">
            {post.thread.steps.map((step, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="font-mono text-[10px] text-[#f59e0b] mt-0.5">[{idx + 1}]</span>
                <p className="text-white/50 text-xs font-light leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ---------------------------------------------------------- */}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-1 mt-2.5 md:mt-4 overflow-x-auto scrollbar-none flex-nowrap -mx-1 px-1 md:flex-wrap md:mx-0 md:px-0">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-[8px] md:text-[9px] font-mono px-1.5 py-0.2 md:px-2 md:py-0.5 rounded bg-white/5 text-white/40 border border-white/5 flex-shrink-0"
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
        )}

        {/* Conflicting Viewpoint Dissent logs panel */}
        {localDissent && (
          <div 
            className="mt-4 p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] flex items-start gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400/80 block">
                  Dissenting Operator Log
                </span>
                <span className="text-[7px] font-mono px-1 py-0.2 bg-amber-500/10 border border-amber-500/25 text-amber-400 uppercase rounded">Credibility Alert</span>
              </div>
              <p className="text-white/60 text-xs font-light mt-1.5 leading-relaxed">
                <span className="font-mono text-[10px] text-white/40 mr-1.5">{localDissent.author}:</span>
                {localDissent.content}
              </p>
            </div>
          </div>
        )}

      <div className={`flex items-center justify-between gap-2 pt-2.5 md:pt-4 border-t border-white/5 pl-1 ${post.variant === 'compact' ? 'pt-2' : ''}`}>
        {/* Left: Validation Metrics */}
        <div className="flex items-center gap-3.5 md:gap-5 flex-shrink-0">
          {/* Resonate validation */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            className="flex items-center gap-1 text-[10.5px] md:text-[11px] font-mono transition-colors group"
            style={{ color: post.likedByUser ? "#00f0ff" : "rgba(255,255,255,0.3)" }}
          >
            <Award className={`w-3.5 h-3.5 group-hover:scale-110 transition-transform ${post.likedByUser ? "text-[#00f0ff]" : ""}`} />
            <span className="hidden sm:inline">{post.likedByUser ? "Resonated" : "Resonate"} • </span>
            <span>{post.signalStrength}%</span>
          </button>

          {/* Response Thread trigger */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowComments(!showComments);
            }}
            className="flex items-center gap-1 text-[10.5px] md:text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors group"
          >
            <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Responses </span>
            <span>({post.comments.length})</span>
          </button>

          {/* Archive save */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSave(post.id);
            }}
            className="flex items-center gap-1 text-[10.5px] md:text-[11px] font-mono transition-colors group"
            style={{ color: post.savedByUser ? "#8b5cf6" : "rgba(255,255,255,0.3)" }}
          >
            <Bookmark className={`w-3.5 h-3.5 group-hover:scale-110 transition-transform ${post.savedByUser ? "fill-[#8b5cf6]" : ""}`} />
            <span className="hidden sm:inline">{post.savedByUser ? "Archived" : "Archive"}</span>
          </button>

          {/* Shard Repost */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRepost();
            }}
            className="flex items-center gap-1 text-[10.5px] md:text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors group"
          >
            <Radio className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Shard Repost</span>
          </button>

          {/* Challenge Toggle */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsChallenging(!isChallenging);
            }}
            className="flex items-center gap-1 text-[10.5px] md:text-[11px] font-mono text-white/30 hover:text-white/60 transition-colors group"
          >
            <ShieldAlert className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Challenge</span>
          </button>
        </div>

        {/* Right: Quick Emoji Reactions */}
        <div className="flex items-center gap-1 md:gap-1.5 flex-shrink-0">
          {post.reactions.slice(0, (mounted && isMobile) ? 2 : undefined).map((react) => (
            <button
              key={react.emoji}
              onClick={(e) => {
                e.stopPropagation();
                onReact(post.id, react.emoji);
              }}
              className={`flex items-center gap-0.5 px-1.5 py-0.2 rounded-full border text-[10px] md:text-[11px] font-mono transition-all ${
                react.reactedByUser 
                  ? "bg-white/10 text-white border-white/20" 
                  : "bg-white/2 border-white/5 text-white/40 hover:border-white/10 hover:text-white/60"
              }`}
            >
              <span>{react.emoji}</span>
              <span>{react.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Local Challenge / Dissent Input Panel */}
      <AnimatePresence>
        {isChallenging && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 p-4 bg-white/[0.02] rounded-xl border border-amber-500/20 space-y-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-500 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Inject Conflicting Dissent Log
            </span>
            <textarea
              placeholder="Provide dissenting details, observed patterns, or conflicting senior testimonies..."
              value={dissentText}
              onChange={(e) => setDissentText(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg p-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-amber-500/40 font-light resize-none"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsChallenging(false)}
                className="px-3 py-1 text-[10px] font-mono uppercase text-white/40 border border-white/5 rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDissentSubmit}
                disabled={!dissentText.trim()}
                className="px-3 py-1 text-[10px] font-mono uppercase bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-lg hover:bg-amber-500/25 transition-colors disabled:opacity-40"
              >
                Inject Log
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Comments Panel */}
      <AnimatePresence>
        {showComments && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div 
              className="mt-5 pt-5 border-t border-white/5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/25 block">
                Decrypted Response Thread
              </span>

              {/* Feed Comments */}
              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {post.comments.length === 0 ? (
                  <p className="text-[11px] text-white/20 font-mono italic pl-1">
                    No active responses on this thread.
                  </p>
                ) : (
                  post.comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="bg-white/2 rounded-xl p-3 border border-white/5"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span 
                          onClick={(e) => {
                            if (!comment.isAnonymous && comment.authorName !== "Anonymous Operative" && comment.authorName !== "anonymous_operator") {
                              e.stopPropagation();
                              router.push(`/dashboard/operator/${comment.authorName}`);
                            }
                          }}
                          className={`text-[11px] font-semibold text-white/60 font-mono ${
                            (!comment.isAnonymous && comment.authorName !== "Anonymous Operative" && comment.authorName !== "anonymous_operator") 
                              ? "cursor-pointer hover:text-[#00f0ff] transition-colors" 
                              : ""
                          }`}
                        >
                          {comment.isAnonymous ? "anonymous_operator" : comment.authorName}
                        </span>
                        <span className="text-[9px] text-white/20 font-mono">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-white/50 text-xs font-light pl-0.5 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  ))
                )}
              </div>

              {/* Comment submission form */}
              <form onSubmit={handleCommentSubmit} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="Inject response to this thread..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isTypingComment}
                  className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00f0ff]/30 focus:bg-white/5 transition-all font-light"
                />
                <button 
                  type="submit"
                  disabled={isTypingComment || !newComment.trim()}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-[#00f0ff]/20 bg-[#00f0ff]/10 text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/40 transition-all flex-shrink-0 disabled:opacity-40"
                >
                  {isTypingComment ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </form>
              
              {isTypingComment && (
                <span className="font-mono text-[8px] text-white/30 animate-pulse block tracking-wide pl-1">
                  typing_operator_node... injecting to sharded thread
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>{/* end content wrapper */}
    </GlassCard>
  );
}
