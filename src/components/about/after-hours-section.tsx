import Link from 'next/link';

import { CopyVariant } from '@/components/shared/copy-variant';
import { Section } from '@/components/shared/section';
import { AFTER_HOURS } from '@/content/about';
import { cn } from '@/lib/utils';

/** Side projects, the homelab and what I study, with links to those pages. */
export function AfterHoursSection() {
  return (
    <Section
      title="After hours"
      sub={<span className="text-lg leading-[1.65]">{AFTER_HOURS.sub}</span>}
    >
      <div className="grid gap-12 text-lg leading-[1.65] md:grid-cols-2">
        <p>
          <CopyVariant {...AFTER_HOURS.first} />
        </p>
        <div>
          <p>{AFTER_HOURS.second}</p>
          <ul className="mt-[calc(1em+0.5rem)] flex gap-5 text-base font-medium">
            {AFTER_HOURS.links.map((link) => (
              <li
                key={link.href}
                className={cn(
                  // The homelab page is parked behind the `homelab` option.
                  link.href === '/homelab' && 'in-data-[homelab=off]:hidden',
                )}
              >
                <Link
                  href={link.href}
                  className="underline decoration-line-strong underline-offset-[0.25em] transition-colors hover:decoration-accent-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
