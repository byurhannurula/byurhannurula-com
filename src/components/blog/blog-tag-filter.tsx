"use client";

import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib";

interface BlogTagFilterProps {
  allTags: string[];
  selectedTag: string | null;
}

export function BlogTagFilter({ allTags, selectedTag }: BlogTagFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilter = () => {
    router.push(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wider">
        Filter:
      </span>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => router.push(pathname, { scroll: false })}
          className={cn(
            "rounded-full px-3 py-1 font-medium text-xs transition-colors",
            selectedTag === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          All
        </button>

        {allTags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "rounded-full px-3 py-1 font-medium text-xs transition-colors",
              selectedTag === tag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {selectedTag && (
        <button
          type="button"
          onClick={clearFilter}
          className="flex items-center gap-1 rounded-full px-2 py-1 text-muted-foreground text-xs hover:text-foreground"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
