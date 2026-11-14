import { TechPile } from '@/components/shared/tech-pile';
import { EMPLOYER, type Role } from '@/content/career';
import { JOB_SECTION } from '@/content/home';
import { cn } from '@/lib/utils';

interface JobLadderProps {
  roles: Role[];
  stack: string[];
}

/** One heading for the job, then the roles as small steps. Option: `job=ladder`. */
export function JobLadder({ roles, stack }: JobLadderProps) {
  return (
    <div className="hidden in-data-[job=ladder]:block">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-xl leading-[1.6] font-semibold tracking-[-0.02em]">
          {JOB_SECTION.ladderTitle}{' '}
          <span className="font-normal text-faint">at</span>{' '}
          <a
            href={EMPLOYER.href}
            className="underline decoration-line-strong underline-offset-[0.2em]"
          >
            {EMPLOYER.name}
          </a>
        </h3>
        <span className="label-mono leading-[1.6] whitespace-nowrap text-faint">
          {EMPLOYER.period}
        </span>
      </div>
      <p className="mt-1.5 mb-[1.1rem] max-w-[34rem] text-soft">
        {JOB_SECTION.ladderText}
      </p>
      <ol
        aria-label={JOB_SECTION.rolesLabel}
        className="mb-5 ml-[0.3rem] border-l border-line-strong pl-[1.1rem] text-[0.9375rem] leading-normal font-medium"
      >
        {roles.map((role) => (
          <li
            key={role.title}
            className={cn(
              'relative flex justify-between gap-4 py-[0.3rem] before:absolute before:top-[0.8rem] before:-left-[calc(1.1rem+4px)] before:size-[7px] before:rounded-full',
              role.current
                ? 'text-ink before:bg-accent-bright before:shadow-[0_0_0_3px_var(--accent-soft)]'
                : 'text-soft before:bg-line-strong',
            )}
          >
            <span>{role.title}</span>
            <span className="label-mono leading-[1.6] whitespace-nowrap text-faint">
              {role.period}
            </span>
          </li>
        ))}
      </ol>
      <TechPile names={stack} />
    </div>
  );
}
