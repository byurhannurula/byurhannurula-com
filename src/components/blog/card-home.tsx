import Image from "next/image"
import Link from "next/link"

import type { Post } from "@/lib/posts"

interface BlogCardHomeProps {
  post: Omit<Post, "content">
}

// STYLE 1: Minimal list style (like ouassim.tech) - currently active
// export function BlogCardHome({ post }: BlogCardHomeProps) {
//   return (
//     <article className="group">
//       <Link href={`/blog/${post.slug}`} className="flex items-start justify-between gap-4 py-4">
//         <div className="flex-1 space-y-1">
//           <h3 className="font-medium transition-colors duration-200 group-hover:text-primary">
//             {post.frontmatter.title}
//           </h3>
//           <p className="line-clamp-2 text-sm text-muted-foreground">{post.frontmatter.excerpt}</p>
//         </div>
//         <div className="shrink-0 text-right">
//           <span className="text-xs text-muted-foreground">{post.readingTime}</span>
//           <span className="block text-xs text-muted-foreground/60">{post.frontmatter.date}</span>
//         </div>
//       </Link>
//     </article>
//   )
// }

/* STYLE 2: Card with thumbnail on right (like your inspiration screenshot)*/
// export function BlogCardHome({ post }: BlogCardHomeProps) {
//   return (
//     <article className="group">
//       <Link href={`/blog/${post.slug}`} className="flex items-start gap-6">
//         <div className="flex-1 space-y-2">
//           <h3 className="text-lg font-medium transition-colors duration-200 group-hover:text-primary">
//             {post.frontmatter.title}
//           </h3>
//           <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
//             {post.frontmatter.excerpt}
//           </p>
//           <span className="text-xs text-muted-foreground">{post.frontmatter.date}</span>
//         </div>
//         {post.frontmatter.coverImage && (
//           <div className="size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
//             <Image
//               src={post.frontmatter.coverImage}
//               alt={post.frontmatter.title}
//               width={96}
//               height={96}
//               className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
//             />
//           </div>
//         )}
//       </Link>
//     </article>
//   )
// }

export function BlogCardHome({ post }: BlogCardHomeProps) {
  return (
    <article className="group border-b border-border/50 pb-6">
      <Link href={`/notes/${post.slug}`} className="block">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-medium transition-colors duration-200 group-hover:text-primary">
            {post.frontmatter.title}
          </h3>
          <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
            {post.frontmatter.date}
          </span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{post.frontmatter.excerpt}</p>
      </Link>
    </article>
  )
}
