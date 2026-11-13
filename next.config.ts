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
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.simpleicons.org' }],
  },
};

export default nextConfig;
