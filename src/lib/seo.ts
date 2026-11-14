import type { Metadata } from 'next';

import { brand } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';

/**
 * A short video for link previews: the wordmark typed out, then the role.
 * Few platforms play `og:video`, and those that do not use the image, so it
 * costs nothing where it is ignored. Made by scripts/make-og-video.mjs.
 */
export const SHARE_VIDEO = {
  // Absolute: Next.js resolves images against metadataBase, but not videos.
  url: absoluteUrl('/og/intro.mp4'),
  width: 1200,
  height: 630,
  type: 'video/mp4',
} as const;

interface ArticleMeta {
  /** ISO date. */
  publishedTime: string;
  tags?: string[];
}

interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  /** Set for a note: the preview is then typed as an article. */
  article?: ArticleMeta;
}

/**
 * Metadata for one page: title, description, canonical URL and the share
 * preview. The share image is not set here: each route has its own
 * `opengraph-image.tsx`, which Next.js adds to the tags.
 */
export function pageMetadata({
  path,
  title,
  description,
  noindex,
  article,
}: PageMeta): Metadata {
  const shared = {
    siteName: brand.name,
    locale: 'en',
    url: path,
    title,
    description,
    videos: [SHARE_VIDEO],
  };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: article
      ? {
          ...shared,
          type: 'article',
          publishedTime: article.publishedTime,
          authors: [brand.name],
          tags: article.tags,
        }
      : { ...shared, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
