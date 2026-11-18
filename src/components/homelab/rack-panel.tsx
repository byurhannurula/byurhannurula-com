import Image from 'next/image';

import type { Device } from '@/content/homelab';

interface RackPanelProps {
  device: Device;
}

/**
 * The hardware of one device: a photo, the name, a sentence and the model's
 * numbers. The services have their own list in the Status section.
 */
export function RackPanel({ device }: RackPanelProps) {
  const count = device.runs.length;
  return (
    <>
      <div className="flex items-center gap-5">
        <div className="aspect-4/3 w-32 flex-none overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_var(--line)] sm:w-40">
          <Image
            src={device.photo.src}
            // The name is beside the photo, so a text here would say it twice.
            alt=""
            width={device.photo.width}
            height={device.photo.height}
            sizes="10rem"
            className="size-full object-contain p-[10%]"
          />
        </div>
        <div className="min-w-0">
          <span className="block label-mono text-accent">{device.tag}</span>
          <h3 className="mt-[0.3rem] text-[clamp(1.375rem,2.4vw,1.75rem)] leading-[1.25] font-semibold tracking-[-0.03em]">
            {device.name}
          </h3>
          {count ? (
            <a
              href="#status"
              className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 text-sm font-medium text-accent transition-colors hover:bg-accent/18"
            >
              runs {count} {count === 1 ? 'service' : 'services'}
              <span aria-hidden>&darr;</span>
            </a>
          ) : null}
        </div>
      </div>
      <p className="mt-5 max-w-[30rem] text-soft">{device.text}</p>
      <ul className="mt-6 grid grid-cols-3 gap-3">
        {device.specs.map((spec) => (
          <li key={spec.label} className="rounded-xl bg-card px-4 py-3.5">
            <b className="block text-xl leading-tight font-semibold tracking-[-0.02em]">
              {spec.value}
            </b>
            <span className="mt-1 block label-mono text-faint">
              {spec.label}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
