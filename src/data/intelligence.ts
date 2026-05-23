export interface Dilemma {
  id: string;
  title: string;
  consequence: string;
  optionA: {
    name: string;
    pros: string[];
    cons: string[];
  };
  optionB: {
    name: string;
    pros: string[];
    cons: string[];
  };
  verdict: string;
  context: string;
}

export interface Mistake {
  id: string;
  title: string;
  category: "Academic" | "Placement" | "Mental Health" | "Social";
  symptoms: string[];
  realityCheck: string;
  prevention: string;
}

export interface SkillSignal {
  category: string;
  highSignals: {
    name: string;
    proof: string;
  }[];
  lowSignals: {
    name: string;
    trap: string;
  }[];
}

export interface CuratedResource {
  id: string;
  pathwayId: string;
  category: "course" | "book" | "github";
  title: string;
  link: string;
  description: string;
  signal: string;
}

export interface CampusBrief {
  id: string;
  title: string;
  category: "branch" | "professors" | "survival";
  summary: string;
  details: string[];
  intelSource: string;
  rating?: number; // Used for professors or branches out of 5
}

export const dilemmas: Dilemma[] = [
  {
    id: "DIL-01",
    title: "DSA Grind vs. Project Depth",
    consequence: "Decides whether you pass initial automated resume screening (ATS) vs. passing technical round interviews with core engineers.",
    optionA: {
      name: "Grind 500+ LeetCode problems",
      pros: [
        "Passes the high-volume online coding assessment (OA) filters of big tech",
        "Builds muscle memory for standard dynamic programming and tree algorithms",
        "Clear progress metrics (problems solved count)"
      ],
      cons: [
        "Makes you identical to 10,000 other applicants who also memorized LeetCode",
        "Provides zero engineering skills (unable to build a basic production backend)",
        "Subject to high failure rates if the company asks a non-standard custom algorithm"
      ]
    },
    optionB: {
      name: "Build 2 deep systems projects",
      pros: [
        "Creates massive differentiation in CV screening and hiring manager reviews",
        "Develops real capabilities (concurrency, networking, database indexing)",
        "Enables high-conviction talks during interviews (explaining bottlenecks you hit)"
      ],
      cons: [
        "May fail automated filters if you cannot solve basic array/string puzzles",
        "Requires deep, self-directed research without a clean step-by-step tutorial",
        "Takes 3-5x more time and effort than solving single-file algorithmic puzzles"
      ]
    },
    verdict: "The Hybrid Protocol: Grind LeetCode to a baseline competency (150-200 standard medium questions from the NeetCode 150 list). Do NOT go beyond this. Use the saved energy to build one complex, multi-threaded system project (e.g., custom database engine, high-throughput network proxy). A great project secures the interview; baseline DSA passes it.",
    context: "Seniors frequently waste semesters trying to cross 800+ solved problems while having zero understanding of how Docker handles networking or why database queries slow down under load. Big tech interviews are raising the bar on system designs even for junior hires."
  },
  {
    id: "DIL-02",
    title: "GPA Maxing vs. Dev Portfolio",
    consequence: "Determines eligibility for prestigious academic pathways, international grad schools, and selective quants vs. high-signal engineering roles.",
    optionA: {
      name: "GPA Maxing (Target 9.5+)",
      pros: [
        "Mandatory filter for Top 20 US/European PhDs and MS programs",
        "Directly qualifies you for elite Quant firms and top-tier consultancies",
        "Simplifies campus placement shortlists automatically"
      ],
      cons: [
        "Requires attending low-signal lectures and memorizing outdated curricula",
        "Leaves little time for side-projects, open-source work, or deep code study",
        "Can lead to extreme burnout over micro-grades in non-core courses"
      ]
    },
    optionB: {
      name: "Portfolio Cultivation (GPA 7.5 - 8.0)",
      pros: [
        "Allows you to learn modern stacks (Go, Rust, PyTorch, Kubernetes) on your terms",
        "Enables open-source contributions and remote work for overseas companies",
        "Builds real proof of competency via live URLs and active GitHub graphs"
      ],
      cons: [
        "Locks you out of academic pathways and major government fellowships",
        "Certain campus placement companies will block you from testing based on CGPA cutoffs",
        "Requires extreme discipline—no professor is pushing you to ship code"
      ]
    },
    verdict: "The 8.5 Threshold: Maintain a minimum 8.5 CGPA. In Indian and elite engineering colleges, 8.5 is the golden threshold where 90% of companies unlock their placement shortlists, and decent MS programs remain viable. Any effort to push from 8.5 to 9.5 has diminishing returns compared to investing those hours into building unique software systems.",
    context: "Most students fall into either the trap of failing classes because they are 'building startups,' or memorizing textbook definitions of compilers while being unable to write a compiler script. Keep GPA above 8.5, then invest the rest of your cognitive capacity into external projects."
  },
  {
    id: "DIL-03",
    title: "Core Engineering vs. Software Pivot",
    consequence: "Decides whether you leverage your specific branch (EE, ME, Chem) to enter specialized, high-barrier fields or pivot to general software roles.",
    optionA: {
      name: "Stick to Core Engineering",
      pros: [
        "Lower competition in highly specialized roles (e.g. semiconductor design, aerospace CFD)",
        "Leverages your physical branch labs, faculty connections, and specific machinery",
        "High barrier to entry prevents generalists from copying your path"
      ],
      cons: [
        "Fewer entry-level jobs in India compared to software services",
        "Initial starting salaries can be lower than high-end software roles",
        "Requires long-term specialization, often requiring an MS or PhD to get advanced roles"
      ]
    },
    optionB: {
      name: "Complete Software/ML Pivot",
      pros: [
        "Huge market size with countless job listings and remote opportunities",
        "Fastest path to high compensation (direct software engineer roles)",
        "Tons of free learning material and structured roadmaps online"
      ],
      cons: [
        "Incredibly high competition from every branch trying to do the same thing",
        "You are competing directly with CS/IT majors who have theoretical foundations",
        "Your official branch degree title can occasionally trigger resume screening rejections"
      ]
    },
    verdict: "The Cyber-Physical Synthesis: Do not become a generic web developer if you are in Electrical, Mechanical, or Aerospace. Instead, target the intersection: Robotics, Embedded Systems, CUDA Programming, or Scientific Computing (CFD scripting/FEM analysis). A mechanical engineer who writes high-performance C++ or an electrical engineer who can write FPGA code is infinitely more valuable than another React developer.",
    context: "Almost 80% of non-CS students dump their core coursework to learn HTML/CSS/JS. This creates a massive supply of mediocre developers while deep engineering fields (like semiconductor design or EV battery modeling) struggle to find students who understand both physics and code."
  }
];

