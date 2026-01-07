import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/config";

const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "Google-Extended",
  "CCBot",
  "anthropic-ai",
  "Claude-Web",
  "Bytespider",
  "Omgilibot",
  "FacebookBot",
  "Diffbot",
  "Applebot-Extended",
  "PerplexityBot",
  "YouBot",
  "Amazonbot",
  "ClaudeBot",
  "cohere-ai",
  "AI2Bot",
  "Scrapy",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        disallow: ["/"],
      })),
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
