import Link from 'next/link';

import { PageHero } from '@/components/shared/page-hero';
import { Section } from '@/components/shared/section';
import { AppList } from '@/components/uses/app-list';
import { GearTiles } from '@/components/uses/gear-tiles';
import { UsesArt } from '@/components/uses/uses-art';
import { USES, USES_UPDATED } from '@/content/uses';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  path: '/uses',
  title: 'Uses',
  description:
    'Hardware and software on my desk: the laptop, the editor, the terminal and the small apps I use every day.',
});

export default function UsesPage() {
  return (
    <>
      <PageHero
        title="What I use"
        titleEnd="every day."
        lead={`Hardware and software on my desk. I change it slowly. Last update: ${USES_UPDATED}.`}
        art={<UsesArt />}
      />
      {USES.map((section) => (
        <Section key={section.title} title={section.title} sub={section.sub}>
          {section.kind === 'gear' ? (
            <GearTiles items={section.items} />
          ) : (
            <AppList items={section.items} />
          )}
        </Section>
      ))}
      <p className="mt-12 text-soft in-data-[homelab=off]:hidden">
        The servers and self-hosted services have their own page:{' '}
        <Link href="/homelab" className="font-medium text-ink underline">
          the homelab
        </Link>
        .
      </p>
    </>
  );
}
