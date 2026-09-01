import { NextResponse } from "next/server";

import { SITE_CONFIG } from "@/config";
import { getAllPosts } from "@/lib/server";

// Route Handlers are not cached by default in Next 16. The content comes from
// MDX on disk, so prerender it at build time like the notes routes.
export const dynamic = "force-static";

interface LlmsLink {
  title: string;
  path: string;
  description: string;
}

const PAGES: LlmsLink[] = [
  {
    title: "Home",
    path: "/",
    description: "Introduction, latest notes, and featured projects.",
  },
  {
    title: "About",
    path: "/about",
    description:
      "Background, work history, tech stack, and what I am focused on now.",
  },
  {
    title: "Notes",
    path: "/notes",
    description:
      "Index of technical articles on web development, homelab, and self-hosting.",
  },
  {
    title: "Uses",
    path: "/uses",
    description:
      "Hardware, software, and services I use for development and my homelab.",
  },
  {
    title: "Links",
    path: "/links",
    description: "Profiles on GitHub, Mastodon, and other platforms.",
  },
  {
    title: "Colophon",
    path: "/colophon",
    description: "How this site is built: stack, typography, hosting.",
  },
];

const FEEDS: LlmsLink[] = [
  {
    title: "RSS",
    path: "/rss.xml",
    description: "Full-text feed of the 20 most recent notes.",
  },
  {
    title: "Sitemap",
    path: "/sitemap.xml",
    description: "Every indexable URL on the site.",
  },
];

function absolute(path: string): string {
  return new URL(path, SITE_CONFIG.url).href;
}

function renderSection(heading: string, links: LlmsLink[]): string {
  const items = links.map(
    (link) => `- [${link.title}](${absolute(link.path)}): ${link.description}`
  );
  return `## ${heading}\n\n${items.join("\n")}`;
}

export function GET() {
  const posts = getAllPosts();

  const noteLinks: LlmsLink[] = posts.map((post) => ({
    title: post.frontmatter.title,
    path: `/notes/${post.slug}`,
    description: `${post.frontmatter.excerpt} (${post.frontmatter.date}, ${post.readingTime})`,
  }));

  const body = [
    `# ${SITE_CONFIG.author.name} Nurula`,
    `> ${SITE_CONFIG.description}`,
    [
      "Personal site of a full-stack software engineer working mainly in TypeScript,",
      "React, and Next.js, with a side interest in homelab, self-hosting, networking,",
      "and privacy. The notes are long-form technical write-ups, not link posts.",
      `Contact: ${SITE_CONFIG.author.email}.`,
    ].join(" "),
    renderSection("Notes", noteLinks),
    renderSection("Pages", PAGES),
    renderSection("Feeds", FEEDS),
  ].join("\n\n");

  return new NextResponse(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
