import { Section, SubBlock } from "./section";

const ITEMS = [
  { t: "Short card", h: "h-20" },
  { t: "Taller card with more content inside it", h: "h-32" },
  { t: "Medium card", h: "h-24" },
  { t: "Short card", h: "h-16" },
  { t: "Tall card body", h: "h-36" },
  { t: "Medium card", h: "h-28" },
];

export function LayoutUtilitiesSection() {
  return (
    <Section
      id="layout"
      title="Layout Utilities"
      description="Masonry-style .columns-* utilities and break-inside-avoid."
      className="space-y-10"
    >
      {([2, 3, 4] as const).map((cols) => (
        <SubBlock key={cols} label={`.columns-${cols}`}>
          <div className={`columns-${cols}`}>
            {ITEMS.map((item, i) => (
              <div
                key={`${cols}-${item.t}-${i}`}
                className={`mb-4 flex break-inside-avoid ${item.h} items-center justify-center rounded-md border border-border bg-muted/40 p-4 text-center text-muted-foreground text-sm`}
              >
                {item.t}
              </div>
            ))}
          </div>
        </SubBlock>
      ))}
    </Section>
  );
}
