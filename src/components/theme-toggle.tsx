"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
      aria-label="Toggle theme"
    >
      {mounted ? (
        resolvedTheme === "light" ? (
          <Sun className="h-4 w-4 transition-all" />
        ) : (
          <Moon className="h-4 w-4 transition-all" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
