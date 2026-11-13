import { CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

const KINDS = {
  info: { icon: Info, box: 'bg-hue-2/9', mark: 'text-hue-2' },
  ok: { icon: CircleCheck, box: 'bg-accent/9', mark: 'text-accent' },
  warn: { icon: TriangleAlert, box: 'bg-amber/9', mark: 'text-amber' },
  danger: { icon: TriangleAlert, box: 'bg-danger/9', mark: 'text-danger' },
} as const;

// Names used by older notes.
const ALIASES: Record<string, keyof typeof KINDS> = {
  success: 'ok',
  warning: 'warn',
  error: 'danger',
};

interface CalloutProps {
  /** info, ok, warn or danger. */
  type?: string;
  title?: string;
  children: ReactNode;
}

/** A tinted note inside the text: a fact, a success, a warning. */
export function Callout({ type = 'info', title, children }: CalloutProps) {
  const kind =
    KINDS[(ALIASES[type] ?? type) as keyof typeof KINDS] ?? KINDS.info;
  const Icon = kind.icon;
  return (
    <aside
      data-reveal
      className={cn(
        'my-8 grid grid-cols-[auto_1fr] gap-[0.9rem] rounded-lg px-5 py-[1.15rem] text-[0.895em] leading-[1.6]',
        kind.box,
      )}
    >
      <Icon aria-hidden className={cn('mt-[0.2rem] size-5', kind.mark)} />
      <div className="min-w-0 [&>:is(p,ul,ol)]:mb-2 [&>:last-child]:mb-0">
        {title ? <b className="mb-[0.1rem] block">{title}</b> : null}
        {children}
      </div>
    </aside>
  );
}
