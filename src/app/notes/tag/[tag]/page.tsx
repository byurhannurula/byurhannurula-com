import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogPostItem } from "@/components/blog";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { PageWrapper } from "@/components/page-wrapper";
import { SectionHeading } from "@/components/section-heading";
import { createMetadata } from "@/config";
import { getAllPosts, getAllTags } from "@/lib/server";
import { cn } from "@/lib/utils";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return createMetadata(`/notes/tag/${tag}`, {
    title: `Notes tagged #${decoded}`,
    description: `Every note tagged with ${decoded}.`,
  });
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const posts = getAllPosts().filter((post) =>
    post.frontmatter.tags.some((t) => t.toLowerCase() === decoded.toLowerCase())
  );
  if (posts.length === 0) notFound();

  const tags = getAllTags();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Notes", url: "/notes" },
          { name: `Tag: ${decoded}`, url: `/notes/tag/${tag}` },
        ]}
      />
      <PageWrapper>
        <div className="mb-4">
          <Link
            href="/notes"
            className="group inline-flex items-center gap-1.5 font-mono text-[12.5px] text-muted-foreground no-underline transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" />
            back to notes
          </Link>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <h1>#{decoded}</h1>
            <span className="label-mono">
              {posts.length} {posts.length === 1 ? "note" : "notes"}
            </span>
          </div>
          <p className="mt-2 text-muted-foreground">
            Every note tagged with {decoded}.
          </p>
        </div>

        <section>
          <SectionHeading>all tags</SectionHeading>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((t) => {
              const current = t.toLowerCase() === decoded.toLowerCase();
              return (
                <Link
                  key={t}
                  href={`/notes/tag/${t}`}
                  aria-current={current ? "page" : undefined}
                  aria-label={`notes tagged #${t}`}
                  className={cn(
                    "rounded-sm border px-2 py-[3px] font-mono text-[11px] no-underline transition-colors duration-150",
                    current
                      ? "border-primary border-dashed bg-primary-soft text-foreground"
                      : "border-border bg-background-soft text-muted-foreground hover:border-primary hover:border-dashed hover:text-foreground"
                  )}
                >
                  #{t}
                </Link>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeading>notes</SectionHeading>
          <div className="space-y-0.5">
            {posts.map((post) => (
              <BlogPostItem key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </PageWrapper>
    </>
  );
}
