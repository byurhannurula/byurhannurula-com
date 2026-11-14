'use client';

import { useId, useState, type KeyboardEvent } from 'react';

const STEP: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/**
 * State and ARIA props for a tab list with one shared panel. The arrow
 * keys, Home and End move the focus and select, as in the ARIA tabs pattern.
 */
export function useTabs<Id extends string>(ids: readonly Id[], initial: Id) {
  const [selected, setSelected] = useState(initial);
  const base = useId();
  const tabId = (id: Id) => `${base}-tab-${id}`;
  const panelId = `${base}-panel`;

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const from = ids.indexOf(selected);
    let to = -1;
    if (event.key in STEP) {
      to = (from + STEP[event.key] + ids.length) % ids.length;
    } else if (event.key === 'Home') to = 0;
    else if (event.key === 'End') to = ids.length - 1;
    if (to < 0) return;
    event.preventDefault();
    setSelected(ids[to]);
    const tabs = event.currentTarget
      .closest('[role="tablist"]')
      ?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[to]?.focus();
  };

  const tabProps = (id: Id) => ({
    role: 'tab' as const,
    id: tabId(id),
    'aria-selected': selected === id,
    'aria-controls': panelId,
    // Roving focus: Tab enters the list at the selected tab only.
    tabIndex: selected === id ? 0 : -1,
    onClick: () => setSelected(id),
    onKeyDown,
  });

  const panelProps = {
    role: 'tabpanel' as const,
    id: panelId,
    'aria-labelledby': tabId(selected),
  };

  return { selected, tabProps, panelProps };
}
