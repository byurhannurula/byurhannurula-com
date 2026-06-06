import { UsesCard } from "@/components/uses";
import { usesData } from "@/config/uses";

import { Section, SubBlock } from "./section";

export function UsesSection() {
  const items = usesData[0].items.slice(0, 4);

  return (
    <Section
      id="uses"
      title="Uses Components"
      description="Gear/tool cards from the /uses page."
    >
      <SubBlock label="Uses cards (grid)">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {items.map((item, index) => (
            <UsesCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </SubBlock>
    </Section>
  );
}
