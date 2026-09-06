"use client";

import { useEffect, useState } from "react";

/**
 * Whether the visitor has asked for less motion.
 *
 * For the cases CSS cannot reach: an inline `style={{ transition }}` beats a
 * `motion-reduce:` class regardless of specificity, so a component that sets
 * its transitions inline has to read the query itself.
 *
 * False until mounted. The server has no media queries, and guessing would
 * mean rendering one answer and correcting it.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}
