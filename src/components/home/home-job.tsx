import { AppIcon } from '@/components/shared/app-icon';
import { JobLadder } from '@/components/home/job-ladder';
import { JobSummary } from '@/components/home/job-summary';
import { CareerTrack } from '@/components/shared/career-track';
import { ArrowLink } from '@/components/shared/arrow-link';
import { CopyVariant } from '@/components/shared/copy-variant';
import { Section } from '@/components/shared/section';
import { EMPLOYER, ROLES } from '@/content/career';
import { JOB_SECTION } from '@/content/home';
import { WORK_STACK } from '@/content/tech';

/**
 * The day job. Every view shows ONE employer with a role progression, never
 * four jobs. The `job` option picks the view; `order` moves it above the
 * side projects (the default).
 */
export function HomeJob() {
  return (
    <Section
      id="job"
      title={JOB_SECTION.title}
      action={<ArrowLink href="/about">{JOB_SECTION.action}</ArrowLink>}
      className="in-data-[job=off]:hidden in-data-[order=job]:-order-1"
    >
      <div className="hidden in-data-[job=a]:block">
        <div className="grid items-start gap-x-12 gap-y-6 md:grid-cols-[auto_1fr]">
          <div className="flex items-center gap-[0.8rem]">
            <AppIcon
              src={EMPLOYER.logo}
              className="size-11 rounded-[0.8rem] p-1"
            />
            <div>
              <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em]">
                {EMPLOYER.name}
              </h3>
              <span className="label-mono text-soft">{EMPLOYER.period}</span>
            </div>
          </div>
          <p className="max-w-[36rem] text-[1.0625rem] text-soft">
            <CopyVariant
              a={JOB_SECTION.intro.a}
              b={JOB_SECTION.intro.b}
              c={JOB_SECTION.intro.c}
            />
          </p>
        </div>
        <CareerTrack roles={ROLES} />
      </div>
      <JobSummary roles={ROLES} stack={WORK_STACK} />
      <JobLadder roles={ROLES} stack={WORK_STACK} />
    </Section>
  );
}
