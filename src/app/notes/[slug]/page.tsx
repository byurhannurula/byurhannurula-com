import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { getPostStats } from "@/lib"
import { getSinglePost, getAllPosts } from "@/lib/posts"
import { MDXRenderer, TOC, TOCSidebar } from "@/components/mdx"
import { ShareButtons, ReadingProgress, PostLike, PostStats } from "@/components/blog"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let currentPost
  try {
    currentPost = getSinglePost(slug)
  } catch (error) {
    notFound()
  }

  // Fetch initial stats from Redis (SSR)
  const initialStats = await getPostStats(slug)

  // Find previous and next posts
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

  return (
    <>
      <ReadingProgress />
      <div className="pb-16 pt-24">
        {/* Header section - constrained width */}
        <div className="mx-auto max-w-screen-md px-6">
          <div className="mb-8">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              Back to notes
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{currentPost.frontmatter.date}</span>
              <span>•</span>
              <span>{currentPost.readingTime} read</span>
              <span>•</span>
              <PostStats
                slug={slug}
                initialViews={initialStats.views}
                initialLikes={initialStats.likes}
              />
            </div>
            <h1 className="text-2xl font-medium md:text-3xl">{currentPost.frontmatter.title}</h1>
            <p className="mt-3 text-lg text-muted-foreground">{currentPost.frontmatter.excerpt}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {currentPost.frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <ShareButtons title={currentPost.frontmatter.title} />
            </div>
          </div>
        </div>

        {/* Cover Image - wider than content */}
        {currentPost.frontmatter.coverImage && (
          <div className="mx-auto mb-10 max-w-screen-lg px-6">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={currentPost.frontmatter.coverImage}
                alt={currentPost.frontmatter.title}
                width={1200}
                height={630}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content section */}
        <div className="relative">
          {/* Sidebar TOC - positioned to the left */}
          {currentPost.frontmatter.toc && currentPost.frontmatter.tocStyle === "sidebar" && (
            <div className="absolute left-0 top-0 hidden w-64 xl:block">
              <div className="fixed top-24 w-56">
                <TOCSidebar />
              </div>
            </div>
          )}

          <div className="mx-auto max-w-screen-md px-6">
            {/* Inline TOC if enabled and style is inline (default) */}
            {currentPost.frontmatter.toc && currentPost.frontmatter.tocStyle !== "sidebar" && (
              <div className="mb-8">
                <TOC />
              </div>
            )}

            {/* Article content */}
            <div
              data-mdx-content
              className="prose prose-lg dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-p:my-4 prose-a:text-primary"
            >
              <MDXRenderer source={currentPost.content} />
            </div>

            {/* Like button at end of post */}
            <div className="mt-12 border-t pt-8">
              <PostLike slug={slug} initialLikes={initialStats.likes} />
            </div>
          </div>
        </div>

        {/* Read Previous/Next Section */}
        {(prevPost || nextPost) && (
          <div className="mx-auto max-w-screen-md px-6">
            <div className="mt-16 border-t pt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Previous Post */}
                {prevPost ? (
                  <Link href={`/notes/${prevPost.slug}`} className="group block">
                    <div className="flex flex-col">
                      <span className="mb-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                        Previous
                      </span>
                      <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                        {prevPost.frontmatter.title}
                      </h4>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next Post */}
                {nextPost && (
                  <Link
                    href={`/notes/${nextPost.slug}`}
                    className="group block text-right sm:text-right"
                  >
                    <div className="flex flex-col items-end">
                      <span className="mb-2 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Next
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <h4 className="line-clamp-2 text-sm font-medium transition-colors group-hover:text-primary">
                        {nextPost.frontmatter.title}
                      </h4>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
