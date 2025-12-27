/** @type {import('next').NextConfig} */
const nextConfig = {
  // MDX is handled by next-mdx-remote/rsc in components/mdx/mdx-renderer.tsx
  // No need for @next/mdx loader - it causes Turbopack serialization issues
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

export default nextConfig
