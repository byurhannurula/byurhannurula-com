import { Section } from '@/components/shared/section';
import { RULES } from '@/content/homelab';

/** "Rules I keep": a checked list in two columns. */
export function RulesList() {
  return (
    <Section title="Rules I keep">
      <ul className="gap-x-12 md:columns-2">
        {RULES.map((rule) => (
          <li
            key={rule}
            className="relative break-inside-avoid py-[0.45rem] pl-[1.9rem] text-soft"
          >
            <span
              aria-hidden
              className="absolute top-[0.65rem] left-0 grid size-[1.15rem] place-items-center rounded-full bg-accent-soft text-accent-bright"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-[70%]"
              >
                <path d="m4.5 8.3 2.3 2.3 4.7-5" />
              </svg>
            </span>
            {rule}
          </li>
        ))}
      </ul>
    </Section>
  );
}
