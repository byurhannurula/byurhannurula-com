/**
 * Data for the /lab experiments. Placeholder values are marked; swap them for
 * real ones before any of this graduates to the homepage.
 */

/** Words the hero flips through. The first one is the resting state. */
export const LAB_FLIP_WORDS = [
  "tinkers",
  "solders",
  "repairs",
  "hoards",
  "rebuilds",
] as const;

export interface LabSpecRow {
  key: string;
  value: string;
}

/** The prose, restated as a spec sheet. Same facts, other voice. */
export const LAB_SPEC: LabSpecRow[] = [
  { key: "name", value: "Byurhan Nurula" },
  { key: "role", value: "full-stack engineer, team lead" },
  { key: "since", value: "6th grade" },
  { key: "days", value: "react, typescript, node" },
  { key: "nights", value: "soldering iron, 3d printer, one more service" },
  { key: "reading", value: "designing data-intensive applications" },
  { key: "learning", value: "typography, rust, colour" },
  { key: "wants", value: "software that is small, owned, repairable" },
];
