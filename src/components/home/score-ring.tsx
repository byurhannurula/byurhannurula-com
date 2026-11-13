import type { Score } from '@/content/home';
import { cn } from '@/lib/utils';

/** One audit score as a ring that draws itself when it comes into view. */
export function ScoreRing({ label, value, tone }: Score) {
  return (
    <div className="grid justify-items-center gap-[0.55rem] font-mono text-xs leading-none text-soft">
      <svg
        viewBox="0 0 64 64"
        // An inline svg has no img tag form.
        // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
        role="img"
        aria-label={`${label} ${value}`}
        className="size-16"
      >
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          strokeWidth="5"
          className="stroke-line"
        />
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          // The draw keyframes count on a path length of 1.
          pathLength={1}
          strokeDasharray={value / 100}
          transform="rotate(-90 32 32)"
          className={cn(
            tone,
            'motion-safe:in-data-in:animate-[draw_1.4s_var(--ease-out-soft)_both]',
          )}
        />
        <text
          x="32"
          y="37"
          textAnchor="middle"
          className="fill-ink font-sans text-[15px] font-semibold"
        >
          {value}
        </text>
      </svg>
      {label}
    </div>
  );
}
