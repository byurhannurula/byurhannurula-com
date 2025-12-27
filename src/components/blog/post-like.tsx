"use client"

import { useEffect, useState, useRef } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostLikeProps {
  slug: string
  initialLikes?: number
}

export function PostLike({ slug, initialLikes = 0 }: PostLikeProps) {
  const [likes, setLikes] = useState<number>(initialLikes)
  const [hasLiked, setHasLiked] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]")
    setHasLiked(likedPosts.includes(slug))

    fetch(`/api/posts/${slug}/stats`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes))
      .catch(console.error)
  }, [slug])

  const handleLike = async () => {
    // Prevent rapid clicks
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
    <div className="flex flex-col items-center gap-3 py-8">
      <p className="text-sm text-muted-foreground">
        {hasLiked ? "Thanks for the love!" : "Did you enjoy this article?"}
      </p>
      <button
        onClick={handleLike}
        className={cn(
          "group flex items-center gap-2 rounded-full border px-6 py-3 transition-all",
          hasLiked
            ? "border-red-500/30 bg-red-500/10 text-red-500"
            : "border-border hover:border-red-500/50 hover:bg-red-500/5 hover:text-red-500"
        )}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-transform",
            hasLiked && "fill-current",
            isAnimating && "animate-like"
          )}
        />
        <span className="font-medium">{likes}</span>
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
