import 'server-only';

import { cache } from 'react';

export interface LinkPreview {
  title: string;
  description?: string;
  image?: string;
  site: string;
}

const TIMEOUT_MS = 3000;
/** The head of a page is enough; some pages are megabytes. */
const MAX_BYTES = 200_000;

function meta(html: string, ...names: string[]) {
  for (const name of names) {
    const tag = new RegExp(
      `<meta[^>]+(?:property|name)=["']${name}["'][^>]*>`,
      'i',
    ).exec(html)?.[0];
    const content = tag && /content=["']([^"']*)["']/i.exec(tag)?.[1];
    if (content) return decode(content.trim());
  }
  return undefined;
}

function decode(text: string) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

/**
 * Title, description and share picture of an outside page, read once at
 * build time for the `linkcard` option. Null when the page is slow, not
 * HTML, or has no title: the link then shows no card.
 */
export const linkPreview = cache(
  async (href: string): Promise<LinkPreview | null> => {
    try {
      const res = await fetch(href, {
        headers: { 'user-agent': 'Mozilla/5.0 (link preview)' },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: 'force-cache',
      });
      if (!res.ok || !res.headers.get('content-type')?.includes('text/html')) {
        return null;
      }
      const html = (await res.text()).slice(0, MAX_BYTES);
      const title =
        meta(html, 'og:title', 'twitter:title') ??
        /<title[^>]*>([^<]*)<\/title>/i.exec(html)?.[1]?.trim();
      if (!title) return null;
      const image = meta(html, 'og:image', 'twitter:image');
      return {
        title: decode(title),
        description: meta(html, 'og:description', 'description'),
        image: image ? new URL(image, res.url).href : undefined,
        site: meta(html, 'og:site_name') ?? new URL(res.url).hostname,
      };
    } catch {
      return null;
    }
  },
);
