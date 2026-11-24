'use client';

import { useCopy } from '@/hooks/use-copy';
import { brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

import { FOOTER_COPY } from './footer-content';

interface EmailCopyProps {
  /** `link`: mono underlined text. `inline`: a word in a sentence. */
  variant: 'link' | 'inline';
}

const PRESS =
  'transition-[color,text-decoration-color,scale] duration-200 ease-out active:scale-[0.97] active:duration-100 motion-reduce:active:scale-100';

/**
 * The email address as a button that copies it. The address never changes,
 * so the line around it does not move; the bubble above says "Copy email"
 * on hover and "Copied to clipboard" after a click.
 */
export function EmailCopy({ variant }: EmailCopyProps) {
  const { copied, copy } = useCopy();

  return (
    <span className="group/tip relative inline-block">
      <button
        type="button"
        onClick={() => copy(brand.email)}
        className={cn(
          PRESS,
          variant === 'link'
            ? 'font-mono text-sm leading-none text-ink underline decoration-line-strong underline-offset-[0.3em] hover:decoration-accent-bright'
            : 'rounded-[0.35em] bg-accent-soft px-[0.3em] py-[0.02em] hover:text-accent',
          copied && 'text-accent',
        )}
      >
        <span className="sr-only">{FOOTER_COPY.copyEmailHint}: </span>
        {brand.email}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? FOOTER_COPY.emailCopied : ''}
      </span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 translate-y-1 rounded-[0.4rem] bg-ink px-[0.6rem] py-[0.3rem] font-mono text-xs leading-none font-normal tracking-normal whitespace-nowrap text-bg opacity-0 transition-[opacity,translate] duration-150 ease-out group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 group-hover/tip:translate-y-0 group-hover/tip:opacity-100 motion-reduce:translate-y-0',
          copied && 'translate-y-0 opacity-100',
        )}
      >
        <span
          // A new key restarts the blur-in when the label changes.
          key={copied ? 'done' : 'hint'}
          className="inline-block motion-safe:animate-blur-in"
        >
          {copied ? FOOTER_COPY.emailCopied : FOOTER_COPY.copyEmailHint}
        </span>
      </span>
    </span>
  );
}
