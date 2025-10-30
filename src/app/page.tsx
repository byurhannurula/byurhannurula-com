import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { getAllPosts } from "@/lib/posts"
import { BlogCardHome } from "@/components/blog"
import { SocialLinks } from "@/components/social-links"
import { PageWrapper } from "@/components/page-wrapper"

export default function Home() {
  const allPosts = getAllPosts()
  const latestPosts = allPosts.slice(0, 5)

  return (
    <PageWrapper>
      <div className="animate-fade-in mb-16">
        <h1 className="mt-4 text-3xl font-bold md:text-4xl">
          Full-Stack Dev & <span className="text-primary">Technology Tinkerer</span>
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          I love building, breaking, and experimenting - whether it&apos;s software, my home lab,
          DIY hardware projects, or everything in between.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <SocialLinks />
        </div>
      </div>

      <div className="mb-24">
        {latestPosts.length > 0 && (
          <>
            <h2 className="animate-fade-in mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Latest Posts
            </h2>
            <div className="stagger-children space-y-8">
              {latestPosts.map((post) => (
                <BlogCardHome key={post.slug} post={post} />
              ))}
            </div>
            <div className="animate-fade-in mt-8">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
              >
                View all thoughts
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  )
}
