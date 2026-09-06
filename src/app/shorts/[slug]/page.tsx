import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/mdx";
import { PageWrapper } from "@/components/page-wrapper";
import { BackLink } from "@/components/ui";
import { getAllShorts, getSingleShort } from "@/lib/server";
import type { Short } from "@/types";

export async function generateStaticParams() {
  const shorts = getAllShorts();
  return shorts.map((short) => ({ slug: short.slug }));
}

export default async function ShortPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let short: Short;
  try {
    short = getSingleShort(slug);
  } catch {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="mb-8">
        <BackLink href="/shorts">back to shorts</BackLink>
      </div>

      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          {short.frontmatter.language && (
            <span className="rounded bg-primary/10 px-2 py-0.5 font-medium text-primary text-xs uppercase">
              {short.frontmatter.language}
            </span>
          )}
          <span className="text-muted-foreground text-xs">
            {short.frontmatter.date}
          </span>
        </div>
        <h1>{short.frontmatter.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          {short.frontmatter.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {short.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-1 text-muted-foreground text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert prose-p:my-4 prose-headings:font-medium prose-a:text-primary prose-headings:tracking-tight">
        <MDXRenderer source={short.content} />
      </div>
    </PageWrapper>
  );
}
