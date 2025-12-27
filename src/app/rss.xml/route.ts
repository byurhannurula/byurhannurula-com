import remarkGfm from "remark-gfm"
import { NextResponse } from "next/server"
import { serialize } from "next-mdx-remote/serialize"

import { SITE_CONFIG } from "@/lib/constants"
import { getAllPosts, getSinglePost } from "@/lib/posts"

export async function GET() {
  try {
    const posts = getAllPosts().slice(0, 20)

    const rssItems = await Promise.all(
      posts.map(async (post) => {
        const fullPost = getSinglePost(post.slug)
        const pubDate = new Date(post.frontmatter.date).toUTCString()
        const postUrl = `${SITE_CONFIG.url}/notes/${encodeURIComponent(post.slug)}`

        // Convert MDX -> HTML using next-mdx-remote
        const mdxSource = await serialize(fullPost.content, {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [],
          },
        })

        // mdxSource contains compiled HTML string
        let contentHtml = mdxSource.compiledSource
        // Replace any CDATA terminators
        contentHtml = contentHtml.replace(/]]>/g, "]]&gt;")

        return `
<item>
  <title>${escapeXml(post.frontmatter.title)}</title>
  <description><![CDATA[${post.frontmatter.excerpt}]]></description>
  <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
  <link>${postUrl}</link>
  <guid isPermaLink="true">${postUrl}</guid>
  <pubDate>${pubDate}</pubDate>
  ${post.frontmatter.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n  ")}
  <author>${escapeXml(`${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})`)}</author>
  ${
    post.frontmatter.coverImage
      ? `<enclosure url="${encodeURIComponent(post.frontmatter.coverImage)}" type="image/jpeg" />`
      : ""
  }
</item>`
      })
    )

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
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
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=1800",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>Failed to generate RSS feed</description></channel></rss>`,
      {
        status: 500,
        headers: { "Content-Type": "application/xml" },
      }
    )
  }
}

// Escape XML helper
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
