import { AppIcon } from '@/components/shared/app-icon';
import { TechPile } from '@/components/shared/tech-pile';
import { EMPLOYER, type Role } from '@/content/career';
import { JOB_SECTION } from '@/content/home';
import { QUIPS } from '@/content/quips';
import { cn } from '@/lib/utils';

interface JobSummaryProps {
  roles: Role[];
  stack: string[];
}

/** One job in one row, with the roles as a small ladder. Option: `job=summary`. */
export function JobSummary({ roles, stack }: JobSummaryProps) {
  const current = roles.find((role) => role.current) ?? roles.at(-1);
  return (
    // Personal mode: the row becomes a soft yellow card, with a joke on hover.
    <div
      data-quip={QUIPS.job}
      className="hidden items-start gap-x-5 gap-y-1.5 in-data-[job=summary]:grid in-data-[mode=personal]:rounded-3xl in-data-[mode=personal]:bg-[color-mix(in_oklch,#eab308_14%,transparent)] in-data-[mode=personal]:p-6 min-[23rem]:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] dark:in-data-[mode=personal]:bg-[color-mix(in_oklch,#eab308_6%,var(--card))] dark:in-data-[mode=personal]:shadow-[inset_0_0_0_1px_color-mix(in_oklch,#eab308_40%,transparent)]"
    >
      <AppIcon src={EMPLOYER.logo} className="size-12 rounded-[0.85rem] p-1" />
      <div>
        <h3 className="text-[1.375rem] leading-[1.3] font-semibold tracking-[-0.025em]">
          {current?.title} <span className="font-normal text-faint">at</span>{' '}
          <a
            href={EMPLOYER.href}
            className="underline decoration-line-strong underline-offset-[0.2em]"
          >
            {EMPLOYER.name}
          </a>
        </h3>
        <p className="mt-1.5 mb-[1.1rem] max-w-[34rem] text-soft">
          {JOB_SECTION.summary}
        </p>
        <ol
          aria-label={JOB_SECTION.rolesLabel}
          className="mb-5 flex flex-wrap gap-x-0.5 gap-y-1.5 text-[0.9375rem] leading-[1.4] font-medium text-soft"
        >
          {roles.map((role) => (
            <li
              key={role.title}
              className="flex items-center after:mx-2 after:h-px after:w-[1.4rem] after:bg-line-strong last:after:hidden"
            >
              <span
                className={cn(
                  'flex items-center gap-1.5 whitespace-nowrap',
                  role.current &&
                    'rounded-full bg-accent-soft px-[0.6rem] py-[0.2rem] text-accent',
                )}
              >
                {role.title}
                <span
                  className={cn(
                    'font-mono text-[0.8125rem] leading-none font-normal',
                    role.current ? 'opacity-70' : 'text-faint',
                  )}
                >
                  {role.year}
                </span>
              </span>
            </li>
          ))}
        </ol>
        <TechPile names={stack} />
      </div>
      <p className="label-mono leading-[1.6] text-faint min-[23rem]:col-start-2 md:col-start-3 md:text-right">
        {EMPLOYER.period}
        <br />
        {JOB_SECTION.years}
      </p>
    </div>
  );
}
