"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui";
import { SHORTCUT_GROUPS } from "@/lib/shortcuts";

export const OPEN_SHORTCUTS_EVENT = "shortcuts:open";

export function ShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function onOpen() {
      setIsOpen(true);
    }
    window.addEventListener(OPEN_SHORTCUTS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SHORTCUTS_EVENT, onOpen);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[440px] gap-0 border-border p-0 font-mono text-[13px] shadow-2xl outline-none [&>button]:hidden">
        <div className="hairline-b flex items-center justify-between px-4 py-3">
          <DialogTitle className="font-semibold text-[13px]">
            <span className="text-primary">{"// "}</span>keyboard shortcuts
          </DialogTitle>
          <DialogDescription className="text-[11px] text-faint">
            esc to close
          </DialogDescription>
        </div>
        <div className="grid gap-5 p-4">
          {SHORTCUT_GROUPS.map((group) => (
            <section key={group.heading}>
              <h3 className="mb-2 font-medium text-[11px] text-faint uppercase tracking-[0.08em]">
                {group.heading}
              </h3>
              <dl className="grid gap-1.5">
                {group.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-muted-foreground"
                  >
                    <dt>{item.label}</dt>
                    <dd>
                      <kbd className="rounded-sm border border-border px-1.5 py-0.5 text-[11px] text-foreground">
                        {item.keys}
                      </kbd>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
