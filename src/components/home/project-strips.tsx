import Image from 'next/image';

import { AppIcon } from '@/components/home/app-icon';
import { PROJECTS } from '@/content/projects';

/** Each project with a strip of its real screens. Option: `projects=b`. */
export function ProjectStrips() {
  return (
    <div className="hidden in-data-[projects=b]:block">
      {PROJECTS.map((project) => (
        <article
          key={project.slug}
          data-reveal
          className="border-t border-line py-9 first:border-t-0 first:pt-0"
        >
          <div className="mb-[1.4rem] grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 md:grid-cols-[auto_1fr_auto]">
            <AppIcon
              src={project.icon}
              className="row-span-2 size-12 rounded-[0.85rem]"
            />
            <h3 className="flex items-baseline gap-3 text-[1.625rem] leading-[1.3] font-semibold tracking-[-0.03em]">
              {project.name}
              <span className="font-mono text-xs leading-none font-medium tracking-normal text-accent">
                {project.kind}
              </span>
            </h3>
            <div className="col-start-2 flex gap-5 font-medium md:col-start-3 md:row-start-1">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="underline decoration-line-strong underline-offset-[0.25em] transition-colors hover:decoration-accent-bright"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="col-start-2 max-w-2xl text-soft">
              {project.text}{' '}
              <span className="font-mono text-[0.8125rem] leading-[1.6] text-faint">
                {project.tags.join(', ')}
              </span>
            </p>
          </div>
          {/* The strip runs to the right edge of the window, past the page
              column. tabIndex lets the keyboard scroll it. */}
          <section
            // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
            tabIndex={0}
            aria-label={`${project.name} screenshots`}
            className="mr-[calc((100%-100vw)/2)] -ml-1 flex snap-x snap-proximity [scrollbar-width:none] gap-4 overflow-x-auto pt-1 pr-[calc((100vw-100%)/2)] pb-4 pl-1 [&::-webkit-scrollbar]:hidden"
          >
            {project.shots.map((shot) => (
              <figure
                key={shot.src}
                className="group/shot w-[min(34rem,78vw)] flex-none snap-start in-data-[shots=small]:w-[min(20rem,70vw)]"
              >
                <Image
                  src={shot.src}
                  alt={shot.caption}
                  width={1088}
                  height={680}
                  sizes="(min-width: 768px) 34rem, 78vw"
                  className="aspect-16/10 rounded-lg object-cover object-top transition-[translate,box-shadow] duration-400 ease-soft group-hover/shot:-translate-y-1 group-hover/shot:shadow-[0_0_0_1px_var(--line),var(--shadow-lift)]"
                />
                <figcaption className="mt-[0.7rem] label-mono text-faint">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        </article>
      ))}
    </div>
  );
}