export const mistakes: Mistake[] = [
  {
    id: "MST-01",
    title: "The Tutorial Purgatory",
    category: "Academic",
    symptoms: [
      "Watching 40-hour video courses without opening an IDE",
      "Copying code line-by-line from a YouTube tutorial and claiming 'I built it'",
      "Feeling confident while watching, but freezing when faced with a blank file"
    ],
    realityCheck: "Tutorials are structured to give you a fake dopamine hit of progress. Real engineering is chaotic, undocumented, and full of stack traces that tutorials edit out.",
    prevention: "Apply the 1:2 Rule. For every 1 hour of video tutorial, spend 2 hours building an extension or a custom modification of that project without looking at the video. If the tutorial builds a todo app, build a collaborative team board using the same database layout."
  },
  {
    id: "MST-02",
    title: "Waiting for the Placement Season",
    category: "Placement",
    symptoms: [
      "Assuming the college placement cell will secure your dream role",
      "Drafting your resume in the 7th semester only",
      "Ignoring off-campus opportunities because 'placement season hasn't started'"
    ],
    realityCheck: "The best companies (high-signal startups, specialized research labs, remote-first entities) rarely visit campus placements. Relying on college placement cells puts you at the mercy of bulk recruiters and rigid GPA-based filtering.",
    prevention: "Start off-campus hunting at least 6 months before college placement cycles. Build active channels: post your weekly builds on LinkedIn, participate in niche open-source sprints, and send targeted, code-backed cold emails to engineering leads. Secure an offer early to gain leverage."
  },
  {
    id: "MST-03",
    title: "Ignoring Systems Fundamentals for High-Level Frameworks",
    category: "Academic",
    symptoms: [
      "Learning Next.js, FastAPI, and Supabase while not knowing what a TCP handshake is",
      "Building web apps but having zero understanding of how OS processes manage threads",
      "Using Docker as a magic wrapper without knowing what namespaces or cgroups are"
    ],
    realityCheck: "Frameworks change every 2 years. Systems fundamentals (OS, Networks, Databases, Memory) haven't changed fundamentally in 30 years. If you don't know the layers underneath, your code is fragile and you cannot debug performance bottlenecks.",
    prevention: "Dedicate 30% of your technical study to lower-level realities. Read classic textbooks (e.g. OSTEP - 'Operating Systems: Three Easy Pieces') and build basic networking tools (like a raw TCP client or a basic HTTP server) using nothing but socket libraries."
  },
  {
    id: "MST-04",
    title: "The Solitary Hacker Syndrome",
    category: "Social",
    symptoms: [
      "Refusing to share code because 'someone will steal my idea'",
      "Skipping hackathons and community meetups to code alone in your hostel room",
      "Having zero peers who can critique your designs or proofread your resumes"
    ],
    realityCheck: "Isolation feels productive but stunts your growth. The best opportunities, referrals, and design intuitions are shared in high-signal peer groups. Engineering is a team sport.",
    prevention: "Open-source your work early. Join Discord groups centered around core engineering (not meme channels). Participate in hackathons not to win, but to build under pressure with 3 other operators. Find 2 peers who are more skilled than you and get them to roast your code."
  }
];

