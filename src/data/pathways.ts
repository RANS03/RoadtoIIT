// ─────────────────────────────────────────────────────────────────────────────
// MISSION PATHWAYS — Living Operational Ecosystems
// Phase 9B: Community-powered intelligence with signals, reality checks,
// failure intelligence, compatibility profiles, and discussion threads.
// ─────────────────────────────────────────────────────────────────────────────

export type FailureSeverity = "CRITICAL" | "HIGH" | "MEDIUM";
export type ResourceType = "book" | "course" | "repo" | "paper" | "tool";

export interface PathwaySignal {
  id: string;
  operator: string;
  institute: string;
  timestamp: string;
  content: string;
  tags: string[];
  upvotes: number;
  saves: number;
}

export interface RealityCheckpoint {
  expected: string;
  reality: string;
}

export interface FailurePoint {
  pattern: string;
  severity: FailureSeverity;
  avoidance: string;
}

export interface CompatibilityProfile {
  thrives: string[];
  struggles: string[];
}

export interface PathwayResource {
  title: string;
  type: ResourceType;
  upvotes: number;
  isHighSignal: boolean;
  isOutdated?: boolean;
  recommendedBy: string;
  description: string;
  url?: string;
}

export interface PathwayThread {
  id: string;
  topic: string;
  responses: number;
  lastActive: string;
}

export interface RewardProfile {
  learningCurve: number;    // 0–100
  burnoutRisk: number;
  salaryPotential: number;
  uncertainty: number;
  depthRequired: number;
  yearsToMastery: string;
}

export interface Pathway {
  id: string;
  code: string;
  title: string;
  timeline: string;
  color: string;
  desc: string;
  skills: string[];
  roadmap: string[];
  traps: string[];
  projectProgression: string[];
  internshipStrategy: string;

  // Phase 9B — Living Ecosystem Fields
  signals: PathwaySignal[];
  realityCheckpoints: RealityCheckpoint[];
  failurePoints: FailurePoint[];
  compatibility: CompatibilityProfile;
  nobodyTellsYou: string[];
  communityResources: PathwayResource[];
  threads: PathwayThread[];
  rewardProfile: RewardProfile;
  activeOperators: number;
  totalSignals: number;
}

