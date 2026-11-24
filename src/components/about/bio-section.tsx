import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { BioSwitch } from '@/components/about/bio-switch';
import { ExpandBio } from '@/components/about/expand-bio';
import { RichText } from '@/components/about/rich-text';
import { Section } from '@/components/shared/section';
import { Tech, techIconUrl } from '@/components/shared/tech';
import {
  BIO_COLUMNS,
  BIO_INLINE_TECH,
  BIO_PANELS,
  BIO_SWITCH,
  type BioPanelKey,
} from '@/content/about';
import { EMPLOYER } from '@/content/career';
import { cn } from '@/lib/utils';

const MARK =
  'mr-[0.12em] ml-[0.08em] inline-block size-[0.95em] rounded-[0.24em] bg-white object-contain align-[-0.12em] shadow-[0_0_0_1px_var(--line)] transition-[rotate,scale] duration-400 ease-hover group-hover/mark:-rotate-8 group-hover/mark:scale-115';

const MARK_LINK =
  'group/mark whitespace-nowrap transition-colors hover:text-accent';

const PROJECT_MARKS = [
  { name: 'Jotter', icon: '/assets/icons/jotter.svg' },
  { name: 'OGee', icon: '/assets/projects/ogee/icon.png' },
  { name: 'FullShot', icon: '/assets/projects/fullshot/icon.png' },
];

/** Joining words of the inline bio, toned down so the names stand out. */
function Quiet({ children }: { children: ReactNode }) {
  return <span className="text-faint">{children}</span>;
}

function InlineBio() {
  return (
    <p className="mb-8 hidden max-w-[22em] text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.28] font-medium tracking-[-0.03em] text-pretty in-data-[bio=inline]:block">
      I build web products at{' '}
      <a href={EMPLOYER.href} className={MARK_LINK}>
        <Image
          src={EMPLOYER.logo}
          alt=""
          width={180}
          height={180}
          sizes="2rem"
          className={MARK}
        />
        {EMPLOYER.name}
      </a>{' '}
      <Quiet>with</Quiet>{' '}
      {BIO_INLINE_TECH.map((name, index) => {
        const icon = techIconUrl(name);
        return (
          <span key={name}>
            <span className="group/mark whitespace-nowrap">
              {icon ? (
                // oxlint-disable-next-line nextjs/no-img-element
                <img src={icon} alt="" loading="lazy" className={MARK} />
              ) : null}
              {name}
            </span>
            {index < BIO_INLINE_TECH.length - 1 ? ', ' : '.'}
          </span>
        );
      })}{' '}
      <Quiet>After work I make</Quiet>{' '}
      {PROJECT_MARKS.map((project, index) => (
        <span key={project.name}>
          {index === PROJECT_MARKS.length - 1 ? (
            <>
              {' '}
              <Quiet>and</Quiet>{' '}
            </>
          ) : null}
          <Link href="/work" className={MARK_LINK}>
            <Image
              src={project.icon}
              alt=""
              width={128}
              height={128}
              sizes="2rem"
              className={MARK}
            />
            {project.name}
          </Link>
          {index < PROJECT_MARKS.length - 2 ? ', ' : null}
        </span>
      ))}
      .
    </p>
  );
}

function panel(key: BioPanelKey) {
  const { text, tech } = BIO_PANELS[key];
  return (
    <>
      <RichText parts={text} linkClassName="text-ink" />
      {tech?.map((name) => (
        <Tech key={name} name={name} className="mr-[0.6em] text-[1em]" />
      ))}
    </>
  );
}

function BioColumns({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'gap-x-12 gap-y-[1em] text-lg leading-[1.65] text-soft md:grid-cols-2',
        className,
      )}
    >
      <p className="max-w-[34rem] text-ink">{BIO_COLUMNS.left}</p>
      <div className="max-w-[34rem] space-y-[1em]">
        {BIO_COLUMNS.right.map((text, index) => (
          <p key={text} className={index === 0 ? 'text-ink' : undefined}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * The bio. The `bio` option picks columns, one sentence, an expanding one or
 * a short and long pair.
 */
export function BioSection() {
  return (
    <Section>
      <div className="hidden in-data-[bio=expand]:block">
        <ExpandBio
          panels={{
            eng: panel('eng'),
            lead: panel('lead'),
            small: panel('small'),
            tinker: panel('tinker'),
          }}
        />
      </div>
      <InlineBio />
      <div className="hidden in-data-[bio=switch]:block">
        <BioSwitch
          panels={{
            short: (
              <p className="max-w-[34rem] text-lg leading-[1.65] text-pretty">
                {BIO_SWITCH.short}
              </p>
            ),
            long: <BioColumns className="grid" />,
          }}
          texts={{
            short: BIO_SWITCH.short,
            long: [BIO_COLUMNS.left, ...BIO_COLUMNS.right].join('\n\n'),
          }}
        />
      </div>
      <BioColumns className="hidden in-data-[bio=a]:grid" />
    </Section>
  );
}
