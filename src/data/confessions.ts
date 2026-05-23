export interface Confession {
  id: string;
  topic: string;
  text: string;
}

export const confessions: Confession[] = [
  {
    id: "LOG-001",
    topic: "Identity",
    text: "I got IIT. Then realized I had no idea who I was without the exam. Three years built around one goal. On day one of campus, that goal was gone.",
  },
  {
    id: "LOG-002",
    topic: "Loneliness",
    text: "Hostel corridors become strangely lonely at 2AM. Everyone looks like they have it figured out. Nobody does. We're all just performing confidence.",
  },
  {
    id: "LOG-003",
    topic: "Placements",
    text: "The placement numbers don't show the anxiety behind them. One offer letter for every 8 breakdowns. That math doesn't make it into the brochure.",
  },
  {
    id: "LOG-004",
    topic: "Burnout",
    text: "Nobody tells you how quiet success feels after JEE. The noise stops and you're just... empty. You forgot to build a self alongside the rank.",
  },
  {
    id: "LOG-005",
    topic: "Coding",
    text: "Everyone on campus codes. But 80% are grinding Leetcode for the same 5 SDE roles. Nobody is building anything. It's just interview theater.",
  },
  {
    id: "LOG-006",
    topic: "Identity",
    text: "My branch is considered dead. Every conversation at home becomes a defense of a decision I didn't fully understand when I made it at 17.",
  },
  {
    id: "LOG-007",
    topic: "Hostel",
    text: "The mess food destroys you by month three. But it's not just physical. The isolation of the room is its own kind of slow erosion.",
  },
  {
    id: "LOG-008",
    topic: "Burnout",
    text: "Semester 4 is when most people quietly give up on their own interests. The curriculum takes everything. You survive. You don't grow.",
  },
  {
    id: "LOG-009",
    topic: "Placements",
    text: "I watched a friend accept a package he hated because saying no felt impossible. The pressure to accept the first offer is enormous and invisible.",
  },
];

export const confessionTopics = ["All", "Burnout", "Placements", "Identity", "Loneliness", "Coding", "Hostel"] as const;
