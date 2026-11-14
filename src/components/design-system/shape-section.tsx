import {
  GAP_NOTE,
  GAPS,
  OPTION_VARS,
  RADII,
  SHADOWS,
  WIDTHS,
} from '@/config/design-system';
import { OPTIONS, type OptionKey } from '@/config/options';
import { cn } from '@/lib/utils';

import { Group, OptionScope } from './bits';
import { OptionPick } from './option-pick';

const choices = (key: OptionKey) =>
  OPTIONS[key].choices.map(([value, label]) => ({
    value,
    label: label ?? value,
  }));

const valueOf = (key: OptionKey, value: string, variable: `--${string}`) =>
  OPTION_VARS[key]?.[value]?.[variable] ?? '';

function PickRow({
  optionKey,
  value,
  label,
}: {
  optionKey: OptionKey;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-mono text-xs text-faint">
        {optionKey}: {label}
      </span>
      <OptionPick optionKey={optionKey} value={value} />
    </div>
  );
}

/** Corners, shadows, gaps and page widths, per option value. */
export function ShapeSection() {
  const widest = Math.max(
    ...WIDTHS.flatMap((token) =>
      choices(token.option).map(({ value }) =>
        Number.parseFloat(valueOf(token.option, value, token.variable)),
      ),
    ),
  );

  return (
    <>
      <Group title="corners">
        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {choices('radius').map(({ value, label }) => (
            <li key={value}>
              <OptionScope
                optionKey="radius"
                value={value}
                className="flex items-end gap-3"
              >
                {RADII.map((radius, index) => (
                  <div key={radius.name} className="min-w-0 flex-1">
                    <span
                      aria-hidden
                      className={cn(
                        'block bg-sunk shadow-[0_0_0_1px_var(--line)]',
                        radius.className,
                        // Larger corners sit on larger things.
                        ['h-14', 'h-18', 'h-24'][index] ?? 'h-24',
                      )}
                    />
                    <span className="mt-2 block font-mono text-xs leading-normal text-ink">
                      {radius.name}{' '}
                      <span className="text-faint">
                        {valueOf('radius', value, radius.variable)}
                      </span>
                    </span>
                    <span className="block text-[0.8125rem] leading-snug text-soft">
                      {radius.use}
                    </span>
                  </div>
                ))}
              </OptionScope>
              <div className="mt-4">
                <PickRow optionKey="radius" value={value} label={label} />
              </div>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="shadows">
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
          {SHADOWS.map((shadow) => (
            <li key={shadow.name}>
              <span
                aria-hidden
                className={cn(
                  'block h-24 rounded-lg bg-card',
                  shadow.className,
                )}
              />
              <p className="mt-4 text-[0.9375rem] leading-snug font-medium">
                {shadow.name}
              </p>
              <p className="font-mono text-xs leading-normal break-words text-faint">
                {shadow.className}
              </p>
              <p className="mt-1 text-[0.875rem] leading-snug text-soft">
                {shadow.use}
              </p>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="gaps" note={GAP_NOTE}>
        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {choices('density').map(({ value, label }) => (
            <li key={value}>
              <OptionScope
                optionKey="density"
                value={value}
                className="grid gap-4"
              >
                {GAPS.map((gap) => (
                  <div key={gap.variable}>
                    <span
                      aria-hidden
                      style={{ width: valueOf('density', value, gap.variable) }}
                      className="block h-2.5 max-w-full rounded-full bg-accent-bright"
                    />
                    <span className="mt-2 block font-mono text-xs leading-normal text-ink">
                      {gap.name}{' '}
                      <span className="text-faint">
                        {valueOf('density', value, gap.variable)}
                      </span>
                    </span>
                    <span className="block text-[0.8125rem] leading-snug text-soft">
                      {gap.use}
                    </span>
                  </div>
                ))}
              </OptionScope>
              <div className="mt-4">
                <PickRow optionKey="density" value={value} label={label} />
              </div>
            </li>
          ))}
        </ul>
      </Group>

      {WIDTHS.map((token) => (
        <Group key={token.variable} title="page width" note={token.use}>
          <ul className="grid gap-6">
            {choices(token.option).map(({ value, label }) => {
              const size = valueOf(token.option, value, token.variable);
              return (
                <li key={value}>
                  <span
                    aria-hidden
                    style={{
                      width: `${(Number.parseFloat(size) / widest) * 100}%`,
                    }}
                    className="block h-2.5 rounded-full bg-ink"
                  />
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-faint">
                      {token.option}: {label}{' '}
                      <span className="text-ink">{size}</span>
                    </span>
                    <OptionPick optionKey={token.option} value={value} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Group>
      ))}
    </>
  );
}
