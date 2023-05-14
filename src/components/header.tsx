'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

import { cn } from '@/utils';
import { NAV } from '@/constants';

export function Header() {
  const pathname = usePathname();
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');

  useEffect(() => setMounted(true), []);

  function renderThemeChanger() {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
      <button
        className="rounded-md bg-zinc-200 p-2 text-zinc-900 transition-all duration-300 hover:bg-zinc-300 dark:bg-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-700"
        onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {currentTheme === 'dark' ? (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            />
          ) : (
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          )}
        </svg>
      </button>
    );
  }

  function handleScroll() {
    const DELTA = 5;
    const NAV_HEIGHT = 72;
    const fromTop = window.pageYOffset;

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - fromTop) <= DELTA) return;

    if (fromTop < DELTA) {
      setScrollDirection('none');
    } else if (fromTop > lastScrollTop && fromTop > NAV_HEIGHT) {
      // If they scrolled down and are past the navbar, set state to up
      if (scrollDirection !== 'down') {
        setScrollDirection('down');
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      // Scroll Up
      if (scrollDirection !== 'up') {
        setScrollDirection('up');
      }
    }

    setLastScrollTop(fromTop);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <header
      className={cn(
        'fixed inset-x-0 z-50 flex items-center bg-white dark:bg-zinc-900 backdrop-blur-xl',
        'transition-transform duration-300 ease-[cubic-bezier(0.645,0.045,0.355,1)]',
        scrollDirection === 'none' ? 'h-[72px]' : 'h-[75px]',
        scrollDirection === 'up' ? 'shadow' : 'shadow-none',
        scrollDirection === 'down' ? '-translate-y-[72px]' : 'translate-y-0'
      )}
    >
      <div className="container flex items-center justify-between">
        <nav className="space-x-2">
          {NAV.length > 1 &&
            NAV.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={cn(
                  'rounded-md px-5 py-2 text-zinc-900 transition-all duration-300 hover:bg-zinc-200/50 dark:text-zinc-200 dark:hover:bg-zinc-800',
                  pathname === href &&
                    'bg-zinc-200/50 dark:text-zinc-200 dark:bg-zinc-800'
                )}
              >
                {label}
              </Link>
            ))}
        </nav>

        {renderThemeChanger()}
      </div>
    </header>
  );
}
