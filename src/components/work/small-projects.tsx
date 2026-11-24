import { ArrowRight } from 'lucide-react';

import type { SmallProject } from '@/content/projects';
import { cn } from '@/lib/utils';

interface SmallProjectsProps {
  projects: SmallProject[];
  /** A name the `work: list` layout already shows; hidden there. */
  listed?: string;
}

const rowClass =
  'group/row flex items-center gap-4 border-t border-rule py-[1.05rem] no-underline last:border-b';

/** The "Also" list: smaller things, one row each. A row with no link is plain. */
export function SmallProjects({ projects, listed }: SmallProjectsProps) {
  return (
    <div>
      {projects.map((project) => {
        const className = cn(
          rowClass,
          project.name === listed && 'in-data-[work=list]:hidden',
        );
        const content = (
          <>
            <span className="w-22 flex-none label-mono text-faint">
              {project.tag}
            </span>
            {/* A long name with no space must wrap, not push the arrow out. */}
            <div className="min-w-0">
              <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em] wrap-anywhere transition-[translate] duration-300 ease-soft group-hover/row:in-[a]:translate-x-1">
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
          <a key={project.name} href={project.href} className={className}>
            {content}
          </a>
        ) : (
          <div key={project.name} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
