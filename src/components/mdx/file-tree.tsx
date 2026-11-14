import { File, Folder } from 'lucide-react';

interface TreeNode {
  name: string;
  /** Words after ` # ` on the line. */
  hint?: string;
  folder: boolean;
  children: TreeNode[];
}

/**
 * Read an indented block: two spaces per level, a trailing slash marks a
 * folder, and ` # words` adds a hint. A line with children is a folder too.
 */
function parseTree(source: string): TreeNode[] {
  const roots: TreeNode[] = [];
  const open: { depth: number; node: TreeNode }[] = [];
  for (const line of source.split('\n')) {
    if (!line.trim()) continue;
    const depth = Math.floor((line.length - line.trimStart().length) / 2);
    const [rawName = '', hint] = line.trim().split(/\s+#\s+/);
    const node: TreeNode = {
      name: rawName.replace(/\/$/, ''),
      hint,
      folder: rawName.endsWith('/'),
      children: [],
    };
    while (open.length > 0 && (open.at(-1)?.depth ?? 0) >= depth) open.pop();
    const parent = open.at(-1)?.node;
    if (parent) {
      parent.folder = true;
      parent.children.push(node);
    } else {
      roots.push(node);
    }
    open.push({ depth, node });
  }
  return roots;
}

function Branch({ nodes, nested }: { nodes: TreeNode[]; nested?: boolean }) {
  return (
    <ul
      className={
        // The left line of a nested list is the guide under its folder icon.
        nested ? 'ml-[0.45rem] border-l border-line-strong pl-[0.85rem]' : ''
      }
    >
      {nodes.map((node, index) => {
        const Icon = node.folder ? Folder : File;
        return (
          // Two entries of one folder can share a name only by mistake.
          // oxlint-disable-next-line react/no-array-index-key
          <li key={`${node.name}-${index}`}>
            {/* One line per entry: a long path scrolls the box sideways. */}
            <span className="flex items-center gap-2 py-[0.2rem] whitespace-nowrap">
              <Icon
                aria-hidden
                className={
                  node.folder
                    ? 'size-[0.95rem] flex-none text-accent'
                    : 'size-[0.95rem] flex-none text-faint'
                }
              />
              <span className={node.folder ? 'font-medium' : 'text-soft'}>
                {node.name}
                {node.folder ? <span className="sr-only"> (folder)</span> : ''}
              </span>
              {node.hint ? (
                <span className="pl-2 text-faint">{node.hint}</span>
              ) : null}
            </span>
            {node.children.length > 0 ? (
              <Branch nodes={node.children} nested />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

interface FileTreeProps {
  /** The indented text. A ```tree code block in a note fills it. */
  source?: string;
}

/** A small file tree. Write it as a code block with the language `tree`. */
export function FileTree({ source = '' }: FileTreeProps) {
  return (
    <section
      data-reveal
      // Focusable, because it can scroll sideways.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      aria-label="File tree"
      className="my-9 overflow-x-auto rounded-lg bg-sunk px-5 py-4 font-mono text-sm leading-[1.6] shadow-[0_0_0_1px_var(--line)] dark:bg-card"
    >
      <Branch nodes={parseTree(source)} />
    </section>
  );
}
