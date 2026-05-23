export interface BuildLog {
  id: string;
  project: string;
  task: string;
  status: "completed" | "in-progress" | "pending";
  timestamp: string;
}

export interface UserProfile {
  id: string;
  name: string; // Codename
  avatarUrl: string;
  institution: string;
  branch: string; // Academic Branch
  missionType: string; // Mission Pathway
  logsShared: number;
  intelAdded: number;
  pathwaysCompleted: number;
  intelligenceScore: number; // Intelligence Rating / Reputation Score
  researchInterests: string[];
  reputationGrade: string; // Reputation Rank
  missionFocus: string;
  
  // Phase 6 additions
  yearSemester: string;
  activeMissions: string[];
  buildLogs: BuildLog[];
  skillsMatrix: { name: string; value: number }[];
  credibilityRating: number;
}

export const mockUsers: UserProfile[] = [
  {
    id: "user-1",
    name: "neophyte_operator",
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=neophyte",
    institution: "IIT Delhi",
    branch: "Computer Science",
    missionType: "AI Systems Path",
    logsShared: 14,
    intelAdded: 8,
    pathwaysCompleted: 1,
    intelligenceScore: 840,
    researchInterests: ["Distributed ML", "Compiler Optimization", "Generative Adversarial Nets"],
    reputationGrade: "AI Systems Path",
    missionFocus: "Edge AI Acceleration & Mathematical Modeling",
    yearSemester: "Year 3, Sem 5",
    activeMissions: ["Compile Tensor Library", "Optimize CUDA multiplication kernel"],
    buildLogs: [
      { id: "log-1", project: "Distributed Tensor Engine", task: "Setup raw thread allocations", status: "completed", timestamp: "3d ago" },
      { id: "log-2", project: "Distributed Tensor Engine", task: "Implement backprop loop", status: "in-progress", timestamp: "1d ago" },
      { id: "log-3", project: "Distributed Tensor Engine", task: "Optimize sharding across nodes", status: "pending", timestamp: "Pending" }
    ],
    credibilityRating: 84,
    skillsMatrix: [
      { name: "Math Rigor", value: 75 },
      { name: "Systems Dev", value: 85 },
      { name: "Paper Replication", value: 60 },
      { name: "Hardware", value: 40 }
    ]
  },
  {
    id: "user-2",
    name: "quant_ghost",
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=ghost",
    institution: "IIT Bombay",
    branch: "Electrical Engineering",
    missionType: "Quant Explorer",
    logsShared: 22,
    intelAdded: 15,
    pathwaysCompleted: 2,
    intelligenceScore: 910,
    researchInterests: ["Stochastic Calculus", "Time-Series Forecasters", "HFT Optimization"],
    reputationGrade: "Quant Operative",
    missionFocus: "Microsecond Arbitrage & Signal Theory",
    yearSemester: "Year 4, Sem 7",
    activeMissions: ["Backtest pairs trading model", "Solve Tim Crack puzzles"],
    buildLogs: [
      { id: "log-4", project: "C++ Backtesting Engine", task: "CSV parser implementation", status: "completed", timestamp: "5d ago" },
      { id: "log-5", project: "C++ Backtesting Engine", task: "Order execution simulation logic", status: "completed", timestamp: "2d ago" },
      { id: "log-6", project: "C++ Backtesting Engine", task: "SIMD microsecond optimization", status: "in-progress", timestamp: "12h ago" }
    ],
    credibilityRating: 94,
    skillsMatrix: [
      { name: "Probability", value: 95 },
      { name: "C++ Latency", value: 90 },
      { name: "Math Rigor", value: 95 },
      { name: "Systems Dev", value: 70 }
    ]
  },
  {
    id: "user-3",
    name: "deep_lab",
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=deeplab",
    institution: "IIT Madras",
    branch: "Engineering Physics",
    missionType: "Research Operative",
    logsShared: 9,
    intelAdded: 12,
    pathwaysCompleted: 1,
    intelligenceScore: 780,
    researchInterests: ["Quantum Computation", "Superconductivity Modelling", "High-Energy Diagnostics"],
    reputationGrade: "Research Operative",
    missionFocus: "Condensed Matter Simulation & Lab Instrumentation",
    yearSemester: "Year 3, Sem 6",
    activeMissions: ["Draft LaTeX research manuscript", "Run experimental replication"],
    buildLogs: [
      { id: "log-7", project: "Superconductivity Simulator", task: "Lattice setup mathematical structures", status: "completed", timestamp: "7d ago" },
      { id: "log-8", project: "Superconductivity Simulator", task: "Run Monte Carlo loops", status: "completed", timestamp: "4d ago" }
    ],
    credibilityRating: 88,
    skillsMatrix: [
      { name: "Physics Intuition", value: 95 },
      { name: "LaTeX / Writing", value: 90 },
      { name: "Experimental Setup", value: 85 },
      { name: "Math Rigor", value: 80 }
    ]
  },
  {
    id: "user-4",
    name: "bootstrap_kid",
    avatarUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=bootstrap",
    institution: "IIT Kharagpur",
    branch: "Aerospace Engineering",
    missionType: "Startup Track",
    logsShared: 11,
    intelAdded: 5,
    pathwaysCompleted: 0,
    intelligenceScore: 720,
    researchInterests: ["Aerodynamic Feedback Loops", "Micro-thruster Control", "Rapid Prototyping"],
    reputationGrade: "Systems Builder",
    missionFocus: "Low-cost Satellites & Bootstrapped Operations",
    yearSemester: "Year 2, Sem 4",
    activeMissions: ["Launch landing page waitlist", "Validate telemetry MVP"],
    buildLogs: [
      { id: "log-9", project: "Waitlist SaaS MVP", task: "Next.js routing setup", status: "completed", timestamp: "10d ago" },
      { id: "log-10", project: "Waitlist SaaS MVP", task: "Database schemas and Auth integration", status: "completed", timestamp: "3d ago" }
    ],
    credibilityRating: 78,
    skillsMatrix: [
      { name: "Product Design", value: 90 },
      { name: "GTM Strategy", value: 85 },
      { name: "Full Stack", value: 80 },
      { name: "Hardware", value: 70 }
    ]
  },
];

