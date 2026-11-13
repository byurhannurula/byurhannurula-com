import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { ComponentProps } from 'react';

const LINK =
  'font-medium underline decoration-line-strong decoration-1 underline-offset-[0.22em] transition-colors hover:text-accent hover:decoration-accent-bright';

/** A link in note text. A link to another site gets `rel` and an arrow. */
export function MdxLink({ href = '', children, ...rest }: ComponentProps<'a'>) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={LINK}>
        {children}
      </Link>
    );
  }
  if (!/^https?:\/\//.test(href)) {
    return (
      <a {...rest} href={href} className={LINK}>
        {children}
      </a>
    );
  }
  return (
    <a {...rest} href={href} rel="noopener noreferrer" className={LINK}>
      {children}
      <ArrowUpRight
        aria-hidden
        className="ml-[0.1em] inline size-[0.8em] align-baseline text-faint"
      />
    </a>
  );
}
