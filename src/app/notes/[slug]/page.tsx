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
import { HashScroll } from "@/components/hash-scroll";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/json-ld";
import { MDXRenderer, TOC, TOCFloating, TOCSidebar } from "@/components/mdx";
import { createBlogMetadata, SITE_CONFIG } from "@/config";
import { getAllPosts, getSinglePost, type Post } from "@/lib/server";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
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
      <HashScroll />
      <div className="pt-8 pb-16">
        {/* Header section */}
        <div>
          <div className="mb-5">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted-foreground no-underline transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" />
              back to notes
            </Link>
          </div>

          <div className="mb-8">
            <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-[12.5px] text-faint">
              <time dateTime={currentPost.frontmatter.date}>
                {currentPost.frontmatter.date}
              </time>
              <span aria-hidden>·</span>
              <span>{currentPost.readingTime} read</span>
              <span aria-hidden>·</span>
              <PostStats slug={slug} />
            </div>
            <h1>{currentPost.frontmatter.title}</h1>
            <p className="mt-3 text-[16px] text-muted-foreground">
              {currentPost.frontmatter.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {currentPost.frontmatter.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/notes/tag/${tag}`}
                    className="tag transition-colors hover:border-primary hover:border-dashed hover:text-foreground hover:opacity-100"
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
          <div className="mb-10">
            <div className="overflow-hidden rounded-md">
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

          <div>
            {/* Inline TOC if enabled and style is inline (default) */}
            {currentPost.frontmatter.toc &&
              currentPost.frontmatter.tocStyle !== "sidebar" &&
              currentPost.frontmatter.tocStyle !== "floating" && (
                <div className="mb-8">
                  <TOC />
                </div>
              )}

            {/* Article content */}
            <div data-mdx-content className="prose">
              <MDXRenderer source={currentPost.content} />
            </div>

            {/* Like button at end of post */}
            <div className="mt-12 border-t pt-8">
              <PostLike slug={slug} />
            </div>
          </div>

          {/* Floating TOC - shows when tocStyle is floating */}
          {currentPost.frontmatter.toc &&
            currentPost.frontmatter.tocStyle === "floating" && <TOCFloating />}
        </div>

        {/* Read Previous/Next Section */}
        {(prevPost || nextPost) && (
          <div>
            <div className="mt-16 border-t pt-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Previous Post */}
                {prevPost ? (
                  <Link
                    href={`/notes/${prevPost.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-col">
                      <span className="mb-1 inline-flex items-center gap-1 font-mono text-[11px] text-faint">
                        <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                        older
                      </span>
                      <h4 className="line-clamp-2 font-normal text-[13.5px] text-muted-foreground transition-colors group-hover:text-primary">
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
                      <span className="mb-1 inline-flex items-center gap-1 font-mono text-[11px] text-faint">
                        newer
                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                      </span>
                      <h4 className="line-clamp-2 font-normal text-[13.5px] text-muted-foreground transition-colors group-hover:text-primary">
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
