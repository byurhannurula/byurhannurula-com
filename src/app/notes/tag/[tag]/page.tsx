import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { SITE_CONFIG } from "@/config";
import { getAllPosts, getAllTags } from "@/lib/server";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  return {
    title: `Posts tagged "${decodedTag}" | ${SITE_CONFIG.name}`,
    description: `All posts tagged with "${decodedTag}"`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter((post) =>
    post.frontmatter.tags.some(
      (t) => t.toLowerCase() === decodedTag.toLowerCase()
    )
  );

  if (filteredPosts.length === 0) {
    notFound();
  }

  const allTags = getAllTags();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Notes", url: "/notes" },
          { name: `Tag: ${decodedTag}`, url: `/notes/tag/${tag}` },
        ]}
      />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-screen-md px-6">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/notes"
              className="group inline-flex items-center gap-1 font-medium text-foreground text-xs uppercase tracking-wider transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
              All notes
            </Link>
          </div>

          <div className="mb-12">
            <h1 className="font-medium text-2xl md:text-3xl">
              Posts tagged <span className="text-primary">#{decodedTag}</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "post" : "posts"} found
            </p>
          </div>

          {/* Tag cloud */}
          <div className="mb-12">
            <h2 className="mb-4 font-medium text-muted-foreground text-sm uppercase tracking-wider">
              All Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={`/notes/tag/${t}`}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    t.toLowerCase() === decodedTag.toLowerCase()
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/20 hover:text-primary"
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>

          {/* Posts list */}
          <div className="space-y-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/notes/${post.slug}`} className="block">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="font-medium text-lg transition-colors group-hover:text-primary">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-muted-foreground text-sm">
                        {post.frontmatter.excerpt}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
                        <span>{post.frontmatter.date}</span>
                        <span>•</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
