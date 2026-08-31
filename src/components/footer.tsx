import Link from "next/link";

import { BuildStamp } from "@/components/build-stamp";
import { FlickeringGrid } from "@/components/ui";
import { SITE_CONFIG } from "@/config";

const FOOTER_LINKS = [
  { name: "uses", href: "/uses" },
  { name: "about", href: "/about" },
  { name: "rss", href: "/rss.xml" },
] as const;

export function Footer() {
  return (
    <footer className="hairline-t flex flex-wrap justify-between gap-3 pt-6 pb-40 font-mono text-[12.5px] text-muted-foreground">
      <span>
        <BuildStamp year={new Date().getFullYear()} /> {SITE_CONFIG.author.name}
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

/**
 * Full-bleed dot band at the document bottom. It sits above `container-editorial`
 * because that utility paints an opaque background at z-index 1.
 */
export function FooterBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[140px] overflow-hidden"
      style={{
        maskImage: "linear-gradient(to top, black, transparent)",
        WebkitMaskImage: "linear-gradient(to top, black, transparent)",
      }}
    >
      <FlickeringGrid
        squareSize={3}
        gridGap={3}
        color="var(--primary)"
        maxOpacity={0.22}
      />
    </div>
  );
}
