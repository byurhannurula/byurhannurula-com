import { AppIcon } from '@/components/uses/app-icon';
import type { AppItem } from '@/content/uses';

interface AppListProps {
  items: AppItem[];
}

/** Software as a two-column list with icons. */
export function AppList({ items }: AppListProps) {
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {items.map((item) => (
        <li
          key={item.name}
          className="group/app flex items-start gap-[0.9rem] border-t border-line py-[0.85rem]"
        >
          <AppIcon
            src={item.icon}
            size={38}
            className="size-[2.4rem] rounded-[0.7rem] p-[3px] transition-[scale,rotate] duration-300 ease-soft group-hover/app:scale-110 group-hover/app:-rotate-4"
          />
          <div>
            <h3 className="text-lg leading-[1.3] font-semibold tracking-[-0.015em]">
              {item.name}
            </h3>
            <p className="mt-[0.05rem] text-[0.9375rem] text-soft">
              {item.text}
            </p>
            {item.cli ? (
              <span className="font-mono text-xs leading-[1.6] text-faint">
                {item.cli}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
