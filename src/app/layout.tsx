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
import { ScrollTop } from '@/components/layout/scroll-top';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteNav } from '@/components/layout/site-nav';
import { RevealObserver } from '@/components/shared/reveal-observer';
import { SoundHover } from '@/components/shared/sound-hover';
import { TabAwayIcon } from '@/components/shared/tab-away-icon';
import { SOCIALS } from '@/content/socials';
import { brand } from '@/lib/brand';
import { fontVariables } from '@/lib/fonts';
import { SITE_SEO } from '@/config/seo';
import { FEED_ALTERNATES, SHARE_VIDEO } from '@/lib/seo';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: SITE_SEO.defaultTitle,
    template: SITE_SEO.titleTemplate,
  },
  description: SITE_SEO.description,
  applicationName: brand.name,
  authors: [{ name: brand.name, url: siteUrl }],
  alternates: { types: FEED_ALTERNATES },
  openGraph: {
    type: 'website',
    siteName: brand.name,
    locale: SITE_SEO.locale,
    videos: [SHARE_VIDEO],
  },
  twitter: { card: 'summary_large_image' },
};

// The browser bar follows the light mode the reader's system asks for; the
// page itself follows its own clock (src/lib/light.ts).
export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: SITE_SEO.themeColor.light,
    },
    { media: '(prefers-color-scheme: dark)', color: SITE_SEO.themeColor.dark },
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
        <ScrollTop />
        <CommandMenu />
        {/* Design tool. Delete it, and src/components/config, at launch. */}
        <ConfigPanel />
        <RevealObserver />
        <SoundHover />
        <TabAwayIcon />
        <LightClock />
        <JsonLd data={[person(SOCIALS.map((s) => s.href)), website()]} />
        <Analytics />
      </body>
    </html>
  );
}
