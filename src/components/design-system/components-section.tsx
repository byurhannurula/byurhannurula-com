import {
  DEMO_GROUPS,
  DEMOS,
  POST_NOTE,
  POST_SAMPLES,
  type DemoEntry,
} from '@/config/design-system';
import { OPTIONS } from '@/config/options';
import { renderNote } from '@/lib/mdx';
import { getNotes } from '@/lib/notes';
import { cn } from '@/lib/utils';

import { Group, OptionScope, Specimen } from './bits';
import { DEMO_RENDERERS, type DemoContext } from './demos';
import { OptionPick } from './option-pick';

/** Notes shown in the note item demo: two, so the list spacing shows too. */
const DEMO_NOTES = 2;

function Variants({ entry, ctx }: { entry: DemoEntry; ctx: DemoContext }) {
  const render = DEMO_RENDERERS[entry.id];
  if (!entry.variants || !render) return null;
  const { key, values, layout } = entry.variants;
  const choices = OPTIONS[key].choices.filter(
    ([value]) => !values || values.includes(value),
  );
  return (
    <ul
      className={cn(
        'grid',
        layout === 'grid' ? 'gap-x-10 gap-y-12 sm:grid-cols-2' : 'gap-y-14',
      )}
    >
      {choices.map(([value, label]) => (
        <li key={value} className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono text-xs text-faint">
              {key}: <span className="text-ink">{label ?? value}</span>
            </span>
            <OptionPick optionKey={key} value={value} />
          </div>
          <OptionScope optionKey={key} value={value}>
            {render(ctx)}
          </OptionScope>
        </li>
      ))}
    </ul>
  );
}

function Demo({ entry, ctx }: { entry: DemoEntry; ctx: DemoContext }) {
  const render = DEMO_RENDERERS[entry.id];
  return (
    <Specimen
      name={entry.title}
      use={entry.use}
      wide={Boolean(entry.variants)}
      meta={
        <>
          <span>{entry.source}</span>
          {entry.options ? (
            <span>options: {entry.options.join(', ')}</span>
          ) : null}
        </>
      }
    >
      {render ? (
        entry.variants ? (
          <Variants entry={entry} ctx={ctx} />
        ) : (
          render(ctx)
        )
      ) : (
        <p className="text-[0.9375rem] text-soft">
          No example yet. Add one for the id{' '}
          <code className="font-mono text-[0.875em]">{entry.id}</code> in
          design-system/demos.tsx.
        </p>
      )}
    </Specimen>
  );
}

/** Live examples of the shared components and of the parts of a note. */
export async function ComponentsSection() {
  const notes = await getNotes();
  // A real note first, then samples.
  const ctx: DemoContext = {
    notes: notes
      .toSorted((a, b) => Number(a.sample ?? false) - Number(b.sample ?? false))
      .slice(0, DEMO_NOTES),
  };
  const samples = await Promise.all(
    POST_SAMPLES.map(async (sample) => ({
      ...sample,
      content: (await renderNote(sample.source)).content,
    })),
  );

  return (
    <>
      {DEMO_GROUPS.map((group) => (
        <Group key={group} title={group}>
          <div className="grid gap-14">
            {DEMOS.filter((entry) => entry.group === group).map((entry) => (
              <Demo key={entry.id} entry={entry} ctx={ctx} />
            ))}
          </div>
        </Group>
      ))}

      <Group title="post elements" note={POST_NOTE}>
        <div className="grid gap-14">
          {samples.map((sample) => (
            <Specimen
              key={sample.id}
              name={sample.title}
              use={sample.use}
              meta={<span>mdx</span>}
            >
              {/* The text size and rhythm of a note body. */}
              <div className="max-w-[44rem] text-[1.0625rem] leading-[1.7] [&>:first-child]:mt-0 [&>:last-child]:mb-0">
                {sample.content}
              </div>
            </Specimen>
          ))}
        </div>
      </Group>
    </>
  );
}
