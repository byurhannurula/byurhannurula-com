import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  MastodonIcon,
  RssIcon,
  TwitterIcon,
} from "@/components/icons";

export const SITE_CONFIG = {
  logo: "byurhan.",
  name: "Byurhan",
  title: "Byurhan | Developer, Tech geek & Thinker",
  description:
    "Personal website of Burhan - Full-Stack Software Engineer passionate about privacy, security, and tinkering with technology",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
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
} as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: SITE_CONFIG.social.github,
    icon: GithubIcon,
    external: true,
  },
  {
    name: "Twitter",
    href: SITE_CONFIG.social.twitter,
    icon: TwitterIcon,
    external: true,
  },
  {
    name: "Mastodon",
    href: SITE_CONFIG.social.mastodon,
    icon: MastodonIcon,
    external: true,
    rel: "me",
  },
  {
    name: "LinkedIn",
    href: SITE_CONFIG.social.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    name: "Instagram",
    href: SITE_CONFIG.social.instagram,
    icon: InstagramIcon,
    external: true,
  },
  {
    name: "Email",
    href: SITE_CONFIG.social.email,
    icon: MailIcon,
    external: false,
  },
  { name: "RSS", href: "/rss.xml", icon: RssIcon, external: false },
] as const;

export const NAVIGATION_ITEMS = [
  { name: "home", path: "/" },
  { name: "notes", path: "/notes" },
  { name: "uses", path: "/uses" },
  { name: "about", path: "/about" },
  // Hidden pages - uncomment when ready:
  // { name: "projects", path: "/projects" },
  // { name: "shorts", path: "/shorts" },
  // { name: "links", path: "/links" },
  // { name: "statistics", path: "/statistics" },
] as const;

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

export const PAGE_METADATA: Record<string, PageMeta> = {
  "/": {
    title: "Byurhan | Full-Stack Software Engineer",
    description:
      "Full-Stack Software Engineer passionate about privacy, security, and building web applications with React, Next.js, and TypeScript.",
    keywords: [
      "portfolio",
      "full-stack developer",
      "software engineer",
      "react",
      "nextjs",
      "typescript",
      "web development",
    ],
  },
  "/about": {
    title: "About | Byurhan",
    description:
      "Software engineer with 5+ years of experience building web applications. Learn more about my journey, tech stack, and current focus.",
    keywords: [
      "about",
      "software engineer",
      "experience",
      "tech stack",
      "skills",
    ],
  },
  "/notes": {
    title: "Notes | Byurhan",
    description:
      "Technical articles and blog posts about web development, homelab, self-hosting, and software engineering.",
    keywords: [
      "blog",
      "notes",
      "articles",
      "web development",
      "homelab",
      "self-hosting",
      "tutorials",
    ],
  },
  "/uses": {
    title: "Uses | Byurhan",
    description:
      "Tools, gear, and services I use for development, productivity, and my homelab setup. Including workstation, self-hosted services, and 3D printing.",
    keywords: [
      "uses",
      "setup",
      "tools",
      "gear",
      "homelab",
      "self-hosted",
      "productivity",
    ],
  },
  "/contact": {
    title: "Contact | Byurhan",
    description:
      "Get in touch with me. Send a message for collaboration, questions, or just to say hello.",
    keywords: ["contact", "email", "collaboration", "hire", "freelance"],
  },
  "/links": {
    title: "Links | Byurhan",
    description:
      "Find me on various platforms - GitHub, Mastodon, Email, and more.",
    keywords: ["links", "social", "github", "mastodon", "connect"],
  },
  "/statistics": {
    title: "Statistics | Byurhan",
    description:
      "View analytics and statistics for blog posts, including views, likes, and claps.",
    keywords: ["statistics", "analytics", "blog stats", "metrics"],
    noIndex: true,
  },
  "/shorts": {
    title: "Shorts | Byurhan",
    description:
      "Quick code snippets, tips, and mini-tutorials for developers.",
    keywords: ["shorts", "snippets", "code", "tips", "tutorials"],
  },
};
