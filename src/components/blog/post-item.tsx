import { RowLink } from "@/components/row-link";
import { shortDate } from "@/lib/date";
import type { Post } from "@/lib/server";

interface BlogPostItemProps {
  post: Omit<Post, "content">;
  /** Set where a year heading already stands above the list, as on /notes. */
  inYearGroup?: boolean;
}

export function BlogPostItem({ post, inYearGroup = false }: BlogPostItemProps) {
  return (
    <RowLink
      href={`/notes/${post.slug}`}
      meta={
        <time dateTime={post.frontmatter.date}>
          {shortDate(post.frontmatter.date, { year: !inYearGroup })}
        </time>
      }
      subtitle={post.frontmatter.excerpt}
      title={post.frontmatter.title}
    />
  );
}
