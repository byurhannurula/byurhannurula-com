import type { CSSProperties } from 'react';

import type { SayPart } from '@/content/about';
import { cn } from '@/lib/utils';

interface SayProps {
  parts: SayPart[];
  className?: string;
}

/** One large sentence. The marked words carry a hue each. */
export function Say({ parts, className }: SayProps) {
  return (
    <p
      className={cn(
        'max-w-224 text-[clamp(1.5rem,3.2vw,2.4rem)] leading-[1.3] font-medium tracking-[-0.03em] text-pretty',
        className,
      )}
    >
      {parts.map((part) =>
        typeof part === 'string' ? (
          part
        ) : (
          <b
            key={part.text}
            style={{ '--c': `var(--hue-${part.hue})` } as CSSProperties}
            className="rounded-[0.4em] bg-(--c)/11 box-decoration-clone px-[0.3em] font-semibold text-(color:--c)"
          >
            {part.text}
          </b>
        ),
      )}
    </p>
  );
}
