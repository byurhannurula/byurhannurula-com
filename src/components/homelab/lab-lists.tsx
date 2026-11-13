import { Section } from '@/components/shared/section';
import { AppList } from '@/components/uses/app-list';
import { GearTiles } from '@/components/uses/gear-tiles';
import { MACHINES, SERVICES } from '@/content/homelab';

/** `lab: lists`. The plain layout: machine photos, then the services. */
export function LabLists() {
  return (
    <>
      <Section title="Machines">
        <GearTiles items={MACHINES} />
      </Section>
      <Section title="Services" sub="What runs on it.">
        <AppList items={[...SERVICES]} />
      </Section>
    </>
  );
}
