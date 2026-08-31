import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import type React from "react";

import "./globals.css";

import { BuildInfo } from "@/components/build-info";
import { CommandPalette } from "@/components/command-palette";
import { ConsoleBanner } from "@/components/console-banner";
import { Footer, FooterBackdrop } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ShortcutsDialog } from "@/components/shortcuts-dialog";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalShortcuts } from "@/components/theme-shortcut";
import { Toaster } from "@/components/toaster";
import { UmamiAnalytics } from "@/components/umami-analytics";
import { createMetadata } from "@/config";
import { getAllPosts, getAllTags } from "@/lib/server";

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
    <ViewTransitions>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
        data-scroll-behavior="smooth"
        suppressHydrationWarning
      >
        <body className="relative min-h-dvh bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="container-editorial flex min-h-dvh flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
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
    </ViewTransitions>
  );
}
