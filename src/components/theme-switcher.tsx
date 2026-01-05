import { useEffect, useState } from 'react';
import { MoonStarIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Theme Switcher"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="rounded-lg p-1.5 text-foreground/80 hover:bg-foreground/15"
    >
      {currentTheme === 'light' ? (
        <MoonStarIcon className="size-5" />
      ) : (
        <SunIcon className="size-5" />
      )}
    </button>
  );
}
