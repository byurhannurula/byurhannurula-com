"use client";

import { ArrowUp, Menu, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "vaul";

import { OPEN_COMMAND_PALETTE_EVENT } from "@/components/command-palette";
import { NAVIGATION_ITEMS } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, path: string) {
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

/**
 * The only navigation on touch: the header's nav row and the scroll-to-top
 * button are both hidden below `sm`, and the command palette's key hint is
 * meaningless without a keyboard.
 *
 * One control rather than a stack of floating circles -- on a post page those
 * were competing with the TOC island for the same corner. It opens a sheet
 * instead of a menu so it matches the command palette on touch, and so there
 * is room for search and back-to-top alongside the links.
 *
 * Always visible, not revealed on scroll: with the header nav gone there would
 * otherwise be no way to navigate from the top of a page.
 */
export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => setIsOpen(false);

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen}>
      <Drawer.Trigger
        aria-label="Navigation and search"
        className="fixed right-5 bottom-6 z-50 flex size-11 items-center justify-center rounded-full border border-border bg-surface-raised text-muted-foreground shadow-lg transition-colors data-[state=open]:text-foreground sm:hidden"
      >
        <Menu aria-hidden className="size-4.5" />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-[2px]" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 z-50 flex flex-col rounded-t-2xl border-border border-t bg-background pb-[env(safe-area-inset-bottom)] outline-none">
          <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-border" />
          <Drawer.Title className="px-5 pt-4 pb-2 font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
            go to
          </Drawer.Title>
          <Drawer.Description className="sr-only">
            Site navigation, search, and back to top
          </Drawer.Description>

          <nav className="flex flex-col px-2 pb-2 font-mono text-[15px]">
            {NAVIGATION_ITEMS.map((item) => {
              const active = isActive(pathname, item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl px-3 py-3 no-underline transition-colors active:bg-background-soft",
                    active ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-1 border-border border-t px-2 py-2 font-mono text-[15px] text-muted-foreground">
            <button
              type="button"
              onClick={() => {
                close();
                window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors active:bg-background-soft"
            >
              <Search aria-hidden className="size-4" />
              search
            </button>
            <button
              type="button"
              onClick={() => {
                close();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors active:bg-background-soft"
            >
              <ArrowUp aria-hidden className="size-4" />
              back to top
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
