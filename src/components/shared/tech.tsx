import { TECH_ICON } from '@/content/tech';
import { cn } from '@/lib/utils';

export const techIconUrl = (name: string) =>
  TECH_ICON[name] ? `https://cdn.simpleicons.org/${TECH_ICON[name]}` : null;

interface TechProps {
  name: string;
  /** Icon only; the name stays for screen readers and as a title. */
  iconOnly?: boolean;
  className?: string;
}

/** A technology name with its brand icon. No box around it. */
export function Tech({ name, iconOnly, className }: TechProps) {
  const icon = techIconUrl(name);
  return (
    <span
      title={iconOnly ? name : undefined}
      className={cn(
        'inline-flex items-center gap-1.5 text-[0.9375rem] font-medium whitespace-nowrap',
        className,
      )}
    >
      {icon ? (
        // Tiny remote SVGs: next/image would add a request hop for no gain.
        // oxlint-disable-next-line nextjs/no-img-element
        <img src={icon} alt="" loading="lazy" className="size-4 shrink-0" />
      ) : null}
      <span className={iconOnly ? 'sr-only' : undefined}>{name}</span>
    </span>
  );
}

export function TechList({
  names,
  className,
}: {
  names: string[];
  className?: string;
}) {
  return (
    <ul className={cn('flex flex-wrap gap-x-5 gap-y-2.5', className)}>
      {names.map((name) => (
        <li key={name}>
          <Tech name={name} />
        </li>
      ))}
    </ul>
  );
}
