"use client";

import { FileText, Search, Tag, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui";

interface Post {
  slug: string;
  frontmatter: {
    title: string;
    excerpt: string;
    date: string;
    tags: string[];
  };
  readingTime: string;
}

interface BlogSearchProps {
  posts: Post[];
  allTags?: string[];
}

export function BlogSearch({ posts, allTags = [] }: BlogSearchProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTag = searchParams.get("tag");

  const uniqueTags = useMemo(() => {
    if (allTags.length > 0) return allTags;
    const tags = posts.flatMap((post) => post.frontmatter.tags);
    return Array.from(new Set(tags)).sort();
  }, [posts, allTags]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const handleTagSelect = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    if (currentTag === tag) {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    runCommand(() => router.push(`${pathname}?${params.toString()}`));
  };

  const clearTagFilter = () => {
    runCommand(() => router.push(pathname));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border/50 bg-muted/30 px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:border-border hover:bg-muted/50"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search posts...</span>
        {currentTag && (
          <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 font-medium text-[10px] text-primary sm:inline">
            {currentTag}
          </span>
        )}
        <kbd className="pointer-events-none hidden select-none rounded bg-muted px-1.5 py-0.5 font-medium text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search posts or filter by tag..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Tags Section */}
          <CommandGroup heading="Filter by Tag">
            {currentTag && (
              <CommandItem
                onSelect={clearTagFilter}
                className="text-muted-foreground"
              >
                <X className="mr-2 h-4 w-4" />
                <span>Clear filter: {currentTag}</span>
              </CommandItem>
            )}
            {uniqueTags.map((tag) => (
              <CommandItem
                key={tag}
                value={`tag:${tag}`}
                onSelect={() => handleTagSelect(tag)}
              >
                <Tag className="mr-2 h-4 w-4" />
                <span
                  className={
                    currentTag === tag ? "font-medium text-primary" : ""
                  }
                >
                  {tag}
                </span>
                {currentTag === tag && (
                  <span className="ml-auto text-primary text-xs">active</span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Posts Section */}
          <CommandGroup heading="Posts">
            {posts.map((post) => (
              <CommandItem
                key={post.slug}
                value={`${post.frontmatter.title} ${post.frontmatter.excerpt} ${post.frontmatter.tags.join(" ")}`}
                onSelect={() =>
                  runCommand(() => router.push(`/notes/${post.slug}`))
                }
              >
                <FileText className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{post.frontmatter.title}</span>
                  <span className="text-muted-foreground text-xs">
                    {post.frontmatter.date} • {post.readingTime} read
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
