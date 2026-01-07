import { Eye } from "lucide-react";
import Link from "next/link";

import type { Post } from "@/lib/server";

interface BlogCardHomeProps {
  post: Omit<Post, "content">;
  views?: number;
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

export function BlogCardHome({ post, views }: BlogCardHomeProps) {
  return (
    <article className="group border-border/50 border-b pb-6">
      <Link href={`/notes/${post.slug}`} className="block">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-medium transition-colors duration-200 group-hover:text-primary">
            {post.frontmatter.title}
          </h3>
          <div className="flex shrink-0 items-center gap-3 text-muted-foreground text-xs tabular-nums">
            <span>{post.frontmatter.date}</span>
            {views !== undefined && (
              <>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Eye className="size-3" />
                  {views.toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>
        <p className="mt-2 text-muted-foreground text-sm">
          {post.frontmatter.excerpt}
        </p>
      </Link>
    </article>
  );
}
