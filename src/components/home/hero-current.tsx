import Image from 'next/image';
import type { ReactNode } from 'react';

import { ScrambleTitle } from '@/components/home/scramble-title';
import { EMPLOYER } from '@/content/career';
import { HERO_NAME, HOME_SERVICES } from '@/content/home';

const sentence =
  'text-[clamp(1.125rem,1.7vw,1.3125rem)] leading-[1.7] tracking-[-0.02em]';

function HoverWord({ children }: { children: ReactNode }) {
  return (
    <span className="group/hw relative cursor-default border-b border-dashed border-line-strong transition-colors duration-200 hover:border-accent-bright">
      {children}
    </span>
  );
}

/** The live site's hero: the name in pixel type and four sentences. */
export function HeroCurrent() {
  return (
    <div className="hidden in-data-[hero=current]:block">
      <ScrambleTitle text={HERO_NAME} />
      <p className={sentence}>
        I&apos;m an engineer with a passion for design and technology.
      </p>
      <p className={sentence}>
        I like tinkering with <HoverWord>electronics</HoverWord>,{' '}
        <HoverWord>
          self-hosting
          {/* A pointer detail only: it adds nothing a reader must know. Hidden
              on a phone, where it would run off the right edge. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-[calc(100%+0.4rem)] left-0 z-3 flex -translate-y-1 items-center gap-1.5 rounded-[0.6rem] bg-card px-[0.6rem] py-[0.35rem] font-mono text-xs leading-none whitespace-nowrap text-soft opacity-0 shadow-[var(--shadow-lift),0_0_0_1px_var(--line)] [transition:opacity_0.2s,translate_0.3s_var(--ease-out-soft)] group-hover/hw:translate-y-0 group-hover/hw:opacity-100 max-sm:hidden"
          >
            running at home
            {HOME_SERVICES.map((service) => (
              // oxlint-disable-next-line nextjs/no-img-element
              <img
                key={service.name}
                src={service.icon}
                alt=""
                loading="lazy"
                className="size-[1.1rem]"
              />
            ))}
          </span>
        </HoverWord>{' '}
        and more.
      </p>
      <p className={sentence}>
        Here I write about the things I try and what I learn along the way.
      </p>
      <p className={sentence}>
        Currently team lead at{' '}
        <a
          href={EMPLOYER.href}
          className="group/re font-medium whitespace-nowrap no-underline"
        >
          <Image
            src={EMPLOYER.logo}
            alt=""
            width={52}
            height={52}
            className="mr-[0.3em] inline-block size-[1.25em] rounded-[0.3em] bg-white align-[-0.25em] shadow-[0_0_0_1px_var(--line)] transition-[rotate] duration-400 ease-hover group-hover/re:-rotate-8"
          />
          {EMPLOYER.name}
        </a>
        .
      </p>
    </div>
  );
}
