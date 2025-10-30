import { NextResponse } from "next/server"
import { SITE_CONFIG } from "@/lib/constants"

interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

// Helper function to parse date and get proper ISO date
const parseDate = (dateStr: string) => {
  const currentYear = new Date().getFullYear()
  const [day, month] = dateStr.split(" ")

  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  }

  const monthIndex = monthMap[month]
  const date = new Date(currentYear, monthIndex, parseInt(day))

  // If the date is in the future, assume it's from the previous year
  if (date > new Date()) {
    date.setFullYear(currentYear - 1)
  }

  return date
}

export async function GET() {
  try {
    // Fetch posts from API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/blog`
    )
    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }
    const posts: BlogPost[] = await response.json()

    const rssItems = posts
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
      .slice(0, 20) // Latest 20 posts
      .map((post) => {
        const pubDate = parseDate(post.date).toUTCString()
        const postUrl = `${SITE_CONFIG.url}/blog/${post.slug}`

        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category><![CDATA[${post.tags.join(", ")}]]></category>
    </item>`
      })
      .join("")

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${SITE_CONFIG.title}]]></title>
    <description><![CDATA[${SITE_CONFIG.description}]]></description>
    <link>${SITE_CONFIG.url}</link>
    <language>en-us</language>
    <managingEditor>${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})</managingEditor>
    <webMaster>${SITE_CONFIG.author.email} (${SITE_CONFIG.author.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Error generating RSS feed:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>Failed to generate RSS feed</description></channel></rss>',
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml",
        },
      }
    )
  }
}
