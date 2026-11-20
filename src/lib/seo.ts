import type { Metadata } from 'next';

import { SITE_SEO } from '@/config/seo';
import { RSS_PATH } from '@/content/socials';
import { brand } from '@/lib/brand';
import { absoluteUrl } from '@/lib/site';
import { NOTES_LIVE } from '@/content/nav';

/**
 * The share video as Open Graph wants it. Few platforms play `og:video`,
 * and those that do not use the image, so it costs nothing where it is
 * ignored.
 */
export const SHARE_VIDEO = {
  // Absolute: Next.js resolves images against metadataBase, but not videos.
  url: absoluteUrl(SITE_SEO.shareVideo.path),
  width: SITE_SEO.shareVideo.width,
  height: SITE_SEO.shareVideo.height,
  type: 'video/mp4',
} as const;

/**
 * The feed link in the page head. A page's own `alternates` replaces the
 * layout's, it does not merge, so every page must carry this again.
 */
export const FEED_ALTERNATES: Record<string, { url: string; title: string }[]> =
  NOTES_LIVE
    ? { 'application/rss+xml': [{ url: RSS_PATH, title: brand.name }] }
    : {};

interface ArticleMeta {
  /** ISO date. */
  publishedTime: string;
  tags?: readonly string[];
}

interface PageMeta {
  path: string;
  title: string;
  /** Use the title as it is, without the site name after it. */
  absoluteTitle?: boolean;
  description: string;
  noindex?: boolean;
  /** Set for a note: the preview is then typed as an article. */
  article?: ArticleMeta;
}

/**
 * Metadata for one page: title, description, canonical URL and the share
 * preview. Pass an entry of `PAGES` from src/config/seo.ts. The share image
 * is not set here: each route has its own `opengraph-image.tsx`, which
 * Next.js adds to the tags.
 */
export function pageMetadata({
  path,
  title,
  absoluteTitle,
  description,
  noindex,
  article,
}: PageMeta): Metadata {
  const shared = {
    siteName: brand.name,
    locale: SITE_SEO.locale,
    url: path,
    title,
    description,
    videos: [SHARE_VIDEO],
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path, types: FEED_ALTERNATES },
    openGraph: article
      ? {
          ...shared,
          type: 'article',
          publishedTime: article.publishedTime,
          authors: [brand.name],
          tags: article.tags ? [...article.tags] : undefined,
        }
      : { ...shared, type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}
