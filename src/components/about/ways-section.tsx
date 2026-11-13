import { WayGlyph } from '@/components/about/way-glyph';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { WAYS, WAYS_SUB } from '@/content/about';
import { cn } from '@/lib/utils';

/** Six working habits. Shown when the `ways` option is on. */
export function WaysSection() {
  return (
    <Section
      title="How I work"
      sub={
        <>
          <SampleTag>draft copy</SampleTag> {WAYS_SUB}
        </>
      }
      className="hidden in-data-[ways=on]:block"
    >
      <ul data-reveal className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {WAYS.map((way) => (
          <li
            key={way.glyph}
            className="group/way grid grid-cols-[auto_1fr] content-start gap-x-4 gap-y-[0.2rem]"
          >
            <WayGlyph
              name={way.glyph}
              className={cn(
                'row-span-2 mt-[0.1rem] size-9 motion-safe:group-hover/way:*:animate-redraw',
                way.tone,
              )}
            />
            <h3 className="text-[1.0625rem] leading-[1.3] font-semibold tracking-[-0.015em]">
              {way.title}
            </h3>
            <p className="col-start-2 text-soft">{way.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
