import { PageWrapper } from "@/components/page-wrapper"
import { usesData, USES_LAST_UPDATED } from "@/data"
import { UsesCategory } from "@/components/uses"
import { createMetadata } from "@/config"

export const metadata = createMetadata("/uses")

export default function UsesPage() {
  return (
    <PageWrapper>
      <div className="animate-fade-in mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-medium">Uses</h1>
          <div className="text-xs text-muted-foreground">Last updated: {USES_LAST_UPDATED}</div>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground">
          Tools, gear, and services I use for development, productivity, and my homelab setup.
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
  )
}
