import Link from "next/link";

import { MailIcon } from "@/components/icons";
import { SITE_CONFIG, SOCIAL_LINKS } from "@/config/site";
import { cn } from "@/lib/utils";

const HERO_SOCIALS = new Set(["GitHub", "Twitter", "LinkedIn"]);

interface HeroLinksProps {
  /** Show every social link instead of the short hero set. */
  all?: boolean;
  className?: string;
}

export function HeroLinks({ all = false, className }: HeroLinksProps) {
  const iconLinks = SOCIAL_LINKS.filter(
    (link) => link.name !== "Email" && (all || HERO_SOCIALS.has(link.name))
  );

  return (
    <div
      className={cn(
        "mt-[22px] mb-1.5 flex flex-wrap items-center gap-2",
        className
      )}
    >
      <a
        href={SITE_CONFIG.social.email}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 font-mono font-semibold text-[12.5px] text-primary-foreground no-underline transition-[filter] hover:brightness-110"
      >
        <MailIcon className="size-3.5" />
        email me
      </a>
      {iconLinks.map((link) => {
        const rel =
          "rel" in link
            ? `${link.rel} noopener noreferrer`
            : link.external
              ? "noopener noreferrer"
              : undefined;
        return (
          <Link
            key={link.name}
            href={link.href}
            target={link.external ? "_blank" : undefined}
            rel={rel}
            aria-label={link.name}
            title={link.name.toLowerCase()}
            className="group inline-flex size-9 items-center justify-center rounded-lg border border-border bg-background-soft transition-colors hover:border-primary hover:border-dashed"
          >
            <link.icon className="size-4 text-muted-foreground transition-colors group-hover:text-foreground group-focus-visible:text-foreground" />
          </Link>
        );
      })}
    </div>
  );
}
