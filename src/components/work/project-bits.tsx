import type { Project } from '@/content/projects';
import { cn } from '@/lib/utils';

/** "desktop app" or "extension", as a small accent label. */
export function ProjectKind({ children }: { children: string }) {
  return (
    <span className="font-mono text-xs leading-none font-medium text-accent">
      {children}
    </span>
  );
}

/** The stack and licence, as one faint mono line. */
export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <span className="font-mono text-[0.8125rem] leading-[1.6] text-faint">
      {tags.join(', ')}
    </span>
  );
}

interface ProjectLinksProps {
  links: Project['links'];
  className?: string;
}

export function ProjectLinks({ links, className }: ProjectLinksProps) {
  return (
    <div className={cn('mt-2 flex gap-5 font-medium', className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="underline decoration-line-strong underline-offset-[0.25em] transition-colors hover:decoration-accent-bright"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
