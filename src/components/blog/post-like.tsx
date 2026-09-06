"use client";

import { Heart } from "lucide-react";

import { usePostLike } from "@/hooks";
import { cn } from "@/lib/utils";

interface PostLikeProps {
  slug: string;
  initialLikes?: number;
}

/** The big one at the end of a post. */
export function PostLike({ slug, initialLikes = 0 }: PostLikeProps) {
  const { likes, hasLiked, kicking, toggle } = usePostLike(slug, {
    initialLikes,
  });

  return (
    <div className="flex flex-col items-center gap-3 py-8">
      <p className="text-muted-foreground text-sm">
        {hasLiked ? "Thanks for the love!" : "Did you enjoy this article?"}
      </p>
      <button
        className={cn(
          "pressable group flex items-center gap-2 rounded-full border px-6 py-3",
          hasLiked
            ? "border-red-500/30 bg-red-500/10 text-red-500"
            : "border-border hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500"
        )}
        onClick={toggle}
        type="button"
      >
        <Heart
          className={cn(
            "h-5 w-5",
            hasLiked && "fill-current",
            kicking && "animate-like"
          )}
        />
        <span className="font-medium">{likes}</span>
      </button>
    </div>
  );
}
