import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "./mdx-components";

interface MDXRendererProps {
  source: string;
}

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  keepBackground: true,
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
