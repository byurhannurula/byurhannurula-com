import { ArrowRight } from 'lucide-react';

import type { SmallProject } from '@/content/projects';

interface SmallProjectsProps {
  projects: SmallProject[];
}

const rowClass =
  'group/row flex items-center gap-4 border-t border-rule py-[1.05rem] no-underline last:border-b';

/** The "Also" list: smaller things, one row each. A row with no link is plain. */
export function SmallProjects({ projects }: SmallProjectsProps) {
  return (
    <div>
      {projects.map((project) => {
        const content = (
          <>
            <span className="w-22 flex-none label-mono text-faint">
              {project.tag}
            </span>
            <div>
              <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em] transition-[translate] duration-300 ease-soft group-hover/row:in-[a]:translate-x-1">
                {project.name}
              </h3>
              <p className="mt-[0.1rem] text-[0.9375rem] text-soft">
                {project.text}
              </p>
            </div>
            {project.href ? (
              <span className="ml-auto grid size-8 flex-none place-items-center rounded-full bg-sunk text-soft transition-[background-color,color,rotate] duration-300 ease-soft group-hover/row:-rotate-45 group-hover/row:bg-ink group-hover/row:text-bg">
                <ArrowRight aria-hidden className="size-[0.9rem]" />
              </span>
            ) : null}
          </>
        );
        return project.href ? (
          <a key={project.name} href={project.href} className={rowClass}>
            {content}
          </a>
        ) : (
          <div key={project.name} className={rowClass}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
