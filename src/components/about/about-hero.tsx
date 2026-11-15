import { ArrowRight } from 'lucide-react';

import { AboutArt } from '@/components/about/about-art';
import { CopyVariant } from '@/components/shared/copy-variant';
import { PageHero } from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';
import { ABOUT_HERO, ABOUT_LINKS, CV_HREF } from '@/content/about';

/** The top of the about page: title, lead, CV and profile links. */
export function AboutHero() {
  return (
    <PageHero
      title={<CopyVariant {...ABOUT_HERO.title} />}
      titleEnd={<CopyVariant {...ABOUT_HERO.titleEnd} />}
      lead={<CopyVariant {...ABOUT_HERO.lead} />}
      art={<AboutArt />}
      actions={
        <>
          <Button asChild className="group/cv">
            <a href={CV_HREF}>
              See the CV
              <ArrowRight
                aria-hidden
                className="transition-transform duration-250 ease-soft group-hover/cv:translate-x-0.75"
              />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={ABOUT_LINKS.linkedin}>LinkedIn</a>
          </Button>
          <Button asChild variant="outline">
            <a href={ABOUT_LINKS.github}>GitHub</a>
          </Button>
        </>
      }
    />
  );
}
