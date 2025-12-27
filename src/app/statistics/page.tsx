import { Eye, Heart, FileText, TrendingUp, BarChart3 } from "lucide-react"
import Link from "next/link"

import { PageWrapper } from "@/components/page-wrapper"
import { createMetadata } from "@/config"
import { getAllPosts } from "@/lib/posts"
import { getPostStats } from "@/lib"

export const metadata = createMetadata("/statistics")

interface PostWithStats {
  slug: string
  title: string
  views: number
  likes: number
}

async function getStatistics() {
  const posts = getAllPosts()

  const postsWithStats: PostWithStats[] = await Promise.all(
    posts.map(async (post) => {
      const stats = await getPostStats(post.slug)
      return {
        slug: post.slug,
        title: post.frontmatter.title,
        views: stats.views,
        likes: stats.likes,
      }
    })
  )

  const totalViews = postsWithStats.reduce((acc, post) => acc + post.views, 0)
  const totalLikes = postsWithStats.reduce((acc, post) => acc + post.likes, 0)
  const totalPosts = posts.length

  // Sort by views descending
  const sortedByViews = [...postsWithStats].sort((a, b) => b.views - a.views)

  return {
    totalViews,
    totalLikes,
    totalPosts,
    posts: sortedByViews,
  }
}

export default async function StatisticsPage() {
  const stats = await getStatistics()

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-10">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-5 text-primary" />
          <h1 className="text-2xl font-medium">Statistics</h1>
        </div>
        <p className="mt-2 text-muted-foreground">Content performance and engagement metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-primary/5 to-transparent p-5 transition-all hover:border-primary/30">
          <Eye className="absolute -right-2 -top-2 size-16 text-primary/5" />
          <p className="text-3xl font-bold tabular-nums">{stats.totalViews.toLocaleString()}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total Views</p>
        </div>

        <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-red-500/5 to-transparent p-5 transition-all hover:border-red-500/30">
          <Heart className="absolute -right-2 -top-2 size-16 text-red-500/5" />
          <p className="text-3xl font-bold tabular-nums">{stats.totalLikes.toLocaleString()}</p>
          <p className="mt-1 text-sm text-muted-foreground">Total Likes</p>
        </div>

        <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-blue-500/5 to-transparent p-5 transition-all hover:border-blue-500/30">
          <FileText className="absolute -right-2 -top-2 size-16 text-blue-500/5" />
          <p className="text-3xl font-bold tabular-nums">{stats.totalPosts}</p>
          <p className="mt-1 text-sm text-muted-foreground">Published Notes</p>
        </div>
      </div>

      {/* Posts Table */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="size-4 text-primary" />
          <h2 className="font-medium">All Notes</h2>
        </div>

        <div className="overflow-hidden rounded-lg border border-border/50">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Title
                </th>
                <th className="w-24 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Eye className="ml-auto size-3.5" />
                </th>
                <th className="w-24 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Heart className="ml-auto size-3.5" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {stats.posts.map((post) => (
                <tr key={post.slug} className="transition-colors hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link
                      href={`/notes/${post.slug}`}
                      className="text-sm transition-colors hover:text-primary"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {post.views.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-sm tabular-nums text-muted-foreground">
                    {post.likes.toLocaleString()}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="border-t-2 border-border bg-muted/50 font-medium">
                <td className="px-4 py-3 text-sm">Total</td>
                <td className="px-4 py-3 text-right font-mono text-sm tabular-nums">
                  {stats.totalViews.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-right font-mono text-sm tabular-nums">
                  {stats.totalLikes.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </PageWrapper>
  )
}
