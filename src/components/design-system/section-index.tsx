'use client';

import { DS_SECTIONS } from '@/config/design-system';
import { useActiveHeading } from '@/hooks/use-active-heading';

const IDS = DS_SECTIONS.map((section) => section.id);

/** The sections of the page as a quiet sticky column. Wide screens only. */
export function SectionIndex() {
  const active = useActiveHeading(IDS);
  return (
    <nav
      aria-label="Sections of this page"
      className="sticky top-28 hidden self-start lg:block"
    >
      <ol>
        {DS_SECTIONS.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={section.id === active ? 'location' : undefined}
              className="block py-[0.35rem] pl-4 text-sm leading-[1.35] text-faint no-underline shadow-[inset_1px_0_0_var(--line)] -outline-offset-2 transition-colors duration-200 hover:text-ink aria-[current]:text-ink aria-[current]:shadow-[inset_2px_0_0_var(--accent-bright)]"
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
