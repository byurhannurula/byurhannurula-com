import { Check } from 'lucide-react';
import Image from 'next/image';

import { ArrowLink } from '@/components/shared/arrow-link';
import { Section } from '@/components/shared/section';
import { TechList } from '@/components/shared/tech';
import { ACHIEVEMENTS, EMPLOYER, ROLES } from '@/content/career';
import { WORK_STACK } from '@/content/tech';

/** The day job: one employer, four roles, what was done and with what. */
export function CareerSection() {
  return (
    <Section>
      <div className="mb-7 flex items-end justify-between gap-4">
        <div className="flex items-center gap-[0.8rem]">
          <Image
            src={EMPLOYER.logo}
            alt=""
            width={180}
            height={180}
            sizes="2.75rem"
            className="size-11 rounded-[0.8rem] bg-white object-contain p-1 shadow-[0_0_0_1px_var(--line)]"
          />
          <div>
            {/* No data-section-title: the logo is this section's mark. */}
            <h2 className="text-2xl leading-tight font-semibold tracking-[-0.025em] in-data-[sectitle=label]:label-mono in-data-[sectitle=label]:tracking-normal in-data-[sectitle=label]:text-soft in-data-[sectitle=large]:text-[clamp(1.75rem,3.2vw,2.25rem)] in-data-[sectitle=large]:tracking-[-0.035em]">
              {EMPLOYER.name}
            </h2>
            <span className="label-mono text-soft">
              {EMPLOYER.period}, {EMPLOYER.duration}
            </span>
          </div>
        </div>
        <ArrowLink href={EMPLOYER.href} className="text-soft">
          recheck.io
        </ArrowLink>
      </div>

      <ol
        data-reveal
        className="career-track relative mt-8 grid gap-5 md:mt-11 md:grid-cols-4 md:gap-0"
      >
        {ROLES.map((role) => (
          <li
            key={role.title}
            data-current={role.current ? '' : undefined}
            className="group/role relative pl-[1.9rem] md:pt-7 md:pr-6 md:pl-0"
          >
            <span className="block label-mono text-faint">{role.period}</span>
            <b className="mt-[0.15rem] mb-1 block text-[1.0625rem] font-semibold tracking-[-0.01em] group-data-current/role:text-accent">
              {role.title}
            </b>
            <p className="text-[0.9375rem] text-soft">{role.text}</p>
          </li>
        ))}
      </ol>

      <ul className="mt-12 columns-1 gap-x-12 md:columns-2">
        {ACHIEVEMENTS.map((text) => (
          <li
            key={text}
            className="relative break-inside-avoid py-[0.45rem] pl-[1.9rem] text-soft"
          >
            <span
              aria-hidden
              className="absolute top-[0.65rem] left-0 grid size-[1.15rem] place-items-center rounded-full bg-accent-soft text-accent-bright"
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            {text}
          </li>
        ))}
      </ul>

      <TechList names={WORK_STACK} className="mt-9" />
    </Section>
  );
}
