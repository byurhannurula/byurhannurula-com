import { Section } from '@/components/shared/section';
import { techIconUrl } from '@/components/shared/tech';
import { TechPile } from '@/components/shared/tech-pile';
import { STACK, TECH_ICON } from '@/content/tech';
import { cn } from '@/lib/utils';

const GROUPS = Object.entries(STACK);

const ROW =
  'grid gap-1 border-t border-rule py-[1.1rem] first:border-t-0 first:pt-0 md:grid-cols-[8rem_1fr] md:gap-4';
const ROW_LABEL = 'label-mono leading-[1.8] text-faint';

function StackTech({ name }: { name: string }) {
  const icon = techIconUrl(name);
  return (
    <span className="group/tech inline-flex items-center gap-[0.45rem] text-[0.9375rem] font-medium transition-shadow duration-200 in-data-[stack=chips]:h-9 in-data-[stack=chips]:gap-0 in-data-[stack=chips]:rounded-[0.65rem] in-data-[stack=chips]:px-[0.65rem] in-data-[stack=chips]:shadow-[0_0_0_1px_var(--line)] in-data-[stack=chips]:hover:shadow-[0_0_0_1px_var(--accent-bright)]">
      {icon ? (
        // oxlint-disable-next-line nextjs/no-img-element
        <img
          src={icon}
          alt=""
          loading="lazy"
          className="size-[1.1rem] in-data-[stack=plain]:hidden"
        />
      ) : null}
      <span
        className={cn(
          'whitespace-nowrap',
          // A chip shows its name on hover. Without an icon the chip would
          // be empty, so that name stays.
          icon &&
            'transition-[max-width,padding] duration-300 ease-soft in-data-[stack=chips]:max-w-0 in-data-[stack=chips]:overflow-hidden in-data-[stack=chips]:group-hover/tech:max-w-36 in-data-[stack=chips]:group-hover/tech:pl-[0.45rem]',
        )}
      >
        {name}
      </span>
    </span>
  );
}

/** The full stack by group. The `stack` option picks how it is drawn. */
export function StackSection() {
  return (
    <Section title="Stack">
      {/* rows, cloud, chips and plain share this markup. In cloud the rows
          and lists become `contents`, so all names wrap as one line. */}
      <div className="hidden flex-wrap gap-x-[1.35rem] gap-y-[0.7rem] in-data-[stack=chips]:block in-data-[stack=cloud]:flex in-data-[stack=plain]:block in-data-[stack=rows]:block">
        {GROUPS.map(([group, names]) => (
          <div
            key={group}
            className={cn(ROW, 'in-data-[stack=cloud]:contents')}
          >
            <span className={cn(ROW_LABEL, 'in-data-[stack=cloud]:hidden')}>
              {group}
            </span>
            <ul className="flex flex-wrap gap-x-[1.35rem] gap-y-[0.6rem] in-data-[stack=chips]:gap-[0.4rem] in-data-[stack=cloud]:contents">
              {names.map((name) => (
                <li key={name} className="in-data-[stack=cloud]:contents">
                  <StackTech name={name} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="hidden in-data-[stack=pile]:block">
        {GROUPS.map(([group, names]) => (
          <div key={group} className={cn(ROW, 'items-center')}>
            <span className={ROW_LABEL}>{group}</span>
            <div>
              <TechPile names={names.filter((name) => TECH_ICON[name])} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
