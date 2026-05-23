"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShieldAlert, 
  Cpu, 
  BookOpen, 
  Home,
  Lock,
  Unlock,
  Radio,
  Compass,
  TrendingUp,
  Award,
  Terminal,
  Plus
} from "lucide-react";
import { PostType } from "@/data/feed";
import { GlassCard } from "./GlassCard";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
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
  }) => void;
  currentUserAlias: string;
}

export function CreatePostModal({
  isOpen,
  onClose,
  onSubmit,
  currentUserAlias
}: CreatePostModalProps) {
  const [type, setType] = useState<PostType>("survivor-log");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Phase 6 Structured Intelligence States
  const [emotionalSignal, setEmotionalSignal] = useState("");
  const [environmentalContext, setEnvironmentalContext] = useState("");
  const [systemicCause, setSystemicCause] = useState("");
  const [recoveryPattern, setRecoveryPattern] = useState("");
  const [operatorInsight, setOperatorInsight] = useState("");
  const [imageAttachment, setImageAttachment] = useState<string | undefined>(undefined);

  // Build Journal States
  const [projectName, setProjectName] = useState("");
  const [checklistTasks, setChecklistTasks] = useState<{ task: string; status: "completed" | "in-progress" | "pending" }[]>([]);
  const [taskNameInput, setTaskNameInput] = useState("");
  const [taskStatusInput, setTaskStatusInput] = useState<"completed" | "in-progress" | "pending">("pending");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Attachment must be an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 450;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setImageAttachment(dataUrl);
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const postTypes: { value: PostType; label: string; icon: any; color: string; placeholder: string }[] = [
    { 
      value: "survivor-log", 
      label: "Survivor Log", 
      icon: ShieldAlert, 
      color: "#8b5cf6",
      placeholder: "Share an emotional reality, struggle, or burnout experience honestly..."
    },
    { 
      value: "tactical-brief", 
      label: "Tactical Brief", 
      icon: Compass, 
      color: "#00f0ff",
      placeholder: "Document course outlines, exam setups, or branch-specific guidance..."
    },
    { 
      value: "mission-update", 
      label: "Mission Update", 
      icon: Cpu, 
      color: "#10b981",
      placeholder: "Log your roadmap progress, milestones, or study accomplishments..."
    },
    { 
      value: "professor-intel", 
      label: "Prof Intel", 
      icon: BookOpen, 
      color: "#f59e0b",
      placeholder: "Provide feedback on coursework, lab grading, or professor expectations..."
    },
    { 
      value: "placement-signal", 
      label: "Placement Intel", 
      icon: TrendingUp, 
      color: "#38bdf8",
      placeholder: "Post interview loops, CTC stats, or off-campus resume tips..."
    },
    { 
      value: "build-journal", 
      label: "Build Journal", 
      icon: Terminal, 
      color: "#6366f1",
      placeholder: "Document what you are constructing, architecture decisions, and bottlenecks..."
    },
    { 
      value: "research-dispatch", 
      label: "Research Dispatch", 
      icon: Award, 
      color: "#f43f5e",
      placeholder: "Announce fellowships, literature reviews, or lab openings..."
    },
    { 
      value: "hostel-signal", 
      label: "Hostel Signal", 
      icon: Home, 
      color: "#ec4899",
      placeholder: "Share hostel hacks, common room updates, or mess reports..."
    },
  ];

  const currentTypeConfig = postTypes.find(t => t.value === type) || postTypes[0];

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const cleaned = tagInput.trim().replace(/#/g, "");
      if (cleaned && !tags.includes(cleaned)) {
        setTags([...tags, cleaned]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleAddTask = () => {
    if (!taskNameInput.trim()) return;
    setChecklistTasks([
      ...checklistTasks,
      { task: taskNameInput.trim(), status: taskStatusInput }
    ]);
    setTaskNameInput("");
    setTaskStatusInput("pending");
  };

  const handleRemoveTask = (index: number) => {
    setChecklistTasks(checklistTasks.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const buildJournalData = type === "build-journal" && projectName.trim()
      ? {
          project: projectName.trim(),
          checklist: checklistTasks.length > 0 ? checklistTasks : [{ task: "Project initiated", status: "completed" as const }]
        }
      : undefined;

    onSubmit({
      type,
      title: title.trim() || undefined,
      content: content.trim(),
      isAnonymous,
      tags,
      buildJournalData,
      emotionalSignal: emotionalSignal.trim() || undefined,
      environmentalContext: environmentalContext.trim() || undefined,
      systemicCause: systemicCause.trim() || undefined,
      recoveryPattern: recoveryPattern.trim() || undefined,
      operatorInsight: operatorInsight.trim() || undefined,
      imageAttachment: imageAttachment
    });

    // Reset form
    setTitle("");
    setContent("");
    setTags([]);
    setTagInput("");
    setProjectName("");
    setChecklistTasks([]);
    setTaskNameInput("");
    setIsAnonymous(true);
    setType("survivor-log");
    setEmotionalSignal("");
    setEnvironmentalContext("");
    setSystemicCause("");
    setRecoveryPattern("");
    setOperatorInsight("");
    setImageAttachment(undefined);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal content body */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl relative z-10 my-8"
          >
            <GlassCard className="p-6 md:p-8 border border-white/10 shadow-[0_0_50px_rgba(0,240,255,0.05)] overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Dynamic top glowing scanner bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-[2px] transition-colors duration-500"
                style={{ backgroundColor: currentTypeConfig.color }}
              />

              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-5 right-5 text-white/40 hover:text-white/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <Radio className="w-4 h-4 animate-pulse" style={{ color: currentTypeConfig.color }} />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/30">
                  Broadcast Node Panel
                </span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-white mb-6">
                Broadcast Intelligence
              </h2>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                {/* 1. Category Selection Grid */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 block mb-2.5">
                    Select Broadcast Sub-Channel
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {postTypes.map((t) => {
                      const Icon = t.icon;
                      const isSelected = type === t.value;
                      return (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setType(t.value)}
                          className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-300 ${
                            isSelected 
                              ? "bg-white/5 text-white" 
                              : "bg-transparent border-white/5 text-white/30 hover:border-white/10 hover:text-white/50"
                          }`}
                          style={{ borderColor: isSelected ? `${t.color}50` : undefined }}
                        >
                          <Icon className="w-4 h-4 mb-1.5" style={{ color: isSelected ? t.color : undefined }} />
                          <span className="text-[9px] font-mono uppercase tracking-wide">
                            {t.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Signal Title */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 block mb-1.5">
                    Signal Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CS-402 Grading Reality, or HFT C++ Optimization Logs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-white/10"
                  />
                </div>

                {/* 3. Build Journal checklist addition (only for build-journal type) */}
                {type === "build-journal" && (
                  <div className="p-4 rounded-xl border border-[#6366f1]/20 bg-[#6366f1]/5 space-y-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#6366f1] block">Build Journal Specifications</span>
                    
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1">Project Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. Distributed Database Engine, Redis Clone"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-[#6366f1]/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-mono text-[9px] uppercase tracking-wider text-white/40 block">Checklist Items</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Task name (e.g. TCP Socket setup)"
                          value={taskNameInput}
                          onChange={(e) => setTaskNameInput(e.target.value)}
                          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#6366f1]/50"
                        />
                        <select
                          value={taskStatusInput}
                          onChange={(e) => setTaskStatusInput(e.target.value as any)}
                          className="bg-black/40 border border-white/10 rounded-lg px-2 text-xs text-white/70 outline-none font-mono"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In-Progress</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          type="button"
                          onClick={handleAddTask}
                          className="px-3 rounded-lg bg-[#6366f1]/20 border border-[#6366f1]/40 text-[#6366f1] hover:bg-[#6366f1]/30 transition-all flex items-center justify-center"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Display added checklist items */}
                      {checklistTasks.length > 0 && (
                        <div className="space-y-1.5 pt-2 font-mono text-[10px]">
                          {checklistTasks.map((t, idx) => (
                            <div key={idx} className="flex items-center justify-between p-2 rounded bg-black/20 border border-white/[0.03]">
                              <div className="flex items-center gap-2">
                                <span className={`text-[8px] px-1 rounded ${
                                  t.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                                  t.status === 'in-progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30 animate-pulse' :
                                  'bg-white/5 text-white/40 border border-white/10'
                                }`}>
                                  {t.status}
                                </span>
                                <span className="text-white/75">{t.task}</span>
                              </div>
                              <button 
                                type="button" 
                                onClick={() => handleRemoveTask(idx)}
                                className="text-red-400/60 hover:text-red-400"
                              >
                                remove
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. Post Content Input */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 block mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    rows={3}
                    placeholder={currentTypeConfig.placeholder}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    className="w-full bg-white/2 border border-white/5 rounded-xl p-4 text-sm text-white placeholder-white/20 outline-none focus:border-white/10 focus:bg-white/5 transition-all font-light leading-relaxed resize-none"
                  />
                </div>

                {/* UGC Image Attachment and Markdown Notice */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-wider text-white/40 block mb-1.5 font-semibold">
                      Attach Image Intel (JPEG/PNG)
                    </label>
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-xs text-white/50 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-mono file:bg-white/10 file:text-white hover:file:bg-white/25"
                    />
                    {imageAttachment && (
                      <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1.5">
                        <span>Image loaded & compressed (+25 SQS weight)</span>
                        <button type="button" onClick={() => setImageAttachment(undefined)} className="text-red-400 underline">Remove</button>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex items-start gap-2">
                    <Radio className="w-4 h-4 text-[#00f0ff] mt-0.5 flex-shrink-0 animate-pulse" />
                    <div className="font-mono text-[9px] text-white/40 leading-relaxed">
                      <span className="text-[#00f0ff] block font-semibold">MARKDOWN INJECTOR SUPPORTED</span>
                      Use `**bold**`, `*italics*`, or `` `code` `` to format your operational logs.
                    </div>
                  </div>
                </div>

                {/* Phase 6 Structured Intelligence Sections */}
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] space-y-4">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 block font-semibold">
                    Structured Intelligence Dossier Sections (Optional but adds SQS points)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-purple-400/80 block mb-1">A. Emotional Signal</label>
                      <input 
                        type="text" 
                        placeholder="What happened emotionally?"
                        value={emotionalSignal}
                        onChange={(e) => setEmotionalSignal(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-purple-500/50 placeholder-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-blue-400/80 block mb-1">B. Environmental Context</label>
                      <input 
                        type="text" 
                        placeholder="Semester / Hostel / Branch Spec..."
                        value={environmentalContext}
                        onChange={(e) => setEnvironmentalContext(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-blue-500/50 placeholder-white/10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-red-400/80 block mb-1">C. Systemic Cause</label>
                      <input 
                        type="text" 
                        placeholder="What created this issue?"
                        value={systemicCause}
                        onChange={(e) => setSystemicCause(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-red-500/50 placeholder-white/10"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[9px] uppercase tracking-wider text-emerald-400/80 block mb-1">D. Recovery Pattern</label>
                      <input 
                        type="text" 
                        placeholder="What helped recover or navigate it?"
                        value={recoveryPattern}
                        onChange={(e) => setRecoveryPattern(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-emerald-500/50 placeholder-white/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-[9px] uppercase tracking-wider text-amber-400/80 block mb-1">E. Operator Insight</label>
                    <textarea 
                      rows={2}
                      placeholder="Tactical advice to juniors..."
                      value={operatorInsight}
                      onChange={(e) => setOperatorInsight(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white outline-none focus:border-amber-500/50 placeholder-white/10 resize-none font-light"
                    />
                  </div>
                </div>

                {/* 5. Tags input */}
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-white/30 block mb-1.5">
                    Classification Tags (Enter / comma to add)
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-white/2 border border-white/5 rounded-xl min-h-[42px] items-center">
                    {tags.map((tag, idx) => (
                      <span 
                        key={tag}
                        className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/55"
                      >
                        #{tag}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(idx)} 
                          className="hover:text-red-400 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input 
                      type="text"
                      placeholder={tags.length === 0 ? "e.g., Burnout, Placements" : ""}
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      className="flex-1 bg-transparent text-xs text-white placeholder-white/20 outline-none min-w-[120px] font-light"
                    />
                  </div>
                </div>

                {/* 6. Anonymity Toggle */}
                <div 
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className="bg-white/2 border border-white/5 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 hover:border-white/10 transition-all select-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                      {isAnonymous ? (
                        <Lock className="w-4 h-4 text-[#8b5cf6]" />
                      ) : (
                        <Unlock className="w-4 h-4 text-[#00f0ff]" />
                      )}
                    </div>
                    <div>
                      <span className="font-heading font-medium text-xs text-white block">
                        Anonymous Transmission
                      </span>
                      <span className="font-mono text-[9px] uppercase text-white/25 mt-0.5 block tracking-wider leading-relaxed">
                        {isAnonymous 
                          ? `SECURE NODE: anonymous_operator. IP address sharded and metadata deleted.` 
                          : `PUBLIC NODE: ${currentUserAlias}. Primary source details pinned.`
                        }
                      </span>
                    </div>
                  </div>
                  <div className="relative w-9 h-5 bg-white/10 rounded-full transition-all">
                    <div 
                      className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-300 shadow-md"
                      style={{ 
                        transform: isAnonymous ? "translateX(16px)" : "translateX(0)",
                        backgroundColor: isAnonymous ? "#8b5cf6" : "#00f0ff"
                      }}
                    />
                  </div>
                </div>

                {/* 7. Terminal action buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-mono text-[10px] uppercase tracking-widest text-white/30 hover:text-white/60 px-5 py-2.5 rounded-xl border border-white/5 transition-all"
                  >
                    [Abort]
                  </button>
                  <button
                    type="submit"
                    className="font-mono text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-xl border transition-all flex items-center gap-2"
                    style={{ 
                      color: currentTypeConfig.color,
                      borderColor: `${currentTypeConfig.color}40`,
                      backgroundColor: `${currentTypeConfig.color}15`
                    }}
                  >
                    [Broadcast Signal]
                  </button>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
