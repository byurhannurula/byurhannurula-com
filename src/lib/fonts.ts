import {
  Geist,
  Geist_Mono,
  Hanken_Grotesk,
  Instrument_Sans,
} from 'next/font/google';
import localFont from 'next/font/local';

// Three text faces are loaded while the `font` option is open. When the
// choice is made, delete the other two here and in src/styles/options.css.
const instrument = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
  preload: false,
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  weight: ['400', '500'],
  display: 'swap',
});

// Used by one hero variant only, so it must not block the first paint.
const geistPixel = localFont({
  src: '../../node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2',
  variable: '--font-geist-pixel',
  display: 'swap',
  preload: false,
});

export const fontVariables = [
  instrument.variable,
  geist.variable,
  hanken.variable,
  geistMono.variable,
  geistPixel.variable,
].join(' ');
