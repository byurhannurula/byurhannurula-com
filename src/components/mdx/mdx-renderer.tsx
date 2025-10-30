import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { mdxComponents } from "./mdx-components"

interface MDXRendererProps {
  source: string
}

const rehypePrettyCodeOptions = {
  theme: {
    dark: "github-dark-dimmed",
    light: "github-light",
  },
  keepBackground: false,
}

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
  )
}
