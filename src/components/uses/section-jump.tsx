interface SectionJumpProps {
  sections: { id: string; title: string; count: number }[];
}

/** A quiet row of links to the sections of the page, with item counts. */
export function SectionJump({ sections }: SectionJumpProps) {
  return (
    <nav aria-label="Sections of this page" className="mt-9">
      <ul className="flex flex-wrap gap-x-6 gap-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              // py: a finger needs more height than the text has.
              className="group/jump inline-flex items-baseline gap-1.5 py-1.5 label-mono text-soft no-underline transition-colors duration-200 hover:text-ink"
            >
              <span className="underline decoration-line-strong underline-offset-[0.3em] transition-colors duration-200 group-hover/jump:decoration-accent-bright">
                {section.title}
              </span>
              <span className="text-faint">
                {section.count}
                <span className="sr-only"> items</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
