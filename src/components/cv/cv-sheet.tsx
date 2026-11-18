import './cv.css';

import { brand } from '@/lib/brand';
import { siteUrl } from '@/lib/site';
import {
  ACHIEVEMENTS,
  ALONGSIDE,
  EARLIER,
  EMPLOYER,
  ROLES,
} from '@/content/career';
import { CV_COPY, CV_PROJECTS } from '@/content/cv';
import { PROJECTS } from '@/content/projects';
import { SOCIALS } from '@/content/socials';
import { STACK } from '@/content/tech';

// The page is static: this is the build date, so a new deploy dates it.
const UPDATED = new Date().toLocaleDateString('en-GB', {
  month: 'long',
  year: 'numeric',
});

const host = (href: string) => href.replace(/^https?:\/\//, '');

function Heading({ children }: { children: string }) {
  return (
    <h2 className="mb-3 border-b border-(--cv-line) pb-1.5 font-mono text-[0.6875rem] font-medium tracking-[0.12em] text-(--cv-faint) uppercase">
      {children}
    </h2>
  );
}

const projects = CV_PROJECTS.map((slug) =>
  PROJECTS.find((project) => project.slug === slug),
).filter((project) => project !== undefined);

const education = EARLIER.filter((item) => item.title.includes('University'));
const earlier = EARLIER.filter((item) => !item.title.includes('University'));

/**
 * The CV as one A4 sheet. It reads the same content files as the rest of
 * the site, so it never drifts from the about and work pages.
 */
export function CvSheet() {
  const site = host(siteUrl.origin);
  return (
    <article className="cv-sheet mx-auto w-full max-w-[210mm] rounded-sm border border-line px-6 py-8 text-[0.8125rem] leading-[1.5] shadow-lift sm:px-[14mm] sm:py-[13mm]">
      <header className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3 border-b-2 border-(--cv-ink) pb-5">
        <div>
          <h1 className="text-[2rem] leading-none font-semibold tracking-[-0.03em]">
            {brand.name}
          </h1>
          <p className="mt-2 text-[0.9375rem] text-(--cv-soft)">{brand.role}</p>
        </div>
        <ul className="font-mono text-[0.6875rem] leading-[1.7] text-(--cv-soft) sm:text-right">
          <li>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </li>
          <li>
            <a href={siteUrl.origin}>{site}</a>
          </li>
          {SOCIALS.filter((s) => ['GitHub', 'LinkedIn'].includes(s.name)).map(
            (social) => (
              <li key={social.name}>
                <a href={social.href}>{host(social.href)}</a>
              </li>
            ),
          )}
        </ul>
      </header>

      <p className="mt-5 max-w-[60ch] text-[0.875rem] text-pretty text-(--cv-soft)">
        {CV_COPY.summary}
      </p>

      <div className="mt-7 grid gap-x-10 gap-y-7 sm:grid-cols-[1fr_13.5rem]">
        <div className="grid content-start gap-7">
          <section>
            <Heading>{CV_COPY.experience}</Heading>
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[0.9375rem] font-semibold">
                <a href={EMPLOYER.href}>{EMPLOYER.name}</a>
              </h3>
              <span className="font-mono text-[0.6875rem] text-(--cv-faint)">
                {EMPLOYER.period}
              </span>
            </div>
            <ol className="mt-2.5 grid gap-1.5">
              {ROLES.toReversed().map((role) => (
                <li
                  key={role.title}
                  className="grid grid-cols-[6.5rem_1fr] gap-3"
                >
                  <span className="font-mono text-[0.6875rem] leading-[1.9] text-(--cv-faint)">
                    {role.period}
                  </span>
                  <span>
                    <strong className="font-semibold">{role.title}</strong>
                    {role.current ? (
                      <span className="text-(--cv-accent)"> · now</span>
                    ) : null}
                    <span className="text-(--cv-soft)"> {role.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ul className="mt-4 grid list-disc gap-1 pl-4 marker:text-(--cv-faint)">
              {ACHIEVEMENTS.map((line) => (
                <li key={line} className="pl-1 text-pretty">
                  {line}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading>{CV_COPY.alongside}</Heading>
            {ALONGSIDE.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">
                    <a href={item.href}>{item.title}</a>
                  </h3>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-(--cv-faint)">
                    {item.period}
                  </span>
                </div>
                <p className="text-(--cv-soft)">{item.text}</p>
              </div>
            ))}
          </section>

          <section>
            <Heading>{CV_COPY.earlier}</Heading>
            {earlier.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-(--cv-faint)">
                    {item.period}
                  </span>
                </div>
                <p className="text-(--cv-soft)">{item.text}</p>
              </div>
            ))}
          </section>

          <section>
            <Heading>{CV_COPY.education}</Heading>
            {education.map((item) => (
              <div key={item.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <span className="shrink-0 font-mono text-[0.6875rem] text-(--cv-faint)">
                    {item.period}
                  </span>
                </div>
                <p className="text-(--cv-soft)">{item.text}</p>
              </div>
            ))}
          </section>
        </div>

        <aside className="grid content-start gap-7">
          <section>
            <Heading>{CV_COPY.stack}</Heading>
            <dl className="grid gap-2.5">
              {Object.entries(STACK).map(([group, items]) => (
                <div key={group}>
                  <dt className="font-mono text-[0.6875rem] text-(--cv-faint)">
                    {group}
                  </dt>
                  <dd className="text-pretty">{items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <Heading>{CV_COPY.projects}</Heading>
            <ul className="grid gap-2.5">
              {projects.map((project) => (
                <li key={project.slug}>
                  <p className="font-semibold">
                    {project.name}{' '}
                    <span className="font-mono text-[0.6875rem] font-normal text-(--cv-faint)">
                      {project.kind}
                    </span>
                  </p>
                  <p className="text-pretty text-(--cv-soft)">
                    {project.short}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <footer className="mt-8 flex justify-between border-t border-(--cv-line) pt-3 font-mono text-[0.625rem] text-(--cv-faint)">
        <span>
          {CV_COPY.live}: {site}/cv
        </span>
        <span>{UPDATED}</span>
      </footer>
    </article>
  );
}
