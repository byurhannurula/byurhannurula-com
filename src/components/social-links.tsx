import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link
        href={SITE_CONFIG.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
        aria-label="LinkedIn"
      >
        <Linkedin className="size-5" />
      </Link>
      <Link
        href={SITE_CONFIG.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
        aria-label="GitHub"
      >
        <Github className="size-5" />
      </Link>
      <Link
        href={SITE_CONFIG.social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
        aria-label="Twitter"
      >
        <Twitter className="size-5" />
      </Link>
      <Link
        href={SITE_CONFIG.social.email}
        className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground"
        aria-label="Email"
      >
        <Mail className="size-5" />
      </Link>
    </div>
  )
}
