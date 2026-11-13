'use client';

import { useCopy } from '@/hooks/use-copy';
import { brand } from '@/lib/brand';
import { cn } from '@/lib/utils';

import { FOOTER_COPY } from './footer-content';

interface EmailCopyProps {
  /** `link`: mono underlined text with a tooltip. `inline`: a word in a sentence. */
  variant: 'link' | 'inline';
}

/** The email address as a button that copies it and confirms in place. */
export function EmailCopy({ variant }: EmailCopyProps) {
  const { copied, copy } = useCopy();
  const done =
    variant === 'link' ? FOOTER_COPY.emailCopied : FOOTER_COPY.emailCopiedShort;

  const button = (
    <button
      type="button"
      onClick={() => copy(brand.email)}
      className={
        variant === 'link'
          ? 'font-mono text-sm leading-none text-ink underline decoration-line-strong underline-offset-[0.3em] hover:decoration-accent-bright'
          : 'rounded-[0.35em] bg-accent-soft px-[0.3em] py-[0.02em] transition-colors duration-200 hover:text-accent'
      }
    >
      <span className="sr-only">{FOOTER_COPY.copyEmailHint}: </span>
      <span aria-live="polite">
        <span
          // A new key restarts the blur-in for each label swap.
          key={copied ? 'done' : 'email'}
          className={cn(
            'inline-block motion-safe:animate-blur-in',
            copied && 'text-accent',
          )}
        >
          {copied ? done : brand.email}
        </span>
      </span>
    </button>
  );

  if (variant === 'inline') return button;

  return (
    <span className="group/tip relative inline-block">
      {button}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 translate-y-1 rounded-[0.4rem] bg-ink px-[0.6rem] py-[0.3rem] font-mono text-xs leading-none whitespace-nowrap text-bg opacity-0 transition-[opacity,translate] duration-150 group-focus-within/tip:translate-y-0 group-focus-within/tip:opacity-100 group-hover/tip:translate-y-0 group-hover/tip:opacity-100"
      >
        {FOOTER_COPY.copyEmailHint}
      </span>
    </span>
  );
}
