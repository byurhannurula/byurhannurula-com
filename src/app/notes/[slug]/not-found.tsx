"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <div className="mb-8 animate-fade-in">
          <Link
            href="/notes"
            className="group inline-flex items-center gap-1 font-medium text-foreground text-xs uppercase tracking-wider transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to thoughts
          </Link>
        </div>

        <div
          className="flex animate-fade-in flex-col items-center justify-center py-16 text-center"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-8">
            <div className="mb-4 text-6xl">🔍</div>
            <h1 className="mb-4 font-semibold text-xl">Post not found</h1>
            <p className="max-w-md text-muted-foreground">
              The post you&apos;re looking for doesn&apos;t exist or may have
              been moved.
            </p>
          </div>
          <Link
            href="/notes"
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
