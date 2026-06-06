"use client";

import { useEffect, useRef, useState } from "react";

import { usePlayground } from "../_lib/playground-context";

function rgbToHex(rgb: string): string {
  const parts = rgb.match(/\d+(\.\d+)?/g);
  if (!parts || parts.length < 3) return "#000000";
  const [r, g, b] = parts.map(Number);
  return `#${[r, g, b]
    .map((n) => Math.round(n).toString(16).padStart(2, "0"))
    .join("")}`;
}

interface SwatchProps {
  name: string;
  label: string;
}

export function Swatch({ name, label }: SwatchProps) {
  const { setTokenValue, readValue, mode, mounted } = usePlayground();
  const previewRef = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState("");
  const [hex, setHex] = useState("#000000");

  // Initialize / refresh from the live token whenever the mode flips.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-read token on theme mode change
  useEffect(() => {
    if (mounted) setText(readValue(name));
  }, [mounted, mode, name, readValue]);

  // Keep the native color picker in sync with the resolved color.
  useEffect(() => {
    const el = previewRef.current;
    if (!(el && text)) return;
    setHex(rgbToHex(getComputedStyle(el).backgroundColor));
  }, [text]);

  const commit = (value: string) => {
    setText(value);
    setTokenValue(name, value);
  };

  return (
    <div className="flex items-center gap-2">
      <span
        ref={previewRef}
        className="size-7 shrink-0 rounded border border-border"
        style={{ background: text || `var(${name})` }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <span className="pg-mono block text-[0.62rem] text-muted-foreground/70">
          {label}
        </span>
        <input
          value={text}
          onChange={(e) => commit(e.target.value)}
          spellCheck={false}
          className="pg-mono w-full bg-transparent text-foreground text-xs outline-none"
        />
      </div>
      <input
        type="color"
        value={hex}
        onChange={(e) => commit(e.target.value)}
        aria-label={`${label} color picker`}
        className="size-6 shrink-0 cursor-pointer rounded bg-transparent"
      />
    </div>
  );
}
