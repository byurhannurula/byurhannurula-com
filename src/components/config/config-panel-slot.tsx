'use client';

import dynamic from 'next/dynamic';

import { OPTIONS_PANEL } from '@/config/options';

const ConfigPanel = dynamic(() =>
  import('./config-panel').then((m) => m.ConfigPanel),
);

/** The config panel, only where OPTIONS_PANEL is on. Its code loads apart. */
export function ConfigPanelSlot() {
  return OPTIONS_PANEL ? <ConfigPanel /> : null;
}