export const skillSignals: SkillSignal[] = [
  {
    category: "Systems & Backend",
    highSignals: [
      { name: "Custom DB engine or cache implementation", proof: "Writing a database engine in Rust/Go that handles write-ahead logging (WAL) and B-tree storage manually." },
      { name: "Multi-threaded network proxy or web server", proof: "A C/C++ server handling epoll/kqueue event loops, managing connections concurrently without framework helpers." },
      { name: "Active open-source contributions to databases or core tools", proof: "PRs accepted in repos like Redis, Postgres, Docker, or Kubernetes." }
    ],
    lowSignals: [
      { name: "Basic CRUD application with Next.js/Express", trap: "Standard login page connected to a database using Prisma with zero complex queries or custom schema designs." },
      { name: "Deploying templates on Vercel with a single click", trap: "Claiming cloud deployment competence by deploying pre-configured repository templates without customizing CI/CD." },
      { name: "Using ORMs for everything without knowing SQL", trap: "Relying on high-level libraries and freezing when asked to write a nested SQL join query in an interview." }
    ]
  },
  {
    category: "AI & Machine Learning",
    highSignals: [
      { name: "Paper replication from scratch in raw PyTorch", proof: "Replicating an architecture (like Vision Transformer or LoRA) and achieving identical loss curves on public datasets." },
      { name: "CUDA programming / Kernel writing", proof: "Writing custom Triton or CUDA C++ kernels to speed up matrix multiplication or attention steps." },
      { name: "Profiling and optimizing ML pipelines", proof: "Using PyTorch Profiler to resolve bottleneck parameters and reduce training time by 40%." }
    ],
    lowSignals: [
      { name: "Using pre-built API wrappers", trap: "Building a 'chatbot' using OpenAI/HuggingFace API wrappers and claiming you build AI systems." },
      { name: "Running Jupyter notebooks from Kaggle templates", trap: "Running `model.fit()` on standard datasets (like Titanic or MNIST) without understanding the mathematical intuition of the optimizer." },
      { name: "Collecting digital AI course certificates", trap: "Having 15 LinkedIn certificates with zero public code showing manual neural network adjustments." }
    ]
  },
  {
    category: "Academics & Research",
    highSignals: [
      { name: "Writing first-author LaTeX papers under active PIs", proof: "A pre-print on arXiv submitted to peer-reviewed venues with reproducible code repos." },
      { name: "Replicating complex paper baselines", proof: "Writing a code repo that evaluates three competing papers under a uniform benchmark." },
      { name: "Mastery of advanced mathematical modules", proof: "Completing graduate-level courses in Real Analysis or Stochastic Calculus with stellar recommendations." }
    ],
    lowSignals: [
      { name: "Writing literature review papers without new methodology", trap: "Publishing a simple summary paper in low-tier journals or paid conferences to pad your resume." },
      { name: "Being named 6th author on a large lab paper", trap: "Having your name added to a paper for basic data cleaning tasks without knowing the core thesis." },
      { name: "Relying purely on college textbook exercises", trap: "Solving homework questions without understanding real-world mathematical limitations or applications." }
    ]
  }
];

