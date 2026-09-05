import { execSync } from "node:child_process";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// Wires the Workers bindings into `next dev`. Next only ever loads the config
// at the repo root, so the copy that used to sit in src/ never ran.
initOpenNextCloudflareForDev();

/**
 * Build stamp for the footer panel. CI providers expose the SHA as an env var;
 * local builds fall back to git, and a shallow checkout without either falls
 * back to "dev" rather than failing the build.
 */
function buildSha() {
  const fromEnv =
    process.env.CF_PAGES_COMMIT_SHA ??
    process.env.WORKERS_CI_COMMIT_SHA ??
    process.env.GITHUB_SHA;
  if (fromEnv) return fromEnv.slice(0, 7);

  try {
    return execSync("git rev-parse --short HEAD", {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
  } catch {
    return "dev";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_SHA: buildSha(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
  // MDX is handled by next-mdx-remote/rsc in components/mdx/mdx-renderer.tsx
  // No need for @next/mdx loader - it causes Turbopack serialization issues
  output: "standalone",
  images: {
    // Named hosts, not a wildcard: /_next/image will transform whatever URL it
    // is handed, so "**" lets anyone use this site as an image proxy and spend
    // its Cloudflare Images quota on images that are not ours.
    //
    // Both entries are borrowed demo content. Our own images belong in the repo
    // or R2, which needs no entry here at all -- and lets the build read their
    // dimensions off disk instead of over the network.
    remotePatterns: [
      { protocol: "https", hostname: "arslan.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // Content images are immutable once published, and Cloudflare bills per
    // unique transformation, so there is nothing to gain from re-deriving them.
    minimumCacheTTL: 31_536_000,
  },
  /*
   * Analytics served from this origin.
   *
   * script.js derives its collect endpoint from its own src directory and
   * posts to <dir>/api/send, so proxying the directory is all it takes: no
   * data-host-url, no second hostname to preconnect to, and nothing for a
   * content blocker to match on.
   */
  async rewrites() {
    const host = process.env.UMAMI_HOST?.replace(/\/$/, "");
    if (!host) return [];

    return [
      { source: "/stats/script.js", destination: `${host}/script.js` },
      { source: "/stats/api/send", destination: `${host}/api/send` },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // Mirrors public/_headers so Workers gets the same policy.
            // public/_headers only applies on Pages; OpenNext Workers uses this.
            // TODO: replace 'unsafe-inline' with sha256 hash of LIGHT_MODE_SCRIPT
            // and remove 'unsafe-eval' once mermaid is sandboxed (securityLevel: strict).
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data:; connect-src 'self' https://*.upstash.io https://api.github.com https://github-contributions-api.jogruber.de; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/rss.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Content-Type",
            value: "application/rss+xml",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
