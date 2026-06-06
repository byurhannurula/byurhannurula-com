import { Section, SubBlock } from "./section";
import { TypeSpecimen } from "./type-specimen";

export function TypographySection() {
  return (
    <Section
      id="typography"
      title="Typography"
      description="Headings use the serif slot, body uses sans, metadata uses mono — all swap live from the panel. Drive the heading sizes with the Type scale control."
      className="space-y-12"
    >
      <SubBlock label="Heading scale (serif) — driven by Type scale control">
        <TypeSpecimen />
      </SubBlock>

      <SubBlock label="Body & prose">
        <div className="prose max-w-2xl">
          <p>
            This is a body paragraph rendered in the sans slot. It contains{" "}
            <strong>bold text</strong>, <em>italic text</em>, some{" "}
            <code>inline code</code>, and{" "}
            <a href="#typography">an inline link</a> to check underline offset
            and accent color. The measure is capped so line length stays
            readable.
          </p>
          <ul>
            <li>First unordered list item</li>
            <li>Second item, slightly longer so it wraps onto another line</li>
            <li>Third item</li>
          </ul>
          <ol>
            <li>First ordered item</li>
            <li>Second ordered item</li>
          </ol>
          <blockquote>
            A blockquote to check the left accent border, muted background, and
            italic styling across both themes.
          </blockquote>
          <hr />
          <p>A closing paragraph after a horizontal rule.</p>
        </div>
      </SubBlock>

      <SubBlock label="Monospace">
        <p className="pg-mono text-sm">
          ABCDEFGHIJKLM abcdefghijklm 0123456789 &amp; {"{}"} [] () =&gt; !=
        </p>
      </SubBlock>
    </Section>
  );
}
