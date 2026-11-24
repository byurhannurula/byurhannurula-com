import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { AppIcon } from '@/components/shared/app-icon';
import { LINE_COLOURS } from '@/components/shared/patterns/palette';
import type { ListProject } from '@/content/projects';
import { QUIPS } from '@/content/quips';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  items: ListProject[];
  /** Every row links here, else each row opens its own project. */
  href?: string;
  className?: string;
}

const rowClass =
  'group/row relative flex flex-wrap items-center gap-4 py-4 no-underline md:flex-nowrap';

// Personal mode: the lines become rounded tiles, each in its own soft colour
// from the hero's line palette. A dark page gets near-black tiles with a
// coloured outline: a filled tint there turns muddy.
const PERSONAL_TILE =
  'in-data-[mode=personal]:mb-2 in-data-[mode=personal]:rounded-2xl in-data-[mode=personal]:border-0 in-data-[mode=personal]:bg-[color-mix(in_oklch,var(--tint)_14%,transparent)] in-data-[mode=personal]:px-4 in-data-[mode=personal]:transition-[background-color] in-data-[mode=personal]:duration-300 in-data-[mode=personal]:hover:bg-[color-mix(in_oklch,var(--tint)_24%,transparent)] dark:in-data-[mode=personal]:bg-[color-mix(in_oklch,var(--tint)_6%,var(--card))] dark:in-data-[mode=personal]:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--tint)_40%,transparent)] dark:in-data-[mode=personal]:hover:bg-[color-mix(in_oklch,var(--tint)_12%,var(--card))]';

/**
 * Projects one line each: icon, name, one sentence and a round arrow that
 * turns on hover.
 */
export function ProjectList({ items, href, className }: ProjectListProps) {
  return (
    <ul className={className}>
      {items.map((project, index) => {
        const to = href ?? project.href;
        const inside = to.startsWith('/');
        const row = (
          <>
            <AppIcon
              src={project.icon}
              className="transition-[scale] duration-400 ease-hover [will-change:scale] group-hover/row:scale-106 motion-reduce:transition-none"
            />
            <b className="text-[1.0625rem] font-semibold whitespace-nowrap">
              {project.name}
            </b>
            <span className="order-3 flex-1 basis-full text-soft md:order-none md:basis-0">
              {project.short}
            </span>
            {/* As on the studio site: an outlined circle that turns as one
                piece with a small spring, and only tints on hover. The arrow
                sits 1px left: its head makes it look right of centre. */}
            <span className="ml-auto grid size-9 flex-none place-items-center rounded-full border border-line-strong text-soft [will-change:rotate] [transition:rotate_.6s_var(--ease-out-spring),background-color_.3s_ease,color_.3s_ease] group-hover/row:-rotate-45 group-hover/row:bg-sunk group-hover/row:text-ink group-focus-visible/row:-rotate-45 group-focus-visible/row:bg-sunk group-focus-visible/row:text-ink motion-reduce:[transition:background-color_.3s_ease,color_.3s_ease] motion-reduce:group-hover/row:rotate-0">
              <ArrowRight aria-hidden className="size-4 -translate-x-px" />
            </span>
          </>
        );
        return (
          <li
            key={project.name}
            data-quip={QUIPS[project.name]}
            style={
              {
                '--tint': LINE_COLOURS[(index + 1) % LINE_COLOURS.length],
              } as React.CSSProperties
            }
            className={cn('border-t border-rule last:border-b', PERSONAL_TILE)}
          >
            {inside ? (
              <Link href={to} className={rowClass}>
                {row}
              </Link>
            ) : (
              <a
                href={to}
                target="_blank"
                rel="noreferrer"
                className={rowClass}
              >
                {row}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
