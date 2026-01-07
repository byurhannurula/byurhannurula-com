import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  PostLike,
  PostStats,
  ReadingProgress,
  ShareButtons,
} from "@/components/blog";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { MDXRenderer, TOC, TOCFloating, TOCSidebar } from "@/components/mdx";
import { createBlogMetadata, SITE_CONFIG } from "@/config";
import { getPostStats } from "@/lib";
import { getAllPosts, getSinglePost, type Post } from "@/lib/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  try {
    const post = getSinglePost(slug);
    return createBlogMetadata({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      slug: post.slug,
      date: post.frontmatter.date,
      readingTime: post.readingTime,
      tags: post.frontmatter.tags,
      coverImage: post.frontmatter.coverImage,
    });
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let currentPost: Post;
  try {
    currentPost = getSinglePost(slug);
  } catch (_error) {
    notFound();
  }

  // Fetch initial stats from Redis (SSR)
  const initialStats = await getPostStats(slug);

  // Find previous and next posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const articleUrl = `${SITE_CONFIG.url}/notes/${slug}`;

  return (
    <>
      <ArticleJsonLd
        title={currentPost.frontmatter.title}
        description={currentPost.frontmatter.excerpt}
        publishedTime={currentPost.frontmatter.date}
        image={currentPost.frontmatter.coverImage}
        url={articleUrl}
        tags={currentPost.frontmatter.tags}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Notes", url: "/notes" },
          { name: currentPost.frontmatter.title, url: `/notes/${slug}` },
        ]}
      />
      <ReadingProgress />
      <div className="pt-24 pb-16">
        {/* Header section - constrained width */}
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-8">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-1 font-medium text-foreground text-xs uppercase tracking-wider transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              Back to notes
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex items-center gap-3 text-muted-foreground text-xs">
              <span>{currentPost.frontmatter.date}</span>
              <span>•</span>
              <span>{currentPost.readingTime} read</span>
              <span>•</span>
              <PostStats
                slug={slug}
                initialViews={initialStats.views}
                initialLikes={initialStats.likes}
              />
            </div>
            <h1 className="font-medium text-2xl md:text-3xl">
              {currentPost.frontmatter.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {currentPost.frontmatter.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {currentPost.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/notes/tag/${tag}`}
                    className="rounded-md bg-muted px-2 py-1 text-muted-foreground text-xs transition-colors hover:bg-primary/20 hover:text-primary"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
              <ShareButtons title={currentPost.frontmatter.title} />
            </div>
          </div>
        </div>

        {/* Cover Image - wider than content */}
        {currentPost.frontmatter.coverImage && (
          <div className="mx-auto mb-10 max-w-5xl px-6">
            <div className="overflow-hidden rounded-xl">
              <Image
                src={currentPost.frontmatter.coverImage}
                alt={currentPost.frontmatter.title}
                width={1200}
                height={630}
                priority
                fetchPriority="high"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content section */}
        <div className="relative">
          {/* Sidebar TOC - positioned to the left */}
          {currentPost.frontmatter.toc &&
            currentPost.frontmatter.tocStyle === "sidebar" && (
              <div className="absolute top-0 left-0 hidden w-64 xl:block">
                <div className="fixed top-24 w-56">
                  <TOCSidebar />
                </div>
              </div>
            )}

          <div className="mx-auto max-w-screen-md px-6">
            {/* Inline TOC if enabled and style is inline (default) */}
            {currentPost.frontmatter.toc &&
              currentPost.frontmatter.tocStyle !== "sidebar" &&
              currentPost.frontmatter.tocStyle !== "floating" && (
                <div className="mb-8">
                  <TOC />
                </div>
              )}

            {/* Article content */}
            <div
              data-mdx-content
              className="prose prose-lg dark:prose-invert prose-p:my-4 prose-headings:font-medium prose-a:text-primary prose-headings:tracking-tight"
            >
              <MDXRenderer source={currentPost.content} />
            </div>

            {/* Like button at end of post */}
            <div className="mt-12 border-t pt-8">
              <PostLike slug={slug} initialLikes={initialStats.likes} />
            </div>
          </div>

          {/* Floating TOC - shows when tocStyle is floating */}
          {currentPost.frontmatter.toc &&
            currentPost.frontmatter.tocStyle === "floating" && <TOCFloating />}
        </div>

        {/* Read Previous/Next Section */}
        {(prevPost || nextPost) && (
          <div className="mx-auto max-w-3xl px-6">
            <div className="mt-16 border-t pt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Previous Post */}
                {prevPost ? (
                  <Link
                    href={`/notes/${prevPost.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-col">
                      <span className="mb-2 inline-flex items-center gap-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                        Previous
                      </span>
                      <h4 className="line-clamp-2 font-medium text-sm transition-colors group-hover:text-primary">
                        {prevPost.frontmatter.title}
                      </h4>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {/* Next Post */}
                {nextPost && (
                  <Link
                    href={`/notes/${nextPost.slug}`}
                    className="group block text-right sm:text-right"
                  >
                    <div className="flex flex-col items-end">
                      <span className="mb-2 inline-flex items-center gap-1 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                        Next
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <h4 className="line-clamp-2 font-medium text-sm transition-colors group-hover:text-primary">
                        {nextPost.frontmatter.title}
                      </h4>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
