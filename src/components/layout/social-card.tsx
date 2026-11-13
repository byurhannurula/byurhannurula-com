import Image from 'next/image';
import type { CSSProperties } from 'react';

import avatar from './avatar.jpeg';
import { SAMPLE_CONTRIBUTION_LEVELS, type SocialCard } from './footer-content';

const LEVEL_CLASS = [
  'bg-sunk',
  'bg-[color-mix(in_srgb,var(--accent-bright)_30%,var(--sunk))]',
  'bg-[color-mix(in_srgb,var(--accent-bright)_60%,var(--sunk))]',
  'bg-accent-bright',
];

const strong = 'block text-sm font-medium text-ink';

interface SocialCardBodyProps {
  card: SocialCard;
}

/** The rich content of one social hover card. Decorative: links carry the name. */
export function SocialCardBody({ card }: SocialCardBodyProps) {
  if (card.kind === 'small') {
    return (
      <div className="px-[0.85rem] py-[0.7rem] whitespace-nowrap">
        <b className={strong}>{card.title}</b>
        {card.line}
      </div>
    );
  }

  if (card.kind === 'profile') {
    return (
      <div
        className="relative w-72"
        style={{ '--b': card.brandColour } as CSSProperties}
      >
        <div className="h-16 bg-(--b)" />
        <Image
          src={avatar}
          alt=""
          width={54}
          height={54}
          className="absolute top-[2.4rem] left-3 size-[3.4rem] rounded-full object-cover shadow-[0_0_0_3px_var(--card)]"
        />
        <div className="flex items-end justify-between gap-3 px-[0.8rem] pt-[2.2rem] pb-[0.8rem]">
          <span>
            <b className={strong}>{card.name}</b>
            {card.line}
          </span>
          <span className="rounded-full bg-(--b) px-3 py-[0.3rem] text-[0.78rem] font-medium whitespace-nowrap text-white">
            {card.cta}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-84 gap-[0.7rem] p-[0.8rem]">
      <div className="flex items-center gap-[0.7rem]">
        <Image
          src={avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 rounded-full object-cover"
        />
        <span>
          <b className={strong}>{card.handle}</b>
          {card.line}
        </span>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-0.5">
        {SAMPLE_CONTRIBUTION_LEVELS.map((level, i) => (
          <span
            // The list is fixed sample data, so the index is a stable key.
            // oxlint-disable-next-line react/no-array-index-key
            key={i}
            className={`aspect-square rounded-xs ${LEVEL_CLASS[level]}`}
          />
        ))}
      </div>
    </div>
  );
}
