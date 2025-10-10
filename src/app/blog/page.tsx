"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { pageAnimations } from "@/lib"
import { PageWrapper } from "@/components/page-wrapper"
import { BlogPostItem } from "@/components/blog-post-item"
import { getPostsGroupedByDate, type GroupedPosts } from "@/data"

export default function BlogPage() {
  const [visibleYears, setVisibleYears] = useState(2)
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts[]>([])

  useEffect(() => {
    setGroupedPosts(getPostsGroupedByDate())
  }, [])

  const displayedYears = groupedPosts.slice(0, visibleYears)
  const hasMoreYears = visibleYears < groupedPosts.length

  const loadMorePosts = () => {
    setVisibleYears((prev) => Math.min(prev + 1, groupedPosts.length))
  }

  // Show empty state if no posts
  if (groupedPosts.length === 0) {
    return (
      <PageWrapper>
        <motion.div {...pageAnimations.container} className="mb-12">
          <h1 className="text-2xl font-medium">Thoughts</h1>
        </motion.div>

        <motion.div
          {...pageAnimations.staggerContainer}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <h2 className="text-xl font-semibold">No posts yet</h2>
        </motion.div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <motion.div {...pageAnimations.container} className="mb-12">
        <h1 className="text-2xl font-medium">Thoughts</h1>
      </motion.div>

      <motion.div {...pageAnimations.staggerContainer} className="space-y-16">
        {displayedYears.map((yearGroup, yearIndex) => (
          <motion.div
            key={yearGroup.year}
            {...pageAnimations.fastItem(yearIndex, 0.2)}
            className="space-y-12"
          >
            {/* Year Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {yearGroup.year} THOUGHTS
              </h2>
            </div>

            {/* Months */}
            {yearGroup.months.map((monthGroup, monthIndex) => (
              <div key={`${yearGroup.year}-${monthGroup.month}`} className="space-y-6">
                {/* Month Header */}
                <div className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  <span>✦</span>
                  <span>{monthGroup.month}</span>
                </div>

                {/* Posts */}
                <div className="space-y-3">
                  {monthGroup.posts.map((post, postIndex) => (
                    <BlogPostItem
                      key={post.slug}
                      post={post}
                      yearIndex={yearIndex}
                      monthIndex={monthIndex}
                      postIndex={postIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        ))}

        {hasMoreYears && (
          <motion.div {...pageAnimations.itemWithDelay(0.4)} className="pt-8 text-center">
            <button
              onClick={loadMorePosts}
              className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
            >
              Load more
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </PageWrapper>
  )
}
