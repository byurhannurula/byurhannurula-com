"use client";

import { useEffect, useRef, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed top-0 left-0 z-50 h-1 w-full">
      {/*
       * scaleX rather than width: this is written on every scroll frame, and a
       * width change lays out and paints a full-width bar each time where a
       * transform only composites. No transition either, since the value is
       * already following the scroll.
       */}
      <div
        className="h-full w-full origin-left bg-primary"
        style={{ scale: `${progress / 100} 1` }}
      />
    </div>
  );
}
