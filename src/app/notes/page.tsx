import { BlogPostItem } from "@/components/blog";
import { PageWrapper } from "@/components/page-wrapper";
import { createMetadata } from "@/config";
import { getPostsGroupedByDate } from "@/lib/server";

export const metadata = createMetadata("/notes");

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const groupedPosts = getPostsGroupedByDate(tag);

  return (
    <PageWrapper>
      <div className="mb-8 animate-fade-in">
        <h1 className="font-medium text-2xl">Notes</h1>
        <p className="mt-2 text-muted-foreground">
          Thoughts on tech, privacy, and tinkering.
        </p>
      </div>

      <div className="stagger-children space-y-16">
        {groupedPosts?.length ? (
          groupedPosts.map((yearGroup) => {
            // Find the FIRST month that has posts (since months are reverse chronological)
            const firstMonthWithPostsIndex = yearGroup.months.findIndex(
              (month) => month.posts.length > 0
            );

            return (
              <div key={yearGroup.year} className="space-y-12">
                {yearGroup.months.map((monthGroup, index) => {
                  // Check if this is the FIRST month WITH POSTS
                  const isFirstMonthWithPosts =
                    index === firstMonthWithPostsIndex &&
                    monthGroup.posts.length > 0;

                  return (
                    <div
                      key={`${yearGroup.year}-${monthGroup.month}`}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        {/* Year Header (only on first month with posts) */}
                        {isFirstMonthWithPosts && (
                          <h2 className="font-medium text-muted-foreground text-sm uppercase tracking-wider">
                            {yearGroup.year} NOTES
                          </h2>
                        )}

                        {/* Month Header */}
                        <div
                          className={`flex items-center justify-end gap-2 font-medium text-muted-foreground text-xs uppercase tracking-widest ${isFirstMonthWithPosts ? "" : "ml-auto"}`}
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
                  );
                })}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <h2 className="mb-4 font-semibold text-xl">No posts yet</h2>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
