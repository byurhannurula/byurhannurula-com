import Link from 'next/link';
import type { ReactNode } from 'react';

import { ExpandBio } from '@/components/home/expand-bio';
import { Tech } from '@/components/shared/tech';
import { EMPLOYER } from '@/content/career';
import {
  EXPAND_DAILY_STACK,
  EXPAND_HINT,
  EXPAND_SENTENCES,
  type ExpandKey,
} from '@/content/home';

const link = 'text-ink underline underline-offset-[0.2em]';

// Rendered on the server and passed down, so the client part holds state only.
const PANELS: Record<ExpandKey, ReactNode> = {
  eng: (
    <>
      Most of my work is web products from start to finish: the front end, the
      services behind it, the database and the deployment. Daily stack:{' '}
      {EXPAND_DAILY_STACK.map((name) => (
        <Tech
          key={name}
          name={name}
          className="mr-[0.6em] text-[length:inherit]"
        />
      ))}
    </>
  ),
  lead: (
    <>
      I joined{' '}
      <a href={EMPLOYER.href} className={link}>
        {EMPLOYER.name}
      </a>{' '}
      as an intern in 2020 and I have led the team since 2024. I plan the work,
      review code and mentor new developers.{' '}
      <Link href="/about" className={link}>
        The full story
      </Link>
    </>
  ),
  small:
    'The kind you can run on a machine you can touch. No account when none is necessary, no tracking, and data that stays where you put it.',
  tinker: (
    <>
      A small homelab, a 3D printer and a soldering iron. I also make{' '}
      <Link href="/work" className={link}>
        small tools
      </Link>{' '}
      for myself. None of it is my job. All of it makes me better at it.
    </>
  ),
};

/** The bio that opens where you click. Option: `hero=expand`. */
export function HeroExpand() {
  return (
    <ExpandBio
      sentences={EXPAND_SENTENCES}
      panels={PANELS}
      hint={EXPAND_HINT}
    />
  );
}