export const pathways: Pathway[] = [
  // ────────────────────────────────────────────────────────────────────────
  // PATH-01 — AI SYSTEMS
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-01",
    code: "AI SYSTEMS",
    title: "AI Systems Path",
    timeline: "18–24 months",
    color: "#00f0ff",
    desc: "From foundations to production ML. Research intuition, implementation depth, and the projects that actually get noticed.",
    skills: ["Linear Algebra", "PyTorch", "Research Papers", "System Design", "MLOps"],
    activeOperators: 312,
    totalSignals: 1840,
    roadmap: [
      "Month 1–3: Mathematical foundations (Multi-variable Calculus, Probability, Linear Algebra)",
      "Month 4–6: Core ML algorithms implemented from scratch in pure NumPy (LR, SVM, Tree, MLP)",
      "Month 7–12: Advanced deep learning frameworks & research paper replication (Attention, Diffusion)",
      "Month 13–18: System engineering (Model sharding, quantization, distributed PyTorch engines)",
      "Month 19–24: Open-source contributions or indexing specialized research libraries",
    ],
    traps: [
      "Collecting certificates from Coursera without writing clean implementation code",
      "Using pre-built API wrappers (HuggingFace, OpenAI) without understanding math models",
      "Ignoring performance scaling variables (memory allocations, CUDA cache overflows)",
    ],
    projectProgression: [
      "Level 1: Re-write backprop engine from scratch (similar to micrograd) in pure Python.",
      "Level 2: Build a custom CNN training loop in PyTorch, profile CUDA memory, and optimize batch size constraints.",
      "Level 3: Implement an attention block (GPT-2 mini architecture) from scratch, train on tinyShakespeare, and write a custom sampler.",
      "Level 4: Quantize a 7B LLM to 4-bits manually using post-training quantization (PTQ) guidelines.",
    ],
    internshipStrategy: "Avoid generic HR portals. Target mid-stage AI startups directly. Build a high-signal GitHub repo containing paper replications, write a detailed breakdown thread on X/LinkedIn, and cold email the lead ML engineers directly with a link to your code.",
    signals: [
      {
        id: "ai-sig-1",
        operator: "kernel_ghost",
        institute: "IIT Madras",
        timestamp: "14m ago",
        content: "Spent 7 hours debugging CUDA memory fragmentation. Finally understood why batch size optimization matters — it's not about speed, it's about memory bandwidth saturation. Changed everything.",
        tags: ["CUDA", "systems", "debugging"],
        upvotes: 184,
        saves: 67,
      },
      {
        id: "ai-sig-2",
        operator: "anonymous_operator",
        institute: "IIT Delhi",
        timestamp: "2h ago",
        content: "Tutorial hell is real. I watched 60 hours of ML courses and couldn't implement basic backprop. Switched to implementing from scratch — painful for 2 weeks, then everything clicked. Don't let tutorials feel like progress.",
        tags: ["learning", "backprop", "warning"],
        upvotes: 342,
        saves: 128,
      },
      {
        id: "ai-sig-3",
        operator: "quant_lab",
        institute: "BITS Pilani",
        timestamp: "6h ago",
        content: "Replicated the Attention is All You Need paper from scratch. Took 3 weeks. The paper made zero sense until I built it. Every paper you can implement becomes 10x more useful than any paper you just read.",
        tags: ["transformers", "papers", "proof-of-work"],
        upvotes: 256,
        saves: 94,
      },
      {
        id: "ai-sig-4",
        operator: "systems_ghost",
        institute: "IIIT Hyderabad",
        timestamp: "1d ago",
        content: "Most people think AI is about models. It's 80% data pipelines and debugging infrastructure. You will spend more time writing efficient data loaders than training models. Plan accordingly.",
        tags: ["reality", "data", "infrastructure"],
        upvotes: 198,
        saves: 73,
      },
    ],
    realityCheckpoints: [
      {
        expected: "I'll build AGI in 6 months and contribute to frontier research.",
        reality: "You'll spend 3 weeks understanding tensor dimensions and why your loss is NaN.",
      },
      {
        expected: "PyTorch is just a library — I'll pick it up in a weekend.",
        reality: "The autograd engine, broadcasting semantics, and CUDA device management will each take dedicated weeks to internalize.",
      },
      {
        expected: "I'll fine-tune GPT and deploy my own AI product quickly.",
        reality: "Before fine-tuning makes sense, you need to understand why the base model works — which requires understanding attention, tokenization, and training dynamics.",
      },
      {
        expected: "Deep learning is mostly intuition and experiments.",
        reality: "The researchers who get published have graduate-level mathematics. Intuition comes after the math, not instead of it.",
      },
    ],
    failurePoints: [
      {
        pattern: "Tutorial addiction — watching courses as a substitute for building",
        severity: "CRITICAL",
        avoidance: "Build before you watch. If you can't implement it, you don't understand it. Tutorials are references, not progress.",
      },
      {
        pattern: "Skipping mathematical foundations for API-first learning",
        severity: "CRITICAL",
        avoidance: "Math first. At minimum: linear algebra (3Blue1Brown + Gilbert Strang), calculus, probability. This cannot be shortcut.",
      },
      {
        pattern: "Framework dependency — knowing PyTorch but not what PyTorch does",
        severity: "HIGH",
        avoidance: "Implement core operations (matrix multiply, relu, softmax, backprop) in NumPy first. Then frameworks make sense.",
      },
      {
        pattern: "Shallow project cloning — running someone else's repo and calling it a project",
        severity: "HIGH",
        avoidance: "Modify the architecture. Extend it. Document what changed and why. That's the signal. Running someone else's code is not.",
      },
      {
        pattern: "No systems knowledge — treating ML as a math problem, not a compute problem",
        severity: "MEDIUM",
        avoidance: "Learn profiling, memory management, and distributed training basics. Production ML is systems engineering.",
      },
    ],
    compatibility: {
      thrives: [
        "Enjoys deep debugging — finds satisfaction in finding why, not just fixing what",
        "Patient with ambiguity — comfortable not knowing for weeks before understanding",
        "Enjoys reading dense technical papers and mathematical proofs",
        "Gets energy from understanding systems at the lowest level",
        "Self-directed — can build structure when none is provided",
      ],
      struggles: [
        "Wants fast validation and visible progress every few days",
        "Hates theory — wants to skip to application immediately",
        "Depends on tutorials and structured courses to feel safe",
        "Gets frustrated by lack of clear right answers",
        "Needs social proof before attempting hard things",
      ],
    },
    nobodyTellsYou: [
      "Most people quit AI not because it's hard, but because ambiguity destroys their motivation. The path has no clear milestones for months.",
      "The AI field moves so fast that any tutorial older than 18 months may be teaching you patterns that are already obsolete.",
      "Having a GPU doesn't matter in Year 1. Google Colab is sufficient. The bottleneck is understanding, not compute.",
      "Your first 5 models will be worse than baseline. This is not failure — this is calibration. Every serious researcher has a graveyard of failed runs.",
      "The researchers you follow on Twitter who make it look easy have 5–10 years of foundational work that isn't visible in their posts.",
      "AI internships at top labs care almost exclusively about paper replications and open-source contributions — not your GPA or college.",
    ],
    communityResources: [
      {
        title: "Deep Learning — Goodfellow, Bengio, Courville",
        type: "book",
        upvotes: 487,
        isHighSignal: true,
        recommendedBy: "kernel_ghost",
        description: "The mathematical bible. Don't skip chapters. Every serious AI researcher has read this.",
      },
      {
        title: "Andrej Karpathy — Neural Networks: Zero to Hero",
        type: "course",
        upvotes: 634,
        isHighSignal: true,
        recommendedBy: "systems_ghost",
        description: "Build a GPT from scratch. The single best AI learning resource in existence right now.",
        url: "https://karpathy.ai/zero-to-hero.html",
      },
      {
        title: "CS231n — Stanford CNN Course",
        type: "course",
        upvotes: 312,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Assignment 2 alone will teach you more than 30 hours of YouTube.",
      },
      {
        title: "llm.c — Karpathy's C/CUDA LLM",
        type: "repo",
        upvotes: 198,
        isHighSignal: false,
        recommendedBy: "quant_lab",
        description: "Read this after understanding PyTorch. Shows what production LLM training actually looks like.",
        url: "https://github.com/karpathy/llm.c",
      },
      {
        title: "fast.ai — Practical Deep Learning",
        type: "course",
        upvotes: 156,
        isHighSignal: false,
        isOutdated: false,
        recommendedBy: "deep_lab",
        description: "Good for intuition. Weak on mathematical depth. Use alongside Goodfellow, not instead of it.",
      },
    ],
    threads: [
      {
        id: "ai-t1",
        topic: "What's the minimum math required before touching PyTorch?",
        responses: 87,
        lastActive: "8m ago",
      },
      {
        id: "ai-t2",
        topic: "CUDA OOM errors — share your debugging systems",
        responses: 43,
        lastActive: "2h ago",
      },
      {
        id: "ai-t3",
        topic: "Is HuggingFace actually harmful for learning?",
        responses: 112,
        lastActive: "34m ago",
      },
      {
        id: "ai-t4",
        topic: "What was the paper replication that changed how you think?",
        responses: 68,
        lastActive: "5h ago",
      },
    ],
    rewardProfile: {
      learningCurve: 88,
      burnoutRisk: 72,
      salaryPotential: 94,
      uncertainty: 65,
      depthRequired: 92,
      yearsToMastery: "3–5 years",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // PATH-02 — RESEARCH
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-02",
    code: "RESEARCH",
    title: "Research Operative",
    timeline: "24–36 months",
    color: "#8b5cf6",
    desc: "The long game. Building a research profile that opens PhD programs, fellowships, and the academic pipeline.",
    skills: ["Literature Review", "LaTeX", "Experimental Design", "Academic Writing", "Statistical Tests"],
    activeOperators: 148,
    totalSignals: 724,
    roadmap: [
      "Month 1–6: Read 50 foundational papers in your niche. Master bibliography compilation.",
      "Month 7–12: Work closely as an assistant to a junior faculty member on ongoing projects.",
      "Month 13–18: Draft your first primary research contribution (workshop or local symposium level).",
      "Month 19–24: Apply for national fellowships or research intern slots at global labs (MSR, Adobe, etc.).",
      "Month 25–36: Submit your first full paper to a major conference (NeurIPS, CVPR, IEEE) as first or co-author.",
    ],
    traps: [
      "Working with professors who only publish in predatory or low-tier journals",
      "Starting research without double-checking if the exact problem was solved in 2021",
      "Failing to network; papers get cited when peers know who you are.",
    ],
    projectProgression: [
      "Level 1: Write a comprehensive, annotated literature review of 15 papers in your target field.",
      "Level 2: Replicate the experimental results of a benchmark paper and document the delta in outcomes.",
      "Level 3: Develop a minor novel extension to an existing model and draft the LaTeX research paper.",
      "Level 4: Co-author a manuscript, submit it to a peer-reviewed venue, and upload the code repo.",
    ],
    internshipStrategy: "Identify active labs 9 months in advance. Read their latest 3 papers in detail, find a flaw or propose a logical continuation, and email the principal investigator (PI) with a clean draft proposing a summer project.",
    signals: [
      {
        id: "res-sig-1",
        operator: "deep_lab",
        institute: "IIT Madras",
        timestamp: "1h ago",
        content: "Cold emailed 47 professors. Got 4 responses. 1 became a 6-month research position that led to a CVPR submission. The math: 2% success rate with the right email is infinitely better than 0% with a generic one.",
        tags: ["outreach", "cold email", "research position"],
        upvotes: 312,
        saves: 98,
      },
      {
        id: "res-sig-2",
        operator: "anonymous_operator",
        institute: "IIT Bombay",
        timestamp: "4h ago",
        content: "Spent 3 months on a research direction. Discovered someone published it in 2022. Always search ArXiv before you build. Use Semantic Scholar — their similarity graphs surface papers Google Scholar misses.",
        tags: ["literature review", "arxiv", "trap"],
        upvotes: 267,
        saves: 84,
      },
      {
        id: "res-sig-3",
        operator: "systems_ghost",
        institute: "IIIT Hyderabad",
        timestamp: "1d ago",
        content: "Your paper quality is determined in the idea stage, not the writing stage. Spend 4x more time finding the right problem than solving it. Most rejected papers failed before the first line of code was written.",
        tags: ["research process", "ideas", "publication"],
        upvotes: 198,
        saves: 76,
      },
    ],
    realityCheckpoints: [
      {
        expected: "I'll publish a paper in my first year of research.",
        reality: "Your first year will be literature reviews, failed experiments, and learning how academia actually operates.",
      },
      {
        expected: "My professor will guide me step-by-step.",
        reality: "Most professors have 15+ students. You will be autonomous 90% of the time. Initiative determines outcomes.",
      },
      {
        expected: "A good idea is enough to get published.",
        reality: "Good ideas with poor experimental rigor get desk-rejected. The methodology section is where most papers fail.",
      },
      {
        expected: "Research will be intellectually exciting every day.",
        reality: "80% of research is debugging, reproducing baselines, and reading papers that don't help. The 20% makes it worthwhile.",
      },
    ],
    failurePoints: [
      {
        pattern: "Attaching to a low-quality advisor for easy access",
        severity: "CRITICAL",
        avoidance: "Check your target professor's publication record. H-index >10, recent papers at top venues = signal. Predatory journals = hard no.",
      },
      {
        pattern: "Solving problems that were already solved",
        severity: "CRITICAL",
        avoidance: "Spend the first 2 weeks of any project only reading. Build a full literature map before writing one line of code.",
      },
      {
        pattern: "Treating networking as optional",
        severity: "HIGH",
        avoidance: "Papers get cited when people know you. Attend seminars, comment on papers, exist visibly in the academic community.",
      },
      {
        pattern: "Weak experimental design — cherry-picking results",
        severity: "HIGH",
        avoidance: "Report all ablations. Reviewers detect cherry-picking. Statistical significance tests are required, not optional.",
      },
      {
        pattern: "Underestimating writing quality",
        severity: "MEDIUM",
        avoidance: "Read 20 accepted papers in your target venue before writing. Match their structure exactly. Writing style signals credibility.",
      },
    ],
    compatibility: {
      thrives: [
        "Comfortable with months of uncertainty before any measurable outcome",
        "Reads papers for fun and gets genuinely curious about unexplained phenomena",
        "Detail-oriented — catches flaws in methodology that others miss",
        "Intrinsically motivated — doesn't need external validation to keep working",
        "Patient communicator — can explain complex ideas in simple terms",
      ],
      struggles: [
        "Needs frequent visible milestones and feedback",
        "Uncomfortable with the idea that your work might be irrelevant or scooped",
        "Motivated primarily by compensation and career certainty",
        "Dislikes reading dense technical text for extended periods",
        "Needs structured guidance to make progress",
      ],
    },
    nobodyTellsYou: [
      "A rejection from NeurIPS is not a failure — it's a calibration. Most accepted papers were rejected at least once. The revision system is part of the process.",
      "Your advisor relationship is the single largest determinant of your research trajectory. Choosing poorly is worse than not doing research at all.",
      "Academic conferences are primarily networking events with papers attached. Where you publish matters less than who you meet there.",
      "Most PhD students don't finish their PhDs. The drop-off rate at top US programs is 30–40%. Research this before committing 5 years.",
      "Open-source implementation of your paper is now expected, not optional, at top venues. Plan for it in your project timeline.",
    ],
    communityResources: [
      {
        title: "How to Read a Paper — S. Keshav",
        type: "paper",
        upvotes: 412,
        isHighSignal: true,
        recommendedBy: "deep_lab",
        description: "3-pass reading method. The standard framework for systematic literature review.",
      },
      {
        title: "Semantic Scholar",
        type: "tool",
        upvotes: 298,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Better citation graphs than Google Scholar. Use the similarity feature to find adjacent work.",
        url: "https://semanticscholar.org",
      },
      {
        title: "Overleaf — LaTeX Editor",
        type: "tool",
        upvotes: 234,
        isHighSignal: false,
        recommendedBy: "systems_ghost",
        description: "Master LaTeX before your first paper submission. Use the NeurIPS template specifically.",
        url: "https://overleaf.com",
      },
    ],
    threads: [
      {
        id: "res-t1",
        topic: "How do you know if a research direction is truly novel?",
        responses: 54,
        lastActive: "22m ago",
      },
      {
        id: "res-t2",
        topic: "Professor who barely responds vs. no professor — which is worse?",
        responses: 39,
        lastActive: "3h ago",
      },
      {
        id: "res-t3",
        topic: "What's the best cold email template that actually got responses?",
        responses: 96,
        lastActive: "15m ago",
      },
    ],
    rewardProfile: {
      learningCurve: 75,
      burnoutRisk: 68,
      salaryPotential: 72,
      uncertainty: 88,
      depthRequired: 85,
      yearsToMastery: "5–8 years",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // PATH-03 — STARTUP
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-03",
    code: "STARTUP",
    title: "Startup Track",
    timeline: "12–18 months",
    color: "#f59e0b",
    desc: "How to actually build and ship. Avoiding campus startup theater and finding real users.",
    skills: ["Full Stack", "GTM Strategy", "User Research", "Rapid Iteration", "Analytics Integration"],
    activeOperators: 224,
    totalSignals: 1102,
    roadmap: [
      "Month 1–2: Talk to 50 prospective users about their specific friction points (no pitch, just listen).",
      "Month 3–4: Build a hyper-focused MVP using Next.js/Supabase in 3 weeks. Do not over-engineer.",
      "Month 5–8: Launch to a closed community group, install analytics, and iterate weekly on user logs.",
      "Month 9–12: Drive acquisition to find early monetization (even if it's 50 users paying 100 INR).",
      "Month 13–18: Scale distribution channels or raise micro-grant funding if growth rates stay steady.",
    ],
    traps: [
      "Spending 6 months building a complex backend system before getting a single user sign-up",
      "Winning college pitch competitions instead of talking to real paying customers",
      "Co-founder disputes; writing verbal agreements without a clear vesting schedule.",
    ],
    projectProgression: [
      "Level 1: Launch a landing page with a waitlist form and drive 100 sign-ups via organic posting.",
      "Level 2: Build a basic SaaS MVP containing auth, database tables, stripe/payment gateways, and core loop.",
      "Level 3: Onboard 5 real active users who are not your hostel friends and analyze their session logs.",
      "Level 4: Reach monetization (first invoice paid) or 50+ monthly active users.",
    ],
    internshipStrategy: "Work at a fast-growing, venture-backed startup (5–20 employees) as an early engineer. Reach out directly to founders on Twitter or Y Combinator directory with a list of bugs you found in their product and code snippets to fix them.",
    signals: [
      {
        id: "st-sig-1",
        operator: "bootstrap_kid",
        institute: "BITS Pilani",
        timestamp: "30m ago",
        content: "Spent 4 months building the 'perfect' product. Launched to 0 users. Rebuilt in 2 weeks based on 10 user interviews. Got 40 sign-ups in day 1. Talking to users is not optional. It is the product.",
        tags: ["users", "MVP", "mistake"],
        upvotes: 387,
        saves: 142,
      },
      {
        id: "st-sig-2",
        operator: "anonymous_operator",
        institute: "IIT Kharagpur",
        timestamp: "3h ago",
        content: "Campus startup culture celebrates pitching, not building. Won 3 competitions, had 0 real users. The competition organizers have never built a company. Stop optimizing for their approval.",
        tags: ["startup theater", "pitching", "reality"],
        upvotes: 298,
        saves: 110,
      },
      {
        id: "st-sig-3",
        operator: "quant_lab",
        institute: "BITS Pilani",
        timestamp: "8h ago",
        content: "First paying customer took 6 months. Second took 2 weeks. Third took 3 days. Distribution compounds faster than technology. Most startups that fail had good tech and no distribution.",
        tags: ["distribution", "sales", "growth"],
        upvotes: 234,
        saves: 87,
      },
    ],
    realityCheckpoints: [
      {
        expected: "I'll build a viral app that gets 10,000 users in a month.",
        reality: "Getting 10 real users who use your product weekly takes 3 months of iteration and rejection.",
      },
      {
        expected: "The idea is the hardest part.",
        reality: "The idea is the easiest part. Execution, distribution, and retention are where 95% of startups break.",
      },
      {
        expected: "I'll raise funding once the MVP is ready.",
        reality: "Pre-seed investors want traction. Traction means real users, real retention, or real revenue — not a polished slide deck.",
      },
      {
        expected: "My co-founder is my best friend — no need for formal agreements.",
        reality: "Co-founder conflicts are the #1 cause of early startup death. Write a vesting agreement in month 1, regardless of how aligned you feel.",
      },
    ],
    failurePoints: [
      {
        pattern: "Building in stealth for 6+ months before showing users",
        severity: "CRITICAL",
        avoidance: "Ship something embarrassing in week 3. The embarrassment is data. Secrecy is just fear.",
      },
      {
        pattern: "Campus pitch competition optimization",
        severity: "HIGH",
        avoidance: "Competitions select for presentation skill, not market fit. Use the time to find your 10th user instead.",
      },
      {
        pattern: "Over-engineering the tech stack before finding product-market fit",
        severity: "HIGH",
        avoidance: "Next.js + Supabase + Stripe. That's your stack. Until 1000 users, technical architecture doesn't matter.",
      },
      {
        pattern: "Verbal co-founder agreements with no equity documentation",
        severity: "CRITICAL",
        avoidance: "Write a simple vesting agreement. 4-year vest, 1-year cliff. Do it in week 1. Relationships survive documents.",
      },
      {
        pattern: "Ignoring analytics after launch",
        severity: "MEDIUM",
        avoidance: "Install PostHog or Mixpanel on day 1. Watch every session recording. Your data tells you what users won't.",
      },
    ],
    compatibility: {
      thrives: [
        "Comfortable with ambiguity and changing direction weekly based on data",
        "Gets energy from talking to users and finding unmet needs",
        "Can ship imperfect work and iterate — perfectionism is dangerous here",
        "High pain tolerance — enjoys the chaos of early-stage building",
        "Comfortable with financial uncertainty and delayed rewards",
      ],
      struggles: [
        "Needs a structured environment with clear tasks and deadlines",
        "Gets emotionally attached to ideas rather than outcomes",
        "Needs external validation before taking action",
        "Uncomfortable with sales and direct user conversations",
        "Wants work-life balance in Year 1 of building",
      ],
    },
    nobodyTellsYou: [
      "The best startups look stupid in the beginning. If your idea sounds obviously good, it's probably already been built by someone with more resources.",
      "Your first 3 co-founders will likely not be your co-founders at Series A. This is normal. Plan for it legally from day 1.",
      "Indian startup ecosystem gives founders an asymmetric advantage for India-specific problems that Silicon Valley founders will never understand.",
      "Distribution is a skill you can build before your product exists. Start your audience before you need it.",
      "Most successful startup founders failed 1–3 times first. Failure is curriculum, not disqualification.",
    ],
    communityResources: [
      {
        title: "The Mom Test — Rob Fitzpatrick",
        type: "book",
        upvotes: 521,
        isHighSignal: true,
        recommendedBy: "bootstrap_kid",
        description: "How to talk to customers without them lying to make you feel good. Required reading before any user interview.",
      },
      {
        title: "Y Combinator Startup School",
        type: "course",
        upvotes: 398,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Free. The actual YC curriculum. Watch the Paul Graham lectures specifically.",
        url: "https://startupschool.org",
      },
      {
        title: "Supabase",
        type: "tool",
        upvotes: 267,
        isHighSignal: true,
        recommendedBy: "quant_lab",
        description: "Auth + database + storage in one. Ship your MVP backend in an afternoon.",
        url: "https://supabase.com",
      },
    ],
    threads: [
      {
        id: "st-t1",
        topic: "How do you find your first 10 users who aren't your friends?",
        responses: 74,
        lastActive: "12m ago",
      },
      {
        id: "st-t2",
        topic: "Campus incubators — worth it or startup theater?",
        responses: 58,
        lastActive: "1h ago",
      },
      {
        id: "st-t3",
        topic: "What analytics actually matter before 1000 users?",
        responses: 41,
        lastActive: "4h ago",
      },
    ],
    rewardProfile: {
      learningCurve: 60,
      burnoutRisk: 85,
      salaryPotential: 78,
      uncertainty: 95,
      depthRequired: 55,
      yearsToMastery: "2–4 years",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // PATH-04 — QUANT
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-04",
    code: "QUANT",
    title: "Quant Explorer",
    timeline: "18–30 months",
    color: "#10b981",
    desc: "The most misunderstood and rewarding path. Probability, markets, and the mathematics of everything.",
    skills: ["Probability", "Statistics", "C++/Python", "Financial Mathematics", "Stochastic Calculus"],
    activeOperators: 87,
    totalSignals: 412,
    roadmap: [
      "Month 1–4: Probability theory depth (conditional expectations, martingales, Markov chains).",
      "Month 5–8: Master low-level C++ systems programming, data structures, and memory alignments.",
      "Month 9–14: Backtesting theory (historical regressions, transaction costs, slippage modelling).",
      "Month 15–18: Grind competitive programming to pass high-speed technical screens.",
      "Month 19–30: Quant analyst internship or systematic trading desk position.",
    ],
    traps: [
      "Underestimating the mathematical rigor (you need graduate-level stats, not basic ML)",
      "Trading retail capital on indicators (HFT firms ignore moving averages completely)",
      "Writing slow code; Python loops will not pass speed latency filters.",
    ],
    projectProgression: [
      "Level 1: Code a high-speed backtester in C++ that processes historical CSV data without memory leaks.",
      "Level 2: Implement a statistical arbitrage model (pairs trading) on historical equity data.",
      "Level 3: Write an order-book simulator processing L2 limit order book data and matching trades.",
      "Level 4: Optimize a C++ routine using vectorization (AVX/SIMD) to decrease execution latency.",
    ],
    internshipStrategy: "Grind math puzzles (Green Book) and competitive programming. Target boutique market-making firms and HFT desks. Use LinkedIn to connect with alumni who are quant researchers and ask them for a mock interview.",
    signals: [
      {
        id: "q-sig-1",
        operator: "quant_lab",
        institute: "BITS Pilani",
        timestamp: "2h ago",
        content: "Quant interviews are not finance interviews. They test probability puzzles, brain teasers, and C++ knowledge. You will never be asked to value a stock. Study Heard on the Street, not Wall Street Journal.",
        tags: ["interviews", "quant", "preparation"],
        upvotes: 198,
        saves: 74,
      },
      {
        id: "q-sig-2",
        operator: "anonymous_operator",
        institute: "IIT Delhi",
        timestamp: "6h ago",
        content: "Failed Jane Street OA twice. Third attempt passed after 4 months of probability grind. Conditional expectation problems are the bar. If you can't solve Fitch interview puzzles, you're not ready.",
        tags: ["Jane Street", "OA", "preparation"],
        upvotes: 287,
        saves: 103,
      },
    ],
    realityCheckpoints: [
      {
        expected: "Quant is about understanding financial markets and trading strategies.",
        reality: "Entry-level quant is 80% math puzzles, probability problems, and C++ optimization. Markets come much later.",
      },
      {
        expected: "I can learn quant by paper trading on Zerodha.",
        reality: "Retail trading has no overlap with quant research. HFT firms operate on microsecond latency. Your indicators are noise to them.",
      },
      {
        expected: "High compensation means low competition.",
        reality: "Quant is the most filtered path on this list. The screens are designed to eliminate 99% of applicants who aren't genuinely exceptional at math.",
      },
    ],
    failurePoints: [
      {
        pattern: "Treating quant as a finance problem, not a math problem",
        severity: "CRITICAL",
        avoidance: "You need graduate-level probability and statistics before touching any financial data. The math is the job.",
      },
      {
        pattern: "Paper trading and technical analysis as 'quant' preparation",
        severity: "CRITICAL",
        avoidance: "HFT and systematic funds don't use retail indicators. Study stochastic calculus and probability theory instead.",
      },
      {
        pattern: "Slow Python code in a speed-critical field",
        severity: "HIGH",
        avoidance: "Master C++ fundamentals, memory management, and vectorization. Python is for prototyping, not production quant systems.",
      },
      {
        pattern: "Skipping competitive programming",
        severity: "HIGH",
        avoidance: "Quant OAs are essentially hard CP problems with probability twists. 6 months of LeetCode hard + Codeforces is non-negotiable.",
      },
    ],
    compatibility: {
      thrives: [
        "Genuinely loves mathematics as a subject, not as a tool",
        "Competitive programmer who solves problems for intrinsic satisfaction",
        "Enjoys low-level C++ optimization and systems thinking",
        "Patient with long preparation cycles — 18 months before first relevant interview",
        "Comfortable with high variance outcomes — many brilliant candidates don't make it",
      ],
      struggles: [
        "Interested in finance primarily for compensation, not for the math",
        "Prefers high-level abstractions over low-level systems work",
        "Needs frequent reassurance that the path is viable",
        "Uncomfortable with zero application feedback for months",
        "Wants to understand markets before understanding probability",
      ],
    },
    nobodyTellsYou: [
      "The quant pipeline has one of the lowest success rates of any technical career in India. For every student who makes it, 50 qualified ones don't. This is not discouragement — it's calibration.",
      "The compensation at top quant firms (Optiver, Jane Street, Citadel) is 5–10x software engineering. This is why the filters are extreme.",
      "Most quant candidates who fail do so at the OA stage — not for lack of intelligence, but for lack of 6 months of dedicated puzzle grinding.",
      "India quant recruitment is dominated by IIT students with math olympiad backgrounds. If you don't have that, you need demonstrably superior preparation.",
    ],
    communityResources: [
      {
        title: "Heard on the Street — Timothy Falcon Crack",
        type: "book",
        upvotes: 387,
        isHighSignal: true,
        recommendedBy: "quant_lab",
        description: "The standard quant puzzle book. Every interview question in this book has appeared in real OAs.",
      },
      {
        title: "A Practical Guide to Quant Finance Interviews — Xinfeng Zhou",
        type: "book",
        upvotes: 312,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Probability, stochastic processes, and brainteasers. Do every problem.",
      },
      {
        title: "Project Euler",
        type: "tool",
        upvotes: 198,
        isHighSignal: false,
        recommendedBy: "quant_lab",
        description: "Math-heavy coding problems. Better quant prep than LeetCode for mathematical intuition.",
        url: "https://projecteuler.net",
      },
    ],
    threads: [
      {
        id: "q-t1",
        topic: "Realistic timeline from zero to passing a Jane Street OA?",
        responses: 62,
        lastActive: "45m ago",
      },
      {
        id: "q-t2",
        topic: "C++ resources specifically for quant — not generic programming",
        responses: 38,
        lastActive: "3h ago",
      },
    ],
    rewardProfile: {
      learningCurve: 95,
      burnoutRisk: 78,
      salaryPotential: 98,
      uncertainty: 82,
      depthRequired: 96,
      yearsToMastery: "3–5 years",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // PATH-05 — CORE ENGINEERING
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-05",
    code: "CORE ENGG",
    title: "Core Engineering",
    timeline: "4 years",
    color: "#f43f5e",
    desc: "Reclaiming the depth of your actual degree. Engineers who go deep get noticed when everyone else is shallow.",
    skills: ["Domain Mastery", "Industry Projects", "Core Research", "Professional Certifications", "Simulation Tools"],
    activeOperators: 112,
    totalSignals: 534,
    roadmap: [
      "Year 1: Master foundational math & physics concepts deeply. Ignore average grades, study structural mechanics.",
      "Year 2: Identify the intersection of your core field + software (e.g. CFD, CAD scripting, FEM scripting).",
      "Year 3: Build major physical or simulation projects. Participate in national design competitions.",
      "Year 4: Core industrial placement, research fellowship, or domain-specialized corporate career.",
    ],
    traps: [
      "Abandoning your core degree for generic IT jobs because 'everyone codes'",
      "Relying purely on college labs which use obsolete 2010 software tools",
      "Failing to learn programming; even core engineering requires script automation.",
    ],
    projectProgression: [
      "Level 1: Script a numerical solver (e.g. Runge-Kutta) in Python to model a physical system's dynamics.",
      "Level 2: Design a complex component in SolidWorks/Autodesk, run detailed FEA/CFD analysis, and log constraints.",
      "Level 3: Build a functional physical prototype (e.g. custom telemetry circuit, mechanical arm, thermal model).",
      "Level 4: Run hardware-in-the-loop (HIL) testing and benchmark simulation models against experimental results.",
    ],
    internshipStrategy: "Target R&D centers of heavy industrials or research labs. Skip standard IT placement presentations. Send a technical project portfolio (videos/plots of simulations) to research engineers on LinkedIn.",
    signals: [
      {
        id: "ce-sig-1",
        operator: "systems_ghost",
        institute: "IIT Delhi",
        timestamp: "3h ago",
        content: "Mechanical engineer who learned CFD scripting in ANSYS + Python. Got placed in an aerospace R&D role that CS students can't compete for. Deep domain knowledge + software = protected niche. Don't abandon your core degree.",
        tags: ["domain depth", "niche", "differentiation"],
        upvotes: 234,
        saves: 88,
      },
      {
        id: "ce-sig-2",
        operator: "anonymous_operator",
        institute: "NIT Trichy",
        timestamp: "1d ago",
        content: "Core engineering jobs in India pay less than software at graduation. Long term: ISRO, DRDO, L&T, Boeing R&D pay competitively with equity and stability. Optimize for trajectory, not Year 1 package.",
        tags: ["salary", "trajectory", "core jobs"],
        upvotes: 187,
        saves: 65,
      },
    ],
    realityCheckpoints: [
      {
        expected: "Core engineering degree means a core engineering job.",
        reality: "60% of core engineering graduates at IITs end up in software or consulting. The core path requires deliberate positioning.",
      },
      {
        expected: "Lab work in college prepares you for industry.",
        reality: "Most college labs use decade-old software. Industry uses ANSYS, SolidWorks, and MATLAB at versions your college hasn't licensed.",
      },
    ],
    failurePoints: [
      {
        pattern: "Switching to software out of peer pressure rather than genuine interest",
        severity: "HIGH",
        avoidance: "Software from a core branch puts you in a crowded pool without CS fundamentals. Going deep in your domain creates a rare skill intersection.",
      },
      {
        pattern: "Ignoring the software intersection of your domain",
        severity: "HIGH",
        avoidance: "Every core field has a software layer (CFD for fluids, FEM for structures, SPICE for electronics). Master it — few do.",
      },
      {
        pattern: "Relying exclusively on campus labs and placements",
        severity: "MEDIUM",
        avoidance: "Self-source industry software tools. Build projects outside campus labs. Industry exposure before Year 4 is non-negotiable.",
      },
    ],
    compatibility: {
      thrives: [
        "Genuinely curious about the physical world — how things are built and why they break",
        "Patient with long feedback cycles — physical prototypes take weeks, not hours",
        "Enjoys the intersection of math, physics, and engineering constraints",
        "Comfortable with smaller, more specialized career communities",
        "Values depth and domain expertise over breadth",
      ],
      struggles: [
        "Primarily motivated by software industry compensation comparisons",
        "Needs fast feedback and rapid iteration cycles",
        "Uncomfortable with the specialized nature of core engineering communities",
        "Wants to work in a large, visible tech company rather than an industrial R&D context",
      ],
    },
    nobodyTellsYou: [
      "The students who go deep in core engineering and add a software layer (automation, simulation scripting, embedded systems) become extraordinarily rare and well-compensated after 5 years.",
      "DRDO, ISRO, and defense PSUs have exceptional job security, research exposure, and a genuinely high-impact mission that private sector rarely offers.",
      "German, Japanese, and Korean MNCs (Siemens, Bosch, Toyota R&D) actively recruit from Indian core engineering programs and often pay in EUR/USD for India postings.",
    ],
    communityResources: [
      {
        title: "MIT OpenCourseWare — Core Engineering Tracks",
        type: "course",
        upvotes: 298,
        isHighSignal: true,
        recommendedBy: "systems_ghost",
        description: "Free. Graduate-level depth. Far superior to most Indian university curriculum.",
        url: "https://ocw.mit.edu",
      },
      {
        title: "OpenFOAM — CFD Library",
        type: "repo",
        upvotes: 187,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Industry-standard open-source CFD. Mastering this creates rare employability.",
        url: "https://openfoam.org",
      },
    ],
    threads: [
      {
        id: "ce-t1",
        topic: "Is it worth staying in core engineering or switching to software?",
        responses: 89,
        lastActive: "20m ago",
      },
      {
        id: "ce-t2",
        topic: "Which core engineering intersection with software has the highest ROI?",
        responses: 47,
        lastActive: "2h ago",
      },
    ],
    rewardProfile: {
      learningCurve: 70,
      burnoutRisk: 50,
      salaryPotential: 65,
      uncertainty: 55,
      depthRequired: 80,
      yearsToMastery: "4–6 years",
    },
  },

  // ────────────────────────────────────────────────────────────────────────
  // PATH-06 — ACADEMIC
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "PATH-06",
    code: "ACADEMIC",
    title: "Academic Pathway",
    timeline: "5–7 years",
    color: "#8b5cf6",
    desc: "Choosing the academic pipeline deliberately — with eyes open, not as a fallback option.",
    skills: ["GATE/GRE Prep", "SOP Writing", "Lab Research", "Teaching Assistance", "Grant Writing"],
    activeOperators: 94,
    totalSignals: 387,
    roadmap: [
      "Sem 1–4: Maintain a near-perfect GPA (9.5+). Academia filters heavily by scores initially.",
      "Sem 5–6: Identify 2 target sub-fields, read faculty profiles, and join a research lab as an undergrad researcher.",
      "Sem 7–8: Draft Statement of Purpose (SOP), secure 3 strong Letters of Recommendation (LORs) from active PIs.",
      "Year 5: Prepare for GATE/GRE/TOEFL and submit detailed applications to top-tier international PhD programs.",
      "Year 6–7: PhD candidate coursework, research qualifying exams, and early conference publications.",
    ],
    traps: [
      "Treating GPA as optional (low GPA instantly disqualifies you from top US/European graduate schools)",
      "Asking for LORs from professors who barely know you",
      "Joining PhD programs without full financial fellowships/stipends.",
    ],
    projectProgression: [
      "Level 1: Review 20 PhD dissertations in your field to understand thesis scope and formatting.",
      "Level 2: Secure a co-authored publication or workshop paper under a senior faculty member.",
      "Level 3: Write a primary research thesis proposal containing initial data and reference literature.",
      "Level 4: Present your undergrad thesis at an academic conference or submit to a peer-reviewed journal.",
    ],
    internshipStrategy: "Target summer research fellowships at IITs, IISc, or international labs (DAAD, Mitacs, Viterbi). Write a specific email outlining your interest in the PI's research questions.",
    signals: [
      {
        id: "ac-sig-1",
        operator: "deep_lab",
        institute: "IIT Madras",
        timestamp: "5h ago",
        content: "Got into MIT PhD program. GPA was 9.8. But GPA alone didn't do it — I had 2 publications, a workshop paper, and a strong research proposal. GPA is the entry ticket. Research is the passport.",
        tags: ["PhD", "admission", "publications"],
        upvotes: 312,
        saves: 118,
      },
      {
        id: "ac-sig-2",
        operator: "anonymous_operator",
        institute: "IIT Bombay",
        timestamp: "2d ago",
        content: "US PhD stipends are $30,000–$50,000 USD. Fully funded means zero tuition + stipend. This is the standard at top-50 programs. Never pay for a PhD. If they're asking you to pay, they don't want you enough.",
        tags: ["funding", "stipend", "PhD reality"],
        upvotes: 428,
        saves: 156,
      },
    ],
    realityCheckpoints: [
      {
        expected: "A PhD is a natural extension of being a good student.",
        reality: "A PhD is a 5-year independent research project. Being good at coursework predicts almost nothing about research ability.",
      },
      {
        expected: "I'll get a PhD and become a professor.",
        reality: "Less than 15% of PhD graduates in CS become professors. The academic job market is extremely competitive. Know your Plan B.",
      },
      {
        expected: "My advisor will mentor me through the PhD.",
        reality: "Most PhD advisors are primarily focused on their own research grants. Self-directedness is the #1 PhD survival trait.",
      },
    ],
    failurePoints: [
      {
        pattern: "Choosing a PhD as a default — 'I don't know what else to do'",
        severity: "CRITICAL",
        avoidance: "A PhD requires genuine intellectual obsession with a specific problem. Uncertainty is fine. Absence of curiosity is not.",
      },
      {
        pattern: "Joining a PhD program without full funding",
        severity: "CRITICAL",
        avoidance: "Never pay for a PhD in STEM. Funded positions exist. If they won't fund you, find a program that will.",
      },
      {
        pattern: "Generic LORs from professors who don't know your work",
        severity: "HIGH",
        avoidance: "Work directly with 2–3 professors for 6+ months each. A specific letter beats a famous name every time.",
      },
      {
        pattern: "Applying too broadly without geographic or field focus",
        severity: "MEDIUM",
        avoidance: "Apply to 12–18 programs with personalized SOPs naming specific professors and their research. Generic applications fail.",
      },
    ],
    compatibility: {
      thrives: [
        "Has a specific intellectual question that genuinely obsesses them — not just a field",
        "Comfortable with 5+ years of low-pay, high-autonomy, uncertain progress",
        "Gets energy from explaining ideas to others — teaching is part of the PhD",
        "Reads papers for fun and has a mental map of a sub-field",
        "Resilient to rejection — papers get rejected, grants get rejected, positions get rejected",
      ],
      struggles: [
        "Wants financial stability and predictable career progression",
        "Motivated primarily by status rather than specific intellectual problems",
        "Uncomfortable with the idea of 5 years producing potentially zero useful output",
        "Needs external structure to maintain motivation and productivity",
        "Wants immediate impact and visible results",
      ],
    },
    nobodyTellsYou: [
      "The PhD attrition rate at top US programs is 30–40%. Half of those who leave cite advisor relationship as the primary reason. Choose your advisor more carefully than your program.",
      "A US PhD with a fellowship is one of the most financially rational decisions a top Indian student can make — free education + stipend + US work visa pathway.",
      "Publishing during your undergrad is worth more than any other single credential in PhD applications. One workshop paper puts you above 80% of applicants.",
      "Mental health during PhD is a serious, documented crisis. 40% of PhD students report depression or anxiety symptoms. Build your support system before you need it.",
    ],
    communityResources: [
      {
        title: "Advice to a Young Scientist — P.B. Medawar",
        type: "book",
        upvotes: 234,
        isHighSignal: true,
        recommendedBy: "deep_lab",
        description: "Short. Essential. What research actually requires as a person.",
      },
      {
        title: "PhD Stipends Database",
        type: "tool",
        upvotes: 312,
        isHighSignal: true,
        recommendedBy: "anonymous_operator",
        description: "Crowdsourced PhD stipend data by program. Verify funding before applying.",
        url: "https://www.phdstipends.com",
      },
      {
        title: "Google Scholar Alerts",
        type: "tool",
        upvotes: 187,
        isHighSignal: false,
        recommendedBy: "deep_lab",
        description: "Set alerts for your target research keywords. Stay current with your target sub-field before applying.",
        url: "https://scholar.google.com",
      },
    ],
    threads: [
      {
        id: "ac-t1",
        topic: "What GPA is the actual cutoff for top-10 US PhD programs?",
        responses: 67,
        lastActive: "18m ago",
      },
      {
        id: "ac-t2",
        topic: "How do you know if your PhD advisor is good before committing?",
        responses: 84,
        lastActive: "1h ago",
      },
      {
        id: "ac-t3",
        topic: "DAAD vs Mitacs vs Viterbi — which fellowship is worth applying to?",
        responses: 45,
        lastActive: "6h ago",
      },
    ],
    rewardProfile: {
      learningCurve: 72,
      burnoutRisk: 80,
      salaryPotential: 68,
      uncertainty: 90,
      depthRequired: 88,
      yearsToMastery: "6–10 years",
    },
  },
];
