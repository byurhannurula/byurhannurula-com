import { Callout } from "./callout";
import { CodeBlock } from "./code-block";
import { DoDont } from "./do-dont";
import { GridImage, ImageGrid, MDXImage } from "./image";
import { MDXLink } from "./link";
import { LinkChip, LinkEmbed } from "./link-embed";
import { Mermaid } from "./mermaid";
import { ProsCons } from "./pros-cons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

function createHeading(Tag: "h1" | "h2" | "h3" | "h4") {
  const HeadingComponent = ({ children, ...props }: any) => {
    const id =
      typeof children === "string"
        ? children.toLowerCase().replace(/\s+/g, "-")
        : "";

    return (
      <Tag id={id} {...props} className="group relative scroll-mt-24">
        <a
          href={`#${id}`}
          aria-label={`Link to ${children}`}
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

export const mdxComponents = {
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

  // Headings
  h1: createHeading("h1"),
  h2: createHeading("h2"),
  h3: createHeading("h3"),
  h4: createHeading("h4"),
};
