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
  'group/row flex flex-wrap items-center gap-4 py-[0.95rem] no-underline md:flex-nowrap';

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
              className="transition-[scale] duration-400 ease-hover group-hover/row:scale-106 motion-reduce:transition-none"
            />
            <b className="text-[1.0625rem] font-semibold whitespace-nowrap">
              {project.name}
            </b>
            <span className="order-3 flex-1 basis-full text-soft md:order-none md:basis-0">
              {project.short}
            </span>
            <span className="ml-auto grid size-8 flex-none place-items-center rounded-full bg-sunk text-soft transition-[background-color,color,rotate] duration-400 ease-hover group-hover/row:-rotate-45 group-hover/row:bg-ink group-hover/row:text-bg group-focus-visible/row:bg-ink group-focus-visible/row:text-bg motion-reduce:transition-[background-color,color]">
              <ArrowRight aria-hidden className="size-[0.9rem]" />
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
