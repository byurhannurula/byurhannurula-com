import { resolveDimensions } from "./image-dimensions";

/** Content components whose `src` should get intrinsic dimensions filled in. */
const IMAGE_TAGS = new Set(["MDXImage", "GridImage"]);

interface JsxAttribute {
  type?: string;
  name?: string;
  value?: unknown;
}

interface Node {
  type?: string;
  name?: string;
  attributes?: JsxAttribute[];
  children?: Node[];
}

function attr(node: Node, name: string): string | null {
  const found = node.attributes?.find(
    (a) => a?.type === "mdxJsxAttribute" && a.name === name
  );
  return typeof found?.value === "string" ? found.value : null;
}

function collectImageTags(node: Node, into: Node[]) {
  if (
    (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") &&
    node.name &&
    IMAGE_TAGS.has(node.name)
  ) {
    into.push(node);
  }
  for (const child of node.children ?? []) collectImageTags(child, into);
}

/**
 * Fill `width`/`height` on content image tags from the images themselves.
 *
 * Authors write only `src` and `alt`. Layout that needs an aspect ratio up
 * front -- justified gallery rows, and the space `next/image` reserves to keep
 * CLS at zero -- gets it here rather than from hand-typed numbers that go
 * stale the moment an image is replaced.
 *
 * Values are written as strings: this MDX pipeline drops JSX expression
 * attributes, so `width={2000}` would not survive to the component.
 */
export function remarkImageDimensions() {
  return async (tree: Node) => {
    const nodes: Node[] = [];
    collectImageTags(tree, nodes);

    // Authored dimensions win, so a cropped or art-directed variant can
    // override what the file itself reports.
    const needing = nodes.filter(
      (n) => !(attr(n, "width") && attr(n, "height"))
    );
    const sources = needing.flatMap((n) => {
      const src = attr(n, "src");
      return src ? [src] : [];
    });
    if (sources.length === 0) return;

    const sizes = await resolveDimensions(sources);

    for (const node of needing) {
      const src = attr(node, "src");
      const found = src ? sizes.get(src) : undefined;
      if (!(found && node.attributes)) continue;
      node.attributes.push(
        { type: "mdxJsxAttribute", name: "width", value: String(found.width) },
        { type: "mdxJsxAttribute", name: "height", value: String(found.height) }
      );
    }
  };
}
