import { AppIcon } from '@/components/uses/app-icon';
import { FilmStrip } from '@/components/work/film-strip';
import {
  ProjectKind,
  ProjectLinks,
  ProjectTags,
} from '@/components/work/project-bits';
import type { Project } from '@/content/projects';

interface ProjectStripsProps {
  projects: Project[];
}

/** `work: strips`. Each project is a header and a filmstrip of screenshots. */
export function ProjectStrips({ projects }: ProjectStripsProps) {
  return (
    <>
      {projects.map((project) => (
        <article
          key={project.slug}
          data-reveal
          className="border-t border-line py-9 first:border-t-0 first:pt-0"
        >
          <div className="mb-[1.4rem] grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[0.4rem] md:grid-cols-[auto_1fr_auto]">
            <AppIcon
              src={project.icon}
              size={48}
              className="row-span-2 size-12 rounded-[0.85rem]"
            />
            <h3 className="flex items-baseline gap-3 text-[1.625rem] leading-[1.3] font-semibold tracking-[-0.03em]">
              {project.name}
              <ProjectKind>{project.kind}</ProjectKind>
            </h3>
            <ProjectLinks
              links={project.links}
              className="col-start-2 mt-0 md:col-start-3 md:row-start-1"
            />
            <p className="col-start-2 max-w-[42rem] text-soft">
              {project.text} <ProjectTags tags={project.tags} />
            </p>
          </div>
          <FilmStrip
            shots={project.shots}
            label={`${project.name} screenshots`}
          />
        </article>
      ))}
    </>
  );
}
