import Script from 'next/script';

// Umami, production builds only. NEXT_PUBLIC_* values are inlined at build
// time, so set them in the build environment, not only at runtime.
export function Analytics() {
  const src = process.env.NEXT_PUBLIC_UMAMI_SRC;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (process.env.NODE_ENV !== 'production' || !src || !websiteId) return null;

  return (
    <Script src={src} data-website-id={websiteId} strategy="afterInteractive" />
  );
}
