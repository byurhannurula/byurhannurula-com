import { codeToHtml } from "shiki";

import { CodeBlock } from "@/components/mdx/code-block";

/**
 * A code sample highlighted the way MDX highlights one.
 *
 * The page has no rehype pipeline, so calling Shiki directly is what keeps the
 * specimen honest -- rendering the sample as plain text would document a code
 * block the site never actually produces.
 *
 * `defaultColor: false` emits `--shiki-light` / `--shiki-dark` per token
 * instead of a baked colour, which is what globals.css already reads and why
 * a mode change needs no re-highlight.
 */
export async function HighlightedCode({
  code,
  lang = "ts",
}: {
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "one-dark-pro" },
    defaultColor: false,
  });

  // CodeBlock renders its own <pre>, matching how MDX maps it, so only the
  // inner <code> is wanted here.
  const inner = html
    .slice(html.indexOf(">", html.indexOf("<pre")) + 1)
    .replace(/<\/pre>\s*$/, "");

  return (
    <CodeBlock data-language={lang} raw={code}>
      {/* Shiki output, built from a literal on the server. */}
      <span dangerouslySetInnerHTML={{ __html: inner }} />
    </CodeBlock>
  );
}
