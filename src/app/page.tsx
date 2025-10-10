"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { getLatestPosts } from "@/data/posts"
import { SocialLinks } from "@/components/social-links"
import { PageWrapper } from "@/components/page-wrapper"
import { BlogCardHome } from "@/components/blog-card-home"
import { pageAnimations } from "@/lib"

export default function Home() {
  const latestPosts = getLatestPosts(5)

  return (
    <PageWrapper>
      <motion.div {...pageAnimations.container} className="mb-16">
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Full-Stack Dev & <span className="text-primary">Technology Tinkerer</span>
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          {/* I love building things, breaking them, and learning from the process whether it’s software, home lab/self-hosting or home networking. */}
          {/* I love <span className="text-primary">building and experimenting</span> — with software, self-hosted systems, and everything in between. */}
          I love building, breaking, and experimenting - whether it&apos;s software, my home lab,
          DIY hardware projects, or everything in between.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <SocialLinks />
        </div>
      </motion.div>

      <motion.div {...pageAnimations.staggerContainer} className="mb-24">
        {latestPosts.length > 0 ? (
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Latest Posts
          </h2>
        ) : undefined}

        {latestPosts.length > 0 ? (
          <>
            <div className="space-y-8">
              {latestPosts.map((post, index) => (
                <BlogCardHome key={post.slug} post={post} index={index} />
              ))}
            </div>
            <motion.div {...pageAnimations.itemWithDelay(0.4)} className="mt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
              >
                View all thoughts
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </>
        ) : undefined}
      </motion.div>
    </PageWrapper>
  )
}
