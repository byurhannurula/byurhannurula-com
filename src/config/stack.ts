import { TECH_LOGOS } from "@/components/icons";

/**
 * Every technology named on the site, defined once.
 *
 * The display name used to be written at each call site next to its icon key,
 * so "react" appeared in three places and drifted in case between files. Refer
 * to a key here instead and both come from one row.
 */
const STACK_ITEMS = {
  astro: { name: "astro", icon: TECH_LOGOS.Astro },
  aws: { name: "aws", icon: TECH_LOGOS.AWS },
  bun: { name: "bun", icon: TECH_LOGOS.Bun },
  cloudflare: { name: "cloudflare", icon: TECH_LOGOS.Cloudflare },
  docker: { name: "docker", icon: TECH_LOGOS.Docker },
  express: { name: "express", icon: TECH_LOGOS.ExpressJs },
  fastify: { name: "fastify", icon: TECH_LOGOS.Fastify },
  figma: { name: "figma", icon: TECH_LOGOS.Figma },
  git: { name: "git", icon: TECH_LOGOS.Git },
  "google-cloud": { name: "google cloud", icon: TECH_LOGOS.GoogleCloud },
  graphql: { name: "graphql", icon: TECH_LOGOS.GraphQL },
  "html-css": { name: "html/css", icon: TECH_LOGOS.Html },
  javascript: { name: "javascript", icon: TECH_LOGOS.JavaScript },
  mongodb: { name: "mongodb", icon: TECH_LOGOS.MongoDB },
  mysql: { name: "mysql", icon: TECH_LOGOS.MySQL },
  nextjs: { name: "next.js", icon: TECH_LOGOS.NextJs },
  nginx: { name: "nginx", icon: TECH_LOGOS.Nginx },
  node: { name: "node", icon: TECH_LOGOS.NodeJs },
  postgresql: { name: "postgresql", icon: TECH_LOGOS.PostgreSQL },
  postman: { name: "postman", icon: TECH_LOGOS.Postman },
  prisma: { name: "prisma", icon: TECH_LOGOS.Prisma },
  proxmox: { name: "proxmox", icon: TECH_LOGOS.Proxmox },
  react: { name: "react", icon: TECH_LOGOS.ReactIcon },
  redis: { name: "redis", icon: TECH_LOGOS.Redis },
  tailwind: { name: "tailwind", icon: TECH_LOGOS.TailwindCss },
  typescript: { name: "typescript", icon: TECH_LOGOS.TypeScript },
  vercel: { name: "vercel", icon: TECH_LOGOS.Vercel },
} as const;

export type StackKey = keyof typeof STACK_ITEMS;

export function getStackItem(key: StackKey) {
  return STACK_ITEMS[key];
}
