'use client';

import type { ReactNode } from 'react';

import { usePick } from '@/hooks/use-pick';

export interface RackPickerDevice<Id extends string> {
  id: Id;
  /** Name of the device: on its chip, and for the drawing's button. */
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

/**
 * The rack drawing with selectable devices and the text of the selected
 * one. Only the selection lives here: shapes and panels come from the server.
 * A narrow screen gets a row of chips in place of the drawing: its devices
 * are too small to hit with a finger.
 */
export function RackPicker<Id extends string>({
  devices,
  initial,
  backdrop,
}: RackPickerProps<Id>) {
  const { picked, pick, buttonProps } = usePick(initial);
  const current = devices.find((device) => device.id === picked);

  return (
    <div className="grid items-center gap-6 md:grid-cols-[minmax(0,25rem)_1fr] md:gap-14">
      {/* min-w-0: a fieldset is as wide as its content by default. */}
      <fieldset className="flex min-w-0 flex-wrap gap-2 md:hidden">
        <legend className="sr-only">Devices. Select one.</legend>
        {devices.map((device) => (
          <button
            key={device.id}
            type="button"
            aria-pressed={picked === device.id}
            onClick={() => pick(device.id)}
            className="min-h-10 rounded-full border border-line-strong px-[0.9rem] text-[0.9375rem] font-medium text-soft transition-colors duration-200 aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-bg"
          >
            {device.label}
          </button>
        ))}
      </fieldset>
      <div data-reveal className="hidden md:block">
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
