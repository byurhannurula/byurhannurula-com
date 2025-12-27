import Link from "next/link"
import { Github, Mail, Rss } from "lucide-react"

import { SITE_CONFIG } from "@/lib"
import { MastodonIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="relative bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto max-w-screen-md px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href={SITE_CONFIG.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </Link>
            <Link
              href={SITE_CONFIG.social.mastodon}
              target="_blank"
              rel="me noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Mastodon"
            >
              <MastodonIcon className="size-4" />
            </Link>
            <Link
              href={SITE_CONFIG.social.email}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </Link>
            <Link
              href="/rss.xml"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="RSS"
            >
              <Rss className="size-4" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
