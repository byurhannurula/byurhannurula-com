import type React from "react";

import * as DevIcons from "@/components/icons/dev";
import { SocialLinks } from "@/components/social-links";

import { Section, SubBlock } from "./section";

const devIcons = DevIcons as Record<
  string,
  React.ComponentType<{ className?: string }>
>;

export function IconsSection() {
  return (
    <Section
      id="icons"
      title="Icons"
      description="Tech stack and social icon sets."
      className="space-y-12"
    >
      <SubBlock label="Dev icons">
        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8">
          {Object.entries(devIcons).map(([name, Icon]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 rounded-md border border-border/60 p-3"
              title={name}
            >
              {/* Fixed 32px slot; .pg-icon forces the svg to fill it even when
                  the icon component ignores className / has no width/height. */}
              <span className="pg-icon flex h-8 w-8 shrink-0 items-center justify-center">
                <Icon className="size-8" />
              </span>
              <span className="pg-mono max-w-full truncate text-[0.6rem] text-muted-foreground/60">
                {name}
              </span>
            </div>
          ))}
        </div>
      </SubBlock>

      <SubBlock label="Social links">
        <SocialLinks />
      </SubBlock>
    </Section>
  );
}
