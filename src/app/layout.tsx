import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { Header } from '@/components/header';
import { LayoutWrapper } from '@/components/wrapper';

export const metadata = {
  title: 'Byurhan Nurula',
  description: '',
};

// Also try with Inter and Space_Mono
const poppins = Inter({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '700'],
  style: 'normal',
});

function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body className="flex flex-col bg-white text-zinc-700 antialiased dark:bg-zinc-900 dark:text-zinc-400">
        <LayoutWrapper
          themes={['light', 'dark']}
          defaultTheme="system"
          attribute="class"
          enableSystem
        >
          <Header />
          <main className="mt-32 grow">{children}</main>
        </LayoutWrapper>
      </body>
    </html>
  );
}

export default RootLayout;
