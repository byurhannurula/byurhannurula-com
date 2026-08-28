"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const label = mounted ? resolvedTheme : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-[52px] appearance-none rounded-sm border border-border bg-transparent px-2.5 py-1 font-mono text-[12px] text-muted-foreground leading-[1.5] transition-colors hover:border-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
    >
      {label}
    </button>
  );
}
