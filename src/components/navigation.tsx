"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { openBuildInfo } from "@/components/build-info";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/command-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAVIGATION_ITEMS, SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

/** Hold the logo this long to reveal the build stamp. */
const LONG_PRESS_MS = 700;

export function Navigation() {
  const pathname = usePathname();
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPressRef = useRef(false);

  const startLongPress = () => {
    didLongPressRef.current = false;
    longPressRef.current = setTimeout(() => {
      didLongPressRef.current = true;
      openBuildInfo();
    }, LONG_PRESS_MS);
  };

  const cancelLongPress = () => {
    if (longPressRef.current) clearTimeout(longPressRef.current);
    longPressRef.current = null;
  };

  return (
    <header className="hairline flex flex-col items-start gap-3 py-5 font-mono text-[13px] sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="font-semibold text-[15px] text-foreground no-underline"
        aria-label="Home"
        onPointerDown={startLongPress}
        onPointerUp={cancelLongPress}
        onPointerLeave={cancelLongPress}
        onContextMenu={(event) => {
          // Touch long-press otherwise opens the OS context menu over the panel.
          if (didLongPressRef.current) event.preventDefault();
        }}
        onClick={(event) => {
          if (didLongPressRef.current) event.preventDefault();
        }}
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
          <button
            type="button"
            onClick={() =>
              window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
            }
            className="appearance-none rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground"
            aria-label="Open command palette"
          >
            ⌘k
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
