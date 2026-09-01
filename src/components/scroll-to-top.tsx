"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed right-6 bottom-6 z-50 hidden size-9 animate-fade-in-scale items-center justify-center rounded-sm border border-border bg-background-soft text-muted-foreground shadow-sm transition-colors hover:border-primary hover:text-primary sm:flex"
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4" />
    </button>
  );
}
