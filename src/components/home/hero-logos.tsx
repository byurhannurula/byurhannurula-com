import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import { Tech } from '@/components/shared/tech';
import { EMPLOYER } from '@/content/career';
import { CORE_STACK } from '@/content/tech';

/** The bio as one large sentence with brand icons in the line. */
export function HeroLogos() {
  return (
    <p className="hidden max-w-[22em] text-[clamp(1.6rem,3.5vw,2.75rem)] leading-[1.28] font-medium tracking-[-0.03em] text-pretty in-data-[hero=logos]:block">
      I am Byurhan, a full-stack engineer. I lead the team at{' '}
      <Link
        href="/about"
        className="group/re whitespace-nowrap no-underline transition-colors hover:text-accent"
      >
        <Image
          src={EMPLOYER.logo}
          alt=""
          width={48}
          height={48}
          className="mr-[0.12em] ml-[0.08em] inline-block size-[0.95em] rounded-[0.24em] bg-white object-contain align-[-0.12em] shadow-[0_0_0_1px_var(--line)] transition-[rotate,scale] duration-400 ease-soft group-hover/re:scale-115 group-hover/re:-rotate-8"
        />
        {EMPLOYER.name}
      </Link>
      , where I started as an intern six years ago.{' '}
      <span className="text-faint">I work with</span>{' '}
      {CORE_STACK.map((name, index) => (
        <Fragment key={name}>
          {index ? ', ' : null}
          <Tech
            name={name}
            className="text-[length:inherit] [&_img]:size-[0.85em]"
          />
        </Fragment>
      ))}
      .
    </p>
  );
}
