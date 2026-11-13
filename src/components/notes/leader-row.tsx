import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface LeaderRowProps {
  title: ReactNode;
  /** Right side: a date or a state such as "planned". */
  end: ReactNode;
  /** Without it the row is plain text: a note that has no page yet. */
  href?: string;
  className?: string;
}

/** One line of a list: title, dotted leaders, then a date or a state. */
export function LeaderRow({ title, end, href, className }: LeaderRowProps) {
  const classes = cn(
    'group/leader flex items-baseline gap-[0.8rem] py-[0.7rem] no-underline',
    className,
  );
  const content = (
    <>
      <span
        className={cn(
          'text-lg',
          href
            ? 'font-medium transition-colors group-hover/leader:text-accent'
            : 'text-faint',
        )}
      >
        {title}
      </span>
      <span
        aria-hidden
        className="min-w-8 flex-1 -translate-y-[0.3em] border-b-2 border-dotted border-line-strong"
      />
      <span className="font-mono text-[0.8125rem] leading-none whitespace-nowrap text-faint">
        {end}
      </span>
    </>
  );
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <div className={classes}>{content}</div>
  );
}
