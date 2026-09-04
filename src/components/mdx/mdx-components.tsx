import dynamic from "next/dynamic";
import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { DoDont } from "./do-dont";
import { GridImage, ImageGrid, MDXImage } from "./image";

import { MDXLink } from "./link";
import { LinkChip, LinkEmbed } from "./link-embed";
import { ProsCons } from "./pros-cons";

const Mermaid = dynamic(() => import("./mermaid").then((m) => m.Mermaid), {
  ssr: false,
  loading: () => (
    <div className="my-6 h-32 animate-pulse rounded-lg border bg-muted" />
  ),
});

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function textFromChildren(children: unknown): string {
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (typeof children === "boolean" || children == null) return "";
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  if (
    children &&
    typeof children === "object" &&
    "props" in (children as Record<string, unknown>)
  ) {
    const props = (children as { props?: { children?: unknown } }).props;
    return textFromChildren(props?.children);
  }
  return "";
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createHeading(
  Tag: "h1" | "h2" | "h3" | "h4",
  slugCounts: Map<string, number>
) {
  const HeadingComponent = ({ children, ...props }: any) => {
    const text = textFromChildren(children);
    const base = slugify(text);
    const id = (() => {
      if (!base) return "";
      const count = slugCounts.get(base) ?? 0;
      slugCounts.set(base, count + 1);
      return count === 0 ? base : `${base}-${count}`;
    })();

    if (!id) {
      return (
        <Tag {...props} className="group relative scroll-mt-24">
          {children}
        </Tag>
      );
    }

    return (
      <Tag id={id} {...props} className="group relative scroll-mt-24">
        <a
          href={`#${id}`}
          aria-label={`Link to ${text}`}
          className="inline no-underline"
        >
          <span className="text-foreground">{children}</span>
        </a>
      </Tag>
    );
  };
  HeadingComponent.displayName = `MDX${Tag.toUpperCase()}`;
  return HeadingComponent;
}

export function createMdxComponents() {
  const slugCounts = new Map<string, number>();

  return {
    img: ({ src, alt, caption, size, ...props }: any) => (
      <MDXImage src={src} alt={alt} caption={caption} size={size} {...props} />
    ),

    Callout,
    DoDont,
    LinkChip,
    LinkEmbed,
    ProsCons,
    ImageGrid,
    GridImage,
    MDXImage,
    Mermaid,

    pre: ({ children, raw, ...props }: any) => (
      <CodeBlock raw={raw} {...props}>
        {children}
      </CodeBlock>
    ),

    code: ({ children, ...props }: any) => {
      if (!props.className) {
        return (
          <code
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }
      return <code {...props}>{children}</code>;
    },

    table: Table,
    thead: TableHeader,
    tbody: TableBody,
    tr: TableRow,
    th: TableHead,
    td: TableCell,

    blockquote: ({ children, ...props }: any) => (
      <blockquote
        {...props}
        className="my-6 border-primary border-l-4 pl-4 text-muted-foreground italic"
      >
        {children}
      </blockquote>
    ),

    a: MDXLink,

    h1: createHeading("h1", slugCounts),
    h2: createHeading("h2", slugCounts),
    h3: createHeading("h3", slugCounts),
    h4: createHeading("h4", slugCounts),
  };
}

// Back-compat: existing imports still work but get a fresh map per import.
// Prefer createMdxComponents() per render for true isolation.
export const mdxComponents = createMdxComponents();
