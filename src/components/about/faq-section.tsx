import { RichText } from '@/components/about/rich-text';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { Tech } from '@/components/shared/tech';
import { FAQ, FAQ_INTRO } from '@/content/about';
import { cn } from '@/lib/utils';

/** Short answers for recruiters. Shown when the `faq` option is on. */
export function FaqSection() {
  return (
    <Section className="hidden in-data-[faq=on]:block">
      <div className="grid items-start gap-4 md:grid-cols-[0.8fr_1.4fr] md:gap-12">
        <div>
          <h2 className="text-2xl leading-[1.2] font-semibold tracking-[-0.025em]">
            Short answers
          </h2>
          <p className="mt-[0.4rem] mb-4 text-soft">{FAQ_INTRO}</p>
          <SampleTag>draft answers</SampleTag>
        </div>
        <div>
          {FAQ.map((item, index) => (
            <details
              key={item.question}
              // Native details: it works without scripts and with the keyboard.
              open={index === 0}
              className="group/faq border-t border-rule last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-[1.05rem] text-[1.0625rem] font-semibold group-open/faq:text-accent [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="relative size-[0.9rem] flex-none transition-[rotate] duration-350 ease-soft group-open/faq:rotate-45 before:absolute before:inset-x-0 before:top-[calc(50%-1px)] before:h-0.5 before:rounded-[2px] before:bg-faint after:absolute after:inset-x-0 after:top-[calc(50%-1px)] after:h-0.5 after:rotate-90 after:rounded-[2px] after:bg-faint"
                />
              </summary>
              <p
                className={cn(
                  'mb-[1.2rem] max-w-160 motion-safe:group-open/faq:animate-faq-in',
                  item.unknown ? 'text-amber' : 'text-soft',
                )}
              >
                {item.tech?.map((name) => (
                  <Tech key={name} name={name} className="mr-[0.35em]" />
                ))}
                <RichText parts={item.answer} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
