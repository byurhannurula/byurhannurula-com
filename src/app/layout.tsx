import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { cn } from '@/utils';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { MainWrapper } from '@/components/wrapper';
import { description, domain, name } from '@/constants';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: {
    default: name,
    template: `%s | ${name}`,
  },
  description: description,
  openGraph: {
    title: name,
    description: description,
    url: domain,
    siteName: name,
    images: [
      {
        url: `${domain}/og.jpg`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: name,
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
};

// Also try with Inter and Space_Mono
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-main',
  weight: ['300', '400', '500', '600', '700'],
  style: 'normal',
});

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, 'font-sans')}
    >
      <body>
        <ThemeProvider
          themes={['light', 'dark']}
          defaultTheme="system"
          attribute="class"
          enableSystem
        >
          <Header />
          <MainWrapper className="mt-16 grow">{children}</MainWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
