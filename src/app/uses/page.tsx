import { PageWrapper } from "@/components/page-wrapper";
import { UsesCategory } from "@/components/uses";
import { createMetadata, USES_LAST_UPDATED, usesData } from "@/config";

export const metadata = createMetadata("/uses");

export default function UsesPage() {
  return (
    <PageWrapper>
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-2xl">Uses</h1>
          <div className="text-muted-foreground text-xs">
            Last updated: {USES_LAST_UPDATED}
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">
          Tools, gear, and services I use for development, productivity, and my
          homelab setup.
        </p>
      </div>

      <div className="mb-12 space-y-12">
        {usesData.map((category, categoryIndex) => (
          <UsesCategory
            key={category.title}
            title={category.title}
            items={category.items}
            index={categoryIndex}
            type={category.type || "grid"}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
