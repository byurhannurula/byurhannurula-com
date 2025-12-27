import Link from "next/link"
import { Code2, ArrowRight } from "lucide-react"

import { PageWrapper } from "@/components/page-wrapper"
import { getAllShorts } from "@/lib/shorts"

export default function ShortsPage() {
  const shorts = getAllShorts()

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12">
        <h1 className="text-2xl font-medium">Shorts</h1>
        <p className="mt-2 text-muted-foreground">Quick code snippets, tips, and mini-tutorials.</p>
      </div>

      {shorts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Code2 className="mb-4 size-12 text-muted-foreground/50" />
          <h2 className="mb-2 text-lg font-medium">No shorts yet</h2>
          <p className="text-sm text-muted-foreground">
            Check back later for code snippets and tips.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {shorts.map((short) => (
            <Link
              key={short.slug}
              href={`/shorts/${short.slug}`}
              className="group rounded-xl border border-border/50 bg-muted/30 p-5 transition-all hover:border-primary/30 hover:bg-muted/50"
            >
              <div className="mb-3 flex items-center gap-2">
                <Code2 className="size-4 text-primary" />
                {short.frontmatter.language && (
                  <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase text-primary">
                    {short.frontmatter.language}
                  </span>
                )}
              </div>
              <h3 className="mb-2 font-medium transition-colors group-hover:text-primary">
                {short.frontmatter.title}
              </h3>
              <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                {short.frontmatter.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {short.frontmatter.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageWrapper>
  )
}
