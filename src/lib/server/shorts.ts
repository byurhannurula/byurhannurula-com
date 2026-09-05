import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

import type { Short } from "@/types";
import { SLUG_RE } from "../validation";

const shortsDirectory = path.join(process.cwd(), "content/shorts");

export const getAllShorts = cache((): Omit<Short, "content">[] => {
  if (!fs.existsSync(shortsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(shortsDirectory);
  const shorts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      if (!SLUG_RE.test(slug)) return null;
      const filePath = path.join(shortsDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        frontmatter: {
          title: data.title || "Untitled",
          description: data.description || "",
          date: data.date || new Date().toISOString().split("T")[0],
          tags: data.tags || [],
          language: data.language || "typescript",
        },
      } as Omit<Short, "content">;
    })
    .filter((s): s is Omit<Short, "content"> => s !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return shorts;
});

export function getSingleShort(slug: string): Short {
  if (!SLUG_RE.test(slug)) throw new Error(`Invalid slug "${slug}"`);
  const filePath = path.join(shortsDirectory, `${slug}.mdx`);
  if (!filePath.startsWith(shortsDirectory)) {
    throw new Error(`Invalid slug "${slug}"`);
  }

  if (!fs.existsSync(filePath)) {
    throw new Error(`Short not found: ${slug}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    content,
    frontmatter: {
      title: data.title || "Untitled",
      description: data.description || "",
      date: data.date || new Date().toISOString().split("T")[0],
      tags: data.tags || [],
      language: data.language || "typescript",
    },
  };
}

export const getAllShortTags = cache((): string[] => {
  const shorts = getAllShorts();
  const tags = shorts.flatMap((short) => short.frontmatter.tags);
  return Array.from(new Set(tags)).sort();
});
