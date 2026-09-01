"use client";

import { useEffect } from "react";

import { settleOnHeading } from "@/lib/scroll-to-heading";

/**
 * Holds the hash target in place on direct loads. The browser scrolls the
 * moment it parses the document, long before images have settled the layout.
 */
export function HashScroll() {
  useEffect(() => {
    const run = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) settleOnHeading(id);
    };

    run();
    window.addEventListener("hashchange", run);
    return () => window.removeEventListener("hashchange", run);
  }, []);

  return null;
}
