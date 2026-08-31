"use client";

import { useEffect, useState } from "react";

export const OPEN_BUILD_INFO_EVENT = "build-info:open";

const BUILD_SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "dev";
const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME ?? "";

const REPO = "https://github.com/byurhannurula/byurhannurula-com";

function formatBuildTime(iso: string) {
  if (!iso) return "unknown";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "unknown";
  return date.toISOString().replace("T", " ").slice(0, 16).concat(" UTC");
}

/** Reveals the deploy stamp. Opened by the footer year or a long-press on the logo. */
export function BuildInfo() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setIsOpen((open) => !open);
    window.addEventListener(OPEN_BUILD_INFO_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_BUILD_INFO_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="status"
      className="fixed right-4 bottom-4 z-50 border border-border-dash border-dashed bg-background p-4 font-mono text-[12px] shadow-lg"
    >
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
        <dt className="text-muted-foreground">commit</dt>
        <dd>
          <a
            href={`${REPO}/commit/${BUILD_SHA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="link-inline"
          >
            {BUILD_SHA}
          </a>
        </dd>
        <dt className="text-muted-foreground">built</dt>
        <dd>{formatBuildTime(BUILD_TIME)}</dd>
        <dt className="text-muted-foreground">env</dt>
        <dd>{process.env.NODE_ENV}</dd>
      </dl>
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="mt-3 text-[11px] text-muted-foreground hover:text-foreground"
      >
        esc to close
      </button>
    </div>
  );
}

export function openBuildInfo() {
  window.dispatchEvent(new Event(OPEN_BUILD_INFO_EVENT));
}
