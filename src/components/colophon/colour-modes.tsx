import { ModeScope } from '@/components/design-system/mode-scope';
import { LIGHT_MODES_COPY } from '@/content/colophon';

const HUES = [
  'bg-hue-1',
  'bg-hue-2',
  'bg-hue-3',
  'bg-hue-4',
  'bg-hue-5',
  'bg-hue-6',
  'bg-hue-7',
];

/**
 * The four light modes as four small pages, each drawn in its own colours
 * whatever mode the reader is in, and the seven hues under them.
 */
export function ColourModes() {
  return (
    <div data-reveal>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {LIGHT_MODES_COPY.map(({ mode, hours, text }) => (
          <li key={mode}>
            <ModeScope
              mode={mode}
              className="flex aspect-4/5 flex-col justify-between rounded-lg bg-bg p-5 text-ink shadow-[0_0_0_1px_var(--line-strong)]"
            >
              <div className="flex items-center justify-between">
                <span className="label-mono text-faint">{hours}</span>
                <span className="size-2.5 rounded-full bg-accent-bright" />
              </div>
              <div>
                <b className="block text-[1.75rem] leading-none font-semibold tracking-[-0.03em]">
                  {mode}
                </b>
                <span className="mt-1.5 block text-[0.9375rem] text-soft">
                  {text}
                </span>
                <span className="mt-4 flex gap-1.5" aria-hidden>
                  <span className="h-2 flex-1 rounded-full bg-ink" />
                  <span className="h-2 flex-1 rounded-full bg-soft" />
                  <span className="h-2 flex-1 rounded-full bg-sunk shadow-[0_0_0_1px_var(--line)]" />
                  <span className="h-2 flex-1 rounded-full bg-accent" />
                </span>
              </div>
            </ModeScope>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="flex" aria-hidden>
          {HUES.map((hue) => (
            <span
              key={hue}
              className={`-ml-2 size-9 rounded-full shadow-[0_0_0_3px_var(--bg)] first:ml-0 ${hue}`}
            />
          ))}
        </div>
        <p className="max-w-[34rem] text-soft">
          One green accent, and seven hues that each stand for one idea: a layer
          of the stack, a section, a kind of page. Colour is never decoration
          alone.
        </p>
      </div>
    </div>
  );
}
