import { FONTS, TWO_TONE, TYPE_SCALE } from '@/config/design-system';
import { OPTIONS } from '@/config/options';
import { cn } from '@/lib/utils';

import { Group, OptionScope } from './bits';
import { OptionPick } from './option-pick';

const PANGRAM =
  'I build web apps and small tools, and I run too many services at home.';

/** The faces, the type scale and the two-tone title. */
export function TypeSection() {
  return (
    <>
      <Group title="faces">
        <ul className="grid gap-x-8 gap-y-10 md:grid-cols-3">
          {FONTS.map((font) => (
            <li
              key={font.id}
              style={{ fontFamily: `var(${font.variable})` }}
              className="min-w-0"
            >
              <p
                className={cn(
                  'text-[1.75rem] leading-[1.15] text-balance',
                  font.option && 'font-semibold tracking-[-0.03em]',
                )}
              >
                {font.sample}
              </p>
              {font.option ? (
                <p className="mt-3 text-[0.9375rem] text-soft">{PANGRAM}</p>
              ) : null}
              <div className="mt-4 flex items-center justify-between gap-3 font-sans">
                <span>
                  <b className="block text-[0.9375rem] leading-snug font-medium">
                    {font.name}
                  </b>
                  <span className="block text-[0.875rem] leading-snug text-soft">
                    {font.role}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs leading-normal text-faint">
                    {font.className ?? font.variable}
                  </span>
                </span>
                {font.option ? (
                  <OptionPick
                    optionKey={font.option.key}
                    value={font.option.value}
                    className="shrink-0"
                  />
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Group>

      <Group
        title="scale"
        note="Each line is set with the classes the app uses, in the text face you have picked."
      >
        <ul className="grid gap-9">
          {TYPE_SCALE.map((style) => (
            <li key={style.name} className="min-w-0">
              <p className="flex flex-wrap gap-x-3 font-mono text-xs leading-normal">
                <span className="text-ink">{style.name}</span>
                <span className="text-faint">{style.spec}</span>
              </p>
              <p className={cn('mt-2 max-w-[40rem]', style.classes)}>
                {style.sample}
              </p>
              <p className="mt-1.5 text-[0.875rem] leading-snug text-soft">
                {style.use}
              </p>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="two-tone title" note={TWO_TONE.note}>
        <ul className="grid gap-x-8 gap-y-8 md:grid-cols-3">
          {OPTIONS.heading.choices.map(([value, label]) => (
            <li key={value}>
              <OptionScope optionKey="heading" value={value}>
                <p className="text-[2rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance">
                  {TWO_TONE.title}{' '}
                  <span className="text-(--title-em)">{TWO_TONE.titleEnd}</span>
                </p>
              </OptionScope>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-mono text-xs text-faint">
                  heading: {label ?? value}
                </span>
                <OptionPick optionKey="heading" value={value} />
              </div>
            </li>
          ))}
        </ul>
      </Group>
    </>
  );
}
