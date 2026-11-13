import { NOW } from '@/content/now';
import { cn } from '@/lib/utils';

/** Four short lines about the present. Used on the home and about pages. */
export function NowBlock({ className }: { className?: string }) {
  return (
    <ul
      data-reveal
      className={cn('grid grid-cols-2 gap-8 md:grid-cols-4', className)}
    >
      {NOW.map(({ label, text, icon: Icon, tone }) => (
        <li key={label} className={cn('border-t-2 pt-3.5', tone)}>
          <b className="mb-1.5 flex items-center gap-2 label-mono font-medium">
            <Icon aria-hidden className="size-4" />
            {label}
          </b>
          <p className="text-soft">{text}</p>
        </li>
      ))}
    </ul>
  );
}
