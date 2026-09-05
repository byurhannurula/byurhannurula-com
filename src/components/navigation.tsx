"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

import { openBuildInfo } from "@/components/build-info";
import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/command-palette";
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

  // Ordered, not nested: on mobile the logo and the palette button share the
  // first row and the nav takes a full-width second one, so neither row
  // carries dead space. On sm+ it collapses to a single row, logo left and nav
  // plus button right.
  return (
    <header className="hairline flex flex-wrap items-center gap-x-2 gap-y-3 py-5 font-mono text-[13px] sm:flex-nowrap">
      <Link
        href="/"
        className="order-1 font-semibold text-[15px] text-foreground no-underline"
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

      <nav
        aria-label="Main"
        className="order-3 hidden basis-full sm:order-2 sm:ml-auto sm:block sm:basis-auto"
      >
        <ul className="flex flex-wrap gap-1">
          {NAVIGATION_ITEMS.map((item) => {
            const active = isActive(pathname, item.path);
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-sm px-2 py-1 no-underline transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-background-soft hover:text-foreground"
                  )}
                >
                  {/* 0fr -> 1fr animates the marker's width, so the row slides
                        instead of snapping when the active item changes. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid transition-[grid-template-columns] duration-[180ms] ease-out",
                      active ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                    )}
                  >
                    {/* `translate`, not `transform`: Tailwind v4 compiles
                          -translate-x-px to the standalone translate property. */}
                    <span
                      className={cn(
                        "min-w-0 overflow-hidden transition-[opacity,translate] duration-[180ms] ease-out",
                        active ? "opacity-60" : "-translate-x-px opacity-0"
                      )}
                    >
                      ./
                    </span>
                  </span>
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        onClick={() =>
          window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT))
        }
        className="order-2 ml-auto hidden appearance-none rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-normal transition-colors hover:border-muted-foreground hover:text-foreground sm:order-3 sm:ml-0 sm:inline-flex"
        aria-label="⌘K, open command palette"
      >
        ⌘k
      </button>
    </header>
  );
}
