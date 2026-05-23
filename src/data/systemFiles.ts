export interface SystemFile {
  id: string;
  title: string;
  tag: string;
  color: string;
  body: string;
  intel: string[];
}

export const systemFiles: SystemFile[] = [
  {
    id: "SYS-001",
    title: "The Manufactured Gap",
    tag: "FOUNDATIONAL",
    color: "#00f0ff",
    body: "Students spend years preparing for institutions they barely understand. Coaching centers sell a version of these places that serves their business model, not your future. The gap between brochure and reality is not an accident — it is the product.",
    intel: [
      "Coaching center revenue depends on aspirational mythology",
      "Campus reality documentation is deliberately suppressed",
      "The 'dream IIT' narrative is a manufactured construct",
    ],
  },
  {
    id: "SYS-002",
    title: "The Hidden Emotional Cost",
    tag: "PSYCHOLOGICAL",
    color: "#8b5cf6",
    body: "The psychological impact of extreme competitive pressure is rarely documented. Identity loss post-JEE, burnout during campus life, and deep isolation are systemic outcomes — not individual failures. They are features of the system, not exceptions to it.",
    intel: [
      "68% of students report burnout — none of it enters official statistics",
      "Identity built entirely around a rank is fragile by design",
      "Mental health infrastructure on campuses is functionally absent",
    ],
  },
  {
    id: "SYS-003",
    title: "What The System Doesn't Teach",
    tag: "OPERATIONAL",
    color: "#00f0ff",
    body: "Nobody tells you how to navigate professor relationships, find the right internship, or survive placement season. The system teaches you how to pass exams. It does not teach you how to build a career, maintain mental health, or understand the world you are entering.",
    intel: [
      "Internship systems reward those who know the meta-game",
      "Placement prep culture creates anxiety, not competence",
      "Real skills rarely align with what gets measured at campus",
    ],
  },
  {
    id: "SYS-004",
    title: "The Rank ≠ Future Equation",
    tag: "CRITICAL",
    color: "#8b5cf6",
    body: "A JEE rank is a snapshot of one specific type of performance under one specific type of pressure. It predicts almost nothing about career success, creativity, leadership, or happiness. The system treats it as the only signal that matters.",
    intel: [
      "Long-term career success correlates poorly with JEE rank",
      "The highest-ranked students often experience the deepest identity crises",
      "What gets you in is not what gets you out successfully",
    ],
  },
  {
    id: "SYS-005",
    title: "The Placement Theater",
    tag: "CAREER",
    color: "#00f0ff",
    body: "Placement season is a performance. The median package hides a wide distribution. The 'placed' count includes offers that were never joined, roles that don't exist in six months, and packages that shrink dramatically once you calculate in-hand reality.",
    intel: [
      "Median salary ≠ what most students receive in practice",
      "Bond clauses and conditions are buried deep",
      "Off-campus opportunities consistently outperform on-campus for motivated students",
    ],
  },
  {
    id: "SYS-006",
    title: "The Clarity Doctrine",
    tag: "PHILOSOPHY",
    color: "#8b5cf6",
    body: "ROADTOIIT does not exist to tell you to give up or to romanticize failure. It exists to give you clarity — the kind of operational clarity that allows you to make better decisions with accurate information. The goal is not rebellion. The goal is navigation.",
    intel: [
      "Clarity about the system enables better decisions inside it",
      "Understanding the game is the first step to playing it intelligently",
      "The most successful students are those who see the system clearly and adapt deliberately",
    ],
  },
];
