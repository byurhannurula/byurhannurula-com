"use client";

import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

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
        className="pressable absolute top-2.5 right-2.5 z-10 grid place-items-center rounded-sm border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground opacity-0 hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {/*
         * Both states stacked in one grid cell, so the button is already the
         * width of the wider word and does not resize under the pointer as it
         * swaps. Each fades and lifts a few pixels rather than cutting.
         */}
        <span
          className={cn(
            "col-start-1 row-start-1 flex items-center gap-1.5 text-primary transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-[opacity]",
            copied
              ? "translate-y-0 opacity-100"
              : "-translate-y-[3px] opacity-0"
          )}
        >
          <Check className="size-3" />
          copied
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 flex items-center gap-1.5 transition-[opacity,translate] duration-150 ease-out motion-reduce:transition-[opacity]",
            copied ? "translate-y-[3px] opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          <Copy className="size-3" />
          copy
        </span>
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
