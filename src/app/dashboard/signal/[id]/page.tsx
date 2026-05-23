"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldAlert, 
  Terminal, 
  FileText, 
  Clock, 
  ChevronRight,
  Database,
  Radio
} from "lucide-react";
import { getStoredFeed, saveStoredFeed, FeedPost } from "@/data/feed";
import { FeedPostCard } from "@/components/ui/FeedPostCard";
import { GlassCard } from "@/components/ui/GlassCard";

export default function SignalDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [post, setPost] = useState<FeedPost | null>(null);
  const [related, setRelated] = useState<FeedPost[]>([]);
  
  // Access Logs Simulation
  const [decryptionTime, setDecryptionTime] = useState("");
  const [readAccessTime, setReadAccessTime] = useState("");

  useEffect(() => {
    // Generate simulated access log timestamps
    const now = new Date();
    setDecryptionTime(now.toLocaleTimeString());
    setReadAccessTime(new Date(now.getTime() - 2400000).toLocaleTimeString());
    
    // Load posts from state
    const allPosts = getStoredFeed();
    setPosts(allPosts);

    const activePost = allPosts.find(p => p.id === id);
    if (activePost) {
      setPost(activePost);
      
      // Calculate related posts (sharing type/category, excluding active post)
      const matches = allPosts
        .filter(p => p.type === activePost.type && p.id !== activePost.id)
        .slice(0, 3);
      setRelated(matches);
    }
  }, [id]);

  // Handler helpers
  const handleLike = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const liked = !p.likedByUser;
        return { ...p, likedByUser: liked, likes: liked ? p.likes + 1 : p.likes - 1 };
      }
      return p;
    });
    setPosts(updated);
    saveStoredFeed(updated);
    // Sync current post state
    const current = updated.find(p => p.id === postId);
    if (current) setPost(current);
  };

  const handleSave = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const saved = !p.savedByUser;
        return { ...p, savedByUser: saved, saves: saved ? p.saves + 1 : p.saves - 1 };
      }
      return p;
    });
    setPosts(updated);
    saveStoredFeed(updated);
    // Sync current post state
    const current = updated.find(p => p.id === postId);
    if (current) setPost(current);
  };

  const handleReact = (postId: string, emoji: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          reactions: p.reactions.map(r => {
            if (r.emoji === emoji) {
              const active = !r.reactedByUser;
              return { ...r, reactedByUser: active, count: active ? r.count + 1 : r.count - 1 };
            }
            return r;
          })
        };
      }
      return p;
    });
    setPosts(updated);
    saveStoredFeed(updated);
    // Sync current post state
    const current = updated.find(p => p.id === postId);
    if (current) setPost(current);
  };

  const handleAddComment = (postId: string, content: string) => {
    // In details view, load current user if logged in
    const session = typeof window !== "undefined" ? localStorage.getItem("roadtoiit_session") : null;
    const authorName = session ? JSON.parse(session).email.split("@")[0] : "anonymous_operator";

    const updated = posts.map(p => {
      if (p.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          authorName: authorName,
          isAnonymous: false,
          content: content,
          timestamp: "Just now"
        };
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });
    setPosts(updated);
    saveStoredFeed(updated);
    // Sync current post state
    const current = updated.find(p => p.id === postId);
    if (current) setPost(current);
  };

  if (!post) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center font-mono text-white/30 pt-32">
        Scanning network database... [Target Signal Not Found]
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Back Button / Navigation Header */}
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
        {/* Left/Middle: Post Card details */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeedPostCard
              post={post}
              onLike={handleLike}
              onSave={handleSave}
              onReact={handleReact}
              onAddComment={handleAddComment}
              disableCardLink={true} // Disable clicking it on detail page
            />
          </motion.div>
        </div>

        {/* Right Column: Signal Meta widget panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Author/Operator Info Widget */}
          <GlassCard className="p-6 border border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#8b5cf6] block mb-4">
              Transmission Node Details
            </span>

            {post.isAnonymous ? (
              <div className="space-y-3 font-light text-xs text-white/45">
                <div className="flex items-start gap-2.5 bg-white/2 rounded-xl p-3 border border-dashed border-white/10 text-[11px] font-mono text-white/30">
                  <ShieldAlert className="w-4 h-4 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white/60 font-semibold block mb-0.5">SHARDED SENDER</span>
                    All network signature identifiers have been sharded. Access node trace aborted.
                  </div>
                </div>
              </div>
            ) : (
              post.author && (
                <div 
                  onClick={() => router.push(`/dashboard/operator/${post.author?.name}`)}
                  className="group cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl border border-white/10 p-0.5 bg-white/2 group-hover:border-[#00f0ff]/30 transition-all flex-shrink-0">
                      <img 
                        src={post.author.avatarUrl} 
                        alt={post.author.name} 
                        className="w-full h-full rounded-lg object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-white group-hover:text-[#00f0ff] transition-colors leading-snug">
                        {post.author.name}
                      </h4>
                      <span className="text-[10px] font-mono text-white/35 block uppercase tracking-wider mt-0.5">
                        {post.author.institution}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-white/25 pt-3 border-t border-white/5">
                    <span>Mission Tier</span>
                    <span className="text-[#00f0ff] font-semibold">{post.author.missionType}</span>
                  </div>
                </div>
              )
            )}
          </GlassCard>

          {/* Access / Decryption Logs */}
          <GlassCard className="p-6 border border-white/5 space-y-4 font-mono text-[10px] text-white/30">
            <h4 className="uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5 mb-1">
              <Database className="w-3.5 h-3.5 text-[#00f0ff]" /> Access Intelligence Log
            </h4>
            
            <div className="space-y-2 leading-relaxed">
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Signal ID:</span>
                <span className="text-white/50">{post.id}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Verification State:</span>
                <span className="text-emerald-400">INTEGRITY VERIFIED</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>First Broadcast:</span>
                <span className="text-white/50">{post.timestamp}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Last Node Check:</span>
                <span className="text-white/50">{decryptionTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Client Access:</span>
                <span className="text-[#00f0ff]">{readAccessTime}</span>
              </div>
            </div>
          </GlassCard>

          {/* Related Signals Widget */}
          <GlassCard className="p-6 border border-white/5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 font-semibold flex items-center gap-1.5 mb-4">
              <Radio className="w-3.5 h-3.5 text-[#8b5cf6]" /> Related Signals
            </h4>
            
            {related.length === 0 ? (
              <p className="text-[11px] font-mono text-white/20 italic">
                No sharded related signals found.
              </p>
            ) : (
              <div className="space-y-3">
                {related.map(p => (
                  <div
                    key={p.id}
                    onClick={() => router.push(`/dashboard/signal/${p.id}`)}
                    className="p-3 bg-white/2 hover:bg-white/5 rounded-xl border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-300 group flex items-start gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white/60 text-xs font-light line-clamp-2 leading-relaxed">
                        "{p.content}"
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono text-[9px] text-[#8b5cf6]/70">[{p.id}]</span>
                        <span className="font-mono text-[9px] text-white/20">•</span>
                        <span className="font-mono text-[9px] text-white/20">{p.timestamp}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/40 mt-1 transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
