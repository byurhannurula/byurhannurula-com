import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SectionProps {
  title?: ReactNode;
  /** One short line under the title. */
  sub?: ReactNode;
  /** Usually an <ArrowLink>, shown at the right of the title. */
  action?: ReactNode;
  id?: string;
  className?: string;
  children: ReactNode;
}

/**
 * A page section with the shared title row. Spacing, title style and the
 * section mark follow options through CSS variables (src/styles/options.css).
 */
export function Section({
  title,
  sub,
  action,
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-section
      className={cn('pt-(--section-gap)', className)}
    >
      {title ? (
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h2
              data-section-title
              className="text-2xl leading-tight font-semibold tracking-[-0.025em] in-data-[sectitle=label]:label-mono in-data-[sectitle=label]:tracking-normal in-data-[sectitle=label]:text-soft in-data-[sectitle=large]:text-[clamp(1.75rem,3.2vw,2.25rem)] in-data-[sectitle=large]:tracking-[-0.035em]"
            >
              {title}
            </h2>
            {sub ? <p className="mt-1 text-soft">{sub}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}
