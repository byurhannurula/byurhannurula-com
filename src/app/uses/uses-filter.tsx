"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { useState } from "react";

import { SectionHeading } from "@/components/section-heading";
import { UsesRowItem } from "@/components/uses/uses-rows";
import type { UseCategory } from "@/config";
import { cn } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "all" },
  { id: "desk", label: "desk" },
  { id: "apps", label: "apps" },
  { id: "homelab", label: "homelab" },
] as const;

// Shelf per category title. Self-hosted shelves are commented out of the
// config until /homelab exists, so the fallback keeps them landing here
// rather than silently dropping out of every tab when they return.
const SHELVES: Record<string, string> = {
  Desk: "desk",
  "3D Printing": "desk",
  Development: "apps",
  Productivity: "apps",
  "Homelab Hardware": "homelab",
};

function shelfOf(title: string): string {
  return SHELVES[title] ?? "homelab";
}

const REFLOW = {
  type: "spring" as const,
  stiffness: 340,
  damping: 32,
  mass: 0.9,
};
const ENTER = {
  type: "spring" as const,
  stiffness: 420,
  damping: 34,
  mass: 0.8,
};
const PILL = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.9,
};
const EXIT = { duration: 0.13, ease: "easeOut" as const };

const INSTANT = { duration: 0 };

export function UsesFilter({ categories }: { categories: UseCategory[] }) {
  const [filter, setFilter] = useState<string>("all");
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  const counts = new Map<string, number>();
  for (const category of categories) {
    const shelf = shelfOf(category.title);
    counts.set(shelf, (counts.get(shelf) ?? 0) + category.items.length);
  }
  const total = categories.reduce((n, c) => n + c.items.length, 0);

  const visible =
    filter === "all"
      ? categories
      : categories.filter((category) => shelfOf(category.title) === filter);
  const shown = visible.reduce((n, c) => n + c.items.length, 0);

  // Children carry the entrance; the section only staggers them and fades
  // the whole block back out, so opacity is never applied twice. The
  // per-section delay turns simultaneous section stagger into one top-down
  // sweep down the page.
  const sectionVariants = (index: number) => ({
    initial: {},
    enter: {
      transition: animate
        ? { staggerChildren: 0.022, delayChildren: 0.03 + index * 0.05 }
        : INSTANT,
    },
    exit: {
      opacity: 0,
      scale: animate ? 0.985 : 1,
      transition: animate ? EXIT : INSTANT,
    },
  });

  const itemVariants = {
    initial: { opacity: 0, y: animate ? 8 : 0 },
    enter: { opacity: 1, y: 0, transition: animate ? ENTER : INSTANT },
  };

  return (
    <LayoutGroup>
      <fieldset className="mb-6 flex flex-wrap gap-1.5 border-0 p-0">
        <legend className="sr-only">Filter setup</legend>
        {FILTERS.map((tab) => {
          const selected = filter === tab.id;
          const count = tab.id === "all" ? total : (counts.get(tab.id) ?? 0);
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(tab.id)}
              className={cn(
                "relative rounded-sm border border-border bg-background-soft px-2.5 py-1 font-mono text-[11px] transition-colors duration-150",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selected && (
                <motion.span
                  aria-hidden="true"
                  layoutId="uses-filter-pill"
                  initial={false}
                  transition={animate ? PILL : INSTANT}
                  className="absolute -inset-px rounded-sm border border-primary border-dashed bg-primary-soft"
                />
              )}
              <span className="relative">
                {tab.label} · {count}
              </span>
            </button>
          );
        })}
      </fieldset>

      <p aria-live="polite" className="sr-only">
        {shown} of {total} entries shown.
      </p>

      <div className="relative">
        <AnimatePresence mode="popLayout">
          {visible.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={animate ? { duration: 0.2 } : INSTANT}
              className="font-mono text-[12.5px] text-faint"
            >
              Nothing on this shelf yet.
            </motion.p>
          )}
          {visible.map((category, index) => (
            <motion.section
              key={category.title}
              layout={animate}
              variants={sectionVariants(index)}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ layout: REFLOW }}
            >
              <motion.div variants={itemVariants}>
                <SectionHeading>{category.title}</SectionHeading>
                {category.note && (
                  <p className="-mt-2 mb-3 font-mono text-[12px] text-faint">
                    {category.note}
                  </p>
                )}
              </motion.div>
              {category.items.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <UsesRowItem item={item} />
                </motion.div>
              ))}
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
