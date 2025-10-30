import { PageWrapper } from "@/components/page-wrapper"
import { BlogPostItem } from "@/components/blog"
import { getPostsGroupedByDate } from "@/lib/posts"

export default function BlogPage() {
  const groupedPosts = getPostsGroupedByDate()

  // Show empty state if no posts
  if (groupedPosts.length === 0) {
    return (
      <PageWrapper>
        <div className="mb-12">
          <h1 className="text-2xl font-medium">Thoughts</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="mb-4 text-xl font-semibold">No posts yet</h2>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12">
        <h1 className="text-2xl font-medium">Thoughts</h1>
      </div>

      <div className="stagger-children space-y-16">
        {groupedPosts.map((yearGroup) => (
          <div key={yearGroup.year} className="space-y-12">
            {/* Year Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {yearGroup.year} THOUGHTS
              </h2>
            </div>

            {/* Months */}
            {yearGroup.months.map((monthGroup) => (
              <div key={`${yearGroup.year}-${monthGroup.month}`} className="space-y-6">
                {/* Month Header */}
                <div className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  <span>✦</span>
                  <span>{monthGroup.month}</span>
                </div>

                {/* Posts */}
                <div className="space-y-3">
                  {monthGroup.posts.map((post) => (
                    <BlogPostItem key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </PageWrapper>
  )
}
