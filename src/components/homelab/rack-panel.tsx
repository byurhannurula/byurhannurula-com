import { AppIcon } from '@/components/uses/app-icon';
import { serviceByName, type Device } from '@/content/homelab';

interface RackPanelProps {
  device: Device;
}

/** What the rack shows for one device: a tag, the name, a sentence, services. */
export function RackPanel({ device }: RackPanelProps) {
  return (
    <>
      <span className="block label-mono text-accent">{device.tag}</span>
      <h3 className="mt-[0.3rem] mb-[0.6rem] text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.3] font-semibold tracking-[-0.03em]">
        {device.name}
      </h3>
      <p className="max-w-[30rem] text-soft">{device.text}</p>
      {device.runs.length ? (
        <ul className="mt-[1.6rem] grid grid-cols-2 gap-x-6 gap-y-4">
          {device.runs.map(serviceByName).map((service) => (
            <li key={service.name} className="flex items-center gap-3">
              <AppIcon src={service.icon} size={34} className="size-[2.1rem]" />
              <div>
                <b className="block leading-tight font-medium">
                  {service.name}
                </b>
                <span className="block text-sm leading-[1.3] text-soft">
                  {service.short}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
