import Script from "next/script";

import { env } from "@/env";

/**
 * Self-hosted umami, loaded from this origin.
 *
 * /stats is rewritten to the analytics host (see next.config.mjs), so the
 * request is first-party: nothing to preconnect to, no third-party hostname
 * for a content blocker to match, and same-site cookie rules apply. The
 * script derives its collect endpoint from its own src directory, so the
 * rewrite is the whole configuration.
 *
 * Session replay (recorder.js) is deliberately not loaded: 57KB on every
 * route, against no question it currently answers.
 */
const SCRIPT = "/stats/script.js";

export function UmamiAnalytics() {
  const websiteId = env.NEXT_PUBLIC_UMAMI_ID;
  if (!websiteId) return null;

  // A dev server would otherwise report every save as a page view.
  if (process.env.NODE_ENV !== "production") return null;

  /*
   * Reporting is limited to the site's own host, which is what keeps preview
   * deployments -- and anyone running a copy of this repo -- out of the
   * numbers. Derived rather than configured: a second variable holding the
   * same hostname as NEXT_PUBLIC_BASE_URL is a second thing to keep in sync.
   */
  const domains = new URL(env.NEXT_PUBLIC_BASE_URL).hostname;

  return (
    <>
      {/* afterInteractive, not lazyOnload: a page view that lands after the
          reader has left is a page view that never happened. */}
      <Script
        data-domains={domains}
        data-website-id={websiteId}
        id="umami-analytics"
        src={SCRIPT}
        strategy="afterInteractive"
      />
    </>
  );
}
