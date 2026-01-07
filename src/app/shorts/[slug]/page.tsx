import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MDXRenderer } from "@/components/mdx";
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
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <div className="mb-8">
          <Link
            href="/shorts"
            className="group inline-flex items-center gap-1 font-medium text-foreground text-xs uppercase tracking-wider transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to shorts
          </Link>
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
          <h1 className="font-medium text-2xl md:text-3xl">
            {short.frontmatter.title}
          </h1>
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
      </div>
    </div>
  );
}
