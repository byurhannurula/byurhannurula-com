import Link from "next/link";

import { SITE_CONFIG, SOCIAL_LINKS } from "@/config";

export function Footer() {
  return (
    <footer className="relative mb-4 bg-background">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
      <div className="container mx-auto max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.name}
            </p>

            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map((link) => {
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
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={link.name}
                  >
                    <link.icon className="size-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
