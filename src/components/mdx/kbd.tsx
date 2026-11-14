import type { ReactNode } from 'react';

/** A keyboard key in a sentence: <Kbd>Esc</Kbd>. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd
      // The second shadow is the lower edge of the key cap.
      className="mx-[0.1em] inline-block min-w-[1.7em] rounded-[0.45em] bg-card px-[0.45em] py-[0.12em] text-center font-mono text-[0.78em] leading-[1.3] font-medium whitespace-nowrap text-soft shadow-[0_0_0_1px_var(--line-strong),0_2px_0_0_var(--line-strong)]"
    >
      {children}
    </kbd>
  );
}
