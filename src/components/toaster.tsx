"use client";

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme === "light" ? "light" : "dark"}
      position="bottom-center"
      toastOptions={{
        className: "font-mono text-[12.5px] border-border bg-background-soft",
      }}
    />
  );
}
