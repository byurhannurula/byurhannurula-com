import { execSync } from "node:child_process";

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
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
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
        ],
      },
      {
        source: "/images/:path*",
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
