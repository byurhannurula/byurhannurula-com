import type { ReactNode } from 'react';

interface AsideProps {
  children: ReactNode;
}

/**
 * A side note. On a wide screen it floats out into the left margin, beside
 * the paragraph that follows it. Below that it sits in the text, with a
 * line at its left. Put it before the paragraph it belongs to.
 */
export function Aside({ children }: AsideProps) {
  return (
    <aside
      // The float keeps its place in the text flow, so it needs no
      // positioned parent: 13rem wide, 2rem away from the column.
      className="my-6 border-l-2 border-line-strong pl-4 text-[0.8em] leading-[1.55] text-soft min-[1340px]:float-left min-[1340px]:clear-left min-[1340px]:mt-[0.35em] min-[1340px]:mb-4 min-[1340px]:-ml-60 min-[1340px]:w-52 min-[1340px]:border-l-0 min-[1340px]:pl-0 min-[1340px]:text-right min-[1340px]:text-[0.8125rem] min-[1340px]:text-faint [&_p]:mb-2 [&>:last-child]:mb-0"
    >
      {children}
    </aside>
  );
}
