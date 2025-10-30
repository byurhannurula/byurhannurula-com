import Link from "next/link"
import { Rss } from "lucide-react"

import { SocialLinks } from "@/components/social-links"
import { SITE_CONFIG } from "@/lib"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex max-w-screen-md flex-col items-center justify-between gap-4 px-6 py-3 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {SITE_CONFIG.name} &copy; {new Date().getFullYear()}
        </p>

        <div className="flex items-center gap-4">
          <SocialLinks />
          <Link
            href="/rss.xml"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
            aria-label="RSS"
          >
            <Rss className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
