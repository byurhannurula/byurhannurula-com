import { cn } from '@/lib/utils';

interface QuipProps {
  text: string | undefined;
  /** The group whose hover shows it, as Tailwind's `group/<name>`. */
  group: 'row' | 'job' | 'pile';
  className?: string;
}

const SHOW = {
  row: 'group-hover/row:scale-100 group-hover/row:opacity-100',
  job: 'group-hover/job:scale-100 group-hover/job:opacity-100',
  pile: 'group-hover/pile:scale-100 group-hover/pile:opacity-100',
} as const;

/**
 * A chat bubble with a joke, in personal mode only. It pops from its tail
 * (bottom left) when the pointer is on its group; hover only, so a phone
 * never shows it. Decorative: the joke is not read out.
 */
export function Quip({ text, group, className }: QuipProps) {
  if (!text) return null;
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute z-5 hidden w-max origin-bottom-left whitespace-nowrap scale-90 rounded-2xl rounded-bl-sm bg-accent px-3 py-1.5 text-[0.8125rem] leading-snug font-medium text-bg opacity-0 shadow-lift [transition:opacity_.15s_ease-out,scale_.35s_var(--ease-out-spring)] in-data-[mode=personal]:block motion-reduce:scale-100',
        SHOW[group],
        className,
      )}
    >
      {text}
    </span>
  );
}
