import { AppIcon } from '@/components/shared/app-icon';
import { AccordionGroup } from '@/components/work/accordion-group';
import { FilmStrip } from '@/components/work/film-strip';
import {
  ProjectKind,
  ProjectLinks,
  ProjectTags,
} from '@/components/work/project-bits';
import type { Project } from '@/content/projects';

interface ProjectAccordionProps {
  projects: Project[];
}

/** `work: accordion`. One row for each project; the first one is open. */
export function ProjectAccordion({ projects }: ProjectAccordionProps) {
  return (
    <AccordionGroup
      defaultOpen={projects[0]?.slug}
      items={projects.map((project) => ({
        id: project.slug,
        head: (
          <>
            <AppIcon
              src={project.icon}
              size={44}
              className="size-11 rounded-[0.8rem]"
            />
            <b className="text-[1.375rem] font-semibold tracking-[-0.025em] whitespace-nowrap">
              {project.name}
            </b>
            <span className="hidden flex-1 text-soft md:block">
              {project.short}
            </span>
            <span className="max-md:ml-auto">
              <ProjectKind>{project.kind}</ProjectKind>
            </span>
          </>
        ),
        body: (
          <>
            <p className="mb-2 max-w-[42rem] text-soft">{project.text}</p>
            <ProjectTags tags={project.tags} />
            <ProjectLinks links={project.links} className="mt-3 mb-6" />
            <FilmStrip
              contained
              shots={project.shots}
              label={`${project.name} screenshots`}
            />
          </>
        ),
      }))}
    />
  );
}
