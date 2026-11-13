import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

interface BackLinkProps {
  href: string;
  children: ReactNode;
}

/** A quiet link with an arrow that points, and moves, back. */
export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="group/back inline-flex items-center gap-[0.35rem] text-[0.9375rem] font-medium whitespace-nowrap text-soft no-underline hover:text-ink"
    >
      <ArrowLeft
        aria-hidden
        className="size-4 transition-transform duration-250 ease-soft group-hover/back:-translate-x-0.75"
      />
      {children}
    </Link>
  );
}
