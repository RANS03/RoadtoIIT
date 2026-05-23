import { UserProfile, mockUsers } from "./users";

export type PostType = 
  | "survivor-log" 
  | "tactical-brief" 
  | "mission-update" 
  | "professor-intel" 
  | "placement-signal" 
  | "build-journal" 
  | "research-dispatch" 
  | "hostel-signal";

export interface Comment {
  id: string;
  authorName: string;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  reactedByUser: boolean;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export interface FeedPost {
  id: string;
  type: PostType;
  author: UserProfile | null;
  isAnonymous: boolean;
  content: string;
  timestamp: string;
  likes: number;
  likedByUser: boolean;
  saves: number;
  savedByUser: boolean;
  comments: Comment[];
  reactions: Reaction[];
  tags: string[];
  
  // Format specific extensions (Phase 3)
  poll?: {
    question: string;
    options: PollOption[];
    votedOptionId?: string;
  };
  resource?: {
    title: string;
    fileType: string;
    downloadUrl: string;
    size: string;
    description: string;
  };
  event?: {
    name: string;
    date: string;
    link: string;
    deadline: string;
    eventType: string;
  };
  milestone?: {
    title: string;
    progressPercent: number;
  };
  thread?: {
    steps: string[];
  };

  // Visual rhythm extensions (Phase 4)
  featured?: boolean;
  variant?: "standard" | "compact" | "quote" | "thread" | "resource" | "operator-update";
  campusDetail?: string;

  // Phase 6 extensions
  title?: string;
  signalStrength: number; // represented in dB (e.g. 75)
  isVerified: boolean;
  tacticalRelevance: number; // score out of 10 (e.g. 9.2)
  verifiers: string[]; // codenames of senior operators endorsing this
  dissentingLog?: {
    author: string;
    content: string;
  };
  buildJournalData?: {
    project: string;
    checklist: {
      task: string;
      status: "completed" | "in-progress" | "pending";
    }[];
  };

  // Phase 6 Expansion Extensions
  emotionalSignal?: string;
  environmentalContext?: string;
  systemicCause?: string;
  recoveryPattern?: string;
  operatorInsight?: string;
  imageAttachment?: string; // base64 string
  repostSource?: {
    authorName: string;
    signalId: string;
    title: string;
  };
  sqsScore: number; // computed Signal Quality Score
  usefulnessRank: string; // "A+", "A", "B+", "B", "C"
  verificationLevel?: "VERIFIED SIGNAL" | "FIELD CONFIRMED" | "MULTI-OPERATOR VERIFIED";
}

export const defaultFeedPosts: FeedPost[] = [
  {
    id: "post-1",
    type: "survivor-log",
    author: null,
    isAnonymous: true,
    content: "I opened my JEE results page 14 times that night. My mother was crying in the kitchen, and my father was calling every relative in his contacts. I thought that a rank of 412 would automatically release this huge wave of relief. Instead, I just sat at my desk looking at the screen, expecting some profound sense of happiness to appear eventually. It never did. Now I am in my third year at IIT Bombay, and I still feel like I am looking at that same screen, waiting for my life to begin.",
    timestamp: "2 hours ago",
    likes: 142,
    likedByUser: false,
    saves: 38,
    savedByUser: false,
    comments: [
      {
        id: "c-1",
        authorName: "neophyte_operator",
        isAnonymous: false,
        content: "Relate to this deeply. Opened my results at 3 AM. The silence of the house was deafening. Took me months to realize that the rank didn't change anything inside my head.",
        timestamp: "1 hour ago",
      },
      {
        id: "c-2",
        authorName: "Anonymous Operative",
        isAnonymous: true,
        content: "We were sold an arrival fallacy. There is no 'getting there.' There's just the next test, the next internship, and the next expectation.",
        timestamp: "45 mins ago",
      }
    ],
    reactions: [
      { emoji: "🤝", count: 28, reactedByUser: false },
      { emoji: "⚡", count: 14, reactedByUser: false },
    ],
    tags: ["Identity", "JEE Preparation", "Arrival Fallacy"],
    featured: true,
    variant: "standard",
    campusDetail: "H-4 corridors, 2:40 AM",
    title: "The Illusion of Arrival",
    signalStrength: 92,
    isVerified: true,
    tacticalRelevance: 8.8,
    verifiers: ["quant_ghost", "deep_lab"],
    emotionalSignal: "Overwhelmed by anticlimactic achievements and sudden emptiness post-JEE.",
    environmentalContext: "H-4 corridors, Sem 3, IIT Bombay.",
    systemicCause: "Social messaging that masks entry to IIT as a final destination, creating an arrival fallacy.",
    recoveryPattern: "Finding solace in slow peer discussions and shifting expectations away from institution prestige.",
    operatorInsight: "Do not expect a single rank to solve internal gaps. Focus on everyday habits and small incremental builds.",
    sqsScore: 92,
    usefulnessRank: "A",
    verificationLevel: "VERIFIED SIGNAL"
  },
  {
    id: "post-2",
    type: "placement-signal",
    author: mockUsers[1], // quant_ghost
    isAnonymous: false,
    content: "The placement statistics in the brochures are inflated by double-offers and conditional CTC allocations. For instance, the '1.2 Crore' package shown last year consisted of a 30L base, with the rest distributed over 4 years of non-guaranteed stock grants and a one-time relocation bonus. I have compiled the actual in-hand base salary spreadsheet containing data from 85 seniors. Download below.",
    timestamp: "4 hours ago",
    likes: 89,
    likedByUser: false,
    saves: 54,
    savedByUser: false,
    resource: {
      title: "Actual In-hand Placement CTC Analysis (All Branches)",
      fileType: "Spreadsheet (.xlsx)",
      downloadUrl: "#",
      size: "2.4 MB",
      description: "Verified base salary payouts, stock vestings, and retention bonus structures for 85 graduates."
    },
    comments: [
      {
        id: "c-3",
        authorName: "bootstrap_kid",
        isAnonymous: false,
        content: "Excellent compilation. Seniors in my branch also noted that about 30% of companies retracted offers later because of project budget cuts.",
        timestamp: "3 hours ago",
      }
    ],
    reactions: [
      { emoji: "👁️", count: 25, reactedByUser: false },
      { emoji: "🔥", count: 18, reactedByUser: false },
    ],
    tags: ["Placements", "CTC Realities", "Finance"],
    variant: "resource",
    campusDetail: "Placement Office cell, Sem 7",
    title: "Unvarnished Placement Data",
    signalStrength: 96,
    isVerified: true,
    tacticalRelevance: 9.8,
    verifiers: ["bootstrap_kid", "deep_lab"],
    emotionalSignal: "Frustrated by inflated public figures and misleading career cell presentations.",
    environmentalContext: "Placement cell, Sem 7, IIT Bombay.",
    systemicCause: "Institutional interest in high average CTC numbers leading to double-counting and stock grant bundling.",
    recoveryPattern: "Gathering real base salaries from 85 graduated seniors directly via micro-interviews.",
    operatorInsight: "Look at base salary, stock vesting schedules, and offer retraction terms. Never plan your budget on stock grants alone.",
    sqsScore: 96,
    usefulnessRank: "A+",
    verificationLevel: "MULTI-OPERATOR VERIFIED"
  },
  {
    id: "post-3",
    type: "build-journal",
    author: mockUsers[0], // neophyte_operator
    isAnonymous: false,
    content: "Finally finished implementing my custom distributed tensor library in C++ from scratch. No PyTorch, no LibTorch. I wanted to understand exactly how gradient backpropagation flows across host threads. After debugging segmentation faults for three weeks straight, seeing the loss decrease on the test set feels like a real intellectual victory.",
    timestamp: "1 day ago",
    likes: 120,
    likedByUser: false,
    saves: 30,
    savedByUser: false,
    milestone: {
      title: "C++ Distributed Tensor Library",
      progressPercent: 66
    },
    comments: [],
    reactions: [
      { emoji: "🚀", count: 32, reactedByUser: false },
      { emoji: "🧠", count: 18, reactedByUser: false },
    ],
    tags: ["AI Systems", "C++", "Deep Learning", "Low Level"],
    variant: "operator-update",
    campusDetail: "CS wing labs, Sem 5",
    title: "Build Journal: Custom Distributed Tensor Engine",
    signalStrength: 88,
    isVerified: false,
    tacticalRelevance: 9.2,
    verifiers: [],
    buildJournalData: {
      project: "Distributed Tensor Engine",
      checklist: [
        { task: "Setup raw thread allocations", status: "completed" },
        { task: "Implement backprop loop", status: "in-progress" },
        { task: "Optimize sharding across nodes", status: "pending" }
      ]
    },
    emotionalSignal: "Motivated by overcoming initial debugging blocks but mentally exhausted from three weeks of segmentation faults.",
    environmentalContext: "CS Labs, Sem 5, IIT Delhi.",
    systemicCause: "Low-level multi-threading hazards and custom thread allocations without library buffers.",
    recoveryPattern: "Refining allocation logs and using gdb/valgrind on thread dumps systematically.",
    operatorInsight: "Implement thread buffers from scratch first. Replicating frameworks teaches you details APIs obscure.",
    sqsScore: 88,
    usefulnessRank: "B+",
    verificationLevel: "FIELD CONFIRMED"
  },
  {
    id: "post-8",
    type: "survivor-log",
    author: null,
    isAnonymous: true,
    content: "We spend the first semester learning how to compete, and the remaining seven semesters learning how to heal.",
    timestamp: "1 day ago",
    likes: 215,
    likedByUser: false,
    saves: 95,
    savedByUser: false,
    comments: [],
    reactions: [
      { emoji: "🤝", count: 54, reactedByUser: false },
      { emoji: "🖤", count: 42, reactedByUser: false },
    ],
    tags: ["Academic pressure", "Survival"],
    variant: "quote",
    campusDetail: "MA-110 exam hall, Sem 1",
    signalStrength: 95,
    isVerified: true,
    tacticalRelevance: 8.5,
    verifiers: ["neophyte_operator"],
    dissentingLog: {
      author: "quant_ghost",
      content: "While emotional healing is vital, ignoring mathematical fundamentals in Sem 1 makes the remaining 7 semesters infinitely harder."
    },
    emotionalSignal: "High anxiety during math-heavy entry exams followed by chronic exhaustion.",
    environmentalContext: "Common rooms & lecture halls, Sem 1.",
    systemicCause: "Mass competitive pressure where grades are normalized relative to peers rather than absolute capability.",
    recoveryPattern: "Accepting a non-perfect GPA to build specialized software side-projects.",
    operatorInsight: "Maintain a baseline GPA of 8.0, but focus actual energy on unique skills. Grades suffer diminishing returns.",
    sqsScore: 85,
    usefulnessRank: "B+",
    verificationLevel: "FIELD CONFIRMED"
  },
  {
    id: "post-4",
    type: "professor-intel",
    author: mockUsers[2], // deep_lab
    isAnonymous: false,
    content: "Professor Sen's Advanced Algorithms (CS-402) course is a double-edged sword. Here is the operational reality of how to survive his lab if you want research recommendations or GATE slots:",
    timestamp: "2 days ago",
    likes: 31,
    likedByUser: false,
    saves: 22,
    savedByUser: false,
    thread: {
      steps: [
        "He does not look at code implementations. He checks the mathematical proofs in the PDF logs. Make sure your LaTeX notation is spotless.",
        "He will drop your grade by a full letter if you miss more than two lab discussions, regardless of your test scores. Attendance is non-negotiable.",
        "If you want him to recommend you for fellowships, read his 2021 paper on Stochastic Gradients and find a bug in his theorem. That's how I got in."
      ]
    },
    comments: [],
    reactions: [
      { emoji: "📚", count: 9, reactedByUser: false },
      { emoji: "🔍", count: 6, reactedByUser: false },
    ],
    tags: ["Academics", "Surviving Labs", "Algorithms"],
    variant: "thread",
    campusDetail: "Algorithms Theory Hall, Sem 4",
    title: "CS-402 Advanced Algorithms Survival Guidelines",
    signalStrength: 82,
    isVerified: true,
    tacticalRelevance: 9.0,
    verifiers: ["neophyte_operator"],
    emotionalSignal: "Anxious about grading letter cutoffs but determined to pass lab screenings.",
    environmentalContext: "CS-402 Lab, Sem 4, IIT Madras.",
    systemicCause: "Professor Sen values mathematical rigor and documentation over average software build quality.",
    recoveryPattern: "Correcting his 2021 theorem directly in class to prove analytical mastery.",
    operatorInsight: "Prioritize LaTeX layouts and proof derivations for CS-402, and attendance overrides raw test performance.",
    sqsScore: 90,
    usefulnessRank: "A",
    verificationLevel: "VERIFIED SIGNAL"
  },
  {
    id: "post-5",
    type: "hostel-signal",
    author: null,
    isAnonymous: true,
    content: "Quick note for first-years at Hostel 4: The water filtration unit on the 2nd floor has been leaking since Wednesday. Use the ground floor filter near the common room instead. Senior council says repairs are deferred until mid-semester budget is cleared.",
    timestamp: "3 days ago",
    likes: 74,
    likedByUser: false,
    saves: 40,
    savedByUser: false,
    comments: [],
    reactions: [
      { emoji: "🤝", count: 25, reactedByUser: false },
      { emoji: "🌙", count: 19, reactedByUser: false },
    ],
    tags: ["Hostel", "Maintenance", "Survival"],
    variant: "compact",
    campusDetail: "Hostel 4 washroom wing",
    signalStrength: 75,
    isVerified: false,
    tacticalRelevance: 7.2,
    verifiers: [],
    emotionalSignal: "Mild irritation over routine infrastructure breakdown.",
    environmentalContext: "Hostel 4, 2nd floor.",
    systemicCause: "Deferred municipal building repair approvals and slow warden signatures.",
    recoveryPattern: "Walking down to the ground floor common room filter.",
    operatorInsight: "Walk the extra flight of stairs to avoid the unboiled leaky filter.",
    sqsScore: 65,
    usefulnessRank: "C"
  },
  {
    id: "post-6",
    type: "research-dispatch",
    author: mockUsers[3], // bootstrap_kid
    isAnonymous: false,
    content: "Found a research opening at the Robotics lab under Dr. Mehta. They need someone with strong micro-controller prototyping skills to work on UAV feedback loops. It's a paid research internship for the summer, and it bypasses the official placement cell portal completely.",
    timestamp: "4 days ago",
    likes: 45,
    likedByUser: false,
    saves: 28,
    savedByUser: false,
    event: {
      name: "Mehta Robotics Lab Internships",
      date: "June - July 2026",
      link: "#",
      deadline: "May 30, 2026",
      eventType: "Research Fellowship"
    },
    comments: [],
    reactions: [
      { emoji: "🚀", count: 12, reactedByUser: false },
      { emoji: "🛠️", count: 9, reactedByUser: false },
    ],
    tags: ["Internships", "Research", "UAVs", "Robotics"],
    variant: "standard",
    campusDetail: "Robotics workshop lab, Sem 6",
    title: "Summer Internships - Mehta Robotics Lab",
    signalStrength: 84,
    isVerified: true,
    tacticalRelevance: 9.4,
    verifiers: ["deep_lab"],
    emotionalSignal: "Excited to bypass placement procedures but stressed by micro-controller deadlines.",
    environmentalContext: "Robotics lab, Sem 6, IIT Kharagpur.",
    systemicCause: "Official portals charge administration overhead, leading labs to hire directly via word-of-mouth.",
    recoveryPattern: "Demonstrating physical circuit prototypes directly to Dr. Mehta during office hours.",
    operatorInsight: "Avoid the portal queue. Send short video demos of your working physical builds directly to PIs.",
    sqsScore: 88,
    usefulnessRank: "B+",
    verificationLevel: "FIELD CONFIRMED"
  },
  {
    id: "post-7",
    type: "survivor-log",
    author: null,
    isAnonymous: true,
    content: "Sentiment check: How many hours of actual, uninterrupted sleep did you average this past mid-term week? The campus counseling cell claimed 7 hours is the median, which feels completely disconnected from hostel reality.",
    timestamp: "5 days ago",
    likes: 92,
    likedByUser: false,
    saves: 15,
    savedByUser: false,
    poll: {
      question: "Average Sleep During Mid-Terms",
      options: [
        { id: "opt-1", label: "Under 4 hours", votes: 148 },
        { id: "opt-2", label: "4 - 5 hours", votes: 89 },
        { id: "opt-3", label: "6 - 7 hours", votes: 22 },
        { id: "opt-4", label: "8+ hours", votes: 4 }
      ]
    },
    comments: [],
    reactions: [
      { emoji: "📊", count: 18, reactedByUser: false },
      { emoji: "☕", count: 35, reactedByUser: false },
    ],
    tags: ["Burnout", "Sleep Deprivation", "Midterms"],
    variant: "compact",
    campusDetail: "Common Room discussions",
    signalStrength: 79,
    isVerified: false,
    tacticalRelevance: 7.8,
    verifiers: [],
    emotionalSignal: "Exhausted and feeling isolated by standard campus health claims.",
    environmentalContext: "Hostel rooms, midterm week.",
    systemicCause: "Stacked exam timetables requiring cram sessions to cover wide syllabi.",
    recoveryPattern: "Sharing poll statistics with peers to normalize sleep patterns.",
    operatorInsight: "Do not stress if you get under 5 hours during midterms. The averages published by admin cells are self-reported fluff.",
    sqsScore: 78,
    usefulnessRank: "B"
  },
];

const FEED_STORAGE_KEY = "roadtoiit_feed_posts";

export function calculateSQS(post: {
  content: string;
  emotionalSignal?: string;
  environmentalContext?: string;
  systemicCause?: string;
  recoveryPattern?: string;
  operatorInsight?: string;
  tags?: string[];
}): { score: number; rank: string } {
  let score = 50; // Base score
  
  if (post.content.length > 250) score += 10;
  else if (post.content.length > 120) score += 5;

  if (post.emotionalSignal && post.emotionalSignal.trim().length > 10) score += 8;
  if (post.environmentalContext && post.environmentalContext.trim().length > 10) score += 8;
  if (post.systemicCause && post.systemicCause.trim().length > 10) score += 10;
  if (post.recoveryPattern && post.recoveryPattern.trim().length > 10) score += 12;
  if (post.operatorInsight && post.operatorInsight.trim().length > 10) score += 10;

  if (post.tags && post.tags.length >= 3) score += 5;

  score = Math.min(100, Math.max(10, score));

  let rank = "C";
  if (score >= 95) rank = "A+";
  else if (score >= 90) rank = "A";
  else if (score >= 80) rank = "B+";
  else if (score >= 70) rank = "B";

  return { score, rank };
}

export function getStoredFeed(): FeedPost[] {
  if (typeof window === "undefined") return defaultFeedPosts;
  const stored = localStorage.getItem(FEED_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(defaultFeedPosts));
    return defaultFeedPosts;
  }
  try {
    const list = JSON.parse(stored);
    return list.map((p: any) => {
      const sqsInfo = calculateSQS(p);
      return {
        featured: p.featured || false,
        variant: p.variant || "standard",
        campusDetail: p.campusDetail || "Encrypted Coordinates",
        title: p.title || "",
        signalStrength: p.signalStrength !== undefined ? p.signalStrength : (p.likes || 45),
        isVerified: p.isVerified !== undefined ? p.isVerified : false,
        tacticalRelevance: p.tacticalRelevance !== undefined ? p.tacticalRelevance : 7.5,
        verifiers: p.verifiers || [],
        sqsScore: p.sqsScore !== undefined ? p.sqsScore : sqsInfo.score,
        usefulnessRank: p.usefulnessRank || sqsInfo.rank,
        verificationLevel: p.verificationLevel || (p.isVerified ? "VERIFIED SIGNAL" : undefined),
        ...p
      };
    });
  } catch {
    return defaultFeedPosts;
  }
}

export function saveStoredFeed(posts: FeedPost[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(posts));
}

// Add a new signal
export function createFeedPost(post: Omit<FeedPost, "id" | "timestamp" | "likes" | "likedByUser" | "saves" | "savedByUser" | "comments" | "reactions" | "signalStrength" | "isVerified" | "tacticalRelevance" | "verifiers" | "sqsScore" | "usefulnessRank">): FeedPost {
  const posts = getStoredFeed();
  const sqsInfo = calculateSQS(post);
  
  const newPost: FeedPost = {
    ...post,
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
    variant: "standard",
    campusDetail: "Broadcast Node Location",
    signalStrength: 50, // Starting strength
    isVerified: false,
    tacticalRelevance: 7.0, // Baseline relevance
    verifiers: [],
    sqsScore: sqsInfo.score,
    usefulnessRank: sqsInfo.rank,
    verificationLevel: undefined
  };
  
  const updated = [newPost, ...posts];
  saveStoredFeed(updated);
  return newPost;
}
