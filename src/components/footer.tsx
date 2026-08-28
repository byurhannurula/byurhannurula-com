import Link from "next/link";

import { SITE_CONFIG } from "@/config";

const FOOTER_LINKS = [
  { name: "uses", href: "/uses" },
  { name: "about", href: "/about" },
  { name: "rss", href: "/rss.xml" },
] as const;

export function Footer() {
  return (
    <footer className="hairline-t flex flex-wrap justify-between gap-3 pt-6 pb-10 font-mono text-[12.5px] text-muted-foreground">
      <span>
        &copy; {new Date().getFullYear()} {SITE_CONFIG.author.name}
      </span>
      <span>
        {FOOTER_LINKS.map((link, index) => (
          <span key={link.href}>
            {index > 0 ? " · " : null}
            <Link
              href={link.href}
              className="no-underline transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          </span>
        ))}
      </span>
    </footer>
  );
}
