"use client";

import { ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TOCFloatingProps {
  className?: string;
}

export function TOCFloating({ className = "" }: TOCFloatingProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const articleContent = document.querySelector("[data-mdx-content]");
    if (!articleContent) return;

    const headings = articleContent.querySelectorAll("h2[id], h3[id]");
    const items: TOCItem[] = [];

    headings.forEach((heading) => {
      if (heading.closest("footer") || heading.closest("nav")) return;

      const id = heading.id;
      if (!id) return;

      const textSpan = heading.querySelector("span");
      const text = textSpan?.textContent?.trim() || "";
      const level = Number(heading.tagName.replace("H", ""));

      items.push({ id, text, level });
    });

    setTocItems(items);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((heading) => {
      if (!(heading.closest("footer") || heading.closest("nav"))) {
        observer.observe(heading);
      }
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  if (tocItems.length === 0) return null;

  const activeIndex = tocItems.findIndex((item) => item.id === activeId);
  const progress =
    tocItems.length > 0 ? ((activeIndex + 1) / tocItems.length) * 100 : 0;
  const LINE_HEIGHT = 20;

  return (
    <>
      {/* Background blur overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/10 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={handleClose}
      />

      <div
        className={cn(
          "pointer-events-auto fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
          isVisible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-16 opacity-0",
          className
        )}
      >
        {/* Expanded TOC Panel */}
        <nav
          className={cn(
            "overflow-hidden rounded-3xl border border-border bg-background shadow-2xl transition-all duration-300",
            isOpen
              ? "max-h-[500px] w-[min(400px,calc(100vw-2rem))] opacity-100"
              : "max-h-[50px] w-auto min-w-[200px] max-w-[min(400px,calc(100vw-2rem))] opacity-100"
          )}
        >
          {/* Expanded content */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isOpen
                ? "max-h-[450px] opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            )}
          >
            <div className="p-3 pb-0">
              {/* Header */}
              <div className="mb-2 flex items-center justify-between px-2">
                <span className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Table of Contents
                </span>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Scroll to top"
                >
                  <ChevronUp className="size-4" />
                </button>
              </div>

              {/* TOC Items */}
              <div className="max-h-[400px] overflow-y-auto pr-2">
                <div className="flex flex-col gap-1 pb-2">
                  {tocItems.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => scrollToHeading(item.id)}
                      className={cn(
                        "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                        activeId === item.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                        item.level === 3 && "pl-6"
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate text-left">
                        {item.text}
                      </span>
                      {activeId === item.id && (
                        <div className="ml-2 size-1.5 shrink-0 rounded-full bg-foreground" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar / Collapsed pill */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "flex w-full items-center justify-between gap-3 p-3 transition-colors",
              isOpen && "border-border border-t"
            )}
            style={{ height: 50 }}
            aria-label={
              isOpen ? "Close table of contents" : "Open table of contents"
            }
          >
            <div className="flex min-w-0 flex-1 items-center justify-center gap-3 overflow-hidden">
              {/* Active indicator dot */}
              <div className="size-2 shrink-0 rounded-full bg-foreground" />

              {/* Animated text container */}
              <div
                ref={textContainerRef}
                className="relative h-5 min-w-0 flex-1 overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateY(-${activeIndex * LINE_HEIGHT}px)`,
                  }}
                >
                  {tocItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex h-5 min-w-0 items-center font-medium text-[13px]"
                    >
                      <span className="block w-full truncate text-left">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress circle */}
            <div className="relative mr-1 size-7 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-muted"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-current text-foreground transition-all duration-300"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="100.53"
                  strokeDashoffset={100.53 - (progress / 100) * 100.53}
                />
              </svg>
            </div>
          </button>
        </nav>
      </div>
    </>
  );
}
