"use client";

import { Eye, Heart } from "lucide-react";

import { usePostLike } from "@/hooks";
import { cn } from "@/lib/utils";

interface PostStatsProps {
  slug: string;
  className?: string;
  initialViews?: number;
  initialLikes?: number;
}

/**
 * The compact pair in a post header.
 *
 * This is the one that counts the view: it mounts once per post page, where
 * PostLike sits further down and would double the number.
 */
export function PostStats({
  slug,
  className,
  initialViews = 0,
  initialLikes = 0,
}: PostStatsProps) {
  const { views, likes, hasLiked, kicking, toggle } = usePostLike(slug, {
    countView: true,
    initialLikes,
    initialViews,
  });

  return (
    <div
      className={cn(
        "flex items-center gap-4 text-muted-foreground text-sm",
        className
      )}
    >
      <span className="flex items-center gap-1.5">
        <Eye aria-hidden="true" className="h-4 w-4" />
        <span className="sr-only">Views: </span>
        {views.toLocaleString()}
      </span>

      <button
        className={cn(
          "pressable flex items-center gap-1.5",
          hasLiked ? "text-red-500" : "hover:text-red-500"
        )}
        onClick={toggle}
        type="button"
      >
        <Heart
          className={cn(
            "h-4 w-4",
            hasLiked && "fill-current",
            kicking && "animate-like"
          )}
        />
        <span className="sr-only">
          {hasLiked ? "Unlike this post. " : "Like this post. "}
        </span>
        {likes.toLocaleString()}
      </button>
    </div>
  );
}
