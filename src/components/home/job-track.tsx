import type { Role } from '@/content/career';
import { cn } from '@/lib/utils';

interface JobTrackProps {
  roles: Role[];
}

/** Four roles on one line, filled up to today. Option: `job=a`. */
export function JobTrack({ roles }: JobTrackProps) {
  return (
    <div data-reveal className="relative mt-8 md:mt-11">
      <span
        aria-hidden
        className="absolute top-[0.4rem] bottom-[0.4rem] left-[0.4rem] w-0.5 rounded-xs bg-line-strong md:right-0 md:bottom-auto md:h-0.5 md:w-auto"
      />
      {/* Styles: .track-fill in src/styles/home.css. */}
      <span aria-hidden className="track-fill" />
      <ol className="grid gap-5 md:grid-cols-4 md:gap-0">
        {roles.map((role) => (
          <li
            key={role.title}
            className="group/role relative pl-[1.9rem] md:pt-7 md:pr-6 md:pl-0"
          >
            <span
              aria-hidden
              className={cn(
                'absolute top-0 left-0 z-1 size-[0.9rem] rounded-full border-2 transition-[border-color,scale] duration-300 ease-soft group-hover/role:scale-120 group-hover/role:border-accent-bright',
                role.current
                  ? 'border-accent-bright bg-accent-bright shadow-[0_0_0_5px_var(--accent-soft)]'
                  : 'border-line-strong bg-bg',
              )}
            />
            <span className="block label-mono text-faint">{role.period}</span>
            <b
              className={cn(
                'mt-[0.15rem] mb-1 block text-[1.0625rem] font-semibold tracking-[-0.01em]',
                role.current && 'text-accent',
              )}
            >
              {role.title}
            </b>
            <p className="text-[0.9375rem] text-soft">{role.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
