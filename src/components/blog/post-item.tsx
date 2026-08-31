import { ArrowRight } from "lucide-react";
import Link from "next/link";

import type { Post } from "@/lib/server";

interface BlogPostItemProps {
  post: Omit<Post, "content">;
}

/** The year already sits in the group heading above the row. */
function withoutYear(date: string) {
  return date.replace(/^\d{4}-/, "");
}

export function BlogPostItem({ post }: BlogPostItemProps) {
  return (
    <article className="relative overflow-hidden">
      <Link href={`/notes/${post.slug}`} className="group block py-1.5">
        <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
          <h3 className="min-w-0 font-medium text-[14px] text-foreground/90 leading-6 transition-colors duration-300 ease-in-out group-hover:text-primary sm:text-[15px]">
            {post.frontmatter.title}
          </h3>
          {/* Leader only earns its place when title and date share a line. */}
          <div className="hidden h-px min-w-6 flex-1 translate-y-[-4px] border-border-dash border-b border-dotted sm:block" />
          <div className="flex shrink-0 items-center gap-2 transition-all duration-300 ease-in-out sm:group-hover:mr-6">
            <time
              dateTime={post.frontmatter.date}
              className="label-mono tabular-nums"
            >
              {withoutYear(post.frontmatter.date)}
            </time>
            {/* Auto top keeps the static position, so it sits on the date's
                line; article clips it until the hover slide brings it in. */}
            <ArrowRight className="absolute right-0 hidden size-4 translate-x-[14px] text-primary transition-transform duration-300 ease-in-out group-hover:translate-x-0 sm:block" />
          </div>
        </div>
      </Link>
    </article>
  );
}
