import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Post } from "@/lib/server";

interface BlogPostItemProps {
  post: Omit<Post, "content">;
}

export function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <article className="relative overflow-hidden">
      <Link href={`/notes/${post.slug}`} className="group block">
        <div className="flex items-center justify-between">
          <h3 className="text-foreground/90 text-lg transition-colors duration-300 ease-in-out group-hover:text-primary">
            {post.frontmatter.title}
          </h3>
          <div className="mx-[8px] mb-[8px] h-px flex-1 self-end border-muted-foreground/30 border-b border-dotted"></div>
          <div className="flex items-center gap-2 text-md text-muted-foreground transition-all duration-300 ease-in-out group-hover:mr-[24px]">
            <span>{post.frontmatter.date}</span>
            <ArrowRight className="absolute right-0 size-4 translate-x-[14px] transition-transform duration-300 ease-in-out group-hover:translate-x-0" />
          </div>
        </div>
      </Link>
    </article>
  );
}
