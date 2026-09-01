"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { scrollToHeading } from "@/lib/scroll-to-heading";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCFloatingProps {
  className?: string;
}

/** Matches the island easing from the reference: fast out, long settle. */
const ISLAND_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ISLAND_MS = 460;
const COLLAPSED_WIDTH = 300;
const OPEN_WIDTH = 420;
const LINE_HEIGHT = 20;

export function TOCFloating({ className = "" }: TOCFloatingProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    const articleContent = document.querySelector("[data-mdx-content]");
    if (!articleContent) return;

    const headings = Array.from(
      articleContent.querySelectorAll<HTMLElement>("h2[id], h3[id]")
    ).filter(
      (heading) => !(heading.closest("footer") || heading.closest("nav"))
    );

    setTocItems(
      headings
        .filter((heading) => heading.id)
        .map((heading) => ({
          id: heading.id,
          text: heading.querySelector("span")?.textContent?.trim() ?? "",
          level: Number(heading.tagName.replace("H", "")),
        }))
    );

    const handleScroll = () => setIsVisible(window.scrollY > 300);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );
    for (const heading of headings) observer.observe(heading);

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Bring the current section into view inside the panel, not the page.
  useEffect(() => {
    if (!(isOpen && activeId)) return;
    listRef.current
      ?.querySelector(`[data-toc-id="${CSS.escape(activeId)}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [isOpen, activeId]);

  const goToHeading = useCallback(
    (id: string) => {
      scrollToHeading(id);
      close();
    },
    [close]
  );

  if (!isMounted || tocItems.length === 0) return null;

  const activeIndex = Math.max(
    0,
    tocItems.findIndex((item) => item.id === activeId)
  );
  const progress = ((activeIndex + 1) / tocItems.length) * 100;
  const circumference = 100.53;

  // container-editorial sets `position: relative; z-index: 1`, which opens a
  // stacking context. Inside it the island's z-50 is scoped to that context, so
  // it lost to the footer dot band at z-2. Portal to body to escape it.
  return createPortal(
    <>
      <button
        type="button"
        aria-label="Close table of contents"
        tabIndex={isOpen ? 0 : -1}
        onClick={close}
        className={cn(
          "fixed inset-0 z-40 cursor-default bg-background/40 backdrop-blur-[2px] transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ transitionDuration: `${ISLAND_MS}ms` }}
      />

      <div
        className={cn(
          // Nudged off-centre below sm so it clears the mobile nav button in the
          // bottom-right corner; centred again once that button is gone.
          "fixed bottom-6 left-[calc(50%-1.75rem)] z-50 -translate-x-1/2 sm:left-1/2",
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-16 opacity-0",
          "motion-reduce:transition-none",
          className
        )}
        style={{
          transition: `transform ${ISLAND_MS}ms ${ISLAND_EASE}, opacity 240ms ease-out`,
        }}
      >
        {/* Explicit widths, so the island can actually animate its width —
            w-auto has nothing to interpolate from. */}
        {/* surface-raised, not background-soft: the island sits over the footer
            dot field, where anything close to the page colour reads as
            translucent in both themes. */}
        {/* One fixed radius, half the collapsed height. The shape reads as a
            pill while short and as a panel once tall, so nothing needs to
            animate: interpolating border-radius fights the height clamp and
            bulges the corners mid-transition. */}
        <nav
          id={panelId}
          className="overflow-hidden rounded-3xl border border-border bg-surface-raised shadow-2xl motion-reduce:transition-none"
          style={{
            width: `min(${isOpen ? OPEN_WIDTH : COLLAPSED_WIDTH}px, calc(100vw - 2rem))`,
            transition: `width ${ISLAND_MS}ms ${ISLAND_EASE}`,
          }}
        >
          {/* 0fr to 1fr animates to the content's real height, unlike max-h,
              which eases across a range the content never fills. */}
          <div
            className="grid motion-reduce:transition-none"
            style={{
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: `grid-template-rows ${ISLAND_MS}ms ${ISLAND_EASE}`,
            }}
          >
            <div className="overflow-hidden">
              <div
                className={cn(
                  "p-2.5 pb-0 transition-opacity duration-200",
                  isOpen ? "opacity-100 delay-100" : "opacity-0"
                )}
              >
                <div className="mb-1.5 flex items-center justify-between px-2">
                  <span className="font-mono text-[11px] text-faint uppercase tracking-[0.08em]">
                    on this page
                  </span>
                  <button
                    type="button"
                    onClick={close}
                    className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Close table of contents"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>

                <div
                  ref={listRef}
                  className="max-h-[min(360px,50vh)] overflow-y-auto pb-2"
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 12px, black calc(100% - 12px), transparent)",
                  }}
                >
                  {tocItems.map((item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      data-toc-id={item.id}
                      onClick={() => goToHeading(item.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-[13px] transition-colors",
                        activeId === item.id
                          ? "bg-background-soft text-foreground"
                          : "text-muted-foreground hover:bg-background-soft/60 hover:text-foreground",
                        item.level === 3 && "pl-7"
                      )}
                      style={{
                        transition: `opacity 260ms ${ISLAND_EASE} ${isOpen ? 90 + index * 18 : 0}ms, transform 260ms ${ISLAND_EASE} ${isOpen ? 90 + index * 18 : 0}ms, background-color 150ms, color 150ms`,
                        opacity: isOpen ? 1 : 0,
                        transform: isOpen ? "none" : "translateY(6px)",
                      }}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "font-mono text-[10px]",
                          activeId === item.id ? "text-primary" : "text-faint"
                        )}
                      >
                        {item.level === 3 ? "###" : "##"}
                      </span>
                      <span className="min-w-0 flex-1 truncate">
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className={cn(
              "flex h-11.5 w-full items-center gap-3 px-3 text-left transition-colors",
              // The nav clips overflow, so the global offset ring shows only as
              // a stray line along one edge. Draw it inside, on the pill shape.
              "focus-visible:rounded-[22px] focus-visible:-outline-offset-2",
              isOpen && "border-border border-t border-dashed"
            )}
          >
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-primary"
            />

            <span className="relative h-5 min-w-0 flex-1 overflow-hidden">
              <span
                className="absolute inset-x-0 top-0 block motion-reduce:transition-none"
                style={{
                  transform: `translateY(-${activeIndex * LINE_HEIGHT}px)`,
                  transition: `transform ${ISLAND_MS}ms ${ISLAND_EASE}`,
                }}
              >
                {tocItems.map((item) => (
                  <span
                    key={item.id}
                    className="flex h-5 items-center font-medium text-[13px]"
                  >
                    <span className="block w-full truncate">{item.text}</span>
                  </span>
                ))}
              </span>
            </span>

            <span className="relative size-6 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <title>reading progress</title>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-border"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={
                    circumference - (progress / 100) * circumference
                  }
                  style={{ transition: `stroke-dashoffset 300ms ease-out` }}
                />
              </svg>
            </span>
          </button>
        </nav>
      </div>
    </>,
    document.body
  );
}
