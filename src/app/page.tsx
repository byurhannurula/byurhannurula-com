import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlogCardHome } from "@/components/blog";
import { PersonJsonLd, WebsiteJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { SocialLinks } from "@/components/social-links";
import { createMetadata } from "@/config";
import { getPostStats } from "@/lib/redis";
import { getAllPosts } from "@/lib/server";

export const metadata = createMetadata("/");

export default async function Home() {
  const allPosts = getAllPosts();

  // Fetch views for all posts in parallel
  const postsWithViews = await Promise.all(
    allPosts.map(async (post) => {
      const stats = await getPostStats(post.slug);
      return { ...post, views: stats.views };
    })
  );

  return (
    <>
      <WebsiteJsonLd />
      <PersonJsonLd />
      <PageWrapper>
        <div className="relative mb-16 animate-fade-in">
          <div className="pointer-events-none absolute top-0 -left-4 h-28 w-px overflow-hidden">
            <div
              className="h-full w-full animate-pulse"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, hsl(var(--primary) / 0.6), transparent)",
              }}
            />
          </div>
          <h1 className="relative mt-4 font-bold text-3xl md:text-4xl">
            Full-Stack Dev &{" "}
            <span className="text-primary">Technology Tinkerer</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground leading-relaxed">
            I love building, breaking, and experimenting - whether it&apos;s
            software, my home lab, DIY hardware projects, or everything in
            between.
          </p>
          <p className="mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">
            Currently exploring self-hosting, privacy-focused tools, and writing
            about what I learn along the way.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <SocialLinks />
          </div>
        </div>

        {/* Latest Posts */}
        <div className="mb-24">
          {postsWithViews.length > 0 && (
            <>
              <h2 className="mb-4 animate-fade-in font-medium text-muted-foreground text-xs uppercase tracking-wider">
                Latest Posts
              </h2>
              <div className="stagger-children space-y-8">
                {postsWithViews.map((post) => (
                  <BlogCardHome
                    key={post.slug}
                    post={post}
                    views={post.views}
                  />
                ))}
              </div>
              <div className="mt-8 animate-fade-in">
                <Link
                  href="/notes"
                  className="group inline-flex items-center gap-1 font-medium text-foreground text-xs uppercase tracking-wider transition-colors hover:text-primary"
                >
                  View all notessss
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
