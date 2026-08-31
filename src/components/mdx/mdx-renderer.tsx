import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

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
};

export async function MDXRenderer({ source }: MDXRendererProps) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
      components={mdxComponents}
    />
  );
}
