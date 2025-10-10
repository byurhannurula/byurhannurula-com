"use client"

import type React from "react"

import { useState, useRef, type MouseEvent } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSuccess(true)
      setEmail("")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={formRef}
      className="relative overflow-hidden rounded-lg border bg-card p-6"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--primary), 0.1), transparent 40%)`,
        }}
      />

      <h3 className="text-lg font-medium">Subscribe to the newsletter</h3>
      <p className="mt-2 text-base text-muted-foreground">
        Get the latest updates on web development, design, and technology delivered to your inbox.
      </p>

      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-md bg-primary/10 p-3 text-center text-sm text-primary"
        >
          Thanks for subscribing! Please check your email to confirm.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Send className="h-4 w-4" />
                </motion.div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
        </form>
      )}
    </div>
  )
}
