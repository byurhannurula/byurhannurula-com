import { Suspense } from "react";

import { ControlPanel } from "./_components/control-panel";
import { AboutSection } from "./_sections/about-section";
import { AnimationSection } from "./_sections/animation-section";
import { BlogSection } from "./_sections/blog-section";
import { FormsSection } from "./_sections/forms-section";
import { IconsSection } from "./_sections/icons-section";
import { LayoutUtilitiesSection } from "./_sections/layout-utilities-section";
import { MdxSection } from "./_sections/mdx-section";
import { TypographySection } from "./_sections/typography-section";
import { UiPrimitivesSection } from "./_sections/ui-primitives-section";
import { UsesSection } from "./_sections/uses-section";

const NAV = [
  { id: "typography", label: "Typography" },
  { id: "mdx", label: "MDX" },
  { id: "ui", label: "UI" },
  { id: "blog", label: "Blog" },
  { id: "about", label: "About" },
  { id: "uses", label: "Uses" },
  { id: "icons", label: "Icons" },
  { id: "forms", label: "Forms" },
  { id: "layout", label: "Layout" },
  { id: "animation", label: "Animation" },
];

export default function PlaygroundPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-24 pb-24">
      <header className="mb-8">
        <h1 className="pg-serif font-medium text-4xl tracking-tight">
          Design Playground
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Every component and token in one place. Open the controls (bottom
          right) to experiment with accent color, palette, radius, theme, and
          fonts — then export the tokens. Edits are scoped here; the rest of the
          site is untouched.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="pg-mono rounded-full border border-border px-3 py-1 text-muted-foreground text-xs transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <TypographySection />
      <Suspense fallback={null}>
        <MdxSection />
      </Suspense>
      <UiPrimitivesSection />
      <BlogSection />
      <AboutSection />
      <UsesSection />
      <IconsSection />
      <FormsSection />
      <LayoutUtilitiesSection />
      <AnimationSection />

      <ControlPanel />
    </div>
  );
}
