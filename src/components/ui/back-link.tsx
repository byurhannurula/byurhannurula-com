import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * The way back out of a detail page.
 *
 * Four of these existed in two different styles: mono at 12.5px on the newer
 * routes, uppercase 12px on the older ones. This is the mono one, which is the
 * register the rest of the chrome is written in.
 */
export function BackLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted-foreground no-underline transition-colors hover:text-primary",
        className
      )}
      href={href}
    >
      <ArrowLeft
        aria-hidden="true"
        className="size-3.5 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none"
      />
      {children}
    </Link>
  );
}
