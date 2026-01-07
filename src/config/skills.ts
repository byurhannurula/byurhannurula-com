import type { SkillCategory } from "@/types";

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML/CSS", logo: "Html" },
      { name: "JavaScript", logo: "JavaScript" },
      { name: "TypeScript", logo: "TypeScript" },
      { name: "React", logo: "ReactIcon" },
      { name: "Next.js", logo: "NextJs" },
      { name: "TailwindCSS", logo: "TailwindCss" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Bun", logo: "Bun" },
      { name: "Node.js", logo: "NodeJs" },
      { name: "Express", logo: "ExpressJs" },
      { name: "Redis", logo: "Redis" },
      { name: "MongoDB", logo: "MongoDB" },
      { name: "PostgreSQL", logo: "PostgreSQL" },
      { name: "MySQL", logo: "MySQL" },
      { name: "Prisma", logo: "Prisma" },
      { name: "GraphQL", logo: "GraphQL" },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Docker", logo: "Docker" },
      { name: "Nginx", logo: "Nginx" },
      { name: "Apache", logo: "Apache" },
      { name: "Linux", logo: "Linux" },
      { name: "CI/CD", logo: "CiCd" },
      { name: "Git", logo: "Git" },
      { name: "AWS", logo: "AWS" },
      { name: "Vercel", logo: "Vercel" },
      { name: "Netlify", logo: "Netlify" },
      { name: "Cloudflare", logo: "Cloudflare" },
      { name: "Postman", logo: "Postman" },
      { name: "Sanity", logo: "Sanity" },
    ],
  },
  {
    title: "Design",
    skills: [{ name: "Figma", logo: "Figma" }],
  },
] as const;
