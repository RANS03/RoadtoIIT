"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radio, 
  Search, 
  Plus,
  Filter,
  Activity,
  Database,
  MapPin,
  Compass,
  Sliders,
  Award,
  AlertTriangle,
  Terminal,
  Heart,
  TrendingUp,
  Cpu,
  Bookmark,
  Sparkles,
  Info,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUserProfile, updateUserProfile, UserProfile, getStoredProfiles } from "@/data/users";
import { 
  getStoredFeed, 
  saveStoredFeed, 
  createFeedPost, 
  FeedPost, 
  PostType 
} from "@/data/feed";
import { FeedPostCard } from "@/components/ui/FeedPostCard";
import { CreatePostModal } from "@/components/ui/CreatePostModal";
import { GlassCard } from "@/components/ui/GlassCard";

// Shimmer Loader Component
function FeedShimmer() {
  return (
    <div className="space-y-5">
      {[1, 2].map((i) => (
        <div key={i} className="glass-card rounded-2xl p-6 md:p-7 border border-white/5 space-y-4 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5" />
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-white/10 rounded" />
                <div className="h-2 w-20 bg-white/5 rounded" />
              </div>
            </div>
            <div className="h-5 w-24 bg-white/5 rounded-full" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-3 w-full bg-white/5 rounded" />
            <div className="h-3 w-5/6 bg-white/5 rounded" />
          </div>
          <div className="h-px bg-white/5 w-full pt-2" />
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="h-3 w-8 bg-white/5 rounded" />
              <div className="h-3 w-8 bg-white/5 rounded" />
            </div>
            <div className="h-4 w-16 bg-white/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export interface MissionThread {
  id: string;
  title: string;
  description: string;
  dispatches: { authorName: string; content: string; timestamp: string }[];
}

export const defaultMissionThreads: MissionThread[] = [
  {
    id: "thread-1",
    title: "How to survive EE without burnout",
    description: "Crowdsourced logs, syllabus hacks, and advisor management guides for Electrical Engineering students.",
    dispatches: [
      { authorName: "quant_ghost", content: "Verma's quizzes are mathematically rigorous but predictable. Do not waste time reading the textbook chapters; only practice the appendix sets.", timestamp: "2d ago" },
      { authorName: "neophyte_operator", content: "Get your lab reports signed by the TAs during the first 10 minutes. If you wait until the end, they check calculations and penalize aggressively.", timestamp: "1d ago" }
    ]
  },
  {
    id: "thread-2",
    title: "Actual roadmap to AI systems engineering",
    description: "Detailed roadmap focusing on compiler design, low-level math, and model sharding configurations.",
    dispatches: [
      { authorName: "neophyte_operator", content: "Skip HuggingFace pipelines. Replicate micrograd, then build custom matrix multiplication in C++ using AVX/SIMD vector instructions.", timestamp: "3d ago" }
    ]
  },
  {
    id: "thread-3",
    title: "IIT hostel survival manual",
    description: "Maintenance logs, mess schedules, and wifi credentials for hidden routers.",
    dispatches: [
      { authorName: "bootstrap_kid", content: "The wifi speed is capped at 10Mbps per device. Setup a local proxy or run an open wrt router using the secondary port behind the server room.", timestamp: "5d ago" }
    ]
  }
];

const PENDING_TRANSMISSIONS = [
  {
    type: "tactical-brief" as const,
    title: "EE-201 Network Analysis Cheat Sheet",
    content: "Surviving professor Verma's midterm starts with nodal equations. He recycling the exact problems from the 2018 textbook appendix. I've logged the solutions in pure markdown below.",
    isAnonymous: false,
    campusDetail: "IIT Bombay, Sem 3",
    tags: ["Academics", "Verma", "EE", "CircuitTheory"],
    emotionalSignal: "Extreme panic over sudden mid-semester grade cuts.",
    environmentalContext: "EE Labs, Sem 3.",
    systemicCause: "Obsolete course syllabus focusing on hand-calculations of 4-mesh grids.",
    recoveryPattern: "Memorizing Verma's 2018 homework appendix solutions.",
    operatorInsight: "Verma does not check computational elegance, just the numerical nodal matrices. Copy his signs exactly.",
    sqsScore: 88,
    usefulnessRank: "B+",
    verificationLevel: "FIELD CONFIRMED" as const
  },
  {
    type: "survivor-log" as const,
    title: "The Mid-Semester Burnout Wall",
    content: "It's 3 AM. I have a lab due tomorrow and a quiz on Monday, and I have slept 4 hours total since Tuesday. I spent 4 hours trying to fix a compiler error that ended up being a missing semi-colon. The physical exhaustion is real, but the intellectual numbness is what scares me most.",
    isAnonymous: true,
    campusDetail: "Hostel 3, 3:12 AM",
    tags: ["Burnout", "MentalHealth", "Exhaustion"],
    emotionalSignal: "Deep fatigue, feeling of isolation and cognitive block.",
    environmentalContext: "Hostel 3, mid-semester week.",
    systemicCause: "Double quiz weeks stacked on top of project submissions with zero buffer days.",
    recoveryPattern: "Closing the IDE, requesting a 1-day late penalty, and sleeping for 9 hours straight.",
    operatorInsight: "A late penalty of 10% is better than a broken brain. Take the hit, sleep, and reset.",
    sqsScore: 82,
    usefulnessRank: "B+",
    verificationLevel: "VERIFIED SIGNAL" as const
  },
  {
    type: "placement-signal" as const,
    title: "Boutique HFT Coding Screening Details",
    content: "Just finished the online assessment for AlphaGrip HFT. They gave 3 questions in 90 minutes. Q1: standard DP grid, Q2: memory-efficient queue buffer, Q3: low-level cache line alignment check in C++. If you don't use vectorization or pointer arithmetic in Q3, you fail the test automatically.",
    isAnonymous: false,
    campusDetail: "HFT Screening Portal",
    tags: ["Placements", "AlphaGrip", "Quant", "Cpp"],
    emotionalSignal: "High stress during time-locked technical screens.",
    environmentalContext: "Online assessment, placement phase.",
    systemicCause: "Latency-sensitive firms filtering out any candidates without deep computer architecture and memory hierarchy mastery.",
    recoveryPattern: "Writing raw SIMD intrinsic instructions instead of standard for-loops.",
    operatorInsight: "Review cache-line bouncing, false sharing, and compiler loop unrolling before technical tests.",
    sqsScore: 94,
    usefulnessRank: "A",
    verificationLevel: "MULTI-OPERATOR VERIFIED" as const
  },
  {
    type: "professor-intel" as const,
    title: "Surviving Dr. Ramesh's PG Research lab",
    content: "Dr. Ramesh is notorious for rejecting first-draft manuscripts. However, he is lazy about reviews. If you annotate 30 references in detail for him, he will approve your project abstract in 5 minutes.",
    isAnonymous: false,
    campusDetail: "Physics Department Wing",
    tags: ["ProfessorRamesh", "Academics", "PhysicsLab"],
    emotionalSignal: "Frustrated by constant rewrite requests and supervisor delays.",
    environmentalContext: "PG Research Lab, Sem 6.",
    systemicCause: "Heavy faculty workload leading to superficial review of undergrad abstracts.",
    recoveryPattern: "Generating extensive bibliography files on Connected Papers before sending drafts.",
    operatorInsight: "Overwhelm him with a detailed LaTeX bibliography. He will assume the paper is high-quality and sign off.",
    sqsScore: 85,
    usefulnessRank: "B+",
    verificationLevel: "VERIFIED SIGNAL" as const
  }
];

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Phase 6 Expansion States
  const [highSignalOnly, setHighSignalOnly] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; title: string; msg: string }[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [isDecryptingMore, setIsDecryptingMore] = useState(false);
  const [missionThreads, setMissionThreads] = useState<MissionThread[]>([]);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [threadDispatchText, setThreadDispatchText] = useState("");

  // Personalization settings edit states
  const [showPersConsole, setShowPersConsole] = useState(false);
  const [persBranch, setPersBranch] = useState("");
  const [persPathway, setPersPathway] = useState("");
  const [persYear, setPersYear] = useState("");
  const [persInterestsText, setPersInterestsText] = useState("");

  // Simulated low-frequency active network layer ticks
  const [tickerLogs, setTickerLogs] = useState<{ id: string; msg: string; time: string }[]>([]);
  const [activeOperators, setActiveOperators] = useState(14);
  const [lastActivityText, setLastActivityText] = useState("quant_ghost active 4m ago");

  const loadProfileAndFeed = () => {
    if (user?.email) {
      const uProfile = getCurrentUserProfile(user.email);
      setProfile(uProfile);
      setPersBranch(uProfile.branch);
      setPersPathway(uProfile.missionType);
      setPersYear(uProfile.yearSemester);
      setPersInterestsText((uProfile.researchInterests || []).join(", "));
    }
    const stored = getStoredFeed();
    setPosts(stored);
    setIsLoading(false);

    // Load collaborative threads
    const storedThreads = localStorage.getItem("roadtoiit_mission_threads");
    if (storedThreads) {
      setMissionThreads(JSON.parse(storedThreads));
    } else {
      localStorage.setItem("roadtoiit_mission_threads", JSON.stringify(defaultMissionThreads));
      setMissionThreads(defaultMissionThreads);
    }
  };

  useEffect(() => {
    loadProfileAndFeed();
    
    // Simulate minor live activity ticks
    const activityTimer = setInterval(() => {
      setActiveOperators(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const nextVal = prev + delta;
        return nextVal >= 8 && nextVal <= 18 ? nextVal : prev;
      });

      const activities = [
        "quant_ghost updated backtester logs",
        "deep_lab submitted LaTeX dispatch",
        "neophyte_operator compiled tensor engine",
        "bootstrap_kid updated pathway targets",
        "anonymous_operator sharded build log"
      ];
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setLastActivityText(`${randomActivity} ${Math.floor(Math.random() * 8) + 1}m ago`);
      
      // Update network logs
      setTickerLogs(prev => {
        const newTick = {
          id: `post-${Date.now()}`,
          msg: randomActivity.toUpperCase(),
          time: "Just now"
        };
        return [newTick, ...prev.slice(0, 4)];
      });
    }, 15000);

    // Simulated real-time sync loop
    let pendingIdx = 0;
    const realTimeTimer = setInterval(() => {
      if (pendingIdx >= PENDING_TRANSMISSIONS.length) {
        pendingIdx = 0;
      }
      
      const nextPostData = PENDING_TRANSMISSIONS[pendingIdx];
      pendingIdx++;

      // Resolve author
      const profilesList = getStoredProfiles();
      const authorObj = nextPostData.isAnonymous 
        ? null 
        : (profilesList.find(p => p.name === "quant_ghost" || p.name === "deep_lab" || p.name === "bootstrap_kid") || null);

      const freshPost = {
        ...nextPostData,
        id: `post-rt-${Date.now()}`,
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
        signalStrength: 60,
        isVerified: nextPostData.verificationLevel ? true : false,
        tacticalRelevance: 8.0,
        verifiers: [],
        author: authorObj
      };

      setPosts(prev => {
        const nextList = [freshPost, ...prev];
        saveStoredFeed(nextList);
        return nextList;
      });

      setTickerLogs(prev => {
        const newTick = {
          id: freshPost.id,
          msg: `DECRYPTED: ${nextPostData.title.toUpperCase()}`,
          time: "Just now"
        };
        return [newTick, ...prev.slice(0, 4)];
      });

      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `DECRYPTED TRANSMISSION INCOMING`,
          msg: `New signal from ${nextPostData.isAnonymous ? "anonymous_operator" : authorObj?.name || "peer_operator"} on channel #${nextPostData.type.toUpperCase()}`,
        },
        ...prev
      ]);
    }, 20000);

    return () => {
      clearInterval(activityTimer);
      clearInterval(realTimeTimer);
    };
  }, [user]);

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(0, -1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Feed validation handlers (Endorsement)
  const handleLike = (postId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const liked = !post.likedByUser;
        const currentOperator = profile?.name || "peer_operator";
        return {
          ...post,
          likedByUser: liked,
          signalStrength: liked ? Math.min(100, post.signalStrength + 8) : Math.max(0, post.signalStrength - 8),
          verifiers: liked 
            ? Array.from(new Set([...post.verifiers, currentOperator]))
            : post.verifiers.filter(v => v !== currentOperator)
        };
      }
      return post;
    });
    setPosts(updated);
    saveStoredFeed(updated);
  };

  // Archive Signal handlers
  const handleSave = (postId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const saved = !post.savedByUser;
        return {
          ...post,
          savedByUser: saved,
          saves: saved ? post.saves + 1 : post.saves - 1
        };
      }
      return post;
    });
    setPosts(updated);
    saveStoredFeed(updated);
  };

  const handleReact = (postId: string, emoji: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: post.reactions.map(r => {
            if (r.emoji === emoji) {
              const active = !r.reactedByUser;
              return {
                ...r,
                reactedByUser: active,
                count: active ? r.count + 1 : r.count - 1
              };
            }
            return r;
          })
        };
      }
      return post;
    });
    setPosts(updated);
    saveStoredFeed(updated);
  };

  const handleAddComment = (postId: string, content: string) => {
    const updated = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          authorName: profile?.name || "anonymous_operator",
          isAnonymous: false,
          content: content,
          timestamp: "Just now"
        };
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    setPosts(updated);
    saveStoredFeed(updated);
  };

  const handleVote = (postId: string, optionId: string) => {
    const updated = posts.map(post => {
      if (post.id === postId && post.poll) {
        return {
          ...post,
          poll: {
            ...post.poll,
            votedOptionId: optionId,
            options: post.poll.options.map(opt => {
              if (opt.id === optionId) {
                return { ...opt, votes: opt.votes + 1 };
              }
              return opt;
            })
          }
        };
      }
      return post;
    });
    setPosts(updated);
    saveStoredFeed(updated);
  };

  const handleLoadMore = () => {
    setIsDecryptingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsDecryptingMore(false);
    }, 1200);
  };

  const handleAppendDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadDispatchText.trim() || !selectedThreadId || !profile) return;

    const newDispatch = {
      authorName: profile.name,
      content: threadDispatchText.trim(),
      timestamp: "Just now"
    };

    const updatedThreads = missionThreads.map(thread => {
      if (thread.id === selectedThreadId) {
        return {
          ...thread,
          dispatches: [...thread.dispatches, newDispatch]
        };
      }
      return thread;
      });

    setMissionThreads(updatedThreads);
    localStorage.setItem("roadtoiit_mission_threads", JSON.stringify(updatedThreads));
    setThreadDispatchText("");
  };

  // Submit new broadcast signal
  const handleCreatePost = (data: {
    type: PostType;
    content: string;
    isAnonymous: boolean;
    tags: string[];
    title?: string;
    buildJournalData?: {
      project: string;
      checklist: { task: string; status: "completed" | "in-progress" | "pending" }[];
    };
    emotionalSignal?: string;
    environmentalContext?: string;
    systemicCause?: string;
    recoveryPattern?: string;
    operatorInsight?: string;
    imageAttachment?: string;
  }) => {
    const freshPost = createFeedPost({
      type: data.type,
      content: data.content,
      isAnonymous: data.isAnonymous,
      author: data.isAnonymous ? null : profile,
      tags: data.tags,
      title: data.title,
      buildJournalData: data.buildJournalData,
      emotionalSignal: data.emotionalSignal,
      environmentalContext: data.environmentalContext,
      systemicCause: data.systemicCause,
      recoveryPattern: data.recoveryPattern,
      operatorInsight: data.operatorInsight,
      imageAttachment: data.imageAttachment
    });

    setPosts([freshPost, ...posts]);
    setIsModalOpen(false);

    // Update locally stored operator contribution counters
    if (!data.isAnonymous && user?.email && profile) {
      const updatedProfile = {
        ...profile,
        logsShared: data.type === 'survivor-log' ? profile.logsShared + 1 : profile.logsShared,
        intelAdded: data.type !== 'survivor-log' ? profile.intelAdded + 1 : profile.intelAdded,
        intelligenceScore: profile.intelligenceScore + 25,
      };
      setProfile(updatedProfile);
      
      const profilesStr = localStorage.getItem("roadtoiit_user_profiles");
      if (profilesStr) {
        const profilesList = JSON.parse(profilesStr);
        const nextList = profilesList.map((p: any) => p.id === profile.id ? updatedProfile : p);
        localStorage.setItem("roadtoiit_user_profiles", JSON.stringify(nextList));
      }
    }
  };

  // Personalization updates save handler
  const handleSavePersonalization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !profile) return;

    const interestsArr = persInterestsText
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const updated = updateUserProfile(user.email, {
      branch: persBranch.trim(),
      missionType: persPathway,
      yearSemester: persYear.trim(),
      researchInterests: interestsArr
    });

    setProfile(updated);
    setShowPersConsole(false);
    loadProfileAndFeed(); // Reload
  };

  // Filter signal types matching tabs
  const getFilterType = (filter: string): PostType | null => {
    switch (filter) {
      case "Survivor Logs": return "survivor-log";
      case "Tactical Briefs": return "tactical-brief";
      case "Missions": return "mission-update";
      case "Prof Intel": return "professor-intel";
      case "Hostel Signals": return "hostel-signal";
      default: return null;
    }
  };

  // Personalized dynamically-ranked feed list
  const getPersonalizedPosts = () => {
    let list = [...posts];

    // High Signal Only algorithm filter
    if (highSignalOnly) {
      list = list.filter(post => post.sqsScore >= 80);
    }

    // Search query match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(post => {
        const contentMatch = post.content.toLowerCase().includes(query);
        const titleMatch = post.title?.toLowerCase().includes(query) || false;
        const tagMatch = post.tags.some(t => t.toLowerCase().includes(query));
        const authorMatch = !post.isAnonymous && post.author?.name.toLowerCase().includes(query);
        return contentMatch || titleMatch || tagMatch || authorMatch;
      });
    }

    // Filter tab match
    const targetType = getFilterType(activeFilter);
    if (targetType) {
      list = list.filter(post => post.type === targetType);
    }

    // Dynamic prioritization sorting based on operator profiles
    if (profile) {
      const userInterests = profile.researchInterests || [];
      const userGoal = profile.missionType;

      list.sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;

        // Prioritize pathway match
        const pathwayCode = userGoal.split(" ")[0].toUpperCase();
        if (a.tags.some(t => t.toUpperCase().includes(pathwayCode))) scoreA += 15;
        if (b.tags.some(t => t.toUpperCase().includes(pathwayCode))) scoreB += 15;

        // Prioritize interest tag match
        userInterests.forEach(interest => {
          if (a.tags.some(t => t.toLowerCase().includes(interest.toLowerCase()))) scoreA += 5;
          if (b.tags.some(t => t.toLowerCase().includes(interest.toLowerCase()))) scoreB += 5;
        });

        // Pinned featured posts get boost
        if (a.featured) scoreA += 30;
        if (b.featured) scoreB += 30;

        return scoreB - scoreA;
      });
    }

    return list;
  };

  const prioritizedPosts = getPersonalizedPosts();

  // Extract featured signal
  const featuredPost = searchQuery.trim() === "" && activeFilter === "All"
    ? prioritizedPosts.find(p => p.featured)
    : null;

  // Filter out featured post so it does not render twice
  const feedPostsList = featuredPost
    ? prioritizedPosts.filter(p => p.id !== featuredPost.id)
    : prioritizedPosts;

  const filterTabs = ["All", "Survivor Logs", "Tactical Briefs", "Missions", "Prof Intel", "Hostel Signals"];

  // Custom strategic alert directives based on profile goal and year
  const getStrategicDirectives = () => {
    if (!profile) return null;
    const directives: { warning: string; action: string }[] = [];

    // Path alerts
    if (profile.missionType === "AI Systems Path") {
      directives.push({
        warning: "CS-402 labs check raw CUDA grid memory layouts.",
        action: "Focus on Karpathy's llm.c kernels; skip HuggingFace API overlays."
      });
    } else if (profile.missionType === "Quant Explorer") {
      directives.push({
        warning: "Quant math screenings ignore retail technical indicators.",
        action: "Prioritize Stochastic Calculus and Timothy Crack puzzles."
      });
    } else if (profile.missionType === "Research Operative") {
      directives.push({
        warning: "Predatory conferences pad CVs but trigger top lab rejections.",
        action: "Only submit manuscripts to peer-reviewed IEEE/ACM workshops under active PIs."
      });
    }

    // Year alerts
    const yearNum = profile.yearSemester.toLowerCase();
    if (yearNum.includes("year 1") || yearNum.includes("sem 1") || yearNum.includes("sem 2")) {
      directives.push({
        warning: "Diminishing returns on projects if GPA drops below 8.5 threshold.",
        action: "Maintain academic grades to avoid CA assessment filters."
      });
    } else if (yearNum.includes("year 3") || yearNum.includes("year 4")) {
      directives.push({
        warning: "Placement cell statistic brochures are inflated by double-offers.",
        action: "Begin direct email outreach to tech leads 6 months in advance."
      });
    }

    return directives.length > 0 ? directives : null;
  };

  const activeDirectives = getStrategicDirectives();

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <Radio className="w-4 h-4 text-[#00f0ff] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              Antigravity OS • Live Node Connection
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Intelligence Feed
          </h1>
          <p className="text-white/40 text-sm font-light max-w-xl leading-relaxed">
            Decrypted signals, build logs, and tactical dispatches.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-[11px] uppercase tracking-widest text-[#00f0ff] border border-[#00f0ff]/30 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 hover:border-[#00f0ff]/60 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Broadcast Signal
          </button>
        </motion.div>
      </div>




      {/* Main Grid: Feed + Sidebar widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left/Middle Column (Feed timeline) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls bar: search and filters */}
          <div className="flex flex-col gap-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input
                type="text"
                placeholder="Query signals by keyword, tag, or operator codename..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/2 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-white/25 outline-none focus:border-white/10 focus:bg-white/5 transition-all font-light"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-white/35 hover:text-white"
                >
                  [CLEAR]
                </button>
              )}
            </div>

            {/* Filter Pills & High Signal Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-2">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none flex-wrap">
                <Filter className="w-3.5 h-3.5 text-white/20 mr-1 flex-shrink-0" />
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`text-[10px] font-mono uppercase tracking-widest px-3.5 py-1.5 rounded-full border transition-all duration-300 flex-shrink-0 ${
                      activeFilter === tab
                        ? "border-[#00f0ff]/60 bg-[#00f0ff]/15 text-[#00f0ff]"
                        : "border-white/5 text-white/35 hover:border-white/15 hover:text-white/60"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              
              {/* High Signal Only Switch */}
              <div className="flex items-center gap-2.5 self-end sm:self-auto select-none bg-white/[0.02] border border-white/5 px-3 py-1 rounded-xl">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">
                  High Signal Only (SQS &ge; 80)
                </span>
                <button
                  type="button"
                  onClick={() => setHighSignalOnly(!highSignalOnly)}
                  className={`relative w-8 h-4.5 rounded-full transition-colors flex items-center ${highSignalOnly ? "bg-[#00f0ff]/20 border border-[#00f0ff]/40" : "bg-white/5 border border-white/10"}`}
                >
                  <div 
                    className={`absolute w-2.5 h-2.5 rounded-full transition-all duration-300 ${highSignalOnly ? "bg-[#00f0ff] left-[16px]" : "bg-white/30 left-[3px]"}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Posts Feed Timeline */}
          <div className="space-y-6">
            {isLoading ? (
              <FeedShimmer />
            ) : (
              <AnimatePresence mode="popLayout">
                {/* 1. FEATURED SIGNAL PORTAL AT TOP */}
                {featuredPost && (
                  <motion.div
                    key="featured-wrapper"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00f0ff] block mb-3 flex items-center gap-1.5 pl-1">
                      <Radio className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" /> Pinned Core Transmission
                    </span>
                    <FeedPostCard
                      post={featuredPost}
                      onLike={handleLike}
                      onSave={handleSave}
                      onReact={handleReact}
                      onAddComment={handleAddComment}
                      onVote={handleVote}
                    />
                  </motion.div>
                )}

                {/* 2. REGULAR FEED TIMELINE */}
                {feedPostsList.length === 0 && !featuredPost ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="glass-card rounded-2xl p-10 border border-white/5 text-center text-white/30 font-light text-sm"
                  >
                    No decrypted signals matching query. Broadcast a new signal to update the grid.
                  </motion.div>
                ) : (
                  feedPostsList.slice(0, visibleCount).map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4 }}
                    >
                      <FeedPostCard
                        post={post}
                        onLike={handleLike}
                        onSave={handleSave}
                        onReact={handleReact}
                        onAddComment={handleAddComment}
                        onVote={handleVote}
                      />
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}

            {/* Decrypt chronological packets scroll button */}
            {feedPostsList.length > visibleCount && (
              <div className="mt-8 flex justify-center">
                {isDecryptingMore ? (
                  <div className="flex flex-col items-center gap-2 font-mono text-[9px] text-[#00f0ff] animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin text-[#00f0ff]" />
                    <span>DECRYPTING CHRONOLOGICAL STREAM PACKETS...</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="px-6 py-2.5 rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-[9px] uppercase tracking-widest transition-all duration-300 select-none"
                  >
                    [Decrypt More chronological Packets]
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Widget panels & Personalization Console) */}
        <div className="space-y-6">
          {/* A. PERSONALIZATION CONSOLE WIDGET */}
          <GlassCard className="p-6 border border-white/5 relative overflow-hidden space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00f0ff] block">
                Personalization Engine
              </span>
              <button 
                onClick={() => setShowPersConsole(!showPersConsole)}
                className="text-[9px] font-mono text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
              >
                [{showPersConsole ? "Close Console" : "Configure Engine"}]
              </button>
            </div>

            <p className="text-white/45 text-[11px] font-light leading-relaxed">
              Feed prioritize parameters dynamically calculated according to your dossier focus.
            </p>

            <AnimatePresence>
              {showPersConsole && profile && (
                <motion.form 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  onSubmit={handleSavePersonalization}
                  className="space-y-3.5 border-t border-white/5 pt-3 overflow-hidden"
                >
                  <div>
                    <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block mb-1">Academic Branch</label>
                    <input 
                      type="text" 
                      value={persBranch}
                      onChange={(e) => setPersBranch(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block mb-1">Mission Goal Pathway</label>
                    <select
                      value={persPathway}
                      onChange={(e) => setPersPathway(e.target.value)}
                      className="w-full bg-black/90 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    >
                      {missionOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block mb-1">Year/Semester</label>
                    <input 
                      type="text" 
                      value={persYear}
                      onChange={(e) => setPersYear(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[8px] uppercase tracking-wider text-white/30 block mb-1">Interests (Comma separated)</label>
                    <input 
                      type="text" 
                      value={persInterestsText}
                      onChange={(e) => setPersInterestsText(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-1.5 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-[9px] uppercase tracking-wider hover:bg-[#00f0ff]/20 transition-all"
                  >
                    Sync Variables
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

            {!showPersConsole && profile && (
              <div className="grid grid-cols-2 gap-3 text-[10px] font-mono pt-2 border-t border-white/[0.03]">
                <div className="p-2 rounded bg-white/[0.01] border border-white/[0.02]">
                  <span className="text-white/20 uppercase text-[7px] block">Pathway Goal</span>
                  <span className="text-white/60 truncate block mt-0.5">{profile.missionType.split(" ")[0]}</span>
                </div>
                <div className="p-2 rounded bg-white/[0.01] border border-white/[0.02]">
                  <span className="text-white/20 uppercase text-[7px] block">Branch Spec</span>
                  <span className="text-white/60 truncate block mt-0.5">{profile.branch}</span>
                </div>
              </div>
            )}
          </GlassCard>

          {/* B. ACTIVE NETWORK LAYER (Heartbeat dot & Tickers) */}
          <GlassCard className="p-6 border border-white/5 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8b5cf6] block mb-2">
              Operational Activity Layer
            </span>

            <div className="space-y-3 font-mono text-[11px]">
              {/* Operator Count with Heartbeat Dot */}
              <div className="flex items-center justify-between bg-white/2 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-white/40 uppercase">Active Operators:</span>
                </div>
                <span className="text-white/80 font-bold">{activeOperators} Online</span>
              </div>

              {/* Live Updates Count */}
              <div className="flex items-center justify-between bg-white/2 rounded-xl p-3 border border-white/5">
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-[#00f0ff] animate-pulse" />
                  <span className="text-white/40 uppercase">Activity:</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-semibold truncate max-w-[140px]" title={lastActivityText}>
                  {lastActivityText}
                </span>
              </div>
            </div>

            {/* Recently Decrypted signal ticker */}
            <div className="pt-2">
              <span className="font-mono text-[9px] uppercase tracking-wider text-white/20 block mb-2">
                Live Node Log Console
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {tickerLogs.length === 0 ? (
                  <div className="text-white/20 font-mono text-[9px] italic p-2 bg-white/2 rounded border border-white/5">Waiting for traffic data...</div>
                ) : (
                  tickerLogs.map((tick, idx) => (
                    <div 
                      key={idx}
                      onClick={() => tick.id.startsWith("post-") && router.push(`/dashboard`)}
                      className="flex justify-between items-center p-2 rounded bg-black/60 border border-white/5 hover:border-white/10 transition-all cursor-pointer font-mono text-[9px]"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-[#00f0ff]/70 flex-shrink-0">[TICK]</span>
                        <span className="text-white/50 truncate uppercase">{tick.msg}</span>
                      </div>
                      <span className="text-white/20 whitespace-nowrap">{tick.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </GlassCard>

          {/* Active User dossier mini-card */}
          {profile && (
            <GlassCard className="p-6 border border-white/5 hover:border-white/10 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-30 pointer-events-none" />

              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00f0ff] block mb-4">
                Active Operator Profile
              </span>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl border border-[#00f0ff]/30 p-0.5 flex-shrink-0 bg-[#00f0ff]/10">
                  <img 
                    src={profile.avatarUrl} 
                    alt={profile.name} 
                    className="w-full h-full rounded-lg object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white tracking-wide text-base leading-snug">
                    {profile.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-white/30 block tracking-widest mt-0.5">
                    {profile.missionType}
                  </span>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/5 font-mono text-center">
                <div>
                  <span className="text-[10px] text-white/20 uppercase block mb-1">Signals</span>
                  <span className="text-sm font-semibold text-white/70">
                    {posts.filter(p => !p.isAnonymous && p.author && (p.author.id === profile.id || p.author.name === profile.name)).length}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-white/20 uppercase block mb-1">Rep</span>
                  <span className="text-sm font-semibold text-white/70">{profile.intelligenceScore}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/20 uppercase block mb-1">Missions</span>
                  <span className="text-sm font-semibold text-white/70">{(profile.activeMissions || []).length}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="font-mono text-[10px] text-white/25">Intelligence Rating</span>
                <span className="font-mono text-xs font-semibold text-[#00f0ff]">
                  {profile.intelligenceScore} QIS
                </span>
              </div>
            </GlassCard>
          )}

          {/* Collaborative Mission Threads Widget */}
          <GlassCard className="p-6 border border-white/5 space-y-4 font-mono text-[10px]">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-widest text-[#00f0ff] font-semibold block">
                Mission Threads
              </span>
              <span className="text-[8px] bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20 px-1.5 py-0.5 rounded uppercase">
                Collaborative
              </span>
            </div>
            <p className="text-white/45 text-[11px] font-sans font-light leading-relaxed">
              Evolving operational logs containing crowdsourced engineering and survival instructions.
            </p>
            <div className="space-y-3 pt-2">
              {missionThreads.map(thread => (
                <div 
                  key={thread.id} 
                  onClick={() => setSelectedThreadId(thread.id)}
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#00f0ff]/20 hover:bg-white/[0.03] transition-all cursor-pointer space-y-1 text-left"
                >
                  <div className="flex justify-between items-center text-[11px] font-semibold text-white/80 font-heading">
                    <span>{thread.title}</span>
                    <span className="text-[8px] font-mono text-[#00f0ff]/80">[{thread.dispatches.length}]</span>
                  </div>
                  <p className="text-[9px] text-white/35 font-sans font-light line-clamp-2 leading-relaxed">{thread.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Guidelines/Philosophy widget */}
          <GlassCard className="p-6 border border-white/5 text-xs font-light text-white/30 space-y-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-2">
              Grid Protocols
            </h4>
            <p className="leading-relaxed">
              This space functions as the Truth Layer. Share verified operational insight, survival directives, and unvarnished realities.
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Broadcast Creation Modal */}
      {profile && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreatePost}
          currentUserAlias={profile.name}
        />
      )}

      {/* Active Mission Thread overlay dialog */}
      <AnimatePresence>
        {selectedThreadId && (() => {
          const activeThread = missionThreads.find(t => t.id === selectedThreadId);
          if (!activeThread) return null;
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedThreadId(null)}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg relative z-10 my-8"
              >
                <GlassCard className="p-6 md:p-8 border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)] overflow-hidden max-h-[85vh] flex flex-col">
                  {/* Decorative glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00f0ff]" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-left">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00f0ff]">Active Mission Thread</span>
                      <h2 className="font-heading text-lg font-bold text-white mt-1 leading-snug">{activeThread.title}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedThreadId(null)}
                      className="text-white/40 hover:text-white/80 font-mono text-xs uppercase"
                    >
                      [Close]
                    </button>
                  </div>
                  
                  <p className="text-white/50 text-xs font-light font-sans mb-5 leading-relaxed bg-white/[0.01] border border-white/5 p-3 rounded-lg text-left">
                    {activeThread.description}
                  </p>
                  
                  {/* Dispatches Timeline */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-1 mb-6 max-h-60 scrollbar-thin text-left">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/30 block mb-1">OPERATIONAL DISPATCH HISTORY</span>
                    {activeThread.dispatches.length === 0 ? (
                      <p className="text-[10px] font-mono italic text-white/20">No dispatches logged yet.</p>
                    ) : (
                      activeThread.dispatches.map((disp, idx) => (
                        <div key={idx} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                            <span className="text-[#00f0ff] font-semibold">{disp.authorName}</span>
                            <span>{disp.timestamp}</span>
                          </div>
                          <p className="text-xs text-white/70 font-light font-sans leading-relaxed">{disp.content}</p>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Submit Dispatch form */}
                  <form onSubmit={handleAppendDispatch} className="space-y-3 pt-4 border-t border-white/5 text-left">
                    <label className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">Inject Dispatch</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        placeholder="Write operational guidelines or verified guidelines..."
                        value={threadDispatchText}
                        onChange={(e) => setThreadDispatchText(e.target.value)}
                        required
                        className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-xs text-white placeholder-white/20 outline-none focus:border-[#00f0ff]/30 focus:bg-white/5 transition-all font-light"
                      />
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] font-mono text-[9px] uppercase tracking-widest rounded-xl hover:bg-[#00f0ff]/20 transition-all flex-shrink-0"
                      >
                        Inject
                      </button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Notifications overlay container */}
      <div className="fixed bottom-5 right-5 z-50 space-y-3 max-w-sm pointer-events-none select-none">
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ x: 200, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 200, opacity: 0 }}
              className="p-4 rounded-xl border border-[#00f0ff]/30 bg-black/90 text-white shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col gap-1 pointer-events-auto text-left"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#00f0ff] font-bold">{notif.title}</span>
              </div>
              <p className="text-white/80 text-xs font-light mt-1 font-sans leading-snug">{notif.msg}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

const missionOptions = [
  "AI Systems Path",
  "Research Operative",
  "Quant Explorer",
  "Startup Track",
  "Core Engineering",
  "Academic Pathway"
];
