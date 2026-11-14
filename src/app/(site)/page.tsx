import { HomeHero } from '@/components/home/home-hero';
import { HomeJob } from '@/components/home/home-job';
import { HomeProjects } from '@/components/home/home-projects';
import { HomeSite } from '@/components/home/home-site';
import { HomeTil } from '@/components/home/home-til';
import { NoteItem } from '@/components/notes/note-item';
import { ArrowLink } from '@/components/shared/arrow-link';
import { NowBlock } from '@/components/shared/now-block';
import { Section } from '@/components/shared/section';
import { NOTE_SECTION, NOW_SECTION } from '@/content/home';
import { NOW_DATE } from '@/content/now';
import { brand } from '@/lib/brand';
import { getNotes } from '@/lib/notes';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/',
  title: `${brand.name}: ${brand.role}`,
  description: brand.description,
});

export default async function HomePage() {
  const [latest] = await getNotes();

  return (
    // A flex column, so the `order` option can lift the day job above the
    // side projects with CSS `order` alone.
    <div className="flex flex-col">
      <HomeHero />
      <HomeProjects />
      <HomeJob />
      {latest ? (
        <Section
          title={NOTE_SECTION.title}
          action={<ArrowLink href="/notes">{NOTE_SECTION.action}</ArrowLink>}
        >
          <NoteItem note={latest} />
        </Section>
      ) : null}
      <HomeTil />
      <Section
        title={NOW_SECTION.title}
        sub={NOW_DATE}
        action={<ArrowLink href="/about">{NOW_SECTION.action}</ArrowLink>}
        className="hidden in-data-[now=both]:block in-data-[now=home]:block"
      >
        <NowBlock />
      </Section>
      <HomeSite />
    </div>
  );
}
