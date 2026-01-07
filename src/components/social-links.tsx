import Link from "next/link";

import { SOCIAL_LINKS } from "@/config/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  // Filter out RSS for hero section
  const heroLinks = SOCIAL_LINKS.filter((link) => link.name !== "RSS");

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {heroLinks.map((link) => {
        const relAttr =
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
            rel={relAttr}
            className="group inline-flex items-center gap-1.5 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground"
            aria-label={link.name}
          >
            <link.icon className="size-5" />
          </Link>
        );
      })}
    </div>
  );
}
