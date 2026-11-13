import Link from 'next/link';

import { AppIcon } from '@/components/home/app-icon';
import { EXTRA_PROJECT_ROW } from '@/content/home';
import { PROJECTS } from '@/content/projects';

/** Side projects as one line each. Option: `projects=rows`. */
export function ProjectRows() {
  return (
    <ul className="hidden in-data-[projects=rows]:block">
      {[...PROJECTS, EXTRA_PROJECT_ROW].map((project) => (
        <li key={project.name} className="border-t border-rule last:border-b">
          <Link
            href="/work"
            className="group/row flex flex-wrap items-center gap-4 py-[0.95rem] no-underline md:flex-nowrap"
          >
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
          </Link>
        </li>
      ))}
    </ul>
  );
}
