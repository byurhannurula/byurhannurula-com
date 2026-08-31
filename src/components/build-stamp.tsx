"use client";

import { openBuildInfo } from "@/components/build-info";

/** The copyright year, doubling as the build-stamp trigger. */
export function BuildStamp({ year }: { year: number }) {
  return (
    <button
      type="button"
      onClick={openBuildInfo}
      className="cursor-default text-muted-foreground transition-colors hover:text-primary"
      title="build info"
    >
      &copy; {year}
    </button>
  );
}
