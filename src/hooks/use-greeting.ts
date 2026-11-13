'use client';

import { useSyncExternalStore } from 'react';

import { GREETINGS } from '@/content/home';

const REFRESH_MS = 30_000;

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, REFRESH_MS);
  return () => clearInterval(timer);
}

const pad = (value: number) => String(value).padStart(2, '0');

function getGreeting() {
  const now = new Date();
  const hour = now.getHours();
  const part = GREETINGS.find(([before]) => hour < before)?.[1] ?? '';
  return `${pad(hour)}:${pad(now.getMinutes())}, ${part}`;
}

// The server does not know the reader's clock, so it renders nothing.
const getServerGreeting = () => '';

/** The reader's local time and a greeting for it, for example "09:12, good morning". */
export function useGreeting(): string {
  return useSyncExternalStore(subscribe, getGreeting, getServerGreeting);
}
