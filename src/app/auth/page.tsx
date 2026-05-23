"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { GlowButton } from "@/components/ui/GlowButton";
import { ParticleBackground } from "@/components/background/ParticleBackground";
import { GridOverlay } from "@/components/background/GridOverlay";
import { AmbientLight } from "@/components/background/AmbientLight";
import { Sparkles, Eye, EyeOff, Lock, Mail, AlertTriangle, ArrowLeft } from "lucide-react";

function AuthPageContent() {
  const { user, loading, error, login, signup, loginWithGoogle, clearError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Auth mode: 'login' | 'signup'
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Client-side validation errors
  const [validationError, setValidationError] = useState<string | null>(null);

  // Get redirect target
  const redirect = searchParams.get("redirect") || "/dashboard";

  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      router.push(redirect);
    }
  }, [user, loading, router, redirect]);

  // Clear errors when toggling modes
  const handleModeChange = (newMode: "login" | "signup") => {
    setMode(newMode);
    setValidationError(null);
    clearError();
  };

  const validateForm = () => {
    if (!email) {
      setValidationError("Email ID is required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      setValidationError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return false;
    }
    setValidationError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    let success = false;
    if (mode === "login") {
      success = await login(email, password);
    } else {
      success = await signup(email, password);
    }

    if (success) {
      router.push(redirect);
    }
  };

  const handleGoogleSignIn = async () => {
    const success = await loginWithGoogle();
    if (success) {
      router.push(redirect);
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white selection:bg-white selection:text-black py-16 px-4">
      {/* Visual background layers */}
      <AmbientLight />
      <GridOverlay />
      <ParticleBackground />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#00f0ff]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#8b5cf6]/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Back Link */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => router.push("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white/80 transition-colors z-20 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Return Gateway</span>
      </motion.button>

      {/* Auth Portal container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Terminal frame border wrapper */}
        <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl pointer-events-none" />
        
        {/* Main card */}
        <div className="glass-panel border border-white/5 rounded-2xl p-8 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden relative">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 flex-shrink-0"
            >
              <Sparkles className="w-5 h-5 text-white/50" />
            </motion.div>
            
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 mb-2">
              Security Protocol Layer
            </span>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white mb-2 uppercase">
              {mode === "login" ? "IDENTITY LOGIN" : "DECRYPTION PORTAL"}
            </h1>
            <p className="text-white/40 text-xs font-light tracking-wide max-w-[280px]">
              {mode === "login" 
                ? "Enter credentials to establish secure terminal sync." 
                : "Create identity files to bypass general public gates."
              }
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="relative flex p-1 mb-8 rounded-xl bg-white/5 border border-white/5">
            {/* Sliding backdrop */}
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg bg-white/8 border border-white/10 transition-transform duration-300 ease-[0.16,1,0.3,1] ${
                mode === "signup" ? "translate-x-full" : "translate-x-0"
              }`}
            />
            
            <button
              onClick={() => handleModeChange("login")}
              className={`relative z-10 w-1/2 py-2.5 text-center text-xs uppercase tracking-widest font-medium transition-colors ${
                mode === "login" ? "text-white" : "text-white/45 hover:text-white/80"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => handleModeChange("signup")}
              className={`relative z-10 w-1/2 py-2.5 text-center text-xs uppercase tracking-widest font-medium transition-colors ${
                mode === "signup" ? "text-white" : "text-white/45 hover:text-white/80"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display error notifications */}
            <AnimatePresence mode="wait">
              {(validationError || error) && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="p-3.5 rounded-xl border border-red-500/20 bg-red-950/20 text-red-400 text-xs flex items-start gap-2.5 overflow-hidden font-mono"
                >
                  <AlertTriangle className="w-4 h-4 text-red-500/80 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{validationError || error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase tracking-widest text-white/35 font-mono">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#00f0ff] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  disabled={loading}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#00f0ff]/40 rounded-xl py-3.5 pl-11 pr-4 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] uppercase tracking-widest text-white/35 font-mono">
                  Password Key
                </label>
                {mode === "login" && (
                  <button 
                    type="button"
                    className="text-[9px] uppercase tracking-wider text-white/30 hover:text-white/50 font-mono transition-colors"
                  >
                    Forgot Key?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-[#00f0ff] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-black/40 border border-white/5 focus:border-[#00f0ff]/40 rounded-xl py-3.5 pl-11 pr-12 text-xs font-mono text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#00f0ff]/20 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* CTA Submit Button */}
            <GlowButton
              type="submit"
              disabled={loading}
              glowColor={mode === "login" ? "rgba(0, 240, 255, 0.4)" : "rgba(139, 92, 246, 0.4)"}
              className="w-full text-xs font-mono tracking-widest uppercase py-4 rounded-xl mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : mode === "login" ? (
                "SYNC ACCESS"
              ) : (
                "CREATE CREDENTIALS"
              )}
            </GlowButton>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20">
              Alternative Gateway
            </span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-white font-mono text-xs uppercase tracking-widest py-3.5 rounded-xl cursor-pointer transition-all duration-300 disabled:opacity-50"
          >
            {/* Inline SVG Google Icon for premium fidelity */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.2-5.136 4.2A5.64 5.64 0 0 1 8.35 12.96a5.64 5.64 0 0 1 5.64-5.64c2.25 0 4.116.897 5.48 2.25l3.228-3.228C20.67 4.385 17.585 3 14 3a9.96 9.96 0 0 0-9.96 9.96A9.96 9.96 0 0 0 14 22.92c6.046 0 9.96-4.246 9.96-10.128 0-.683-.06-1.345-.18-1.983H12.24Z"
              />
              <path
                fill="#FBBC05"
                d="M4.04 7.92A9.914 9.914 0 0 0 4.04 18a9.96 9.96 0 0 0 4.31-5.04 5.603 5.603 0 0 1 0-5.04A9.96 9.96 0 0 0 4.04 7.92Z"
              />
              <path
                fill="#34A853"
                d="M14 22.92c3.585 0 6.67-1.385 8.69-3.792l-3.228-2.61a5.64 5.64 0 0 1-5.462 2.202 5.64 5.64 0 0 1-5.64-5.64c0-.04.01-.08.01-.12L4.04 18a9.96 9.96 0 0 0 9.96 4.92Z"
              />
              <path
                fill="#4285F4"
                d="M22.69 19.128a9.96 9.96 0 0 0 .86-3.84c.12-.638.18-1.3.18-1.983H12.24V14.4h6.887a5.64 5.64 0 0 1-2.287 3.42l3.228 2.61c1.942-1.745 3.75-4.267 4.822-7.302Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Subtle footer */}
          <div className="text-center mt-8 font-mono text-[9px] tracking-wider text-white/15 uppercase">
            Encrypted Gateway • Decrypted Node: 0x93FA
          </div>
        </div>
      </motion.div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-16 px-4 font-mono">
        <AmbientLight />
        <GridOverlay />
        <ParticleBackground />
        <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping mb-4" />
          <div className="text-[11px] uppercase tracking-[0.25em] text-[#00f0ff] font-bold glow-cyan">
            Initializing Gateway
          </div>
        </div>
      </main>
    }>
      <AuthPageContent />
    </Suspense>
  );
}
