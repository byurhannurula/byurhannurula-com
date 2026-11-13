import { LayerStack } from '@/components/about/layer-stack';
import { Say } from '@/components/about/say';
import { Section } from '@/components/shared/section';
import { ACROSS_LAYERS, CAPS_SENTENCE, LAYERS } from '@/content/about';

/** What I do. The `caps` option picks a layer drawing, a sentence or a list. */
export function CapabilitiesSection() {
  return (
    <Section title="What I do">
      <LayerStack className="hidden in-data-[caps=a]:grid" />
      <Say parts={CAPS_SENTENCE} className="hidden in-data-[caps=b]:block" />
      <ol className="hidden in-data-[caps=list]:block">
        {[...LAYERS, ...ACROSS_LAYERS].map((item) => (
          <li
            key={item.name}
            className="grid gap-1 border-t border-rule py-[1.15rem] md:grid-cols-[8.5rem_1fr] md:gap-4"
          >
            <h3 className="text-[1.0625rem] leading-[1.6] font-semibold">
              {item.name}
            </h3>
            <p className="text-soft">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
