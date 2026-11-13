import 'server-only';

import { z } from 'zod';

import { SERVICES, type HomelabService } from '@/content/homelab';

/*
 * Live data comes from a public Uptime Kuma status page. That page must be
 * reachable from the server that renders the site, for example through the
 * Cloudflare Tunnel. Only monitor names, check states, response times and
 * the uptime number are read. The URL and its hostname stay on the server:
 * they are never returned, rendered or logged.
 */

export type ServiceState = 'up' | 'slow' | 'down';

/** One check. `none` is a slot with no check, or a maintenance window. */
export type Beat = ServiceState | 'none';

export interface ServiceStatus {
  name: string;
  icon: string;
  state: ServiceState;
  /** Percent over 24 hours, when the source has it. */
  uptime?: number;
  /** Short state text, for example "up" or "slow, 1.9 s". */
  detail: string;
  /** Always BEAT_COUNT items, oldest first. */
  beats: Beat[];
}

export interface HomelabStatus {
  source: 'live' | 'sample';
  /** ISO time of the fetch. Live data only. */
  checkedAt?: string;
  services: ServiceStatus[];
}

export const BEAT_COUNT = 30;

const TIMEOUT_MS = 4000;
// Also the refresh time of the homelab page: it has no `revalidate` of its
// own and takes the lowest value of its fetches.
const REVALIDATE_SECONDS = 60;
const SLOW_PING_MS = 1500;

// Uptime Kuma heartbeat states.
const DOWN = 0;
const UP = 1;
const PENDING = 2;

const pageSchema = z.object({
  publicGroupList: z.array(
    z.object({
      monitorList: z.array(z.object({ id: z.number(), name: z.string() })),
    }),
  ),
});

const heartbeatSchema = z.object({
  status: z.number(),
  time: z.string().optional(),
  ping: z.number().nullish(),
});

const heartbeatsSchema = z.object({
  heartbeatList: z.record(z.string(), z.array(heartbeatSchema)),
  uptimeList: z.record(z.string(), z.number().nullish()).default({}),
});

type Heartbeat = z.infer<typeof heartbeatSchema>;

function toBeat({ status, ping }: Heartbeat): Beat {
  if (status === DOWN) return 'down';
  if (status === PENDING) return 'slow';
  if (status !== UP) return 'none';
  return ping != null && ping > SLOW_PING_MS ? 'slow' : 'up';
}

/** Uptime Kuma sends UTC as "2026-11-13 10:15:00.000", with no zone. */
function parseTime(time?: string) {
  if (!time) return null;
  const ms = Date.parse(`${time.replace(' ', 'T')}Z`);
  return Number.isNaN(ms) ? null : ms;
}

function downFor(heartbeats: Heartbeat[], now: number) {
  let first = heartbeats.length - 1;
  while (first > 0 && heartbeats[first - 1].status === DOWN) first -= 1;
  const since = parseTime(heartbeats[first]?.time);
  if (since === null) return 'down';
  const minutes = Math.max(1, Math.round((now - since) / 60_000));
  return minutes < 60
    ? `down for ${minutes} min`
    : `down for ${Math.round(minutes / 60)} h`;
}

function toStatus(
  service: HomelabService,
  heartbeats: Heartbeat[],
  uptime: number | null | undefined,
  now: number,
): ServiceStatus {
  const recent = heartbeats.slice(-BEAT_COUNT);
  const beats = recent.map(toBeat);
  const last = recent.at(-1);
  const lastBeat = beats.at(-1) ?? 'none';

  let state: ServiceState = 'up';
  let detail = 'up';
  if (lastBeat === 'down') {
    state = 'down';
    detail = downFor(recent, now);
  } else if (lastBeat === 'slow') {
    state = 'slow';
    detail =
      last?.status === UP && last.ping != null
        ? `slow, ${(last.ping / 1000).toFixed(1)} s`
        : 'slow';
  } else if (lastBeat === 'none') {
    detail = recent.length ? 'maintenance' : 'no checks yet';
  }

  return {
    name: service.name,
    icon: service.icon,
    state,
    uptime: uptime == null ? undefined : Math.round(uptime * 1000) / 10,
    detail,
    beats: [
      ...Array.from<Beat>({ length: BEAT_COUNT - beats.length }).fill('none'),
      ...beats,
    ],
  };
}

async function getJson(url: URL) {
  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(TIMEOUT_MS),
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!response.ok) throw new Error('status page request failed');
  return response.json() as Promise<unknown>;
}

async function getLiveStatus(statusUrl: string): Promise<HomelabStatus | null> {
  const url = new URL(statusUrl);
  const slug = /^\/status\/([^/]+)\/?$/.exec(url.pathname)?.[1];
  if (!slug) return null;

  const [page, heartbeats] = await Promise.all([
    getJson(new URL(`/api/status-page/${slug}`, url.origin)).then((json) =>
      pageSchema.parse(json),
    ),
    getJson(new URL(`/api/status-page/heartbeat/${slug}`, url.origin)).then(
      (json) => heartbeatsSchema.parse(json),
    ),
  ]);

  const monitorIds = new Map<string, number>();
  for (const group of page.publicGroupList) {
    for (const monitor of group.monitorList) {
      monitorIds.set(monitor.name.trim().toLowerCase(), monitor.id);
    }
  }

  const now = Date.now();
  const services = SERVICES.flatMap((service) => {
    const id = monitorIds.get(service.name.toLowerCase());
    if (id === undefined) return [];
    return toStatus(
      service,
      heartbeats.heartbeatList[id] ?? [],
      heartbeats.uptimeList[`${id}_24`],
      now,
    );
  });

  // A status page with other monitor names is a setup mistake, not an outage.
  if (!services.length) return null;
  return { source: 'live', checkedAt: new Date(now).toISOString(), services };
}

const SAMPLE_STATE: Record<string, ServiceState> = {
  Navidrome: 'down',
  Immich: 'slow',
};

const SAMPLE_DETAIL: Record<ServiceState, string> = {
  up: 'up',
  slow: 'slow, 1.9 s',
  down: 'down for 12 min',
};

/** The same every time: no randomness, so builds and tests are stable. */
function getSampleStatus(): HomelabStatus {
  return {
    source: 'sample',
    services: SERVICES.map((service, index) => {
      const state = SAMPLE_STATE[service.name] ?? 'up';
      return {
        name: service.name,
        icon: service.icon,
        state,
        uptime: state === 'down' ? 96.2 : 99.5 + ((index * 3) % 5) / 10,
        detail: SAMPLE_DETAIL[state],
        beats: Array.from({ length: BEAT_COUNT }, (_, i): Beat => {
          if ((state === 'down' && i > 26) || (index * 7 + i) % 41 === 0) {
            return 'down';
          }
          return state === 'slow' && i > 24 ? 'slow' : 'up';
        }),
      };
    }),
  };
}

/**
 * Service states for the homelab page. Live when `UPTIME_KUMA_STATUS_URL`
 * (a public status page, `https://host/status/slug`) is set and answers;
 * sample data in every other case, so the page always renders.
 */
export async function getHomelabStatus(): Promise<HomelabStatus> {
  const statusUrl = process.env.UPTIME_KUMA_STATUS_URL;
  if (!statusUrl) return getSampleStatus();
  try {
    return (await getLiveStatus(statusUrl)) ?? getSampleStatus();
  } catch {
    // The error can hold the hostname, so it is not logged.
    console.warn('Homelab status: live data failed. Showing sample data.');
    return getSampleStatus();
  }
}
