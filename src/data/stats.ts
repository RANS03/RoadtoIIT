export interface Stat {
  id: string;
  label: string;
  display: string;
  bar: number; // Signal intensity/confidence level (0-100)
  context: string;
  color: string;
}

export const stats: Stat[] = [
  {
    id: "RI-01",
    label: "Engineered Scarcity Bottleneck",
    display: "HIGH SIGNAL",
    bar: 95,
    context: "Scarcity is sold as prestige. The extreme selection ratio acts as a filter for endurance rather than an indicator of educational superior quality.",
    color: "#00f0ff",
  },
  {
    id: "RI-02",
    label: "Systemic Preparation Burnout",
    display: "FREQUENTLY OBSERVED",
    bar: 85,
    context: "Chronic stress and mental fatigue are normalized as standard preparation milestones rather than symptoms of systemic overload.",
    color: "#8b5cf6",
  },
  {
    id: "RI-03",
    label: "Sleep Deprivation Normalization",
    display: "INTERNAL SENTIMENT",
    bar: 75,
    context: "Four to five hours of sleep is common, framed as academic dedication. The biological cost is ignored in the institutional narrative.",
    color: "#00f0ff",
  },
  {
    id: "RI-04",
    label: "Post-JEE Identity Disorientation",
    display: "COMMON PATTERN",
    bar: 80,
    context: "A profound sense of emptiness on campus arrival once the single, defining external goal of the last 3-4 years is suddenly removed.",
    color: "#8b5cf6",
  },
  {
    id: "RI-05",
    label: "Uninformed Branch Specialization",
    display: "RECURRING TREND",
    bar: 70,
    context: "Branch selection decisions made under duress at age 17, driven by opening/closing rank statistics rather than interest or aptitude.",
    color: "#00f0ff",
  },
  {
    id: "RI-06",
    label: "Placement Anxiety & Meta-Prep",
    display: "HIGH SIGNAL",
    bar: 90,
    context: "Anxiety spikes in Year 4 as students optimize for corporate filters (Leetcode) instead of exploring core engineering or genuine interest.",
    color: "#8b5cf6",
  },
];
