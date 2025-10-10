"use client"

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

import { getPostsGroupedByDate, type GroupedPosts } from "@/data/posts"

export default function BlogPage() {
  const [visibleYears, setVisibleYears] = useState(2)
  const [groupedPosts, setGroupedPosts] = useState<GroupedPosts[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)
    setGroupedPosts(getPostsGroupedByDate())
  }, [])

  const displayedYears = groupedPosts.slice(0, visibleYears)
  const hasMoreYears = visibleYears < groupedPosts.length

  const loadMorePosts = () => {
    setVisibleYears(prev => Math.min(prev + 1, groupedPosts.length))
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="mb-12">
          <h1 className="text-2xl font-medium">Thoughts</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-16"
        >
          {displayedYears.map((yearGroup, yearIndex) => (
            <motion.div
              key={yearGroup.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: yearIndex * 0.1 + 0.3 }}
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
                  <div className="flex items-center justify-end gap-2 text-xs tracking-widest font-medium uppercase text-muted-foreground">
                    <span>✦</span>
                    <span>{monthGroup.month}</span>
                  </div>

                  {/* Posts */}
                  <div className="space-y-3">
                    {monthGroup.posts.map((post, postIndex) => (
                      <PostItem key={post.slug} post={post} yearIndex={yearIndex} monthIndex={monthIndex} postIndex={postIndex} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          ))}

          {hasMoreYears && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-center pt-8"
            >
              <button
                onClick={loadMorePosts}
                className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors"
              >
                Load more
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}


const PostItem = ({ post, yearIndex, monthIndex, postIndex }: { post: any, yearIndex: number, monthIndex: number, postIndex: number }) => {
  return (
    <motion.article
      key={post.slug}
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: yearIndex * 0.1 + monthIndex * 0.05 + postIndex * 0.02 + 0.4
      }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-foreground/90 group-hover:text-primary transition-colors duration-300 ease-in-out">
            {post.title}
          </h3>
          <div className="flex-1 self-end mb-[8px] mx-[8px] border-b border-dotted border-muted-foreground/30 h-px"></div>
          <div className="flex items-center gap-2 text-md text-muted-foreground transition-all ease-in-out duration-300 group-hover:mr-[24px]">
            <span>{post.date}</span>
            <ArrowRight className="size-4 absolute right-0 translate-x-[14px] transition-transform ease-in-out duration-300 group-hover:translate-x-[0px]" />
          </div>
        </div>
      </Link>
    </motion.article >
  )
}
