"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { blogPosts, getPostBySlug } from "@/data"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  // Find the current post
  const currentPost = getPostBySlug(slug)

  // If post doesn't exist, trigger 404
  if (!currentPost) {
    notFound()
  }

  // Find next post for navigation (if posts exist)
  const currentPostIndex = blogPosts.findIndex((post) => post.slug === slug)
  const nextPost =
    blogPosts.length > 0 ? blogPosts[(currentPostIndex + 1) % blogPosts.length] : null

  return (
    <div className="pb-16 pt-24">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to thoughts
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{currentPost.date}</span>
            <span>•</span>
            <span>{currentPost.readingTime} min read</span>
          </div>
          <h1 className="text-2xl font-medium md:text-3xl">{currentPost.title}</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {currentPost.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {currentPost.coverImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={currentPost.coverImage}
                alt={currentPost.title}
                width={800}
                height={450}
                className="size-full object-cover"
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-lg"
        >
          {currentPost.content ? (
            <div
              dangerouslySetInnerHTML={{
                __html: currentPost.content.replace(/\\n/g, "<br>").replace(/\n/g, "<br>"),
              }}
            />
          ) : (
            <div>
              <p>{currentPost.excerpt}</p>
              <p>
                This is a sample blog post. The full content would be displayed here with proper
                formatting, images, and interactive elements.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          )}
        </motion.div>

        {/* Read Next Section - only show if there's a next post */}
        {nextPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 border-t pt-8"
          >
            <h3 className="mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Read Next
            </h3>
            <Link href={`/blog/${nextPost.slug}`} className="group block">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-lg font-medium transition-colors group-hover:text-primary">
                    {nextPost.title}
                  </h4>
                  <p className="mt-2 line-clamp-2 text-base text-muted-foreground">
                    {nextPost.excerpt}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors group-hover:text-primary">
                    Continue reading
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
                {nextPost.coverImage && (
                  <div className="ml-6 size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={nextPost.coverImage}
                      alt={nextPost.title}
                      width={80}
                      height={80}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
