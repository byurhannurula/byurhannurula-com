'use client';

import { useState } from 'react';

import { playSound } from '@/hooks/use-sound';

/** A like that lives in this page only: nothing is stored or sent. */
export function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={() => {
        setLiked(!liked);
        playSound('click');
      }}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-[1.1rem] font-medium transition-[border-color,color,scale] duration-200 ease-soft active:scale-94 aria-pressed:border-danger aria-pressed:text-danger"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        // The key restarts the pop each time the note is liked.
        key={String(liked)}
        className={
          liked
            ? 'size-[1.1rem] fill-current stroke-current stroke-2 motion-safe:animate-like-pop'
            : 'size-[1.1rem] fill-none stroke-current stroke-2 transition-[fill] duration-200'
        }
      >
        <path d="M12 20.5s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.8a4.3 4.3 0 0 1 7.5 2.7c0 5.4-7.5 10-7.5 10Z" />
      </svg>
      <span>{liked ? 'Liked' : 'Like this note'}</span>
    </button>
  );
}
