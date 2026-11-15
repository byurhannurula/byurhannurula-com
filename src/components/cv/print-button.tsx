'use client';

import { Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { EVENTS, track } from '@/lib/track';

/** The browser's print window saves the sheet as a PDF; cv.css sets A4. */
export function PrintButton({ label }: { label: string }) {
  return (
    <Button
      onClick={() => {
        track(EVENTS.cvPrint);
        window.print();
      }}
    >
      <Printer aria-hidden />
      {label}
    </Button>
  );
}
