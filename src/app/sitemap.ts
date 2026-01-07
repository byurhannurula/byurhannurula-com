import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config";
import { getAllPosts } from "@/lib/server/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const blogUrls = posts.map((post) => ({
    url: new URL(`/notes/${post.slug}`, SITE_CONFIG.url).href,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: new URL(`/`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: new URL(`/about`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: new URL(`/notes`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: new URL(`/uses`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: new URL(`/contact`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: new URL(`/links`, SITE_CONFIG.url).href,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  return [...staticPages, ...blogUrls];
}
