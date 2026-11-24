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
    // The padding makes the tap target 40px tall; the margin keeps the layout.
    'group/arrow -my-2 inline-flex shrink-0 py-2 items-center gap-1.5 text-[0.9375rem] font-medium whitespace-nowrap no-underline transition-colors duration-400 ease-hover hover:text-hue',
    className,
  );
  const content = (
    <>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-[translate] duration-400 ease-hover group-hover/arrow:translate-x-0.75 motion-reduce:transition-none"
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
