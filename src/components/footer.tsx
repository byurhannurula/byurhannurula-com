import Link from "next/link";

import { BuildStamp } from "@/components/build-stamp";
import { LightSwitcher } from "@/components/light-switcher";
import { FlickeringGrid } from "@/components/ui";
import { SITE_CONFIG } from "@/config";

// uses and about live in the nav; the footer carries only what the nav doesn't.
const FOOTER_LINKS = [
  { name: "colophon", href: "/colophon" },
  { name: "design", href: "/design-system" },
  { name: "rss", href: "/rss.xml" },
] as const;

export function Footer() {
  return (
    <footer className="hairline-t flex flex-wrap items-center justify-between gap-3 pt-6 pb-40 font-mono text-[12.5px] text-muted-foreground">
      <span>
        <BuildStamp year={new Date().getFullYear()} /> {SITE_CONFIG.author.name}
      </span>
      <span className="flex items-center gap-3">
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
        <LightSwitcher />
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-2 h-35 overflow-hidden"
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
