import type { StackKey } from "./stack";

export interface Capability {
  name: string;
  description: string;
  why?: string;
}

export interface StackGroup {
  name: string;
  items: StackKey[];
}

export interface RoleStep {
  title: string;
  years: string;
}

export interface Highlight {
  text: string;
  /** The numbers behind the claim. Revealed on hover, never load-bearing. */
  note?: string;
}

/** Highlights are written as bare strings until one earns a note. */
export function toHighlight(value: string | Highlight): Highlight {
  return typeof value === "string" ? { text: value } : value;
}

export interface CareerItem {
  role: string;
  org: string;
  orgUrl?: string;
  years: string;
  description: string;
  /** Progression inside the same org, oldest first. */
  roles?: RoleStep[];
  stack?: StackKey[];
  highlights?: (string | Highlight)[];
}

export const CAPABILITIES: Capability[] = [
  {
    name: "web development",
    description:
      "Full-stack apps end to end — React/Next.js front-ends, Node services, the databases underneath.",
    why: "From empty repo to deployed product.",
  },
  {
    name: "api design",
    description:
      "REST and GraphQL APIs that other people can actually build on — SDKs, auth flows, integrations.",
  },
  {
    name: "system design",
    description:
      "Data models, service boundaries, caching — systems that stay understandable end to end.",
  },
  {
    name: "infra & self-hosting",
    description:
      "Proxmox, Docker, reverse proxies, VLANs, backups with restore drills — run like production, at home.",
  },
  {
    name: "automation",
    description:
      "CI/CD pipelines, config-as-code, Home Assistant + ESPHome — if it happens twice, it gets scripted.",
  },
];

export const STACK: StackGroup[] = [
  {
    name: "frontend",
    items: ["typescript", "javascript", "react", "nextjs", "tailwind", "astro"],
  },
  {
    name: "backend",
    items: [
      "node",
      "bun",
      "express",
      "fastify",
      "postgresql",
      "mysql",
      "mongodb",
      "redis",
      "prisma",
      "graphql",
    ],
  },
  {
    name: "devops",
    items: [
      "docker",
      "nginx",
      "proxmox",
      "git",
      "cloudflare",
      "vercel",
      "google-cloud",
      "aws",
      "postman",
    ],
  },
  {
    name: "design",
    items: ["figma"],
  },
];

export const WORK: CareerItem[] = [
  {
    role: "Team Lead / Full-Stack Engineer",
    org: "ReCheck",
    orgUrl: "https://recheck.io",
    years: "2020 — now",
    description:
      "Six years and every layer of it: from intern to leading the team.",
    roles: [
      { title: "Intern", years: "jan 2020 — jun 2020" },
      { title: "Software Developer", years: "2020 — 2022" },
      { title: "Full-Stack Engineer", years: "2022 — 2024" },
      { title: "Team Lead", years: "2024 — now" },
    ],
    stack: [
      "typescript",
      "react",
      "nextjs",
      "node",
      "express",
      "fastify",
      "postgresql",
      "mongodb",
      "docker",
      "tailwind",
      "figma",
    ],
    highlights: [
      "Built and shipped the company's web apps, landing pages, and marketing sites end to end.",
      "Own the front-end architecture and the Node services behind it; a Capacitor/Ionic hybrid app when it was needed.",
      "Did the DevOps when nobody else could: VMs, deployments, CI, monitoring. Still do when needed.",
      "No designer on the team, so I unified the brand: logos, colours, favicons, and a Figma system everyone uses.",
      "Onboarded and mentored interns, reviewed code, and pushed for better processes.",
      "Now lead the team: planning, reviews, mentoring, and still a lot of code.",
    ],
  },
  {
    role: "Front-End Developer",
    org: "freelance / student era",
    years: "~2018 — 2020",
    description:
      "Gatsby & GitLab era — published gatsby-source-gitlab, built small tools, learned in public.",
    stack: ["javascript", "react", "graphql", "html-css"],
  },
];

export const EDUCATION: CareerItem[] = [
  {
    role: "M.Sc. Computer Engineering",
    org: "University of Ruse",
    orgUrl: "https://www.uni-ruse.bg",
    years: "2015 — 2020",
    description: "Dept. of Computer Systems and Technologies.",
  },
];
