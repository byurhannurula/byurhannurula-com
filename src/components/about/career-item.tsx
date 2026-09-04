import { TechChip } from "@/components/about/tech-chip";
import { type CareerItem as CareerItemData, toHighlight } from "@/config/about";

export function CareerItem({
  role,
  org,
  orgUrl,
  years,
  description,
  roles,
  stack,
  highlights,
}: CareerItemData) {
  const orgNode = orgUrl ? (
    <a
      href={orgUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary no-underline hover:underline"
    >
      {org}
    </a>
  ) : (
    <span className="text-primary">{org}</span>
  );

  return (
    <div className="hairline px-1 py-4">
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-semibold">
          {role} <span className="font-normal text-muted-foreground">at</span>{" "}
          {orgNode}
        </span>
        <span className="label-mono whitespace-nowrap">{years}</span>
      </div>
      <p className="mt-1 text-[13.5px] text-muted-foreground leading-[1.6]">
        {description}
      </p>

      {roles ? (
        <ol className="mt-3 border-border-dash border-l border-dashed pl-3 font-mono text-[12px]">
          {roles.map((step, index) => {
            const isCurrent = index === roles.length - 1;
            return (
              <li
                key={step.title}
                className="relative flex items-center justify-between gap-4 py-0.5"
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 -left-4 size-1.75 -translate-y-1/2 rounded-full ${
                    isCurrent ? "bg-primary" : "bg-border-dash"
                  }`}
                />
                <span
                  className={
                    isCurrent ? "text-primary" : "text-muted-foreground"
                  }
                >
                  {step.title}
                </span>
                <span className="whitespace-nowrap text-faint">
                  {step.years}
                </span>
              </li>
            );
          })}
        </ol>
      ) : null}

      {stack ? (
        <div className="mt-3">
          <p className="label-mono mb-1.5">tools</p>
          <div className="flex flex-wrap gap-1.5">
            {stack.map((item) => (
              <TechChip key={item.name} {...item} />
            ))}
          </div>
        </div>
      ) : null}

      {highlights ? (
        <div className="mt-3">
          <p className="label-mono mb-1.5">what I&apos;ve done</p>
          <ul className="space-y-1 text-[13.5px] text-muted-foreground leading-[1.6]">
            {highlights.map(toHighlight).map((line) => (
              <li key={line.text} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  —
                </span>
                <span>{line.text}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
