import { ProjectPanels } from '@/components/home/project-panels';
import { ProjectStrips } from '@/components/home/project-strips';
import { ProjectTiles } from '@/components/home/project-tiles';
import { ArrowLink } from '@/components/shared/arrow-link';
import { PROJECT_LIST, ProjectList } from '@/components/shared/project-list';
import { Section } from '@/components/shared/section';
import { PROJECTS_SECTION } from '@/content/home';
import { PROJECTS } from '@/content/projects';

/** Side projects, low on the page. The `projects` option picks the view. */
export function HomeProjects() {
  return (
    <Section
      id="made"
      title={PROJECTS_SECTION.title}
      sub={PROJECTS_SECTION.sub}
      action={<ArrowLink href="/work">{PROJECTS_SECTION.action}</ArrowLink>}
      className="in-data-[projects=off]:hidden"
    >
      <ProjectPanels projects={PROJECTS} />
      <ProjectStrips />
      <ProjectTiles />
      <ProjectList
        items={PROJECT_LIST}
        href="/work"
        className="hidden in-data-[projects=rows]:block"
      />
    </Section>
  );
}
