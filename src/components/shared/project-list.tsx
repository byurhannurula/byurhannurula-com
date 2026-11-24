import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { AppIcon } from '@/components/shared/app-icon';
import { type ListProject, MORE_TOOLS, PROJECTS } from '@/content/projects';
import { cn } from '@/lib/utils';

/** The side projects and the smaller tools, as on the home page. */
export const PROJECT_LIST: ListProject[] = [
  ...PROJECTS.map(({ name, kind, icon, short, links }) => ({
    name,
    kind,
    icon,
    short,
    href: links[0].href,
  })),
  ...MORE_TOOLS,
];

interface ProjectListProps {
  items: ListProject[];
  /** Every row links here, else each row opens its own project. */
  href?: string;
  className?: string;
}

const rowClass =
  'group/row relative flex flex-wrap items-center gap-4 py-[0.95rem] no-underline md:flex-nowrap';

/** Projects one line each: icon, name, one sentence, kind, and an arrow on hover. */
export function ProjectList({ items, href, className }: ProjectListProps) {
  return (
    <ul className={className}>
      {items.map((project) => {
        const to = href ?? project.href;
        const inside = to.startsWith('/');
        const Arrow = inside ? ArrowRight : ArrowUpRight;
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
            <em className="font-mono text-[0.8125rem] leading-none whitespace-nowrap text-faint not-italic">
              {project.kind}
            </em>
            {/* In the gutter, so it takes no room from the row. */}
            <span className="pointer-events-none absolute top-1/2 -right-7 -translate-y-1/2 max-md:hidden">
              <Arrow
                aria-hidden
                className={cn(
                  'size-4 text-soft opacity-0 transition-[opacity,translate] duration-300 ease-soft group-hover/row:opacity-100 group-focus-visible/row:opacity-100 motion-safe:-translate-x-1 motion-safe:group-hover/row:translate-x-0',
                  !inside &&
                    'motion-safe:translate-y-1 motion-safe:group-hover/row:translate-y-0',
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
