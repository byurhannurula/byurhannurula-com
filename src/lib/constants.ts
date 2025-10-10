export const SITE_CONFIG = {
  name: "byurhan.",
  title: "byurhan. | Developer, Tech geek & Thinker",
  description: "Personal website of Burhan - Full-Stack Software Engineer passionate about privacy, security, and tinkering with technology",
  url: "https://byurhannurula.com", // Update with your actual domain
  author: {
    name: "Byurhan",
    email: "hello@byurhannurula.com",
    twitter: "@byurhannurula",
    github: "byurhannurula",
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
    "nextjs"
  ],
  social: {
    github: "https://github.com/byurhannurula", // Update with your actual URLs
    twitter: "https://twitter.com/byurhannurula",
    linkedin: "https://linkedin.com/in/byurhannurula",
    email: "mailto:hello@byurhannurula.com"
  }
} as const

export const NAVIGATION_ITEMS = [
  { name: "index", path: "/" },
  { name: "thoughts", path: "/blog" },
  { name: "uses", path: "/uses" },
  { name: "about", path: "/about" },
] as const
