import { GeistSans } from "geist/font/sans";
import { JetBrains_Mono } from "next/font/google";
import type React from "react";

import "./globals.css";

import dynamic from "next/dynamic";

import { BuildInfo } from "@/components/build-info";
import { ConsoleBanner } from "@/components/console-banner";
import { Footer, FooterBackdrop } from "@/components/footer";
import { MobileNav } from "@/components/mobile-nav";
import { Navigation } from "@/components/navigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalShortcuts } from "@/components/theme-shortcut";
import { Toaster } from "@/components/toaster";
import { UmamiAnalytics } from "@/components/umami-analytics";
import { createMetadata } from "@/config";
import { LIGHT_MODE_SCRIPT, LIGHT_MODES } from "@/config/light-modes";
import { getAllPosts, getAllTags } from "@/lib/server";

const CommandPalette = dynamic(
  () => import("@/components/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);
const ShortcutsDialog = dynamic(
  () => import("@/components/shortcuts-dialog").then((m) => m.ShortcutsDialog),
  { ssr: false }
);

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = createMetadata("/");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const notes = getAllPosts().map((post) => ({
    slug: post.slug,
    title: post.frontmatter.title,
  }));
  const tags = getAllTags();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${jetBrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Blocking and first: under `auto` the stored mode is whatever the
            clock said last visit, so it is corrected from the current hour
            before anything paints. */}
        <script dangerouslySetInnerHTML={{ __html: LIGHT_MODE_SCRIPT }} />
      </head>
      <body className="relative min-h-dvh bg-background font-sans">
        <ThemeProvider
          attribute="data-light"
          defaultTheme="day"
          themes={[...LIGHT_MODES]}
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="container-editorial flex min-h-dvh flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <MobileNav />
          <FooterBackdrop />
          <CommandPalette notes={notes} tags={tags} />
          <ShortcutsDialog />
          <BuildInfo />
          <ConsoleBanner />
          <Toaster />
          <ScrollToTop />
          <GlobalShortcuts />
        </ThemeProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
