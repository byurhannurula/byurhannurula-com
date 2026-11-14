import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { ProjectAccordion } from '@/components/work/project-accordion';
import { ProjectGrid } from '@/components/work/project-grid';
import { ProjectRows } from '@/components/work/project-rows';
import { ProjectStage } from '@/components/work/project-stage';
import { ProjectStrips } from '@/components/work/project-strips';
import { SmallProjects } from '@/components/work/small-projects';
import { WorkArt } from '@/components/work/work-art';
import { PROJECTS, SMALL_PROJECTS } from '@/content/projects';
import { PAGES } from '@/config/seo';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(PAGES.work);

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="Small tools"
        titleEnd="that do one job well."
        lead="I build these on my own time. Each one started as a problem I had. All of them are open source, and none of them collect data."
        art={<WorkArt />}
      />
      <Section id="projects">
        {/* The project names are h3: this keeps the heading order whole. */}
        <h2 className="sr-only">Projects</h2>
        <div className="hidden in-data-[work=strips]:block">
          <ProjectStrips projects={PROJECTS} />
        </div>
        <div className="hidden in-data-[work=accordion]:block">
          <ProjectAccordion projects={PROJECTS} />
        </div>
        <div className="hidden in-data-[work=grid]:block">
          <ProjectGrid projects={PROJECTS} />
        </div>
        <div className="hidden in-data-[work=stage]:block">
          <ProjectStage projects={PROJECTS} />
        </div>
        <div className="hidden in-data-[work=rows]:block">
          <ProjectRows projects={PROJECTS} />
        </div>
      </Section>
      <Section title="Also">
        <SmallProjects projects={SMALL_PROJECTS} />
      </Section>
    </>
  );
}
