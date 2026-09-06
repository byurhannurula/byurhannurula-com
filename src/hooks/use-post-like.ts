"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Which posts this browser has liked. One key, not one per slug. */
const LIKED_KEY = "likedPosts";
/** Matches .animate-like in globals.css. */
const KICK_MS = 300;

function readLiked(): string[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(LIKED_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Private mode, or something else wrote nonsense to the key.
    return [];
  }
}

function writeLiked(slug: string, liked: boolean) {
  try {
    const rest = readLiked().filter((entry) => entry !== slug);
    localStorage.setItem(
      LIKED_KEY,
      JSON.stringify(liked ? [...rest, slug] : rest)
    );
  } catch {
    // The like still landed on the server; only the memory of it is lost.
  }
}

interface Options {
  initialLikes?: number;
  initialViews?: number;
  /** POST the stats read, which is what counts the view. One caller per page. */
  countView?: boolean;
}

/**
 * The like button's state, shared by the two components that draw one.
 *
 * Both used to carry their own copy of this, which meant two optimistic
 * updates, two localStorage formats and two chances to drift.
 */
export function usePostLike(
  slug: string,
  { initialLikes = 0, initialViews = 0, countView = false }: Options = {}
) {
  const [views, setViews] = useState(initialViews);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [kicking, setKicking] = useState(false);
  const inFlight = useRef<AbortController | null>(null);
  /*
   * A ref, not state: the guard has to be true for the next click in the same
   * tick, and a setState has not landed by then. The old version read state
   * here, so a double click sent two requests.
   */
  const busy = useRef(false);

  useEffect(() => {
    setHasLiked(readLiked().includes(slug));

    fetch(
      `/api/posts/${slug}/stats`,
      countView ? { method: "POST" } : undefined
    )
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setViews(data.views);
      })
      // A count that will not load is not worth an error in anyone's console.
      .catch(() => undefined);
  }, [slug, countView]);

  const toggle = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;

    inFlight.current?.abort();
    const controller = new AbortController();
    inFlight.current = controller;

    const wasLiked = hasLiked;
    setHasLiked(!wasLiked);
    setLikes((count) => (wasLiked ? Math.max(0, count - 1) : count + 1));
    setKicking(true);
    setTimeout(() => setKicking(false), KICK_MS);

    try {
      const res = await fetch(
        `/api/posts/${slug}/${wasLiked ? "unlike" : "like"}`,
        { method: "POST", signal: controller.signal }
      );
      if (!res.ok) throw new Error(`stats: ${res.status}`);
      const data = await res.json();
      setLikes(data.likes);
      writeLiked(slug, !wasLiked);
    } catch (error) {
      // An aborted request was replaced by a newer one, which owns the state.
      if ((error as Error).name === "AbortError") return;
      setHasLiked(wasLiked);
      setLikes((count) => (wasLiked ? count + 1 : Math.max(0, count - 1)));
    } finally {
      busy.current = false;
    }
  }, [hasLiked, slug]);

  return { views, likes, hasLiked, kicking, toggle };
}
