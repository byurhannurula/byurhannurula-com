import { PageWrapper } from "@/components/page-wrapper";
import { createMetadata, USES_LAST_UPDATED, usesData } from "@/config";

import { UsesFilter } from "./uses-filter";

export const metadata = createMetadata("/uses");

export default function UsesPage() {
  return (
    <PageWrapper>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1>Uses</h1>
          <span className="label-mono">updated {USES_LAST_UPDATED}</span>
        </div>
        <p className="mt-2 text-muted-foreground">
          Tools, gear, and services I use for development, productivity, and my
          homelab setup. The shell, editor and terminal config behind them lives
          in{" "}
          <a
            href="https://github.com/byurhannurula/dotfiles"
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            dotfiles
          </a>
          .
        </p>
      </div>

      <UsesFilter categories={usesData} />
    </PageWrapper>
  );
}
