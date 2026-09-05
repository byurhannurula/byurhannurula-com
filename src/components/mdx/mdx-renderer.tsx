import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

import { remarkImageDimensions } from "@/lib/server/remark-image-dimensions";
import { createMdxComponents } from "./mdx-components";

interface MDXRendererProps {
  source: string;
}

const rehypePrettyCodeOptions = {
  // Dual theme emits --shiki-light/--shiki-dark vars per token; globals.css
  // picks the side. keepBackground:false hands the surface to our own tokens,
  // so the code area matches its title bar instead of shipping Shiki's.
  theme: { light: "github-light", dark: "one-dark-pro" },
  keepBackground: false,
  defaultLang: "plaintext",
  /*
   * Both themes ship a comment grey that lands just under AA on our code
   * surface -- 4.26:1 for github-light, 4.34:1 for one-dark-pro -- and comments
   * are the one token a reader is most likely to be reading as prose.
   */
  transformers: [
    {
      name: "comment-contrast",
      span(node: { properties?: Record<string, unknown> }) {
        const { properties } = node;
        const style = properties?.style;
        if (!properties || typeof style !== "string") return;
        properties.style = style
          .replace("#6A737D", "#5A626B")
          .replace("#7F848E", "#949AA4");
      },
    },
  ],
};

export async function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkImageDimensions],
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
      components={createMdxComponents()}
    />
  );
}
