// Data arrays driving the showcase + control panel, so sections iterate rather
// than hand-write every variant.

import type { ButtonProps } from "@/components/ui/button";

export const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const satisfies readonly NonNullable<ButtonProps["variant"]>[];

export const BUTTON_SIZES = [
  "sm",
  "default",
  "lg",
] as const satisfies readonly NonNullable<ButtonProps["size"]>[];

export const CALLOUT_TYPES = ["info", "warning", "success", "error"] as const;

export const IMAGE_SIZES = ["default", "wide", "wider", "full"] as const;

// Base body sizes (px) and popular modular-scale ratios for the type-scale tester.
export const TYPE_BASES = [15, 16, 17, 18, 20] as const;

export interface TypeRatio {
  label: string;
  ratio: number;
}

export const TYPE_RATIOS: TypeRatio[] = [
  { label: "Minor 2nd · 1.067", ratio: 1.067 },
  { label: "Major 2nd · 1.125", ratio: 1.125 },
  { label: "Minor 3rd · 1.2", ratio: 1.2 },
  { label: "Major 3rd · 1.25", ratio: 1.25 },
  { label: "Perfect 4th · 1.333", ratio: 1.333 },
  { label: "Aug 4th · 1.414", ratio: 1.414 },
  { label: "Perfect 5th · 1.5", ratio: 1.5 },
  { label: "Golden · 1.618", ratio: 1.618 },
];

// Heading-scale rows for the typography specimen (var name + display label).
export const TYPE_SPECIMEN = [
  { varName: "--pg-text-4xl", label: "4xl" },
  { varName: "--pg-text-3xl", label: "3xl" },
  { varName: "--pg-text-2xl", label: "2xl" },
  { varName: "--pg-text-xl", label: "xl" },
  { varName: "--pg-text-lg", label: "lg" },
  { varName: "--pg-text-base", label: "base" },
] as const;

export const GRID_COLUMNS = [2, 3, 4] as const;

export interface AccentPreset {
  label: string;
  h: number;
  s: number;
  l: number;
}

// First entry matches the current/Arslan accent.
export const ACCENT_PRESETS: AccentPreset[] = [
  { label: "Arslan", h: 15, s: 100, l: 50 },
  { label: "Amber", h: 38, s: 92, l: 50 },
  { label: "Crimson", h: 347, s: 77, l: 50 },
  { label: "Violet", h: 262, s: 83, l: 58 },
  { label: "Emerald", h: 160, s: 84, l: 39 },
  { label: "Blue", h: 217, s: 91, l: 60 },
  { label: "Teal", h: 173, s: 80, l: 40 },
];

export interface ColorTokenGroup {
  label: string;
  tokens: { name: string; label: string }[];
}

export const COLOR_TOKEN_GROUPS: ColorTokenGroup[] = [
  {
    label: "Surfaces",
    tokens: [
      { name: "--background", label: "background" },
      { name: "--foreground", label: "foreground" },
      { name: "--card", label: "card" },
      { name: "--card-foreground", label: "card-foreground" },
      { name: "--popover", label: "popover" },
      { name: "--popover-foreground", label: "popover-foreground" },
    ],
  },
  {
    label: "Brand",
    tokens: [
      { name: "--primary", label: "primary" },
      { name: "--primary-foreground", label: "primary-foreground" },
      { name: "--ring", label: "ring" },
    ],
  },
  {
    label: "Accents",
    tokens: [
      { name: "--secondary", label: "secondary" },
      { name: "--secondary-foreground", label: "secondary-foreground" },
      { name: "--muted", label: "muted" },
      { name: "--muted-foreground", label: "muted-foreground" },
      { name: "--accent", label: "accent" },
      { name: "--accent-foreground", label: "accent-foreground" },
    ],
  },
  {
    label: "Status & borders",
    tokens: [
      { name: "--destructive", label: "destructive" },
      { name: "--destructive-foreground", label: "destructive-foreground" },
      { name: "--border", label: "border" },
      { name: "--input", label: "input" },
    ],
  },
];

// A representative MDX document to exercise the full prose + rehype pipeline.
export const SAMPLE_MDX = `## Heading level two

A paragraph with **bold text**, _italic text_, some \`inline code\`, and a
[a link to somewhere](https://example.com). The quick brown fox jumps over the
lazy dog while we check line-height and measure.

### Heading level three

- First unordered list item
- Second item with a bit more text to wrap
- Third item

1. First ordered item
2. Second ordered item

> A blockquote to check the left border, background tint, and italic styling.
> It can span multiple lines.

\`\`\`ts title="example.ts" showLineNumbers
export function greet(name: string): string {
  // a highlighted code sample
  return \`Hello, \${name}!\`;
}
\`\`\`

| Feature | Status | Notes |
| ------- | ------ | ----- |
| Tables  | Yes    | GFM via remark-gfm |
| Code    | Yes    | rehype-pretty-code |
| Links   | Yes    | external auto-detected |

#### Heading level four

Closing paragraph after the table.
`;
