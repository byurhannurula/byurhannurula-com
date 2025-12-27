import { PageWrapper } from "@/components/page-wrapper"
import { getPostsGroupedByDate } from "@/lib/posts"
import { BlogPostItem } from "@/components/blog"
import { createMetadata } from "@/config"

export const metadata = createMetadata("/notes")

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams
  const groupedPosts = getPostsGroupedByDate(tag)

  // Show empty state if no posts
  if (groupedPosts.length === 0) {
    return (
      <PageWrapper>
        <div className="mb-12">
          <h1 className="text-2xl font-medium">Notes</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-16 text-center">
          <h2 className="mb-4 text-xl font-semibold">No posts yet</h2>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-8">
        <h1 className="text-2xl font-medium">Notes</h1>
        <p className="mt-2 text-muted-foreground">Thoughts on tech, privacy, and tinkering.</p>
      </div>

      <div className="stagger-children space-y-16">
        {groupedPosts.map((yearGroup) => {
          // Find the FIRST month that has posts (since months are reverse chronological)
          const firstMonthWithPostsIndex = yearGroup.months.findIndex(
            (month) => month.posts.length > 0
          )

          return (
            <div key={yearGroup.year} className="space-y-12">
              {yearGroup.months.map((monthGroup, index) => {
                // Check if this is the FIRST month WITH POSTS
                const isFirstMonthWithPosts =
                  index === firstMonthWithPostsIndex && monthGroup.posts.length > 0

                return (
                  <div key={`${yearGroup.year}-${monthGroup.month}`} className="space-y-6">
                    <div className="flex items-center justify-between">
                      {/* Year Header (only on first month with posts) */}
                      {isFirstMonthWithPosts && (
                        <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                          {yearGroup.year} NOTES
                        </h2>
                      )}

                      {/* Month Header */}
                      <div
                        className={`flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground ${!isFirstMonthWithPosts ? "ml-auto" : ""}`}
                      >
                        <span>✦</span>
                        <span>{monthGroup.month}</span>
                      </div>
                    </div>

                    {/* Posts */}
                    <div className="space-y-3">
                      {monthGroup.posts.map((post) => (
                        <BlogPostItem key={post.slug} post={post} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </PageWrapper>
  )
}
