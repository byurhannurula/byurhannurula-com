/**
 * Event names for Umami. Keep the list short: a name here is a promise that
 * the event means one thing. Outbound links are tracked on their own (see
 * src/components/analytics.tsx), so they need no entry.
 */
export const EVENTS = {
  shelfOpen: 'shelf-open',
  shelfBuy: 'shelf-buy',
  cvPrint: 'cv-print',
  commandOpen: 'command-open',
  rss: 'rss',
} as const;

type EventName = (typeof EVENTS)[keyof typeof EVENTS];
type EventData = Record<string, string | number>;

declare global {
  interface Window {
    umami?: { track(name: string, data?: EventData): void };
  }
}

/** Send an event from client code. Does nothing when Umami is not loaded. */
export function track(name: EventName, data?: EventData) {
  window.umami?.track(name, data);
}

/**
 * Attributes that make Umami count a click with no JS of ours, so server
 * components can use them: `<a {...trackAttrs(EVENTS.rss)}>`.
 */
export function trackAttrs(name: EventName, data?: EventData) {
  const attrs: Record<string, string> = { 'data-umami-event': name };
  for (const [key, value] of Object.entries(data ?? {})) {
    attrs[`data-umami-event-${key}`] = String(value);
  }
  return attrs;
}
