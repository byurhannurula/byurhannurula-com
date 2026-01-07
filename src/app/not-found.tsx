"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-screen-md px-6">
        <div
          className="flex animate-fade-in flex-col items-center justify-center py-16 text-center"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="mb-8">
            <h1 className="mb-4 font-semibold text-xl">Page not found</h1>
            <p className="max-w-md text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved.
            </p>
          </div>
          <Link
            href="/"
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
