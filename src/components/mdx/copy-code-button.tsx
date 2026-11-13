'use client';

import { useCopy } from '@/hooks/use-copy';

/** Copies the text of the code block it sits in. */
export function CopyCodeButton() {
  const { copied, copy } = useCopy(1500);
  return (
    <button
      type="button"
      onClick={(event) => {
        // Read from the DOM: the highlighted code is server markup, and
        // passing its text as a prop would send every block twice.
        const code = event.currentTarget
          .closest('[data-code-block]')
          ?.querySelector('pre');
        void copy(code?.textContent ?? '');
      }}
      className="rounded-full bg-ink/7 px-[0.8rem] py-[0.4rem] text-soft transition-colors hover:bg-ink/14"
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
