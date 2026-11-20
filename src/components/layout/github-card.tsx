'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import avatar from './avatar.jpeg';
import { ContributionGraph } from './contribution-graph';
import { type Contributions, lastDay } from './social-data';

const today = () => new Date().toISOString().slice(0, 10);

interface GithubCardProps {
  handle: string;
  line: string;
  fallback: string;
  /** From the build. Null when the mirror did not answer then. */
  initial: Contributions | null;
}

/**
 * The GitHub hover card. The page is static, so its data is from the last
 * build; when that is older than today, the card asks `/api/github` for
 * fresh numbers and swaps them in.
 */
export function GithubCard({
  handle,
  line,
  fallback,
  initial,
}: GithubCardProps) {
  const [data, setData] = useState(initial);

  useEffect(() => {
    if (initial && lastDay(initial) >= today()) return;
    const controller = new AbortController();
    fetch('/api/github', { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((fresh: Contributions | null) => {
        if (fresh?.weeks?.length) setData(fresh);
      })
      // Old numbers are still true numbers; no error is worth showing.
      .catch(() => undefined);
    return () => controller.abort();
  }, [initial]);

  if (!data) {
    return (
      <div className="w-56 p-3 text-[0.8125rem] text-soft">
        {handle} {fallback}
      </div>
    );
  }

  return (
    <div className="flex w-[min(22rem,calc(100vw-4rem))] flex-col gap-3 p-3">
      <div className="flex items-center gap-3">
        <Image
          src={avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm text-ink">{handle}</span>
          <span className="text-[0.78125rem] text-soft">
            {data.total.toLocaleString('en')} {line}
          </span>
        </div>
      </div>
      <ContributionGraph weeks={data.weeks} />
    </div>
  );
}
