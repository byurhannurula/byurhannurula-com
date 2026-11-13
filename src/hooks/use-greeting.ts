'use client';

import { useSyncExternalStore } from 'react';

import { GREETINGS } from '@/content/home';

// The greeting changes a few times a day, so a slow check is enough.
const REFRESH_MS = 60_000;

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, REFRESH_MS);
  return () => clearInterval(timer);
}

function getGreeting() {
  const hour = new Date().getHours();
  return GREETINGS.find(([before]) => hour < before)?.[1] ?? '';
}

// The server does not know the reader's clock, so it renders nothing.
const getServerGreeting = () => '';

/** A greeting for the reader's local time of day, for example "Good morning". No clock time. */
export function useGreeting(): string {
  return useSyncExternalStore(subscribe, getGreeting, getServerGreeting);
}
