import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { createMetadata } from "@/config"
import { getAllPosts } from "@/lib/posts"
import { BlogCardHome } from "@/components/blog"
import { PageWrapper } from "@/components/page-wrapper"
import { SocialLinks } from "@/components/social-links"
import { HeroGradient } from "@/components/hero-gradient"

export const metadata = createMetadata("/")

export default function Home() {
  const allPosts = getAllPosts()

  return (
    <PageWrapper>
      <div className="animate-fade-in relative mb-16">
        <HeroGradient />
        <h1 className="relative mt-4 text-3xl font-bold md:text-4xl">
          Full-Stack Dev & <span className="text-primary">Technology Tinkerer</span>
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          I love building, breaking, and experimenting - whether it&apos;s software, my home lab,
          DIY hardware projects, or everything in between.
        </p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Currently exploring self-hosting, privacy-focused tools, and writing about what I learn
          along the way.
        </p>
        <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <SocialLinks />
        </div>
      </div>

      {/* Latest Posts */}
      <div className="mb-24">
        {allPosts.length > 0 && (
          <>
            <h2
              className="animate-fade-in mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              // style={{ animationDelay: "0.15s" }}
            >
              Latest Posts
            </h2>
            <div className="stagger-children space-y-8">
              {allPosts.map((post) => (
                <BlogCardHome key={post.slug} post={post} />
              ))}
            </div>
            <div className="animate-fade-in mt-8">
              <Link
                href="/notes"
                className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
              >
                View all notes
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  )
}
