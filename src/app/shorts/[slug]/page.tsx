import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { getSingleShort, getAllShorts } from "@/lib/shorts"
import { MDXRenderer } from "@/components/mdx"

export async function generateStaticParams() {
  const shorts = getAllShorts()
  return shorts.map((short) => ({ slug: short.slug }))
}

export default async function ShortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let short
  try {
    short = getSingleShort(slug)
  } catch {
    notFound()
  }

  return (
    <div className="pb-16 pt-24">
      <div className="mx-auto max-w-screen-md px-6">
        <div className="mb-8">
          <Link
            href="/shorts"
            className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to shorts
          </Link>
        </div>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            {short.frontmatter.language && (
              <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium uppercase text-primary">
                {short.frontmatter.language}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{short.frontmatter.date}</span>
          </div>
          <h1 className="text-2xl font-medium md:text-3xl">{short.frontmatter.title}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{short.frontmatter.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {short.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-p:my-4 prose-a:text-primary">
          <MDXRenderer source={short.content} />
        </div>
      </div>
    </div>
  )
}
