"use client"

import { useEffect, useState, useRef } from "react"
import { Eye, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostStatsProps {
  slug: string
  className?: string
  initialViews?: number
  initialLikes?: number
}

export function PostStats({ slug, className, initialViews = 0, initialLikes = 0 }: PostStatsProps) {
  const [views, setViews] = useState<number>(initialViews)
  const [likes, setLikes] = useState<number>(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // Check if user has already liked this post
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
    setHasLiked(likedPosts.includes(slug))

    // Increment view count (fire and forget)
    fetch(`/api/posts/${slug}/stats`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setViews(data.views)
        setLikes(data.likes)
      })
      .catch(console.error)
  }, [slug])

  const handleLike = async () => {
    // Prevent rapid clicks - debounce
    if (isLoading) return

    // Cancel any pending request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setIsLoading(true)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)

    // Optimistic update
    const wasLiked = hasLiked
    setHasLiked(!wasLiked)
    setLikes((prev) => (wasLiked ? Math.max(0, prev - 1) : prev + 1))

    try {
      const endpoint = wasLiked ? "unlike" : "like"
      const res = await fetch(`/api/posts/${slug}/${endpoint}`, {
        method: "POST",
        signal: abortControllerRef.current.signal,
      })

      if (!res.ok) throw new Error("Request failed")

      const data = await res.json()
      setLikes(data.likes)

      // Update localStorage
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
      if (wasLiked) {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPosts.filter((s: string) => s !== slug))
        )
      } else {
        localStorage.setItem("likedPosts", JSON.stringify([...likedPosts, slug]))
      }
    } catch (error) {
      // Revert optimistic update on error (unless aborted)
      if (error instanceof Error && error.name !== "AbortError") {
        setHasLiked(wasLiked)
        setLikes((prev) => (wasLiked ? prev + 1 : Math.max(0, prev - 1)))
        console.error("Failed to toggle like:", error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex items-center gap-4 text-sm text-muted-foreground", className)}>
      {/* Views */}
      <div className="flex items-center gap-1.5">
        <Eye className="h-4 w-4" />
        <span>{views.toLocaleString()}</span>
      </div>

      {/* Likes */}
      <button
        onClick={handleLike}
        className={cn(
          "flex items-center gap-1.5 transition-colors",
          hasLiked ? "text-red-500" : "hover:text-red-500"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-transform",
            hasLiked && "fill-current",
            isAnimating && "animate-like"
          )}
        />
        <span>{likes.toLocaleString()}</span>
      </button>

      <style jsx global>{`
        @keyframes like {
          0% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.3);
          }
          50% {
            transform: scale(0.9);
          }
          75% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-like {
          animation: like 0.6s ease-in-out;
        }
      `}</style>
    </div>
  )
}