export const curatedResources: CuratedResource[] = [
  {
    id: "RES-01",
    pathwayId: "PATH-01",
    category: "course",
    title: "CS224n: Deep Learning for NLP (Stanford)",
    link: "https://web.stanford.edu/class/cs224n/",
    description: "The gold standard for understanding how attention mechanisms and transformer models work under the hood.",
    signal: "Deep mathematical rigour, excellent coding assignments implementing Word2Vec and Transformers from scratch."
  },
  {
    id: "RES-02",
    pathwayId: "PATH-01",
    category: "github",
    title: "Andrej Karpathy's 'llm.c'",
    link: "https://github.com/karpathy/llm.c",
    description: "LLM training engine written in pure C/CUDA. Master how memory layouts and tensor mathematics align directly on GPUs.",
    signal: "Eliminates all framework abstractions (no PyTorch, no HuggingFace) to show how training actually executes on hardware."
  },
  {
    id: "RES-03",
    pathwayId: "PATH-04",
    category: "book",
    title: "Heard on The Street (Timothy Crack)",
    link: "https://www.amazon.com/Heard-Street-Quantitative-Interviews-Analysis/dp/0991299553",
    description: "The ultimate quantitative finance interview workbook containing probability, physics, and algorithm puzzles.",
    signal: "The exact questions asked by top trading desks (Jane Street, Citadel, Optiver) during high-pressure screens."
  },
  {
    id: "RES-04",
    pathwayId: "PATH-02",
    category: "github",
    title: "Connected Papers",
    link: "https://www.connectedpapers.com/",
    description: "Visual tool that maps literature citations into cluster graphs, letting you see parent papers and niche developments quickly.",
    signal: "Bypasses weeks of manual reading to isolate the 5 seminal papers you must read for any target research area."
  },
  {
    id: "RES-05",
    pathwayId: "PATH-03",
    category: "book",
    title: "The Mom Test (Rob Fitzpatrick)",
    link: "https://www.momtestbook.com/",
    description: "Practical guide on how to talk to customers and validate business ideas without getting fake positive feedback.",
    signal: "Saves you from spending 6 months building products that nobody actually wants or is willing to pay for."
  },
  {
    id: "RES-06",
    pathwayId: "PATH-04",
    category: "github",
    title: "Developer Roadmap: C++ Systems",
    link: "https://github.com/mikespook/systems-programming-roadmap",
    description: "Curated roadmap for low-level systems programming in C++ and Go, dealing with concurrent patterns and kernel bindings.",
    signal: "Gives core insights into writing code that runs in microseconds—crucial for Quant market makers."
  }
];

export const campusBriefs: CampusBrief[] = [
  {
    id: "BRF-01",
    title: "EE vs CSE Branch Realities",
    category: "branch",
    summary: "The electrical engineering branch demands massive academic rigor, leaving almost zero breathing room compared to Computer Science. Navigating it requires tactical scheduling.",
    details: [
      "EE lab work is extremely time-intensive; do not plan high-intensity dev work during mid-semester lab weeks.",
      "Grading in EE is historically strict. While CSE classes often curve upwards, EE professors stick to rigid absolute grading curves.",
      "To pivot: Leverage EE electives like DSP (Digital Signal Processing) or Embedded Systems. They count as technical depth while teaching C++/Python."
    ],
    intelSource: "Batch of '25 EE Senior Logs"
  },
  {
    id: "BRF-02",
    title: "Dr. K. Raghavan (Advanced Algorithms)",
    category: "professors",
    summary: "Famous for failing 15% of the class, but his letters of recommendation (LORs) are recognized by top US graduate labs.",
    details: [
      "Never miss his Friday lectures. He explains papers that are not in the official syllabus but will appear on exams.",
      "His assignments are open-ended coding challenges. If you write clean, optimized C++ models with profiling logs, you secure an A-grade.",
      "Approach him for research in his office hours ONLY after replicating at least one paper from his publications page."
    ],
    intelSource: "Dept of CS - Office Hours Dossier",
    rating: 4.8
  },
  {
    id: "BRF-03",
    title: "Hostel 3 Focus Chamber",
    category: "survival",
    summary: "How to find places on campus that allow deep work, escaping the ambient noise of hostel rooms and standard libraries.",
    details: [
      "The main library is a social trap; students go there to gossip or watch Netflix on high-speed campus Wi-Fi.",
      "Hostel 3's old computer lab in the basement is open 24/7. It has zero signal reception (forces offline coding) and is usually empty.",
      "Alternative: The terrace of the Metallurgical Engineering building has active Wi-Fi and is completely deserted after 6 PM."
    ],
    intelSource: "Hostel 3 Wing D Underground"
  },
  {
    id: "BRF-04",
    title: "Dr. Arundhati Sen (Systems Labs)",
    category: "professors",
    summary: "Extremely project-oriented grading. Dislikes theoretical answers; demands functional implementations.",
    details: [
      "Your final project must have a live URL or a functional CLI demo. Theoretical slide decks will receive a C grade.",
      "She values version control hygiene. She will inspect your GitHub commit logs to verify you didn't write the code in the last 12 hours.",
      "Excellent mentor if you are trying to write custom systems software."
    ],
    intelSource: "Systems Lab Batch of '24",
    rating: 4.2
  }
];
