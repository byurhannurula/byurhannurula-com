import type React from "react"
import { Inter } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"
import "./globals.css"
import "./mdx.css"
import "./code.css"

import { SITE_CONFIG } from "@/lib"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import UmamiAnalytics from "@/components/umami-analytics"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import { GlobalShortcuts } from "@/components/theme-shortcut"

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords.join(", "),
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  alternates: {
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/rss.xml`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    creator: SITE_CONFIG.author.twitter,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${sans.variable} min-h-screen bg-background font-sans antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
              <GlobalShortcuts />
            </div>
          </ThemeProvider>
          <UmamiAnalytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
