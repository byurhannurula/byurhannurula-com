import { SITE_CONFIG } from "@/lib/constants"
import { Github, Mail } from "lucide-react"
import Link from "next/link"

import { MastodonIcon } from "@/components/icons"

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Link
        href={SITE_CONFIG.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        aria-label="GitHub"
      >
        <Github className="size-4" />
        <span className="text-xs font-medium">GitHub</span>
      </Link>
      <Link
        href={SITE_CONFIG.social.mastodon}
        target="_blank"
        rel="me noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        aria-label="Mastodon"
      >
        <MastodonIcon className="size-4" />
        <span className="text-xs font-medium">Mastodon</span>
      </Link>
      <Link
        href={SITE_CONFIG.social.email}
        className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        aria-label="Email"
      >
        <Mail className="size-4" />
        <span className="text-xs font-medium">Email</span>
      </Link>
    </div>
  )
}
