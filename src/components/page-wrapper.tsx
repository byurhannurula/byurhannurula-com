import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  /** Skip the staggered entrance, for a page that should simply be there. */
  instant?: boolean;
  className?: string;
}

export function PageWrapper({
  children,
  instant = false,
  className,
}: PageWrapperProps) {
  return (
    <div className={cn("pt-12 pb-16", !instant && "page-enter", className)}>
      {children}
    </div>
  );
}
