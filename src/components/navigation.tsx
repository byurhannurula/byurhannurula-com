"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { RssIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

export function Navigation() {
  const pathname = usePathname();

  return (
    <header className="hairline flex flex-col items-start gap-3 py-5 font-mono text-[13px] sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="font-semibold text-foreground no-underline"
        aria-label="Home"
      >
        {SITE_CONFIG.logo.replace(/\.$/, "")}
        <span className="text-primary">.</span>
      </Link>

      <div className="flex w-full items-center justify-between gap-2 sm:w-auto">
        <nav aria-label="Main">
          <ul className="flex flex-wrap gap-1">
            {NAVIGATION_ITEMS.map((item) => {
              const active = isActive(pathname, item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-sm px-2 py-1 no-underline transition-colors",
                      active
                        ? "text-primary before:opacity-60 before:content-['./']"
                        : "text-muted-foreground hover:bg-background-soft hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-1.5">
          <Link
            href="/rss.xml"
            aria-label="RSS feed"
            title="rss"
            className="inline-flex size-[30px] items-center justify-center rounded-sm border border-border text-rss transition-colors hover:border-rss"
          >
            <RssIcon className="size-3.5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
