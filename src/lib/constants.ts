import { SkillCategory } from "./types"

export const SITE_CONFIG = {
  logo: "byurhan.",
  name: "Byurhan",
  title: "Byurhan | Developer, Tech geek & Thinker",
  description:
    "Personal website of Burhan - Full-Stack Software Engineer passionate about privacy, security, and tinkering with technology",
  url: "https://byurhannurula.com", // Update with your actual domain
  author: {
    name: "Byurhan",
    email: "hello@byurhannurula.com",
    twitter: "@byurhannurula",
    github: "byurhannurula",
    mastodon: "@byurhannurula",
  },
  keywords: [
    "software engineer",
    "full-stack developer",
    "privacy enthusiast",
    "homelab",
    "self-hosting",
    "networking",
    "security",
    "tinkerer",
    "react",
    "typescript",
    "nextjs",
  ],
  social: {
    github: "https://github.com/byurhannurula",
    twitter: "https://twitter.com/byurhannurula",
    linkedin: "https://linkedin.com/in/byurhannurula",
    mastodon: "https://mastodon.social/@byurhannurula",
    instagram: "https://instagram.com/byurhannurula",
    email: "mailto:hello@byurhannurula.com",
  },
} as const

export const NAVIGATION_ITEMS = [
  { name: "index", path: "/" },
  { name: "notes", path: "/notes" },
  // { name: "projects", path: "/projects" },
  { name: "uses", path: "/uses" },
  { name: "about", path: "/about" },
] as const

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML/CSS", logo: "Html" },
      { name: "React", logo: "ReactIcon" },
      { name: "Next.js", logo: "NextJs" },
      { name: "TypeScript", logo: "TypeScript" },
      { name: "JavaScript", logo: "JavaScript" },
      { name: "TailwindCSS", logo: "TailwindCss" },
      { name: "Shadcn UI", logo: "Shadcn" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Bun", logo: "Bun" },
      { name: "Node.js", logo: "NodeJs" },
      { name: "Express", logo: "ExpressJs" },
      { name: "MongoDB", logo: "MongoDB" },
      { name: "MySQL", logo: null },
      { name: "PostgreSQL", logo: "PostgreSQL" },
      { name: "REST APIs", logo: null },
      { name: "GraphQL", logo: null },
    ],
  },
  {
    title: "Applications",
    skills: [
      { name: "Figma", logo: "Figma" },
      { name: "Postman", logo: "Postman" },
      { name: "Notion", logo: null },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Docker", logo: null },
      { name: "Nginx", logo: null },
      { name: "Apache", logo: null },
      { name: "Linux", logo: null },
      { name: "CI/CD", logo: null },
      { name: "Git", logo: null },
      { name: "GitHub", logo: "Github" },
      { name: "GitLab", logo: null },
      { name: "AWS", logo: "AWS" },
      { name: "Vercel", logo: "Vercel" },
      { name: "Netlify", logo: "Netlify" },
      { name: "Cloudflare", logo: null },
    ],
  },
] as const
