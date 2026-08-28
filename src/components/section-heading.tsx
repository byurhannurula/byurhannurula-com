import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  action?: ReactNode;
}

export function SectionHeading({ children, action }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <h2 className="font-mono font-semibold text-[14px] text-muted-foreground">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="flex-1 border-border-dash border-t border-dashed"
      />
      {action}
    </div>
  );
}
