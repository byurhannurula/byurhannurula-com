'use client';

import type { ReactNode } from 'react';

import { usePick } from '@/hooks/use-pick';
import { playSound } from '@/hooks/use-sound';

export interface RackPickerDevice<Id extends string> {
  id: Id;
  /** Accessible name of the device button. */
  label: string;
  /** SVG content of the device. */
  shape: ReactNode;
  /** Text shown beside the drawing while the device is selected. */
  panel: ReactNode;
}

interface RackPickerProps<Id extends string> {
  devices: RackPickerDevice<Id>[];
  initial: Id;
  /** SVG content behind the devices. */
  backdrop: ReactNode;
}

const playClick = () => playSound('click');

/**
 * The rack drawing with selectable devices and the text of the selected
 * one. Only the selection lives here: shapes and panels come from the server.
 */
export function RackPicker<Id extends string>({
  devices,
  initial,
  backdrop,
}: RackPickerProps<Id>) {
  const { picked, buttonProps } = usePick(initial, playClick);
  const current = devices.find((device) => device.id === picked);

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-14">
      <div data-reveal className="max-w-80 md:max-w-none">
        <svg
          viewBox="0 0 400 440"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- no HTML tag can replace an <svg>
          role="group"
          aria-label="The rack. Select a device."
          className="block h-auto w-full overflow-visible"
        >
          {backdrop}
          {devices.map((device) => (
            // An SVG group cannot be a <button>, so it gets the button role.
            <g
              key={device.id}
              {...buttonProps(device.id)}
              aria-label={device.label}
              className="group/dev cursor-pointer transition-[translate] duration-300 ease-soft hover:-translate-y-0.5"
            >
              {device.shape}
            </g>
          ))}
        </svg>
      </div>
      <div aria-live="polite">
        {/* The key restarts the enter animation when the selection changes. */}
        <div key={picked} className="motion-safe:*:animate-rise-in">
          {current?.panel}
        </div>
      </div>
    </div>
  );
}
