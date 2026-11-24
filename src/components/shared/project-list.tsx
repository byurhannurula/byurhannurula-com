import Link from 'next/link';

import { AppIcon } from '@/components/shared/app-icon';
import { EXTRA_PROJECT_ROW } from '@/content/home';
import { PROJECTS } from '@/content/projects';

/** The side projects plus dotfiles, one line each, as on the home page. */
export const PROJECT_LIST = [
  ...PROJECTS.map((project) => ({ ...project, href: project.links[0].href })),
  EXTRA_PROJECT_ROW,
];

interface ProjectListProps {
  /** Every row links here, else each row links to its own project. */
  href?: string;
  className?: string;
}

/** Side projects as one line each: icon, name, one sentence, kind. */
export function ProjectList({ href, className }: ProjectListProps) {
  return (
    <ul className={className}>
      {PROJECT_LIST.map((project) => {
        const to = href ?? project.href;
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
          </>
        );
        const rowClass =
          'group/row flex flex-wrap items-center gap-4 py-[0.95rem] no-underline md:flex-nowrap';
        return (
          <li key={project.name} className="border-t border-rule last:border-b">
            {to.startsWith('/') ? (
              <Link href={to} className={rowClass}>
                {row}
              </Link>
            ) : (
              <a href={to} className={rowClass}>
                {row}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );
}
