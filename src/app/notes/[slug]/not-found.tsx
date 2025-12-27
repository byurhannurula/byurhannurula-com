"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="pb-16 pt-24">
      <div className="mx-auto max-w-screen-md px-6">
        <div className="animate-fade-in mb-8">
          <Link
            href="/notes"
            className="group inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
            Back to thoughts
          </Link>
        </div>

        <div
          className="animate-fade-in flex flex-col items-center justify-center py-16 text-center"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-8">
            <div className="mb-4 text-6xl">🔍</div>
            <h1 className="mb-4 text-xl font-semibold">Post not found</h1>
            <p className="max-w-md text-muted-foreground">
              The post you&apos;re looking for doesn&apos;t exist or may have been moved.
            </p>
          </div>
          <Link
            href="/notes"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  )
}
