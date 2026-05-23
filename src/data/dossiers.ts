// ─────────────────────────────────────────────────────────────────────────────
// OPERATIONAL DOSSIERS — Living intelligence database
// Replaces static "System Files" with community-powered tactical knowledge hubs
// ─────────────────────────────────────────────────────────────────────────────

export type VerificationLevel =
  | "VERIFIED SIGNAL"
  | "FIELD CONFIRMED"
  | "MULTI-OPERATOR CONFIRMED";

export type ResourceType = "book" | "course" | "repo" | "tool" | "paper";
export type FrequencyLevel = "HIGH" | "MEDIUM" | "LOW";
export type DossierTag =
  | "burnout"
  | "placements"
  | "AI systems"
  | "research"
  | "internships"
  | "academics"
  | "hostel"
  | "professor intel"
  | "branch realities"
  | "coding"
  | "ideology";

export interface DossierSignal {
  id: string;
  content: string;
  operator: string;
  institution: string;
  timestamp: string;
  verificationLevel: VerificationLevel;
  resonances: number;
}

export interface FailurePattern {
  pattern: string;
  frequency: FrequencyLevel;
  recovery: string;
}

export interface ResourceDrop {
  title: string;
  type: ResourceType;
  url?: string;
  description: string;
}

export interface DossierThread {
  id: string;
  question: string;
  responses: number;
  lastActive: string;
}

export interface Dossier {
  id: string;
  title: string;
  tag: string;
  color: string;
  summary: string;
  tags: DossierTag[];
  activeOperators: number;
  archivedSignals: number;
  lastUpdated: string;
  isPhilosophy?: boolean;
  signals: DossierSignal[];
  failurePatterns: FailurePattern[];
  tacticalGuidance: string[];
  recoverySystems: string[];
  resourceDrops: ResourceDrop[];
  threads: DossierThread[];
}

