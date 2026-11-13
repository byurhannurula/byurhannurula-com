import { RackPanel } from '@/components/homelab/rack-panel';
import { RackPicker } from '@/components/homelab/rack-picker';
import { DEVICE_SHAPES, RackBackdrop } from '@/components/homelab/rack-shapes';
import { SampleTag } from '@/components/shared/sample-tag';
import { Section } from '@/components/shared/section';
import { DEFAULT_DEVICE, DEVICES } from '@/content/homelab';

/** "The rack": a drawing with selectable devices and what runs on each. */
export function RackSection() {
  return (
    <Section
      title="The rack"
      sub={
        <>
          Select a device to see what runs on it.{' '}
          {/* The drawing is hidden on a narrow screen, and so is its tag. */}
          <SampleTag className="max-md:hidden">drawing, not to scale</SampleTag>
        </>
      }
    >
      <RackPicker
        initial={DEFAULT_DEVICE}
        backdrop={<RackBackdrop />}
        devices={DEVICES.map((device) => ({
          id: device.id,
          label: device.name,
          shape: DEVICE_SHAPES[device.id],
          panel: <RackPanel device={device} />,
        }))}
      />
    </Section>
  );
}
