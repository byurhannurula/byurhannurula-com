"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Reads a custom property off the document root and keeps it current.
 *
 * The page shows real values rather than a transcription, so a token edited in
 * globals.css cannot leave the documentation stale. The observer is what makes
 * it follow a light-mode change, since every palette redefines the same names.
 */
function useTokenValue(token: string) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const read = () =>
      setValue(getComputedStyle(root).getPropertyValue(token).trim());
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-light", "style"],
    });
    return () => observer.disconnect();
  }, [token]);

  return value;
}

export function TokenValue({ token }: { token: string }) {
  const value = useTokenValue(token);
  // Non-breaking space holds the line before the value lands, so the row does
  // not shift on mount.
  return <span className="tabular-nums">{value || " "}</span>;
}

interface SwatchProps {
  token: string;
  label: string;
  note?: string;
  /** Draw a border when the fill can equal the page behind it. */
  outlined?: boolean;
}

export function Swatch({ token, label, note, outlined }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "h-14 rounded-md",
          outlined ? "border border-border" : "border border-transparent"
        )}
        style={{ background: `var(${token})` }}
      />
      <div className="flex flex-col gap-0.5 font-mono text-[11.5px] leading-snug">
        <span className="text-foreground">{label}</span>
        <span className="text-faint">{token}</span>
        <span className="text-faint">
          <TokenValue token={token} />
        </span>
        {note ? <span className="text-muted-foreground">{note}</span> : null}
      </div>
    </div>
  );
}

/** A numbered section, matching the `//` heading used across the site. */
export function Spec({
  index,
  title,
  intro,
  children,
}: {
  index: string;
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  const id = title.replace(/[^a-z]+/gi, "-").toLowerCase();
  return (
    <section className="pt-9">
      {/* The id lives on the heading, not the section: the floating TOC
          collects h2[id] and scroll-spies on their positions. */}
      <h2 className="section-heading !mt-0 scroll-mt-20" id={id}>
        <span className="text-faint">{index}</span>
        <a className="no-underline" data-toc-text href={`#${id}`}>
          {title}
        </a>
        <span aria-hidden className="hairline-t flex-1" />
      </h2>
      <p className="mb-5 max-w-[62ch] text-[13.5px] text-muted-foreground">
        {intro}
      </p>
      {children}
    </section>
  );
}

/** A labelled example: the thing itself, with what it is called underneath. */
export function Sample({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={cn(
          "flex min-h-16 items-center gap-3 rounded-md border border-border border-dashed p-4",
          className
        )}
      >
        {children}
      </div>
      <span className="font-mono text-[11.5px] text-faint">{label}</span>
    </div>
  );
}
