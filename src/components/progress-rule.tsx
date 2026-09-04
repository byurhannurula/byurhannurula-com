"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Thin scroll-progress rule, for sitting under the nav on a long post.
 *
 * Transform rather than width so the browser can composite it: a width change
 * on every scroll event lays out the page again, and this fires constantly.
 */
export function ProgressRule({ className }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn("h-px w-full bg-border-dash", className)}>
      <div
        className="h-px bg-primary"
        style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
      />
    </div>
  );
}
