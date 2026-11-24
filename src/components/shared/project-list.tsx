import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { AppIcon } from '@/components/shared/app-icon';
import type { ListProject } from '@/content/projects';

interface ProjectListProps {
  items: ListProject[];
  /** Every row links here, else each row opens its own project. */
  href?: string;
  className?: string;
}

const rowClass =
  'group/row flex flex-wrap items-center gap-4 py-4 no-underline md:flex-nowrap';

/**
 * Projects one line each: icon, name, one sentence and a round arrow that
 * turns on hover.
 */
export function ProjectList({ items, href, className }: ProjectListProps) {
  return (
    <ul className={className}>
      {items.map((project) => {
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
            {/* The arrow turns only while the circle is dark: on hover the
                circle darkens first, on leave it lightens last. The arrow
                sits 1px left: its head makes it look right of centre. */}
            <span className="ml-auto grid size-8 flex-none place-items-center rounded-full bg-sunk text-soft transition-[background-color,color] delay-150 duration-150 ease-out group-hover/row:bg-ink group-hover/row:text-bg group-hover/row:delay-0 group-focus-visible/row:bg-ink group-focus-visible/row:text-bg group-focus-visible/row:delay-0">
              <ArrowRight
                aria-hidden
                className="size-4 -translate-x-px transition-[rotate] duration-200 ease-hover [will-change:rotate] group-hover/row:-rotate-45 group-hover/row:delay-60 group-hover/row:duration-300 group-focus-visible/row:-rotate-45 group-focus-visible/row:delay-60 group-focus-visible/row:duration-300 motion-reduce:transition-none"
              />
            </span>
          </>
        );
        return (
          <li key={project.name} className="border-t border-rule last:border-b">
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
