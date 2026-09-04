import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";
import { z } from "zod";

import { calculateReadingTime } from "../utils";
import { SLUG_RE } from "../validation";

const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().min(1),
  coverImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  toc: z.boolean().optional(),
  featured: z.boolean().optional(),
});

function parseFrontmatter(data: unknown, slug: string): PostFrontmatter {
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter for "${slug}": ${parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")}`
    );
  }
  return parsed.data;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  tags: string[];
  toc?: boolean;
  featured?: boolean;
}

export interface Post {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
  readingTime: string;
}

function assertValidSlug(slug: string) {
  if (!SLUG_RE.test(slug)) throw new Error(`Invalid slug "${slug}"`);
}

export function getSinglePost(slug: string): Post {
  assertValidSlug(slug);
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  // Defensive even with regex: ensure resolved path stays inside content.
  if (!filePath.startsWith(postsDirectory)) {
    throw new Error(`Invalid slug "${slug}"`);
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const fileContents = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContents);

  return {
    slug,
    content,
    frontmatter: parseFrontmatter(data, slug),
    readingTime: calculateReadingTime(content),
  };
}

export const getAllPosts = cache((): Omit<Post, "content">[] => {
  try {
    const postsDirectory = path.join(process.cwd(), "content/blog");
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map((filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        if (!SLUG_RE.test(slug)) return null;
        const filePath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, "utf-8");
        const { content, data } = matter(fileContents);

        return {
          slug,
          frontmatter: parseFrontmatter(data, slug),
          readingTime: calculateReadingTime(content),
        };
      })
      .filter((p): p is Omit<Post, "content"> => p !== null);

    // Sort by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });

    return posts;
  } catch (_error) {
    return [];
  }
});

export function getFeaturedPost(): Omit<Post, "content"> | null {
  const posts = getAllPosts();
  return posts.find((post) => post.frontmatter.featured) || null;
}

export interface GroupedPosts {
  year: number;
  months: {
    month: string;
    posts: Omit<Post, "content">[];
  }[];
}

export const getAllTags = cache((): string[] => {
  const posts = getAllPosts();
  const allTags = posts.flatMap((post) => post.frontmatter.tags);
  return Array.from(new Set(allTags)).sort();
});

export function getPostsGroupedByDate(tag?: string): GroupedPosts[] {
  const posts = getAllPosts();

  const filteredPosts = tag
    ? posts.filter((post) => post.frontmatter.tags.includes(tag))
    : posts;

  const grouped: {
    [year: number]: { [month: string]: Omit<Post, "content">[] };
  } = {};

  filteredPosts.forEach((post) => {
    const date = new Date(post.frontmatter.date);
    const year = date.getFullYear();
    const month = date
      .toLocaleString("default", { month: "long" })
      .toUpperCase();

    if (!grouped[year]) {
      grouped[year] = {};
    }
    if (!grouped[year][month]) {
      grouped[year][month] = [];
    }

    grouped[year][month].push(post);
  });

  return Object.entries(grouped)
    .map(([year, months]) => ({
      year: Number.parseInt(year, 10),
      months: Object.entries(months).map(([month, posts]) => ({
        month,
        posts: posts.sort(
          (a, b) =>
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
        ),
      })),
    }))
    .sort((a, b) => b.year - a.year);
}
