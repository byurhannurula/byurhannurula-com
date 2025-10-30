import Image from "next/image"
import Link from "next/link"

import type { Post } from "@/lib/posts"

interface BlogCardHomeProps {
  post: Omit<Post, "content">
}

export function BlogCardHome({ post }: BlogCardHomeProps) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-medium group-hover:text-primary">
              {post.frontmatter.title}
            </h3>
            <p className="mb-2 text-base leading-relaxed text-muted-foreground">
              {post.frontmatter.excerpt}
            </p>
            <div className="text-xs text-muted-foreground">{post.frontmatter.date}</div>
          </div>
          {post.frontmatter.coverImage && (
            <div className="ml-6 size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                width={80}
                height={80}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
