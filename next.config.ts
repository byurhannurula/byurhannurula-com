import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cache Components stay off: on Cloudflare through OpenNext 1.20 every
  // page hangs with them on. Turn them on for a Vercel-only deploy.
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  poweredByHeader: false,
  // Umami through our own domain: ad blockers skip a first-party path.
  async rewrites() {
    const host = process.env.UMAMI_HOST;
    if (!host) return [];
    return [
      { source: '/stats/script.js', destination: `${host}/script.js` },
      { source: '/stats/api/send', destination: `${host}/api/send` },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.simpleicons.org' }],
  },
};

export default nextConfig;