export const dossiers: Dossier[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // DOS-001 — BURNOUT RECOVERY DOSSIER
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-001",
    title: "Burnout Recovery Dossier",
    tag: "PSYCHOLOGICAL",
    color: "#8b5cf6",
    summary:
      "Burnout is not a personal weakness — it is a systemic output of sustained high-pressure environments without adequate recovery infrastructure. This dossier maps progression patterns, hostel isolation signals, and operator-verified recovery systems.",
    tags: ["burnout", "hostel", "academics"],
    activeOperators: 214,
    archivedSignals: 847,
    lastUpdated: "4m ago",
    signals: [
      {
        id: "sig-001-1",
        content:
          "Sem 5 hit differently. I stopped attending classes by week 3. Not laziness — genuine dissociation. I couldn't feel anything about code. Took me 6 weeks of deliberately doing nothing to come back. The system has zero protocol for this.",
        operator: "systems_ghost",
        institution: "IIT Delhi",
        timestamp: "2 days ago",
        verificationLevel: "VERIFIED SIGNAL",
        resonances: 284,
      },
      {
        id: "sig-001-2",
        content:
          "The burnout didn't hit during exams. It hit during the summer break when I finally stopped and realized I had no idea who I was outside of competitive performance. That silence was terrifying.",
        operator: "anonymous_operator",
        institution: "IIT Madras",
        timestamp: "5 days ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 412,
      },
      {
        id: "sig-001-3",
        content:
          "Sleep debt is compounding. 5 hours for 3 months straight rewired my emotional responses. I became irritable, anxious, disconnected. Fixed it with one rule: 7.5 hours non-negotiable. Everything else improved downstream.",
        operator: "quant_lab",
        institution: "BITS Pilani",
        timestamp: "1 week ago",
        verificationLevel: "FIELD CONFIRMED",
        resonances: 196,
      },
      {
        id: "sig-001-4",
        content:
          "Campus mental health centers are box-checking operations. The counselor had 400 students assigned. Real help came from other students who had survived it. This platform is what the counseling center should be.",
        operator: "deep_lab",
        institution: "IIT Bombay",
        timestamp: "3 days ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 338,
      },
    ],
    failurePatterns: [
      {
        pattern: "Pushing through burnout with more productivity systems",
        frequency: "HIGH",
        recovery: "Intentional 2-week non-optimization period. No tracking, no goals.",
      },
      {
        pattern: "Isolating in hostel room during breakdown phases",
        frequency: "HIGH",
        recovery: "Force one social interaction per day. Minimum — one meal with another human.",
      },
      {
        pattern: "Treating burnout as a scheduling problem",
        frequency: "MEDIUM",
        recovery: "Recognize it as a biological recovery requirement. Not a calendar fix.",
      },
      {
        pattern: "Returning to full intensity immediately after short break",
        frequency: "HIGH",
        recovery: "Gradual ramp. 50% effort for 2 weeks post-recovery before returning to full load.",
      },
    ],
    tacticalGuidance: [
      "Track sleep as the primary health metric — everything else follows",
      "Identify your personal burnout early-warning signal (irritability, appetite loss, social withdrawal) before full collapse",
      "Separate your identity from your output — you are not your GPA or your GitHub commits",
      "One 20-minute walk per day has measurable cognitive recovery effects — not motivation content, documented physiology",
      "Semester 5 and Semester 7 are statistically the highest burnout concentration points — prepare specifically",
      "The most productive students operate at 70% sustained intensity, not 100% sprint cycles",
    ],
    recoverySystems: [
      "Sleep repair protocol: 8 hours for 21 consecutive days before evaluating productivity",
      "Dopamine detox: remove all performance-comparison inputs for 2 weeks (LinkedIn, rankings, placement news)",
      "Physical anchor: daily 30-minute outdoor activity regardless of workload state",
      "Social re-entry: one real conversation per day with someone not discussing academics",
      "Creative outlet activation: anything non-evaluative — drawing, cooking, music — for neural pathway reset",
      "Incremental rebuild: return to work in 2-hour focused blocks, not full 10-hour sessions",
    ],
    resourceDrops: [
      {
        title: "Why Zebras Don't Get Ulcers — Robert Sapolsky",
        type: "book",
        description: "Biology of chronic stress. Explains what sustained pressure does to the body and mind.",
      },
      {
        title: "Burnout: The Secret to Unlocking the Stress Cycle — Emily Nagoski",
        type: "book",
        description: "Practical physiological completion mechanisms for stress cycles.",
      },
      {
        title: "iCall — TISS mental health helpline",
        type: "tool",
        url: "https://icallhelpline.org",
        description: "Free confidential counseling specifically for Indian students.",
      },
      {
        title: "Huberman Lab — Sleep Toolkit",
        type: "tool",
        description: "Andrew Huberman's evidence-based sleep optimization protocols.",
      },
    ],
    threads: [
      {
        id: "t-001-1",
        question: "How do you tell the difference between laziness and actual burnout?",
        responses: 47,
        lastActive: "12m ago",
      },
      {
        id: "t-001-2",
        question: "Has anyone successfully taken a medical leave and returned without consequences?",
        responses: 23,
        lastActive: "2h ago",
      },
      {
        id: "t-001-3",
        question: "What was your first sign that you were entering burnout before full collapse?",
        responses: 89,
        lastActive: "5m ago",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOS-002 — PLACEMENT INTELLIGENCE DOSSIER
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-002",
    title: "Placement Intelligence Dossier",
    tag: "CAREER",
    color: "#00f0ff",
    summary:
      "Placement season is a performance. The median package hides a wide distribution. This dossier decrypts actual in-hand compensation, bond clause realities, off-campus pathways, and what actually happens after Day 1 offers.",
    tags: ["placements", "internships", "coding"],
    activeOperators: 389,
    archivedSignals: 1204,
    lastUpdated: "2m ago",
    signals: [
      {
        id: "sig-002-1",
        content:
          "The '24 LPA package' becomes ~1.2L in-hand monthly after TDS, PF, and professional tax. The college announcement says 24. Nobody says 14.4 net. Learn to reverse-engineer CTC to in-hand before evaluating any offer.",
        operator: "quant_lab",
        institution: "BITS Pilani",
        timestamp: "1 day ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 634,
      },
      {
        id: "sig-002-2",
        content:
          "I had a 3-year bond clause buried in page 11 of my offer letter. ₹8 lakh penalty for early exit. My placement cell confirmed 'it's standard.' It was not standard. Read every clause before signing.",
        operator: "anonymous_operator",
        institution: "NIT Trichy",
        timestamp: "3 days ago",
        verificationLevel: "VERIFIED SIGNAL",
        resonances: 512,
      },
      {
        id: "sig-002-3",
        content:
          "Off-campus through a GitHub portfolio + cold outreach got me 40% higher than my on-campus best offer. The college placement system optimizes for volume, not your specific outcome. Parallel-track it.",
        operator: "systems_ghost",
        institution: "IIT Delhi",
        timestamp: "6 days ago",
        verificationLevel: "FIELD CONFIRMED",
        resonances: 287,
      },
      {
        id: "sig-002-4",
        content:
          "Dream companies in IIT placement season often have fantasy offer-to-join ratios. 60% of 'placed' students from my batch had not joined the company 3 months after graduation. The placed count is a vanity metric.",
        operator: "deep_lab",
        institution: "IIT Bombay",
        timestamp: "4 days ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 445,
      },
    ],
    failurePatterns: [
      {
        pattern: "Trusting CTC figures without computing in-hand breakdown",
        frequency: "HIGH",
        recovery: "Always calculate: CTC minus ~30–35% for deductions = approximate in-hand.",
      },
      {
        pattern: "Signing offer letters without reading bond and exit clauses",
        frequency: "HIGH",
        recovery: "Flag any clause beyond 1-year bond. Get specifics in writing before Day 1.",
      },
      {
        pattern: "Abandoning off-campus preparation after an on-campus offer",
        frequency: "MEDIUM",
        recovery: "Keep off-campus pipeline active until joining date. Offers fall through.",
      },
      {
        pattern: "Preparing exclusively for placement-season coding patterns",
        frequency: "HIGH",
        recovery: "Build real projects. Interviewers at top companies recognize LeetCode-only candidates immediately.",
      },
      {
        pattern: "Comparing offers across companies without role adjustment",
        frequency: "MEDIUM",
        recovery: "Growth trajectory, tech stack, and team matter more than Year 1 CTC for long-term outcome.",
      },
    ],
    tacticalGuidance: [
      "Start off-campus outreach 12 months before placement season — not during",
      "Build a portfolio of 2–3 genuine projects with documented outcomes before interview season",
      "Understand the difference between Product, Service, and Consulting company compensation structures",
      "FAANG-equivalent hiring happens more through referrals than college placement — build those networks early",
      "The students who get top offers have been doing DSA consistently for 12+ months, not cramming for 6 weeks",
      "Research each company's actual engineering culture before accepting — Glassdoor India data is useful but incomplete",
      "Negotiate every offer — even IIT placement cells allow negotiation more than they advertise",
    ],
    recoverySystems: [
      "If you missed placement season: off-campus applications via LinkedIn, AngelList, direct company portals",
      "If you got a low offer: evaluate 18-month trajectory, not Year 1 package — many top companies hire juniors cheaply",
      "If you signed a bad bond: consult a labor lawyer — many bond clauses are unenforceable under Indian law",
      "Build GitHub proof of work continuously — this is your off-campus leverage",
    ],
    resourceDrops: [
      {
        title: "Naukri Salary Insights — India Tech Compensation",
        type: "tool",
        description: "Real compensation data by role, company, city across India.",
      },
      {
        title: "Levels.fyi India",
        type: "tool",
        url: "https://levels.fyi",
        description: "Self-reported tech compensation data including in-hand and stocks.",
      },
      {
        title: "Cracking the Coding Interview — Gayle McDowell",
        type: "book",
        description: "Still the benchmark for structured interview preparation.",
      },
      {
        title: "System Design Interview — Alex Xu",
        type: "book",
        description: "Required for any senior-adjacent or product engineering interview.",
      },
    ],
    threads: [
      {
        id: "t-002-1",
        question: "What's the actual in-hand for a 20 LPA offer at a mid-tier product company?",
        responses: 62,
        lastActive: "8m ago",
      },
      {
        id: "t-002-2",
        question: "How enforceable are bond clauses? Has anyone successfully broken one?",
        responses: 34,
        lastActive: "1h ago",
      },
      {
        id: "t-002-3",
        question: "Best off-campus routes for non-CS students after graduation?",
        responses: 41,
        lastActive: "25m ago",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOS-003 — OPERATIONAL NAVIGATION DOSSIER
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-003",
    title: "Operational Navigation Dossier",
    tag: "OPERATIONAL",
    color: "#10b981",
    summary:
      "Nobody teaches you how to navigate professor relationships, acquire real internships, or build credibility that compounds. This dossier collects what actually works — verified by operators who figured it out themselves.",
    tags: ["internships", "research", "professor intel", "academics"],
    activeOperators: 178,
    archivedSignals: 623,
    lastUpdated: "11m ago",
    signals: [
      {
        id: "sig-003-1",
        content:
          "Cold email for research got me a CVPR authorship in Year 3. Template: 2 lines of genuine interest in their specific paper, 1 line about your relevant skill, direct ask for a meeting. Zero begging. 8% response rate. Sent 47 emails.",
        operator: "deep_lab",
        institution: "IIT Madras",
        timestamp: "2 days ago",
        verificationLevel: "VERIFIED SIGNAL",
        resonances: 318,
      },
      {
        id: "sig-003-2",
        content:
          "Professors remember students who ask specific questions, not smart questions. Ask about a specific paragraph from their last paper. Not 'I loved your research.' That's noise. Specificity is signal.",
        operator: "anonymous_operator",
        institution: "IIT Bombay",
        timestamp: "4 days ago",
        verificationLevel: "FIELD CONFIRMED",
        resonances: 224,
      },
      {
        id: "sig-003-3",
        content:
          "The best internship I got was from contributing to an open-source project used by the company. No application. They reached out. Build visible proof of work in the exact tools they use.",
        operator: "systems_ghost",
        institution: "IIT Delhi",
        timestamp: "1 week ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 407,
      },
    ],
    failurePatterns: [
      {
        pattern: "Generic professor outreach emails",
        frequency: "HIGH",
        recovery: "Reference one specific result from a specific paper. Personalization rate determines response rate.",
      },
      {
        pattern: "Applying to internships without any public proof of work",
        frequency: "HIGH",
        recovery: "Build one real project and document it publicly before applying anywhere.",
      },
      {
        pattern: "Waiting for official channels to discover opportunities",
        frequency: "MEDIUM",
        recovery: "The best opportunities are informal — conferences, Discord servers, Twitter/X, research labs.",
      },
      {
        pattern: "Treating internship as resume line — not as learning system",
        frequency: "MEDIUM",
        recovery: "Extract one specific skill and one specific insight per internship. Make it compound.",
      },
    ],
    tacticalGuidance: [
      "Research lab positions are almost never filled through official portals — they're filled through direct email",
      "Build in public: GitHub, Twitter/X, blogs. Make it easy for opportunities to find you",
      "The first 6 weeks of any semester are your highest-leverage window for professor relationship-building",
      "Teaching assistantships are underrated: access to professors, money, and credibility simultaneously",
      "International research programs (DAAD, Mitacs, IISC summer) require applications 9–12 months ahead",
      "Your network is not LinkedIn connections — it's people who would reply to your email at 11pm",
      "Conference volunteering gets you inside rooms your resume can't",
    ],
    recoverySystems: [
      "No internship after Year 2: focus on one open-source contribution or personal project by December",
      "Rejected from research labs: attend lab seminars as audience — build familiarity before re-approaching",
      "No network: join one technical community (Discord, Slack, local meetup) and contribute consistently for 90 days",
    ],
    resourceDrops: [
      {
        title: "CS PhD Application Guide — Philip Guo",
        type: "paper",
        description: "Applies equally to research internship outreach — required reading.",
      },
      {
        title: "DAAD WISE Scholarship",
        type: "tool",
        url: "https://www.daad.in/en/find-funding/scholarships-for-indians-in-germany/daad-wise/",
        description: "Germany research internships. Apply October for the following summer.",
      },
      {
        title: "Mitacs Globalink Research Internship",
        type: "tool",
        url: "https://www.mitacs.ca/globalink",
        description: "Canada research internship. Strong success rate for IIT/NIT applicants.",
      },
      {
        title: "How to Email a Professor — Prof. Matt Might",
        type: "paper",
        description: "The standard reference for cold academic outreach.",
      },
    ],
    threads: [
      {
        id: "t-003-1",
        question: "What's the optimal cold email length for professor research outreach?",
        responses: 38,
        lastActive: "18m ago",
      },
      {
        id: "t-003-2",
        question: "How do you build credibility for a FAANG internship with no prior internship?",
        responses: 55,
        lastActive: "3h ago",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOS-004 — RANK VS REALITY DOSSIER
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-004",
    title: "Rank vs Reality Dossier",
    tag: "CRITICAL",
    color: "#f59e0b",
    summary:
      "JEE rank predicts almost nothing about long-term outcomes. This dossier documents what actually drives career trajectories, creative output, and life satisfaction — and what the rank mythology costs you.",
    tags: ["academics", "branch realities", "burnout"],
    activeOperators: 142,
    archivedSignals: 489,
    lastUpdated: "22m ago",
    signals: [
      {
        id: "sig-004-1",
        content:
          "The highest-ranked person in my JEE batch is in a services company on a mediocre salary. The person who ranked 8000 lower bootstrapped a startup that raised Series A. The rank sorted us into institutions. After that, character took over.",
        operator: "anonymous_operator",
        institution: "IIT Madras",
        timestamp: "3 days ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 521,
      },
      {
        id: "sig-004-2",
        content:
          "I built my entire identity around being an IITian. Campus showed me that rank didn't make me special inside the gates — it just got me inside. The real differentiator was what I built after. It took me 2 years to understand that.",
        operator: "quant_lab",
        institution: "IIT Delhi",
        timestamp: "1 week ago",
        verificationLevel: "VERIFIED SIGNAL",
        resonances: 398,
      },
    ],
    failurePatterns: [
      {
        pattern: "Building identity entirely around JEE rank or institution name",
        frequency: "HIGH",
        recovery: "Deliberately pursue one domain unrelated to your academic performance. Build proof of work there.",
      },
      {
        pattern: "Comparing current academic performance to JEE rank position",
        frequency: "HIGH",
        recovery: "Different skill sets. JEE measures test optimization. University measures sustained curiosity.",
      },
      {
        pattern: "Assuming lower branch = lower career ceiling",
        frequency: "MEDIUM",
        recovery: "Branch determines coursework, not opportunity. Skill and output determine ceiling.",
      },
    ],
    tacticalGuidance: [
      "The strongest predictor of outcomes is proof-of-work density, not institution rank",
      "Your branch determines your first circle of peers — not your career trajectory",
      "Companies that care about branch as a filter are not companies you want to work for long-term",
      "The best researchers frequently come from non-top institutions with genuine curiosity",
      "Branch switch aspirations are often driven by comparison anxiety, not actual interest alignment",
    ],
    recoverySystems: [
      "If branch-related imposter syndrome: identify one operator from your branch who has a trajectory you respect",
      "If rank mythology is affecting self-worth: read about the founders of your favorite companies — most didn't go to IIT",
    ],
    resourceDrops: [
      {
        title: "Mindset: The New Psychology of Success — Carol Dweck",
        type: "book",
        description: "Fixed vs growth mindset. The science behind performance identity.",
      },
      {
        title: "Range: Why Generalists Triumph — David Epstein",
        type: "book",
        description: "Counter-narrative to the early specialization myth. Relevant to branch regret.",
      },
    ],
    threads: [
      {
        id: "t-004-1",
        question: "Does branch really matter if you're switching to software regardless?",
        responses: 76,
        lastActive: "34m ago",
      },
      {
        id: "t-004-2",
        question: "How do you rebuild identity after realizing rank doesn't define you anymore?",
        responses: 29,
        lastActive: "2h ago",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOS-005 — MANUFACTURED GAP DOSSIER
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-005",
    title: "Manufactured Gap Dossier",
    tag: "FOUNDATIONAL",
    color: "#f43f5e",
    summary:
      "The gap between what coaching centers sell and what campuses actually deliver is not an accident. It is the product. This dossier documents the manufactured mythology and how operators navigate through it.",
    tags: ["academics", "branch realities", "burnout"],
    activeOperators: 96,
    archivedSignals: 312,
    lastUpdated: "45m ago",
    signals: [
      {
        id: "sig-005-1",
        content:
          "I spent ₹18 lakh on coaching. The version of IIT they sold me does not exist. The real version is bureaucratic, infrastructure-poor in most wings, and deeply hierarchical. That's not failure — that's information. I wish I had it before.",
        operator: "deep_lab",
        institution: "IIT Bombay",
        timestamp: "5 days ago",
        verificationLevel: "VERIFIED SIGNAL",
        resonances: 487,
      },
      {
        id: "sig-005-2",
        content:
          "Coaching center business model: aspirational mythology → high fees → pass rate optimization → repeat. The campus experience was never part of the product. You were never the customer. You were the proof point for the next batch.",
        operator: "systems_ghost",
        institution: "IIT Delhi",
        timestamp: "1 week ago",
        verificationLevel: "MULTI-OPERATOR CONFIRMED",
        resonances: 392,
      },
    ],
    failurePatterns: [
      {
        pattern: "Arriving at campus with coaching-center expectations",
        frequency: "HIGH",
        recovery: "Recalibrate in Week 1. Discover the campus as it is, not as advertised.",
      },
      {
        pattern: "Spending 2 years grieving the gap instead of operating inside it",
        frequency: "MEDIUM",
        recovery: "Clarity about the gap is the first step. Operating effectively inside it is the goal.",
      },
    ],
    tacticalGuidance: [
      "Talk to current students before committing — not alumni, current students in real hostel rooms",
      "The infrastructure gap is real but navigable — locate the 20% of campus resources that are genuinely excellent",
      "Professor quality varies enormously within the same institution — discover who the real operators are early",
      "The peer network is the actual product at any top institution — invest in it deliberately",
    ],
    recoverySystems: [
      "First month campus reality shock: speak to a 3rd or 4th year operator who has mapped the system",
      "If expectations don't match reality: audit what you expected vs what exists. Build your operating plan from reality.",
    ],
    resourceDrops: [
      {
        title: "Whole New Mind — Daniel Pink",
        type: "book",
        description: "Re-frames what education should optimize for vs what it currently measures.",
      },
    ],
    threads: [
      {
        id: "t-005-1",
        question: "What was the biggest expectation vs reality gap when you arrived at campus?",
        responses: 93,
        lastActive: "7m ago",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // DOS-006 — THE CLARITY DOCTRINE (Philosophy — preserved)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "DOS-006",
    title: "The Clarity Doctrine",
    tag: "PHILOSOPHY",
    color: "#8b5cf6",
    isPhilosophy: true,
    summary:
      "ROADTOIIT does not exist to tell you to give up or to romanticize failure. It exists to give you clarity — the operational kind that allows you to make better decisions with accurate information.",
    tags: ["ideology"],
    activeOperators: 0,
    archivedSignals: 0,
    lastUpdated: "Fixed",
    signals: [],
    failurePatterns: [],
    tacticalGuidance: [
      "Clarity about the system enables better decisions inside it",
      "Understanding the game is the first step to playing it intelligently",
      "The most successful students are those who see the system clearly and adapt deliberately",
      "This platform exists to reduce confusion, prevent wasted years, and distribute operational intelligence",
      "The goal is not rebellion. The goal is navigation.",
    ],
    recoverySystems: [],
    resourceDrops: [],
    threads: [],
  },
];

export const ALL_DOSSIER_TAGS: DossierTag[] = [
  "burnout",
  "placements",
  "AI systems",
  "research",
  "internships",
  "academics",
  "hostel",
  "professor intel",
  "branch realities",
  "coding",
  "ideology",
];
