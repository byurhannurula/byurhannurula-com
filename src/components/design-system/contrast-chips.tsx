'use client';

import { TriangleAlert } from 'lucide-react';

import { CONTRAST_PAIRS } from '@/config/design-system';
import { useContrast } from '@/hooks/use-contrast';

const short = (variable: string) => variable.replace(/^--/, '');

/**
 * Each text colour on its surface, with the contrast ratio the browser
 * computes for the light mode around this list. A chip is the pair itself:
 * its text and its fill are the two colours it measures.
 */
export function ContrastChips() {
  const { ref, ratios } = useContrast<HTMLUListElement>(CONTRAST_PAIRS);
  return (
    <ul ref={ref} className="flex flex-wrap gap-1.5">
      {CONTRAST_PAIRS.map((pair, index) => {
        const ratio = ratios[index];
        const low = ratio != null && ratio < pair.min;
        return (
          <li
            key={`${pair.text}${pair.on}`}
            style={{
              color: `var(${pair.text})`,
              backgroundColor: `var(${pair.on})`,
            }}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-mono text-xs leading-none font-medium shadow-[0_0_0_1px_var(--line)]"
          >
            {low ? <TriangleAlert aria-hidden className="size-3" /> : null}
            <span>
              {short(pair.text)}
              {pair.on === '--bg' ? '' : ` on ${short(pair.on)}`}
            </span>
            <span className="tabular-nums">
              {/* Rounded down: 4.46 must not read as a pass at 4.5. */}
              {ratio == null ? '…' : (Math.floor(ratio * 10) / 10).toFixed(1)}
            </span>
            {ratio == null ? null : (
              <span className="sr-only">
                {low
                  ? `to 1, below the ${pair.min} to 1 it needs`
                  : `to 1, passes ${pair.min} to 1`}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
