import type React from "react";

import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  description,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 border-border/60 border-t py-12">
      <header className="mb-8">
        <h2 className="pg-mono text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground/70 text-sm">
            {description}
          </p>
        )}
      </header>
      <div className={cn(className)}>{children}</div>
    </section>
  );
}

interface SubBlockProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function SubBlock({ label, children, className }: SubBlockProps) {
  return (
    <div className="space-y-3">
      <p className="pg-mono text-[0.7rem] text-muted-foreground/60 uppercase tracking-wider">
        {label}
      </p>
      <div className={cn(className)}>{children}</div>
    </div>
  );
}
