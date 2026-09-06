"use client";

import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { BackLink, EmptyState } from "@/components/ui";

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <BackLink href="/notes">back to notes</BackLink>
      </div>

      <EmptyState>
        <div className="mb-8">
          <div className="mb-4 text-6xl">🔍</div>
          <h1 className="mb-4 font-semibold text-xl">Post not found</h1>
          <p className="max-w-md text-muted-foreground">
            The post you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
        </div>
        <Link
          href="/notes"
          className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
        >
          Back to Blog
        </Link>
      </EmptyState>
    </PageWrapper>
  );
}
