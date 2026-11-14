import './motion-section.css';

import type { ReactNode } from 'react';

import {
  DURATIONS,
  EASINGS,
  KEYFRAMES,
  MOTION_NOTE,
  REVEAL,
  type KeyframeDef,
} from '@/config/design-system';
import { cn } from '@/lib/utils';

import { Group, Specimen } from './bits';
import { Replay } from './replay';

interface TrackProps {
  duration: string;
  easing: string;
}

/** A dot that crosses a track once (ds-travel, motion-section.css). */
function Track({ duration, easing }: TrackProps) {
  return (
    <span
      aria-hidden
      className="[container-type:inline-size] relative block h-4 rounded-full bg-sunk"
    >
      <span
        style={{ animation: `ds-travel ${duration} ${easing} both` }}
        className="absolute top-0 left-0 size-4 rounded-full bg-accent-bright"
      />
    </span>
  );
}

function KeyframeDemo({ keyframe }: { keyframe: KeyframeDef }) {
  const demos: Record<KeyframeDef['demo'], ReactNode> = {
    line: (
      <svg
        aria-hidden
        viewBox="0 0 200 40"
        className="h-10 w-full max-w-64 text-accent"
      >
        <path
          d="M4 30 C 40 2, 70 38, 104 18 S 170 6, 196 22"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          className={keyframe.className}
        />
      </svg>
    ),
    text: (
      <span className={cn('inline-block font-medium', keyframe.className)}>
        Copied
      </span>
    ),
    card: (
      <span
        className={cn(
          'inline-block origin-top-left rounded-lg bg-card px-4 py-2.5 text-[0.9375rem] font-medium shadow-soft',
          keyframe.className,
        )}
      >
        A menu
      </span>
    ),
    caret: (
      <span className="inline-flex items-center font-mono text-[0.9375rem]">
        pnpm dev
        <span
          aria-hidden
          className={cn(
            'ml-0.5 inline-block h-[1.15em] w-[0.55em] bg-accent-bright',
            keyframe.className,
          )}
        />
      </span>
    ),
    dot: (
      <span className="inline-flex items-center gap-2 label-mono text-soft">
        <span
          aria-hidden
          className={cn(
            'size-2.5 rounded-full bg-accent-bright',
            keyframe.className,
          )}
        />
        online
      </span>
    ),
  };
  return demos[keyframe.demo];
}

/** Easings, durations, keyframes and the scroll reveal, each with a replay. */
export function MotionSection() {
  const soft = EASINGS[0]?.value ?? 'ease';
  return (
    <>
      <Group title="easing" note={MOTION_NOTE}>
        <div className="grid gap-10">
          {EASINGS.map((easing) => (
            <Specimen
              key={easing.name}
              name={easing.name}
              use={easing.use}
              meta={<span>{easing.value}</span>}
            >
              <Replay label={easing.name}>
                <Track duration="1.4s" easing={easing.value} />
              </Replay>
            </Specimen>
          ))}
        </div>
      </Group>

      <Group title="durations">
        <Replay label="the durations">
          <ul className="grid gap-5">
            {DURATIONS.map((duration) => (
              <li key={duration.value}>
                <Track duration={duration.value} easing={soft} />
                <p className="mt-2 flex flex-wrap gap-x-3 text-[0.875rem] leading-snug text-soft">
                  <span className="font-mono text-xs leading-normal text-ink">
                    {duration.value}
                  </span>
                  {duration.use}
                </p>
              </li>
            ))}
          </ul>
        </Replay>
      </Group>

      <Group title="keyframes">
        <div className="grid gap-10">
          {KEYFRAMES.map((keyframe) => (
            <Specimen
              key={keyframe.name}
              name={keyframe.name}
              use={keyframe.use}
              meta={
                <>
                  <span>{keyframe.className}</span>
                  <span>{keyframe.timing}</span>
                </>
              }
            >
              <Replay label={keyframe.name}>
                <div className="flex min-h-12 items-center">
                  <KeyframeDemo keyframe={keyframe} />
                </div>
              </Replay>
            </Specimen>
          ))}
        </div>
      </Group>

      <Group title="reveal">
        <Specimen
          name={REVEAL.name}
          use={REVEAL.use}
          meta={
            <>
              <span>{REVEAL.attribute}</span>
              <span>{REVEAL.timing}</span>
            </>
          }
        >
          <Replay label={REVEAL.name}>
            <div
              data-reveal
              className="rounded-lg bg-card px-5 py-4 shadow-soft"
            >
              <b className="block font-semibold">A block that arrives</b>
              <span className="text-[0.9375rem] text-soft">
                It rises a little and grows to its size.
              </span>
            </div>
          </Replay>
        </Specimen>
      </Group>
    </>
  );
}
