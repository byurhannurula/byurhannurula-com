'use client';

import { useEffect, useRef, useState } from 'react';

import { confetti } from '@/lib/confetti';
import { getOptions } from '@/lib/options-store';

const LIKED_KEY = 'liked-notes';

function readLiked(): string[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(LIKED_KEY) ?? '[]');
    return Array.isArray(value)
      ? value.filter((v) => typeof v === 'string')
      : [];
  } catch {
    return [];
  }
}

function writeLiked(slug: string, liked: boolean) {
  try {
    const rest = readLiked().filter((entry) => entry !== slug);
    localStorage.setItem(
      LIKED_KEY,
      JSON.stringify(liked ? [...rest, slug] : rest),
    );
  } catch {
    // The like is on the server; only this browser's memory of it is lost.
  }
}

const count = new Intl.NumberFormat('en');

interface LikeButtonProps {
  slug: string;
}

/**
 * The like button, and the one place a note counts its view: it mounts once
 * per note page. The counts load after the page, so the page stays static.
 * With `likefx: confetti` a small burst flies out from the heart.
 */
export function LikeButton({ slug }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);
  // A ref, not state: a double click must see the first click at once.
  const busy = useRef(false);

  useEffect(() => {
    // Shown with the counts, so the button changes once, not twice.
    const likedHere = readLiked().includes(slug);
    const controller = new AbortController();
    fetch(`/api/notes/${slug}`, { method: 'POST', signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { views: number; likes: number } | null) => {
        setLiked(likedHere);
        if (!data) return;
        setViews(data.views);
        setLikes(data.likes);
      })
      // A count that does not load is not worth an error in the console.
      .catch(() => undefined);
    return () => controller.abort();
  }, [slug]);

  async function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (busy.current) return;
    busy.current = true;
    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((value) =>
      value === null ? value : Math.max(0, value + (wasLiked ? -1 : 1)),
    );

    if (!wasLiked && getOptions().likefx === 'confetti') {
      const heart = event.currentTarget.querySelector('svg');
      const box = (heart ?? event.currentTarget).getBoundingClientRect();
      confetti(box.left + box.width / 2, box.top + box.height / 2, {
        count: 18,
        reach: 64,
        fall: 18,
        duration: 950,
      });
    }

    try {
      const response = await fetch(`/api/notes/${slug}/like`, {
        method: wasLiked ? 'DELETE' : 'POST',
      });
      if (!response.ok) throw new Error(String(response.status));
      const data: { likes: number } = await response.json();
      setLikes(data.likes);
      writeLiked(slug, !wasLiked);
    } catch {
      setLiked(wasLiked);
      setLikes((value) =>
        value === null ? value : Math.max(0, value + (wasLiked ? 1 : -1)),
      );
    } finally {
      busy.current = false;
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button
        type="button"
        aria-pressed={liked}
        onClick={toggle}
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
        {likes ? (
          <span className="font-mono text-sm tabular-nums opacity-70">
            <span className="sr-only">, total </span>
            {count.format(likes)}
          </span>
        ) : null}
      </button>
      {views ? (
        <span className="label-mono text-faint">
          {count.format(views)} {views === 1 ? 'read' : 'reads'}
        </span>
      ) : null}
    </div>
  );
}
