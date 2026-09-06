"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /*
   * Kept mounted rather than returned as null. It used to fade in and then
   * vanish between one frame and the next, which reads as the button being
   * taken away rather than leaving. The floating table of contents in the
   * opposite corner of the same screen already works this way.
   */
  return (
    <button
      aria-hidden={!isVisible}
      aria-label="Scroll to top"
      className={cn(
        "pressable fixed right-6 bottom-6 z-50 hidden size-9 items-center justify-center rounded-sm border border-border bg-background-soft text-muted-foreground shadow-sm hover:border-primary hover:text-primary sm:flex",
        "transition-[opacity,translate,color,border-color,scale] duration-200 ease-out motion-reduce:transition-[opacity]",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
      onClick={scrollToTop}
      tabIndex={isVisible ? undefined : -1}
      type="button"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
