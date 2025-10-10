import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

import { BlogPost } from "@/data"
import { pageAnimations } from "@/lib"

interface BlogCardHomeProps {
  post: BlogPost
  index: number
}

export function BlogCardHome({ post, index }: BlogCardHomeProps) {
  return (
    <motion.article key={post.slug} {...pageAnimations.fastItem(index, 0.2)}>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-medium group-hover:text-primary">{post.title}</h3>
            <p className="mb-2 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="text-xs text-muted-foreground">{post.date}</div>
          </div>
          {post.coverImage && (
            <div className="ml-6 size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={80}
                height={80}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
