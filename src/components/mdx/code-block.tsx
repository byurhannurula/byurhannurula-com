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
        const codeElement = codeRef.current.querySelector("code");
        if (codeElement) {
          textToCopy = codeElement.textContent || "";
        }
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
      {/* Copy button */}
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded bg-[#313244]/80 px-2 py-1 text-xs opacity-0 transition-opacity hover:bg-[#313244] group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-green-500" />
            <span className="text-green-500">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3 text-muted-foreground" />
            <span className="text-muted-foreground">Copy</span>
          </>
        )}
      </button>

      {/* Code content - rehype-pretty-code handles title via figure/figcaption */}
      <pre
        ref={codeRef}
        className="overflow-x-auto rounded-lg border border-border/50 bg-[#1e1e2e] py-4"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}
