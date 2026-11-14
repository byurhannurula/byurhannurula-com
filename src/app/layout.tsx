import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import './globals.css';

import { Analytics } from '@/components/analytics';
import { CommandMenu } from '@/components/command/command-menu';
import { ConfigPanel } from '@/components/config/config-panel';
import { LightClock } from '@/components/config/light-clock';
import {
  defaultHtmlAttributes,
  OptionsScript,
} from '@/components/config/options-script';
import { JsonLd, person, website } from '@/components/json-ld';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteNav } from '@/components/layout/site-nav';
import { RevealObserver } from '@/components/shared/reveal-observer';
import { SoundHover } from '@/components/shared/sound-hover';
import { RSS_PATH, SOCIALS } from '@/content/socials';
import { brand } from '@/lib/brand';
import { fontVariables } from '@/lib/fonts';
import { SHARE_VIDEO } from '@/lib/seo';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `${brand.name}, full-stack engineer`,
    template: `%s · ${brand.name}`,
  },
  description: brand.description,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: siteUrl }],
  alternates: {
    types: { 'application/rss+xml': [{ url: RSS_PATH, title: brand.name }] },
  },
  openGraph: {
    type: 'website',
    siteName: brand.name,
    locale: 'en',
    videos: [SHARE_VIDEO],
  },
  twitter: { card: 'summary_large_image' },
};

// The browser bar follows the light mode the reader's system asks for; the
// page itself follows its own clock (src/lib/light.ts).
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // The head script rewrites the option attributes before hydration.
    <html
      lang="en"
      className={fontVariables}
      suppressHydrationWarning
      {...defaultHtmlAttributes}
    >
      <head>
        <OptionsScript />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteNav />
        <main id="main" tabIndex={-1} className="wrap outline-none">
          {children}
        </main>
        <SiteFooter />
        <CommandMenu />
        {/* Design tool. Delete it, and src/components/config, at launch. */}
        <ConfigPanel />
        <RevealObserver />
        <SoundHover />
        <LightClock />
        <JsonLd data={[person(SOCIALS.map((s) => s.href)), website()]} />
        <Analytics />
      </body>
    </html>
  );
}
