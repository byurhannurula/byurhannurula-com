import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface RowLinkProps {
  href: string;
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
  external?: boolean;
  className?: string;
}

/**
 * One row in a list of things to read or look at.
 *
 * There is no rule under it. A stack of these was a stack of dashed lines,
 * which read as a table rather than a list; the row is held together by the
 * leader running from the title out to the date instead, and told apart from
 * its neighbours by the surface it lifts onto when pointed at.
 */
export function RowLink({
  href,
  title,
  subtitle,
  meta,
  external = false,
  className,
}: RowLinkProps) {
  return (
    <Link
      className={cn(
        // Pulled out past the column and padded back in, so the hover surface
        // is wider than the text it holds instead of cropping it.
        "group -mx-2.5 block rounded-lg px-2.5 py-2.5 text-foreground no-underline transition-colors hover:bg-background-soft",
        className
      )}
      href={href}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
    >
      <span className="flex items-baseline gap-2.5">
        <span className="min-w-0 font-medium transition-colors group-hover:text-primary">
          {title}
        </span>
        {meta ? (
          <>
            {/* The leader a contents page uses. Drawn from the same rule tokens
                as the rest of the site, so the footer switch takes it too. */}
            <span
              aria-hidden="true"
              className="hairline-t min-w-5 flex-1 -translate-y-1"
            />
            <span className="label-pill shrink-0 transition-colors group-hover:border-primary group-hover:text-primary">
              {meta}
            </span>
          </>
        ) : null}
      </span>
      {subtitle ? (
        <span className="mt-1 line-clamp-2 block text-[13px] text-muted-foreground leading-snug">
          {subtitle}
        </span>
      ) : null}
    </Link>
  );
}
