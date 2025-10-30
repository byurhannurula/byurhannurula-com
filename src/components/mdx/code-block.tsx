"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

interface CodeBlockProps {
  children: React.ReactNode
  "data-language"?: string
  "data-theme"?: string
  raw?: string
}

export function CodeBlock({ children, raw, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const language = props["data-language"] || ""

  const copyToClipboard = async () => {
    try {
      const textToCopy = raw || (typeof children === "string" ? children : "")
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy code:", err)
    }
  }

  return (
    <div className="not-prose group relative my-6">
      {/* Copy button */}
      <button
        onClick={copyToClipboard}
        className="absolute right-2 top-2 z-10 flex items-center gap-1.5 rounded-md bg-muted/80 px-2 py-1 text-xs opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-green-600" />
            <span className="text-green-600">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            <span>Copy</span>
          </>
        )}
      </button>

      {/* Code content - styled by rehype-pretty-code */}
      <div className="overflow-x-auto rounded-lg border border-border bg-muted/30">{children}</div>
    </div>
  )
}
