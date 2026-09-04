import { NextResponse } from "next/server";

import { SITE_CONFIG } from "@/config";
import { getAllPosts } from "@/lib/server";

/** enclosure needs a MIME type and the URL is all there is to derive one from. */
function imageType(url: string) {
  const extension = new URL(url).pathname.split(".").pop()?.toLowerCase();
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  if (extension === "gif") return "image/gif";
  return "image/jpeg";
}

export async function GET() {
  try {
    const posts = getAllPosts().slice(0, 20);

    /*
     * Excerpt only, deliberately.
     *
     * This used to put `serialize().compiledSource` into content:encoded,
     * which is a compiled JavaScript function body, not HTML -- every reader
     * was being served `"use strict";` and the module source. Rendering the
     * real thing is not a small fix either: the posts lean on MDX components
     * (MDXImage, GridImage, Callout, ImageGrid) that a plain remark-to-HTML
     * pipeline drops, so a "full" feed would silently lose most images and
     * every callout. An honest excerpt that links out beats a mangled article.
     */
    const rssItems = posts.map((post) => {
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      const postUrl = `${SITE_CONFIG.url}/notes/${encodeURIComponent(post.slug)}`;
      const { coverImage } = post.frontmatter;

      return `
<item>
  <title>${escapeXml(post.frontmatter.title)}</title>
  <description><![CDATA[${post.frontmatter.excerpt}]]></description>
  <link>${postUrl}</link>
  <guid isPermaLink="true">${postUrl}</guid>
  <pubDate>${pubDate}</pubDate>
  ${post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n  ")}
  <author>${escapeXml(`${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})`)}</author>
  ${
    coverImage
      ? `<enclosure url="${escapeXml(coverImage)}" type="${imageType(coverImage)}" />`
      : ""
  }
</item>`;
    });

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.title)}</title>
    <description>${escapeXml(SITE_CONFIG.description)}</description>
    <link>${SITE_CONFIG.url}</link>
    <language>en-us</language>
    <managingEditor>${escapeXml(`${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})`)}</managingEditor>
    <webMaster>${escapeXml(`${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})`)}</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_CONFIG.url}/favicon.ico</url>
      <title>${escapeXml(SITE_CONFIG.title)}</title>
      <link>${SITE_CONFIG.url}</link>
    </image>
    ${rssItems.join("\n")}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (_error) {
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>Failed to generate RSS feed</description></channel></rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    );
  }
}

// Escape XML helper
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
