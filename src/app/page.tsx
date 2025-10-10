"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { getLatestPosts } from "@/data/posts"
import { SocialLinks } from "@/components/social-links"

export default function Home() {
  const latestPosts = getLatestPosts(5)

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="mb-16">
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            Full-Stack Dev & <span className="text-primary">Technology Tinkerer</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-lg">
            {/* I love building things, breaking them, and learning from the process whether it’s software, home lab/self-hosting or home networking. */}
            {/* I love <span className="text-primary">building and experimenting</span> — with software, self-hosted systems, and everything in between. */}
            I love building, breaking, and experimenting - whether it&apos;s software, my home lab, DIY hardware projects, or everything in between.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <SocialLinks />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mb-24"
        >
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Latest Posts
          </h2>

          <div className="space-y-8">
            {latestPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.1 + 0.2 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium group-hover:text-primary mb-2">{post.title}</h3>
                      <p className="text-base leading-relaxed text-muted-foreground mb-2">{post.excerpt}</p>
                      <div className="text-xs text-muted-foreground">
                        {post.date}
                      </div>
                    </div>
                    {post.coverImage && (
                      <div className="ml-6 w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.6 }}
            className="mt-8"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground hover:text-primary transition-colors"
            >
              View all thoughts
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

