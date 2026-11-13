import {
  BookOpen,
  Briefcase,
  Pencil,
  Text,
  type LucideIcon,
} from 'lucide-react';

export interface NowItem {
  label: string;
  text: string;
  icon: LucideIcon;
  /** Tailwind classes for this item's hue. Static, so Tailwind finds them. */
  tone: string;
}

/** Update the date and the lines together, about once a month. */
export const NOW_DATE = 'November 2026';

export const NOW: NowItem[] = [
  {
    label: 'working',
    text: 'I lead the team at ReCheck and I still write code.',
    icon: Briefcase,
    tone: 'border-hue-2 text-hue-2',
  },
  {
    label: 'studying',
    text: 'System design, and design engineering: type, spacing and motion.',
    icon: BookOpen,
    tone: 'border-hue-3 text-hue-3',
  },
  {
    label: 'building',
    text: 'The fourth version of this site.',
    icon: Pencil,
    tone: 'border-hue-5 text-hue-5',
  },
  {
    label: 'writing',
    text: 'A note about six years from intern to team lead.',
    icon: Text,
    tone: 'border-hue-6 text-hue-6',
  },
];
