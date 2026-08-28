export type ProjectStatus =
  | "open source"
  | "published"
  | "tool"
  | "ongoing"
  | "this site"
  | "student era";

export interface Project {
  slug: string;
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  github?: string;
  url?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "signature-generator",
    title: "signature-generator",
    description: "Email-signature builder. My most-starred repo.",
    status: "open source",
    tags: ["react", "typescript"],
    github: "https://github.com/byurhannurula/signature-generator",
    featured: true,
  },
  {
    slug: "gatsby-source-gitlab",
    title: "gatsby-source-gitlab",
    description:
      "Gatsby source plugin that pulls data from GitLab. My first real open source.",
    status: "published",
    tags: ["gatsby", "gitlab", "api", "node"],
    github: "https://github.com/byurhannurula/gatsby-source-gitlab",
    featured: true,
  },
  {
    slug: "site-scraper",
    title: "site-scraper",
    description:
      "Scrapes the text content of a site or blog. Small, useful, does one job.",
    status: "tool",
    tags: ["node"],
    github: "https://github.com/byurhannurula/site-scraper",
  },
  {
    slug: "dotfiles",
    title: "dotfiles",
    description:
      "Reproducible macOS setup. One script from blank machine to fully configured.",
    status: "ongoing",
    tags: ["shell", "macos"],
    github: "https://github.com/byurhannurula/dotfiles",
    featured: true,
  },
  {
    slug: "byurhannurula-com",
    title: "byurhannurula-com",
    description:
      "The site you are on. Fourth rebuild; the byurhan. wordmark survived all of them.",
    status: "this site",
    tags: ["next.js", "typescript", "tailwind"],
    github: "https://github.com/byurhannurula/byurhannurula-com",
  },
];

export function getFeaturedProjects(): Project[] {
  return PROJECTS.filter((project) => project.featured);
}
