import type { ReactNode } from 'react';

interface StepsProps {
  /** <Step> items. */
  children: ReactNode;
}

/**
 * Numbered steps with a line that joins them. The numbers are a CSS
 * counter, so a note never types them.
 */
export function Steps({ children }: StepsProps) {
  return (
    <ol data-reveal className="my-9 [counter-reset:step]">
      {children}
    </ol>
  );
}

interface StepProps {
  title?: string;
  children?: ReactNode;
}

/** One step inside <Steps>. */
export function Step({ title, children }: StepProps) {
  return (
    <li
      className={
        // `before` is the number, `after` the line down to the next number.
        'relative pb-7 pl-12 [counter-increment:step] before:absolute before:top-0 before:left-0 before:grid before:size-8 before:place-items-center before:rounded-full before:bg-sunk before:font-mono before:text-[0.8125rem] before:leading-none before:font-medium before:text-soft before:content-[counter(step)] after:absolute after:top-10 after:bottom-2 after:left-[calc(1rem-0.5px)] after:w-px after:bg-line-strong last:pb-0 last:after:hidden [&_p]:mb-2 [&>:last-child]:mb-0'
      }
    >
      {title ? (
        <b className="block pt-[0.1em] leading-[1.6] font-semibold">{title}</b>
      ) : null}
      <div className="text-[0.895em] leading-[1.6] text-soft [&>:last-child]:mb-0">
        {children}
      </div>
    </li>
  );
}
