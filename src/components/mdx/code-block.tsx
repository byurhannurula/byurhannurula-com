import {
  Children,
  type ComponentProps,
  isValidElement,
  type ReactNode,
} from 'react';

import { CopyCodeButton } from '@/components/mdx/copy-code-button';

type DataProps = Record<string, unknown> & { children?: ReactNode };

const TITLE = 'data-rehype-pretty-code-title';
const CAPTION = 'data-rehype-pretty-code-caption';

interface CodeFrameProps {
  /** File name, or the language when the block has no title. */
  name: ReactNode;
  children: ReactNode;
}

/** The box around a code block: a name on the left, Copy on the right. */
export function CodeFrame({ name, children }: CodeFrameProps) {
  return (
    <div
      data-code-block
      data-reveal
      className="my-9 overflow-hidden rounded-lg bg-sunk font-mono text-sm leading-[1.7] shadow-[0_0_0_1px_var(--line)] dark:bg-card"
    >
      <div className="flex items-center justify-between gap-4 border-b border-line py-2 pr-[0.6rem] pl-[1.1rem] text-[0.8125rem] text-faint">
        <span className="truncate">{name}</span>
        <CopyCodeButton />
      </div>
      {children}
    </div>
  );
}

/**
 * rehype-pretty-code wraps each block in a figure: an optional title, then
 * the pre. This turns that figure into a <CodeFrame>. Any other figure in a
 * note passes through.
 */
export function CodeFigure({ children, ...props }: ComponentProps<'figure'>) {
  if (!('data-rehype-pretty-code-figure' in props)) {
    return <figure {...props}>{children}</figure>;
  }

  let name: ReactNode = null;
  const body: ReactNode[] = [];
  for (const child of Children.toArray(children)) {
    if (!isValidElement<DataProps>(child)) continue;
    if (TITLE in child.props) {
      name = child.props.children;
    } else if (!(CAPTION in child.props)) {
      name ??= child.props['data-language'] as ReactNode;
      body.push(child);
    }
  }
  return <CodeFrame name={name}>{body}</CodeFrame>;
}

/** Old notes may hold a Mermaid chart. The library is heavy, so the source
 *  shows as plain code with a "diagram" label. */
export function Mermaid({
  chart,
  children,
}: {
  chart?: string;
  children?: ReactNode;
}) {
  return (
    <CodeFrame name="diagram">
      <pre className="overflow-x-auto p-[1.1rem]">
        <code>{chart ?? children}</code>
      </pre>
    </CodeFrame>
  );
}
