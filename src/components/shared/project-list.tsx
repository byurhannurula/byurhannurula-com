import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { AppIcon } from '@/components/shared/app-icon';
import type { ListProject } from '@/content/projects';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  items: ListProject[];
  /** Every row links here, else each row opens its own project. */
  href?: string;
  className?: string;
}

const rowClass =
  'group/row flex flex-wrap items-center gap-4 py-[0.95rem] no-underline md:flex-nowrap';

/**
 * Projects one line each: icon, name, one sentence and a round arrow. The
 * arrow turns to point out for a link that leaves the site.
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
              className="transition-[rotate,scale] duration-400 ease-soft group-hover/row:scale-112 group-hover/row:-rotate-6"
            />
            <b className="text-[1.0625rem] font-semibold whitespace-nowrap">
              {project.name}
            </b>
            <span className="order-3 flex-1 basis-full text-soft md:order-none md:basis-0">
              {project.short}
            </span>
            <span className="ml-auto grid size-8 flex-none place-items-center rounded-full bg-sunk text-soft transition-[background-color,color,rotate] duration-300 ease-soft group-hover/row:bg-ink group-hover/row:text-bg group-focus-visible/row:bg-ink group-focus-visible/row:text-bg">
              <ArrowRight
                aria-hidden
                className={cn(
                  'size-[0.9rem] transition-[rotate] duration-300 ease-soft',
                  !inside && 'group-hover/row:-rotate-45',
                )}
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
