import Script from 'next/script';

// Counts a click on a link to another site as `outbound`, with the host.
// Plain script, so the page ships no React code for it.
const OUTBOUND = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="http"]');if(!a||a.host===location.host||a.dataset.umamiEvent||!window.umami)return;window.umami.track('outbound',{host:a.host,url:a.href})},{capture:true})`;

/**
 * Umami: no cookies and no personal data, so the site needs no consent
 * banner. Production builds only. NEXT_PUBLIC_* values are inlined at build
 * time, so set them in the build environment, not only at runtime.
 */
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (process.env.NODE_ENV !== 'production' || !src || !websiteId) return null;

  return (
    <>
      <Script
        src={src}
        data-website-id={websiteId}
        // Only count the live site, never a preview deploy.
        data-domains={process.env.NEXT_PUBLIC_UMAMI_DOMAINS || undefined}
        // Set when the script is served through the /stats proxy.
        data-host-url={process.env.UMAMI_HOST ? '/stats' : undefined}
        data-do-not-track="true"
        strategy="afterInteractive"
      />
      <Script id="umami-outbound" strategy="afterInteractive">
        {OUTBOUND}
      </Script>
    </>
  );
}
