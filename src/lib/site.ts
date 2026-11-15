function resolveSiteUrl(): URL {
  const candidates = [
    process.env.SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL &&
      `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
  ];
  for (const value of candidates) {
    if (!value) continue;
    try {
      return new URL(value);
    } catch {
      console.warn(`[site] Ignoring invalid site URL: ${value}`);
    }
  }
  return new URL('http://localhost:3000');
}

export const siteUrl = resolveSiteUrl();

/** Static routes for the sitemap and llms.txt. Notes are added from MDX. */
export const routes = [
  '/',
  '/work',
  '/notes',
  '/about',
  '/uses',
  '/homelab',
  '/shelf',
  '/cv',
  '/colophon',
  '/design-system',
] as const;

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;
