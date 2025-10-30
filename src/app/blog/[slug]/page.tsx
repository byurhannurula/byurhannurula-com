import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { getSinglePost, getAllPosts } from "@/lib/posts"
import { MDXRenderer, TOC } from "@/components/mdx"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let currentPost
  try {
    currentPost = getSinglePost(slug)
  } catch (error) {
    notFound()
  }

  // Find next post
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const nextPost = allPosts.length > 0 ? allPosts[(currentIndex + 1) % allPosts.length] : null

  return (
    <div className="pb-16 pt-24">
      {/* Header section - constrained width */}
      <div className="mx-auto max-w-screen-md px-6">
        <div className="animate-fade-in mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to thoughts
          </Link>
        </div>

        <div className="animate-fade-in mb-8" style={{ animationDelay: "0.1s" }}>
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{currentPost.frontmatter.date}</span>
            <span>•</span>
            <span>{currentPost.readingTime} read</span>
          </div>
          <h1 className="text-2xl font-medium md:text-3xl">{currentPost.frontmatter.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentPost.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
        <div className="mx-auto max-w-screen-md px-6">
          {/* TOC if enabled */}
          {currentPost.frontmatter.toc && (
            <div className="mb-8">
              <TOC />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-p:my-4 prose-a:text-primary">
            <MDXRenderer source={currentPost.content} />
          </div>
        </div>
      </div>

      {/* Read Next Section - constrained width */}
      {nextPost && (
        <div className="mx-auto max-w-screen-md px-6">
          <div className="mt-16 border-t pt-8">
            <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Read Next
            </h3>
            <Link href={`/blog/${nextPost.slug}`} className="group block">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium transition-colors group-hover:text-primary">
                    {nextPost.frontmatter.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-base text-muted-foreground">
                    {nextPost.frontmatter.excerpt}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">
                    Continue reading
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                {nextPost.frontmatter.coverImage && (
                  <div className="ml-6 size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={nextPost.frontmatter.coverImage}
                      alt={nextPost.frontmatter.title}
                      width={80}
                      height={80}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
