import Link from 'next/link';

import type { RichText as RichTextParts } from '@/content/about';
import { cn } from '@/lib/utils';

interface RichTextProps {
  parts: RichTextParts;
  linkClassName?: string;
}

/** Text from the content files, with its links. */
export function RichText({ parts, linkClassName }: RichTextProps) {
  const linkClasses = cn(
    'underline decoration-line-strong underline-offset-[0.2em] transition-colors hover:decoration-accent-bright',
    linkClassName,
  );
  return parts.map((part) => {
    if (typeof part === 'string') return part;
    return part.href.startsWith('/') ? (
      <Link key={part.text} href={part.href} className={linkClasses}>
        {part.text}
      </Link>
    ) : (
      <a key={part.text} href={part.href} className={linkClasses}>
        {part.text}
      </a>
    );
  });
}
