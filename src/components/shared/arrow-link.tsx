import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Text link with an arrow that moves on hover. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  const classes = cn(
    'group/arrow inline-flex shrink-0 items-center gap-1.5 text-[0.9375rem] font-medium whitespace-nowrap no-underline transition-colors hover:text-hue',
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-soft group-hover/arrow:translate-x-0.75"
      />
    </>
  );
  return isExternal(href) ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
