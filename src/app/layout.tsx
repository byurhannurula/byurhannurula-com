import './globals.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { description, domain, name } from '@/constants';
import { Header } from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { MainWrapper } from '@/components/wrapper';

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
    <html lang="en" className={`${inter.variable} font-sans`}>
      <body className="flex flex-col bg-white text-zinc-700 antialiased dark:bg-zinc-900 dark:text-zinc-400">
        <ThemeProvider
          themes={['light', 'dark']}
          defaultTheme="system"
          attribute="class"
          enableSystem
        >
          <Header />
          <MainWrapper className="mt-24 grow">{children}</MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
