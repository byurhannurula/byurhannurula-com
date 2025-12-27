import Link from "next/link"
import { Github, Mail, ExternalLink, Rss } from "lucide-react"

import { PageWrapper } from "@/components/page-wrapper"
import { createMetadata } from "@/config/metadata"
import { MastodonIcon } from "@/components/icons"
import { SITE_CONFIG } from "@/lib/constants"

export const metadata = createMetadata("/links")

interface LinkItem {
  title: string
  description?: string
  url: string
  icon?: React.ReactNode
}

const socialLinks: LinkItem[] = [
  {
    title: "GitHub",
    description: "Code, projects, and contributions",
    url: SITE_CONFIG.social.github,
    icon: <Github className="size-5" />,
  },
  {
    title: "Mastodon",
    description: "Fediverse updates",
    url: SITE_CONFIG.social.mastodon,
    icon: <MastodonIcon className="size-5" />,
  },
  {
    title: "Email",
    description: "Get in touch",
    url: SITE_CONFIG.social.email,
    icon: <Mail className="size-5" />,
  },
]

const siteLinks: LinkItem[] = [
  {
    title: "Blog",
    description: "Notes on tech, privacy, and tinkering",
    url: "/notes",
  },
  {
    title: "Uses",
    description: "Tools, gear, and software I use",
    url: "/uses",
  },
  {
    title: "About",
    description: "More about me",
    url: "/about",
  },
  {
    title: "RSS Feed",
    description: "Subscribe to updates",
    url: "/rss.xml",
    icon: <Rss className="size-5" />,
  },
]

const resourceLinks: LinkItem[] = [
  {
    title: "Dotfiles",
    description: "My macOS configuration",
    url: "https://github.com/byurhannurula/dotfiles",
  },
]

export default function LinksPage() {
  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12 text-center">
        <h1 className="text-2xl font-medium">{SITE_CONFIG.name}</h1>
        <p className="mt-2 text-muted-foreground">Developer, Tech Geek & Thinker</p>
      </div>

      <div className="mx-auto max-w-sm space-y-8">
        {/* Social Links */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Connect
          </h2>
          <div className="space-y-3">
            {socialLinks.map((link) => (
              <LinkCard key={link.title} link={link} external />
            ))}
          </div>
        </section>

        {/* Site Links */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Explore
          </h2>
          <div className="space-y-3">
            {siteLinks.map((link) => (
              <LinkCard
                key={link.title}
                link={link}
                external={link.url.startsWith("http") || link.url.endsWith(".xml")}
              />
            ))}
          </div>
        </section>

        {/* Resources */}
        <section>
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Resources
          </h2>
          <div className="space-y-3">
            {resourceLinks.map((link) => (
              <LinkCard key={link.title} link={link} external />
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  )
}

function LinkCard({ link, external = false }: { link: LinkItem; external?: boolean }) {
  const Component = external ? "a" : Link
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}

  return (
    <Component
      href={link.url}
      className="group flex items-center gap-4 rounded-xl border border-border/50 bg-muted/30 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-muted/50"
      {...externalProps}
    >
      {link.icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground transition-colors group-hover:text-foreground">
          {link.icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="font-medium">{link.title}</div>
        {link.description && (
          <div className="truncate text-sm text-muted-foreground">{link.description}</div>
        )}
      </div>
      <ExternalLink className="size-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
    </Component>
  )
}
