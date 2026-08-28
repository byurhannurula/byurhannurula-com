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
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "hairline flex items-baseline justify-between gap-4 px-1 py-3 text-foreground no-underline transition-colors hover:bg-background-soft",
        className
      )}
    >
      <span className="font-medium">
        {title}
        {subtitle ? (
          <span className="mt-0.5 block font-normal text-[13px] text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </span>
      {meta ? (
        <span className="label-mono whitespace-nowrap">{meta}</span>
      ) : null}
    </Link>
  );
}
