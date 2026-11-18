import type { ReactNode } from 'react';

import { ChangesSection } from '@/components/design-system/changes-section';
import { ColourSection } from '@/components/design-system/colour-section';
import { ComponentsSection } from '@/components/design-system/components-section';
import { DsStats } from '@/components/design-system/ds-stats';
import { DetachOptions } from '@/components/design-system/detach-options';
import { LinksSection } from '@/components/design-system/links-section';
import { MotionSection } from '@/components/design-system/motion-section';
import { OptionsView } from '@/components/design-system/options-view';
import { SectionIndex } from '@/components/design-system/section-index';
import { ShapeSection } from '@/components/design-system/shape-section';
import { TypeSection } from '@/components/design-system/type-section';
import { ImageZoom } from '@/components/mdx/image-zoom';
import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { DS_SECTIONS } from '@/config/design-system';
import { PAGES } from '@/config/seo';
import { getDesignLog } from '@/lib/design-log';
import { pageMetadata } from '@/lib/seo';
import { hideUnlisted } from '@/lib/unlisted';

export const metadata = pageMetadata(PAGES.designSystem);

const log = getDesignLog();

/** The body of each section in DS_SECTIONS, by id. */
const BODIES: Record<string, ReactNode> = {
  changes: <ChangesSection log={log} />,
  colour: <ColourSection />,
  type: <TypeSection />,
  shape: <ShapeSection />,
  motion: <MotionSection />,
  components: <ComponentsSection />,
  options: <OptionsView />,
};

export default function DesignSystemPage() {
  hideUnlisted('/design-system');
  return (
    <>
      <DetachOptions />
      <PageHero
        eyebrow="Built from the live code at every deploy"
        title="Design system,"
        titleEnd="live."
        lead="What this site is made of: colour, type, shape, motion and components. It is drawn from one config file and the live stylesheet, so a change there shows here, and the history below grows with each change."
      />
      <DsStats log={log} />
      <div className="grid gap-x-12 lg:grid-cols-[9rem_minmax(0,1fr)]">
        {/* The index starts level with the first section title. */}
        <div className="hidden pt-(--section-gap) lg:block">
          <SectionIndex />
        </div>
        <div className="min-w-0">
          {DS_SECTIONS.map((section) =>
            // This one brings its own Section, with the same id.
            section.id === 'links' ? (
              <LinksSection key={section.id} />
            ) : (
              <Section
                key={section.id}
                id={section.id}
                title={section.title}
                sub={section.sub}
                // The nav bar floats over the top of the page.
                className="scroll-mt-12"
              >
                {BODIES[section.id]}
              </Section>
            ),
          )}
        </div>
      </div>
      <ImageZoom />
    </>
  );
}
