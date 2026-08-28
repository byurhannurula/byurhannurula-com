import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return <div className={cn("pt-12 pb-16", className)}>{children}</div>;
}
