import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { HeroCurrent } from '@/components/home/hero-current';
import { HeroExpand } from '@/components/home/hero-expand';
import { HeroGreeting } from '@/components/home/hero-greeting';
import { HeroLogos } from '@/components/home/hero-logos';
import { CopyVariant } from '@/components/shared/copy-variant';
import { PageTitle } from '@/components/shared/page-hero';
import { Button } from '@/components/ui/button';
import { HERO_ACTIONS, HERO_LEAD, HERO_TITLE } from '@/content/home';

function TitleParts({ parts }: { parts: [start: string, end: string] }) {
  return (
    <>
      {parts[0]} <span className="text-(--title-em)">{parts[1]}</span>
    </>
  );
}

/**
 * The top of the home page. The `hero` option picks one of four forms. It
 * never names the side projects: they are small tools, not the headline.
 */
export function HomeHero() {
  return (
    <header className="pt-(--hero-gap) pb-4">
      <HeroGreeting />
      <PageTitle
        className="hidden max-w-[19ch] text-(length:--title-size) in-data-[hero=text]:block in-data-[top=wide]:max-w-none"
        title={
          <CopyVariant
            a={<TitleParts parts={HERO_TITLE.a} />}
            b={<TitleParts parts={HERO_TITLE.b} />}
            c={<TitleParts parts={HERO_TITLE.c} />}
          />
        }
      />
      <p className="mt-6 hidden max-w-[34rem] text-[1.1875rem] leading-[1.55] text-pretty text-soft in-data-[hero=text]:block">
        <CopyVariant a={HERO_LEAD.a} b={HERO_LEAD.b} c={HERO_LEAD.c} />
      </p>
      <HeroLogos />
      <HeroExpand />
      <HeroCurrent />
      <div className="mt-7 flex flex-wrap gap-2.5">
        <Button asChild className="group/btn">
          <Link href={HERO_ACTIONS.primary.href}>
            {HERO_ACTIONS.primary.label}
            <ArrowRight
              aria-hidden
              className="transition-transform duration-250 ease-soft group-hover/btn:translate-x-0.75"
            />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={HERO_ACTIONS.secondary.href}>
            {HERO_ACTIONS.secondary.label}
          </Link>
        </Button>
      </div>
    </header>
  );
}