// LocalStorage key for user profiles
const PROFILES_STORAGE_KEY = "roadtoiit_user_profiles";

export function getStoredProfiles(): UserProfile[] {
  if (typeof window === "undefined") return mockUsers;
  const stored = localStorage.getItem(PROFILES_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(mockUsers));
    return mockUsers;
  }
  try {
    const list = JSON.parse(stored);
    // Ensure new fields exist for backward compatibility
    return list.map((item: any) => ({
      researchInterests: item.researchInterests || ["Core Preparation", "Seniors Networking"],
      reputationGrade: item.reputationGrade || "Field Operative",
      missionFocus: item.missionFocus || "General Campus Navigation",
      yearSemester: item.yearSemester || "Year 1, Sem 1",
      activeMissions: item.activeMissions || ["Establish QIS baseline"],
      buildLogs: item.buildLogs || [],
      credibilityRating: item.credibilityRating || 75,
      skillsMatrix: item.skillsMatrix || [
        { name: "Math Rigor", value: 60 },
        { name: "Systems Dev", value: 55 },
        { name: "Full Stack", value: 50 },
        { name: "Hardware", value: 45 }
      ],
      ...item
    }));
  } catch {
    return mockUsers;
  }
}

export function saveStoredProfiles(profiles: UserProfile[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
}

// Get profile of current authenticated user, initializing it if it doesn't exist
export function getCurrentUserProfile(email: string): UserProfile {
  const name = email.split("@")[0];
  const profiles = getStoredProfiles();
  
  let userProfile = profiles.find(p => p.name === name || p.id === `curr-${name}`);
  if (!userProfile) {
    userProfile = {
      id: `curr-${name}`,
      name: name,
      avatarUrl: `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`,
      institution: "IIT Delhi",
      branch: "Computer Science",
      missionType: "AI Systems Path",
      logsShared: 0,
      intelAdded: 0,
      pathwaysCompleted: 0,
      intelligenceScore: 100, // Starts fresh
      researchInterests: ["Academic Navigation", "Seniors Networking"],
      reputationGrade: "Neophyte Agent",
      missionFocus: "General Competence Acquisition",
      yearSemester: "Year 1, Sem 1",
      activeMissions: ["Establish baseline QIS score", "Explore mission pathways"],
      buildLogs: [],
      credibilityRating: 70,
      skillsMatrix: [
        { name: "Math Rigor", value: 50 },
        { name: "Systems Dev", value: 50 },
        { name: "Full Stack", value: 50 },
        { name: "Hardware", value: 50 }
      ]
    };
    const updated = [...profiles, userProfile];
    saveStoredProfiles(updated);
  }
  
  return userProfile;
}

// Update profile of current authenticated user
export function updateUserProfile(email: string, updates: Partial<UserProfile>): UserProfile {
  const name = email.split("@")[0];
  const profiles = getStoredProfiles();
  
  const updatedProfiles = profiles.map(p => {
    if (p.name === name || p.id === `curr-${name}`) {
      return { ...p, ...updates };
    }
    return p;
  });
  
  saveStoredProfiles(updatedProfiles);
  return getCurrentUserProfile(email);
}
