// Module-scope next/font/google calls — the ONLY correct place to load fonts.
// Each family gets a unique CSS variable (--pg-font-*). The playground wrapper
// receives every .variable className, and the font switcher swaps which family
// the active role variables (--font-sans/serif/mono) point at.

import {
  DM_Mono,
  DM_Sans,
  DM_Serif_Display,
  Fragment_Mono,
  Fraunces,
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  Instrument_Serif,
  Inter,
  JetBrains_Mono,
  Libre_Baskerville,
  Lora,
  Newsreader,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Source_Code_Pro,
  Source_Serif_4,
  Space_Mono,
} from "next/font/google";

// --- Sans ---
const inter = Inter({
  subsets: ["latin"],
  variable: "--pg-font-inter",
  display: "swap",
});
const geist = Geist({
  subsets: ["latin"],
  variable: "--pg-font-geist",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--pg-font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--pg-font-dm-sans",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--pg-font-jakarta",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--pg-font-hanken",
  display: "swap",
});

// --- Serif ---
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--pg-font-fraunces",
  display: "swap",
});
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--pg-font-newsreader",
  display: "swap",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--pg-font-source-serif",
  display: "swap",
});
const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--pg-font-libre",
  display: "swap",
  weight: ["400", "700"],
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--pg-font-playfair",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--pg-font-lora",
  display: "swap",
});
const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--pg-font-dm-serif",
  display: "swap",
  weight: ["400"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--pg-font-instrument",
  display: "swap",
  weight: ["400"],
});

// --- Mono ---
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--pg-font-jetbrains",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--pg-font-geist-mono",
  display: "swap",
});
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--pg-font-ibm-plex-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--pg-font-space-mono",
  display: "swap",
  weight: ["400", "700"],
});
const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--pg-font-fragment-mono",
  display: "swap",
  weight: ["400"],
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--pg-font-source-code",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--pg-font-dm-mono",
  display: "swap",
  weight: ["300", "400", "500"],
});

const ALL_FONTS = [
  inter,
  geist,
  poppins,
  dmSans,
  jakarta,
  hanken,
  fraunces,
  newsreader,
  sourceSerif,
  libreBaskerville,
  playfair,
  lora,
  dmSerif,
  instrumentSerif,
  jetbrainsMono,
  geistMono,
  ibmPlexMono,
  spaceMono,
  fragmentMono,
  sourceCodePro,
  dmMono,
];

// Space-separated string of every font's .variable class — apply to the wrapper
// so all --pg-font-* variables are defined in scope at once.
export const fontVariablesClassName = ALL_FONTS.map((f) => f.variable).join(
  " "
);

export interface FontOption {
  label: string;
  value: string; // the CSS variable name, e.g. "--pg-font-inter"
}

export const FONT_OPTIONS: Record<"sans" | "serif" | "mono", FontOption[]> = {
  sans: [
    { label: "Inter (current)", value: "--pg-font-inter" },
    { label: "Geist", value: "--pg-font-geist" },
    { label: "Poppins", value: "--pg-font-poppins" },
    { label: "DM Sans", value: "--pg-font-dm-sans" },
    { label: "Plus Jakarta Sans", value: "--pg-font-jakarta" },
    { label: "Hanken Grotesk", value: "--pg-font-hanken" },
  ],
  serif: [
    { label: "Fraunces", value: "--pg-font-fraunces" },
    { label: "Newsreader", value: "--pg-font-newsreader" },
    { label: "Source Serif 4", value: "--pg-font-source-serif" },
    { label: "Libre Baskerville", value: "--pg-font-libre" },
    { label: "Playfair Display", value: "--pg-font-playfair" },
    { label: "Lora", value: "--pg-font-lora" },
    { label: "DM Serif Display", value: "--pg-font-dm-serif" },
    { label: "Instrument Serif (display)", value: "--pg-font-instrument" },
  ],
  mono: [
    { label: "JetBrains Mono", value: "--pg-font-jetbrains" },
    { label: "Geist Mono", value: "--pg-font-geist-mono" },
    { label: "IBM Plex Mono", value: "--pg-font-ibm-plex-mono" },
    { label: "Space Mono", value: "--pg-font-space-mono" },
    { label: "Fragment Mono", value: "--pg-font-fragment-mono" },
    { label: "Source Code Pro", value: "--pg-font-source-code" },
    { label: "DM Mono", value: "--pg-font-dm-mono" },
  ],
};

export const DEFAULT_FONTS = {
  sans: "--pg-font-inter",
  serif: "--pg-font-fraunces",
  mono: "--pg-font-jetbrains",
} as const;

export interface FontPairing {
  label: string;
  note: string;
  sans: string;
  serif: string;
  mono: string;
}

// Curated, known-good combinations (research-backed) to try with one click.
export const FONT_PAIRINGS: FontPairing[] = [
  {
    label: "Editorial Warm",
    note: "Fraunces headings + Inter body + JetBrains mono",
    serif: "--pg-font-fraunces",
    sans: "--pg-font-inter",
    mono: "--pg-font-jetbrains",
  },
  {
    label: "Grotesk + Instrument",
    note: "Hanken Grotesk everywhere + Instrument Serif for post titles only + JetBrains mono",
    sans: "--pg-font-hanken",
    serif: "--pg-font-instrument",
    mono: "--pg-font-jetbrains",
  },
  {
    label: "Literary",
    note: "Playfair display + Source Serif body feel + IBM Plex mono",
    serif: "--pg-font-playfair",
    sans: "--pg-font-source-serif",
    mono: "--pg-font-ibm-plex-mono",
  },
  {
    label: "DM Harmony",
    note: "DM Serif Display + DM Sans + DM Mono (same family)",
    serif: "--pg-font-dm-serif",
    sans: "--pg-font-dm-sans",
    mono: "--pg-font-dm-mono",
  },
  {
    label: "Vercel Modern",
    note: "Fraunces + Geist + Geist Mono",
    serif: "--pg-font-fraunces",
    sans: "--pg-font-geist",
    mono: "--pg-font-geist-mono",
  },
  {
    label: "Book",
    note: "Lora + Inter + Source Code Pro",
    serif: "--pg-font-lora",
    sans: "--pg-font-inter",
    mono: "--pg-font-source-code",
  },
  {
    label: "Dev Brand",
    note: "Libre Baskerville + Plus Jakarta + Space Mono",
    serif: "--pg-font-libre",
    sans: "--pg-font-jakarta",
    mono: "--pg-font-space-mono",
  },
];
