"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { usePlayground } from "../_lib/playground-context";

export function TokenExport() {
  const { exportCss } = usePlayground();
  const [copied, setCopied] = useState(false);
  const css = exportCss();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="pg-mono text-[0.65rem] text-muted-foreground/70 uppercase tracking-wider">
          Export tokens
        </span>
        <Button size="sm" variant="outline" onClick={handleCopy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <textarea
        readOnly
        value={css || "/* edit tokens to see them here */"}
        rows={10}
        className="pg-mono w-full resize-y rounded-md border border-border bg-muted/40 p-3 text-[0.7rem] text-muted-foreground leading-relaxed outline-none"
      />
    </div>
  );
}
