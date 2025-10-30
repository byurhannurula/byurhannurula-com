import { MDXImage } from "./image"
import { CodeBlock } from "./code-block"
import { MDXLink } from "./link"
import { Callout } from "./callout"
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from "./table"

// MDX component overrides
export const mdxComponents = {
  img: ({ src, alt, caption, ...props }: any) => (
    <MDXImage src={src} alt={alt} caption={caption} {...props} />
  ),

  // Custom components
  Callout,

  // Code blocks - rehype-pretty-code handles syntax highlighting
  pre: ({ children, raw, ...props }: any) => {
    return (
      <CodeBlock raw={raw} {...props}>
        {children}
      </CodeBlock>
    )
  },

  code: ({ children, ...props }: any) => {
    // Inline code (no pre wrapper)
    if (!props.className) {
      return (
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm" {...props}>
          {children}
        </code>
      )
    }
    // Block code (inside pre, styled by rehype-pretty-code)
    return <code {...props}>{children}</code>
  },

  // Tables
  table: Table,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,

  // Blockquotes
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      {...props}
      className="my-6 border-l-4 border-primary pl-4 italic text-muted-foreground"
    >
      {children}
    </blockquote>
  ),

  // Links
  a: MDXLink,

  // Headings with IDs for anchor links
  h1: ({ children, ...props }: any) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : ""
    return (
      <h1 id={id} {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: any) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : ""
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: any) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : ""
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    )
  },
  h4: ({ children, ...props }: any) => {
    const id = typeof children === "string" ? children.toLowerCase().replace(/\s+/g, "-") : ""
    return (
      <h4 id={id} {...props}>
        {children}
      </h4>
    )
  },
}
