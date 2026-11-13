import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeroProps {
  /** First part of the title, in the main colour. */
  title: ReactNode;
  /** Second part, toned down by the `heading` option. */
  titleEnd?: ReactNode;
  lead: ReactNode;
  /** Small line above the title. */
  eyebrow?: ReactNode;
  actions?: ReactNode;
  /** A drawing for the `top: art` option. Decorative: it is aria-hidden. */
  art?: ReactNode;
  className?: string;
}

/**
 * The top of an inner page. The `top` option picks the layout: text only,
 * a wide title across the page, or text with a drawing beside it.
 */
export function PageHero({
  title,
  titleEnd,
  lead,
  eyebrow,
  actions,
  art,
  className,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        'grid items-center gap-x-14 gap-y-10 pt-(--hero-gap)',
        'md:in-data-[top=art]:grid-cols-[1.25fr_0.75fr] md:in-data-[top=art]:in-data-[artsize=large]:grid-cols-2',
        className,
      )}
    >
      <div className="md:in-data-[top=wide]:grid md:in-data-[top=wide]:grid-cols-[1.2fr_1fr] md:in-data-[top=wide]:items-end md:in-data-[top=wide]:gap-x-12">
        {eyebrow ? (
          <p className="mb-6 flex items-center gap-2 label-mono font-medium text-soft md:in-data-[top=wide]:col-span-2">
            {eyebrow}
          </p>
        ) : null}
        <PageTitle
          title={title}
          titleEnd={titleEnd}
          className="max-w-[18ch] text-(length:--page-title-size) in-data-[top=wide]:max-w-none md:in-data-[top=wide]:col-span-2"
        />
        <p className="mt-6 max-w-[34rem] text-[1.1875rem] leading-[1.55] text-pretty text-soft">
          {lead}
        </p>
        {actions ? (
          <div className="mt-7 flex flex-wrap gap-2.5 md:in-data-[top=wide]:mt-0 md:in-data-[top=wide]:justify-end">
            {actions}
          </div>
        ) : null}
      </div>
      {art ? (
        <div
          aria-hidden
          className="hidden max-w-88 in-data-[top=art]:block md:max-w-none"
        >
          {art}
        </div>
      ) : null}
    </header>
  );
}

interface PageTitleProps {
  title: ReactNode;
  titleEnd?: ReactNode;
  className?: string;
}

/** The h1. Size is passed in, because the home hero is larger. */
export function PageTitle({ title, titleEnd, className }: PageTitleProps) {
  return (
    <h1
      className={cn(
        'leading-[1.04] font-semibold tracking-[-0.035em] text-balance',
        className,
      )}
    >
      {title}
      {titleEnd ? <span className="text-(--title-em)"> {titleEnd}</span> : null}
    </h1>
  );
}
