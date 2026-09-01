"use client";

import { useEffect, useState } from "react";

/** Matches Tailwind's `sm`, the breakpoint the mobile layout is built around. */
const MOBILE_QUERY = "(max-width: 639px)";

/**
 * True on small screens.
 *
 * Starts false so server and first client render agree; the real value lands
 * in the effect. Callers must therefore treat `false` as "not known yet"
 * rather than "definitely desktop".
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isMobile;
}
