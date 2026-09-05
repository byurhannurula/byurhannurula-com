import { TechChip } from "@/components/about/tech-chip";
import { Annotated } from "@/components/annotated";
import { type CareerItem as CareerItemData, toHighlight } from "@/config/about";
import { cn } from "@/lib/utils";

/**
 * A role, with earlier titles at the same employer hung underneath it.
 *
 * The alternative to this file's `CareerItem`: dates lead, previous titles are
 * connected by a drawn line rather than listed as their own rows, and each
 * highlight can carry the numbers behind it.
 *
 * Newest title first, because the line reads as descending into the past. The
 * data is stored oldest-first, which is how a career is written down.
 */
export function CareerItemLines({
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
      className="link-inline"
      href={orgUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      {org}
    </a>
  ) : (
    <span className="text-primary">{org}</span>
  );

  // The current title is the header; only the ones it replaced go on the line.
  const previous = roles ? roles.slice(0, -1).reverse() : [];

  return (
    <div className="hairline px-1 py-4">
      <span className="label-mono">{years}</span>
      <p className="mt-0.5 font-semibold">
        {role} <span className="font-normal text-muted-foreground">at</span>{" "}
        {orgNode}
      </p>

      {previous.length ? (
        <ol className="mt-2 ml-1">
          {previous.map((step, index) => (
            <li className="relative py-1 pl-5" key={step.title}>
              {/*
               * Two pieces so the line can both continue and turn: a full-height
               * rule for every row that has another below it, and an elbow that
               * turns into this row's text. A single bordered box cannot do both.
               */}
              {index < previous.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-px bg-border-dash"
                />
              ) : null}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-[1.15em] w-3 rounded-bl-[6px] border-border-dash border-b border-l"
              />
              <span className="block font-mono text-[11.5px] text-faint">
                {step.years}
              </span>
              <span className="block text-[13.5px] text-muted-foreground">
                {step.title}
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      <p className="mt-3 text-[13.5px] text-muted-foreground leading-[1.6]">
        {description}
      </p>

      {highlights ? (
        <ul className="mt-3 space-y-1.5 text-[13.5px] text-muted-foreground leading-[1.6]">
          {highlights.map(toHighlight).map((line) => (
            <li className="flex gap-2.5" key={line.text}>
              <span
                aria-hidden="true"
                className="mt-[0.5em] size-1.5 shrink-0 rounded-full border border-muted-foreground/60"
              />
              {line.note ? (
                <Annotated note={line.note}>{line.text}</Annotated>
              ) : (
                <span>{line.text}</span>
              )}
            </li>
          ))}
        </ul>
      ) : null}

      {stack ? (
        <div
          className={cn("flex flex-wrap gap-1.5", highlights ? "mt-4" : "mt-3")}
        >
          {stack.map((item) => (
            <TechChip key={item} item={item} showLabel />
          ))}
        </div>
      ) : null}
    </div>
  );
}
