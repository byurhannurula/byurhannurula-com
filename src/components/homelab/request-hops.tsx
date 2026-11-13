import { Smartphone } from 'lucide-react';

import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { AppIcon } from '@/components/uses/app-icon';
import { HOPS, serviceByName } from '@/content/homelab';

const iconBox =
  'size-[2.4rem] rounded-[0.7rem] max-md:row-span-2 md:mb-[0.9rem]';

/**
 * "One request, from outside to a photo": the steps on one line, with a
 * dot that travels along it. On a narrow screen it is a plain list.
 */
export function RequestHops() {
  return (
    <Section
      title="One request, from outside to a photo"
      sub={
        <>
          <SampleTag>draft</SampleTag> No port is open on the way.
        </>
      }
    >
      <ol data-reveal className="hops relative grid gap-6 md:grid-cols-5">
        {HOPS.map((hop) => (
          <li
            key={hop.name}
            className="relative z-1 grid grid-cols-[auto_1fr] gap-x-4 md:block"
          >
            {hop.from === 'phone' ? (
              <span
                className={`grid place-items-center bg-ink text-bg ${iconBox}`}
              >
                <Smartphone aria-hidden className="size-[1.1rem]" />
              </span>
            ) : (
              <AppIcon
                src={serviceByName(hop.from).icon}
                size={38}
                className={iconBox}
              />
            )}
            <b className="block font-semibold">{hop.name}</b>
            <p className="mt-[0.2rem] text-[0.9375rem] text-soft">{hop.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
