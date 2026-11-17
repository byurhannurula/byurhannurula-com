'use client';

import type { KeyboardEvent, ReactNode } from 'react';

interface MarkedWordProps {
  open: boolean;
  /** The id of the panel this word opens. */
  controls: string;
  onToggle: () => void;
  children: ReactNode;
}

/** A marked word or phrase in a sentence. It opens a panel under the sentence. */
export function MarkedWord({
  open,
  controls,
  onToggle,
  children,
}: MarkedWordProps) {
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    // Space must not scroll the page.
    event.preventDefault();
    onToggle();
  };

  return (
    // A span, not a <button>: a button is one box and cannot break across
    // lines, so a long phrase left a hole in the sentence on a phone.
    <span
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className="cursor-pointer rounded-[0.4em] bg-sunk box-decoration-clone px-[0.35em] py-[0.02em] decoration-accent-bright decoration-2 underline-offset-[0.22em] transition-[background-color,color] duration-200 hover:bg-accent-soft hover:text-accent aria-expanded:bg-transparent aria-expanded:underline aria-expanded:hover:bg-transparent"
    >
      {children}
    </span>
  );
}
