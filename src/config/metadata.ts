import type { Metadata } from "next";

import { PAGE_METADATA, type PageMeta, SITE_CONFIG } from "./site";

interface OGImageParams {
  title: string;
  description?: string;
  type?: "default" | "blog" | "page";
  date?: string;
  readingTime?: string;
}

function buildOGImageUrl(params: OGImageParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set("title", params.title);
  if (params.description) searchParams.set("description", params.description);
  if (params.type) searchParams.set("type", params.type);
  if (params.date) searchParams.set("date", params.date);
  if (params.readingTime) searchParams.set("readingTime", params.readingTime);
  return `${SITE_CONFIG.url}/api/og?${searchParams.toString()}`;
}

/**
 * Generate complete metadata object for Next.js pages
 * @param pathname - The page pathname (e.g., '/about', '/notes')
 * @param customMeta - Optional custom metadata to override defaults
 */
export function createMetadata(
  pathname: string,
  customMeta?: Partial<PageMeta>
): Metadata {
  const pageMeta = PAGE_METADATA[pathname] || PAGE_METADATA["/"];
  const meta = { ...pageMeta, ...customMeta };
  const url = `${SITE_CONFIG.url}${pathname}`;
  const ogImageUrl = buildOGImageUrl({
    title: meta.title,
    description: meta.description,
    type: "page",
  });

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: meta.title,
      description: meta.description,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: SITE_CONFIG.author.twitter,
      images: [ogImageUrl],
    },
    robots: meta.noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${SITE_CONFIG.url}/rss.xml`,
      },
    },
  };
}

interface BlogPostMeta {
  title: string;
  description: string;
  slug: string;
  date: string;
  readingTime: string;
  tags?: string[];
  coverImage?: string;
}

/**
 * Generate metadata for blog posts with dynamic OG images
 */
export function createBlogMetadata(post: BlogPostMeta): Metadata {
  const url = `${SITE_CONFIG.url}/notes/${post.slug}`;
  const ogImageUrl = buildOGImageUrl({
    title: post.title,
    description: post.description,
    type: "blog",
    date: post.date,
    readingTime: post.readingTime,
  });

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: `${post.title} | ${SITE_CONFIG.name}`,
    description: post.description,
    keywords: post.tags || [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      title: post.title,
      description: post.description,
      siteName: SITE_CONFIG.name,
      publishedTime: post.date,
      authors: [SITE_CONFIG.author.name],
      tags: post.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: SITE_CONFIG.author.twitter,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
  };
}
