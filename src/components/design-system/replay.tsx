'use client';

import { RotateCcw } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { useReplay } from '@/hooks/use-replay';

interface ReplayProps {
  /** Names the thing for the button: "Replay draw". */
  label: string;
  children: ReactNode;
}

/** Shows an animation with a button that runs it again. */
export function Replay({ label, children }: ReplayProps) {
  const { ref, run, replay } = useReplay<HTMLDivElement>();
  return (
    <div className="flex items-center gap-4">
      <div key={run} ref={ref} className="min-w-0 flex-1">
        {children}
      </div>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`Replay ${label}`}
        onClick={replay}
        className="shrink-0"
      >
        <RotateCcw aria-hidden />
      </Button>
    </div>
  );
}
