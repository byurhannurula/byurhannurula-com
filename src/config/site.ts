import { SITE_CONFIG } from "@/lib/constants"

export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}

// Base site configuration
export const siteConfig = {
  name: SITE_CONFIG.name,
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  author: SITE_CONFIG.author,
  keywords: SITE_CONFIG.keywords,
}

// Page-specific metadata configuration
export const pageMetadata: Record<string, PageMeta> = {
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
    keywords: ["about", "software engineer", "experience", "tech stack", "skills"],
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
    keywords: ["uses", "setup", "tools", "gear", "homelab", "self-hosted", "productivity"],
  },

  "/contact": {
    title: "Contact | Byurhan",
    description:
      "Get in touch with me. Send a message for collaboration, questions, or just to say hello.",
    keywords: ["contact", "email", "collaboration", "hire", "freelance"],
  },

  "/links": {
    title: "Links | Byurhan",
    description: "Find me on various platforms - GitHub, Mastodon, Email, and more.",
    keywords: ["links", "social", "github", "mastodon", "connect"],
  },

  "/statistics": {
    title: "Statistics | Byurhan",
    description: "View analytics and statistics for blog posts, including views, likes, and claps.",
    keywords: ["statistics", "analytics", "blog stats", "metrics"],

    noIndex: true,
  },
}

// Helper function to get metadata for a specific page
export function getPageMetadata(pathname: string): PageMeta {
  return pageMetadata[pathname] || pageMetadata["/"]
}
