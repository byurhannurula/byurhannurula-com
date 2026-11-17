import {
  COLOUR_GROUPS,
  MODES,
  type ColourGroup,
  type ColourToken,
} from '@/config/design-system';
import { cn } from '@/lib/utils';

import { Group } from './bits';
import { ContrastChips } from './contrast-chips';
import { ModeScope } from './mode-scope';
import { OptionPick } from './option-pick';
import { TokenValue } from './token-value';

const SAMPLE = 'h-16 rounded-lg';

function Sample({
  token,
  show,
}: {
  token: ColourToken;
  show: ColourGroup['show'];
}) {
  const colour = `var(${token.variable})`;
  if (show === 'text') {
    return (
      <span
        aria-hidden
        style={{ color: colour }}
        className={cn(
          SAMPLE,
          'grid place-items-center bg-card text-[1.75rem] font-semibold tracking-[-0.03em] shadow-[0_0_0_1px_var(--line)]',
        )}
      >
        Aa
      </span>
    );
  }
  if (show === 'edge') {
    return (
      <span
        aria-hidden
        style={{ borderColor: colour }}
        className={cn(SAMPLE, 'block border-2 bg-card')}
      />
    );
  }
  if (show === 'dot') {
    return (
      <span
        aria-hidden
        style={{ backgroundColor: colour }}
        className="block size-9 rounded-full"
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{ backgroundColor: colour }}
      className={cn(SAMPLE, 'block shadow-[0_0_0_1px_var(--line)]')}
    />
  );
}

function Swatch({
  token,
  show,
}: {
  token: ColourToken;
  show: ColourGroup['show'];
}) {
  return (
    <li>
      <Sample token={token} show={show} />
      <p className="mt-2.5 text-[0.9375rem] leading-snug font-medium">
        {token.name}
      </p>
      <p className="font-mono text-xs leading-normal break-words text-faint">
        <TokenValue variable={token.variable} />
      </p>
      {show === 'dot' ? null : (
        <p className="mt-1 text-[0.875rem] leading-snug text-soft">
          {token.use}
        </p>
      )}
    </li>
  );
}

/** Live swatches, the accent choices and the four light modes. */
export function ColourSection() {
  return (
    <>
      {COLOUR_GROUPS.map((group) => (
        <Group key={group.id} title={group.title} note={group.note}>
          <ul
            className={cn(
              'grid gap-x-5 gap-y-8',
              group.show === 'dot'
                ? 'grid-cols-4 sm:grid-cols-7'
                : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4',
            )}
          >
            {group.tokens.map((token) => (
              <Swatch key={token.variable} token={token} show={group.show} />
            ))}
          </ul>
        </Group>
      ))}

      <Group
        title="light modes"
        note="The page follows the clock, or the one you pick. Each preview sets its own tokens, and each number is the contrast of that text on that surface, measured in your browser. A warning mark means the pair is below its target: 4.5 to 1, or 3 to 1 for large text."
      >
        <ul className="grid gap-5 sm:grid-cols-2">
          {MODES.map((mode) => (
            <li key={mode.value}>
              <ModeScope
                mode={mode.value}
                className="h-full rounded-xl bg-bg p-5 text-ink shadow-[0_0_0_1px_var(--line-strong)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="label-mono text-faint">{mode.value}</span>
                  <OptionPick optionKey="light" value={mode.value} />
                </div>
                <p className="mt-5 text-[1.625rem] leading-[1.08] font-semibold tracking-[-0.035em]">
                  Small tools,{' '}
                  <span className="text-(--title-em)">built with care.</span>
                </p>
                <p className="mt-2 text-[0.9375rem] text-soft">{mode.note}</p>
                <div className="mt-5 flex items-center gap-3 rounded-lg bg-card px-4 py-3 shadow-soft">
                  <span
                    aria-hidden
                    className="size-2.5 rounded-full bg-accent-bright"
                  />
                  <span className="text-[0.9375rem] font-medium">A card</span>
                  <span className="ml-auto rounded-full bg-sunk px-2.5 py-1 font-mono text-xs text-soft">
                    sunk
                  </span>
                </div>
                <p className="mt-4 border-t border-rule pt-3 label-mono text-faint">
                  A label, with{' '}
                  <b className="font-medium text-accent">accent</b>
                </p>
                <div className="mt-5">
                  <ContrastChips />
                </div>
              </ModeScope>
            </li>
          ))}
        </ul>
      </Group>
    </>
  );
}
