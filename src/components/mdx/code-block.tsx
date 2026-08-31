"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
  "data-language"?: string;
  "data-theme"?: string;
  raw?: string;
}

export function CodeBlock({ children, raw, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    try {
      let textToCopy = raw || "";

      if (!textToCopy && codeRef.current) {
        textToCopy = codeRef.current.querySelector("code")?.textContent || "";
      }

      if (!textToCopy && typeof children === "string") {
        textToCopy = children;
      }

      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_err) {
      console.error("Failed to copy code to clipboard");
    }
  };

  return (
    <div className="not-prose code-block-wrapper group relative">
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 rounded-sm border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="size-3 text-primary" />
            <span className="text-primary">copied</span>
          </>
        ) : (
          <>
            <Copy className="size-3" />
            <span>copy</span>
          </>
        )}
      </button>

      {/* rehype-pretty-code renders the title as a sibling figcaption, so the
          rounding and top border are dropped when one is present (globals.css). */}
      <pre
        ref={codeRef}
        className="overflow-x-auto rounded-lg border border-border bg-background-soft py-3.5"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
