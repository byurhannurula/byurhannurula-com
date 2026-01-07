import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return (
    <div className={`pt-24 pb-16 ${className}`}>
      <div className="mx-auto max-w-screen-md px-6">{children}</div>
    </div>
  );
}
