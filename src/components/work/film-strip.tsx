import Image from 'next/image';

import { shotSize } from '@/components/work/shot-sizes';
import type { ProjectShot } from '@/content/projects';
import { cn } from '@/lib/utils';

interface FilmStripProps {
  shots: ProjectShot[];
  /** Name for the scroll area, for example "Jotter screenshots". */
  label: string;
  /** Stay inside the column. The default runs to the right screen edge. */
  contained?: boolean;
}

/**
 * A row of screenshots that scrolls sideways. The `shots` option sets the
 * size. It takes focus so the arrow keys can scroll it.
 */
export function FilmStrip({ shots, label, contained }: FilmStripProps) {
  return (
    <div
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- a named scroll area, not a form group
      role="group"
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scroll area must be reachable by keyboard
      tabIndex={0}
      aria-label={label}
      className={cn(
        '-ml-1 flex snap-x snap-proximity gap-4 overflow-x-auto pt-1 pb-4 pl-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        contained
          ? 'pr-1'
          : 'mr-[calc((100%-100vw)/2)] pr-[calc((100vw-100%)/2)]',
      )}
    >
      {shots.map((shot) => (
        <figure
          key={shot.src}
          className="group/shot w-[min(34rem,78vw)] flex-none snap-start in-data-[shots=small]:w-[min(20rem,70vw)]"
        >
          <Image
            src={shot.src}
            alt={shot.caption}
            {...shotSize(shot.src)}
            sizes="(min-width: 768px) 34rem, 78vw"
            className="aspect-16/10 w-full rounded-lg object-cover object-top shadow-[0_0_0_1px_var(--line)] transition-[translate,box-shadow] duration-400 ease-soft group-hover/shot:-translate-y-1 group-hover/shot:shadow-[0_0_0_1px_var(--line),var(--shadow-lift)]"
          />
          <figcaption className="mt-[0.7rem] label-mono text-faint">
            {shot.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
