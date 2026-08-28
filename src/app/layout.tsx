import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";
import type React from "react";

import "./globals.css";

import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { GlobalShortcuts } from "@/components/theme-shortcut";
import { UmamiAnalytics } from "@/components/umami-analytics";
import { createMetadata } from "@/config";

export const metadata = createMetadata("/");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${GeistSans.variable} ${GeistMono.variable}`}
        suppressHydrationWarning
      >
        <body className="min-h-screen bg-background font-sans antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <ScrollToTop />
              <GlobalShortcuts />
            </div>
          </ThemeProvider>
          <UmamiAnalytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
