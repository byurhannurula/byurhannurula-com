import { Metadata } from "next"
import { siteConfig, getPageMetadata, PageMeta } from "./site"

/**
 * Generate complete metadata object for Next.js pages
 * @param pathname - The page pathname (e.g., '/about', '/notes')
 * @param customMeta - Optional custom metadata to override defaults
 */
export function createMetadata(pathname: string, customMeta?: Partial<PageMeta>): Metadata {
  const pageMeta = getPageMetadata(pathname)
  const meta = { ...pageMeta, ...customMeta }

  const url = `${siteConfig.url}${pathname}`

  return {
    metadataBase: new URL(siteConfig.url),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords || [...siteConfig.keywords],
    authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
    creator: siteConfig.author.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: meta.title,
      description: meta.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: siteConfig.author.twitter,
    },
    robots: meta.noIndex
      ? {
          index: false,
          follow: false,
        }
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
        "application/rss+xml": `${siteConfig.url}/rss.xml`,
      },
    },
  }
}
