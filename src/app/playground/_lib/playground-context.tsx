"use client";

import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { DEFAULT_FONTS, fontVariablesClassName } from "./fonts";
import {
  clearToken,
  computeTypeVars,
  DEFAULT_TYPE,
  readToken,
  serializeTokens,
  setToken,
  TOKEN_KEYS,
  type TokenMap,
} from "./tokens";

type Mode = "light" | "dark";
type FontRole = "sans" | "serif" | "mono";
type FontSelection = Record<FontRole, string>;

interface PlaygroundContextValue {
  mounted: boolean;
  mode: Mode;
  fonts: FontSelection;
  /** Set a token for the current mode (light/dark tracked separately). */
  setTokenValue: (name: string, value: string) => void;
  /** Read the currently effective value of a token from the wrapper. */
  readValue: (name: string) => string;
  setFont: (role: FontRole, varName: string) => void;
  typeBase: number;
  typeRatio: number;
  setTypeBase: (base: number) => void;
  setTypeRatio: (ratio: number) => void;
  exportCss: () => string;
  resetAll: () => void;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

export function usePlayground(): PlaygroundContextValue {
  const ctx = useContext(PlaygroundContext);
  if (!ctx) {
    throw new Error("usePlayground must be used within PlaygroundProvider");
  }
  return ctx;
}

export function PlaygroundProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Sparse per-mode overrides — only tokens the user actually edited.
  const [lightOverrides, setLightOverrides] = useState<TokenMap>({});
  const [darkOverrides, setDarkOverrides] = useState<TokenMap>({});
  // Natural cascade values captured from the document root, per mode.
  const baselineRef = useRef<Record<Mode, TokenMap>>({ light: {}, dark: {} });

  const [fonts, setFonts] = useState<FontSelection>({ ...DEFAULT_FONTS });
  const [typeBase, setTypeBase] = useState(DEFAULT_TYPE.base);
  const [typeRatio, setTypeRatio] = useState(DEFAULT_TYPE.ratio);

  const mode: Mode = resolvedTheme === "dark" ? "dark" : "light";
  const overrides = mode === "dark" ? darkOverrides : lightOverrides;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Capture the natural baseline for the active mode (before applying overrides).
  useEffect(() => {
    if (!mounted) return;
    if (Object.keys(baselineRef.current[mode]).length > 0) return;
    const root = document.documentElement;
    const captured: TokenMap = {};
    for (const key of TOKEN_KEYS) {
      captured[key] = readToken(root, key);
    }
    baselineRef.current[mode] = captured;
  }, [mounted, mode]);

  // Apply the active mode's overrides to the wrapper; untouched tokens fall back
  // to the natural cascade (including .dark) so the theme toggle keeps working.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    for (const key of TOKEN_KEYS) {
      clearToken(el, key);
    }
    for (const [key, value] of Object.entries(overrides)) {
      if (value) setToken(el, key, value);
    }
  }, [overrides]);

  // Point the active role variables at the chosen preloaded font families.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty("--font-sans", `var(${fonts.sans})`);
    el.style.setProperty("--font-serif", `var(${fonts.serif})`);
    el.style.setProperty("--font-mono", `var(${fonts.mono})`);
  }, [fonts]);

  // Recompute the modular type scale when base size or ratio changes.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    for (const [name, value] of Object.entries(
      computeTypeVars(typeBase, typeRatio)
    )) {
      if (value) el.style.setProperty(name, value);
    }
  }, [typeBase, typeRatio]);

  const setTokenValue = useCallback(
    (name: string, value: string) => {
      const update = (prev: TokenMap) => ({ ...prev, [name]: value });
      if (mode === "dark") setDarkOverrides(update);
      else setLightOverrides(update);
    },
    [mode]
  );

  const readValue = useCallback(
    (name: string) => readToken(wrapperRef.current, name),
    []
  );

  const setFont = useCallback((role: FontRole, varName: string) => {
    setFonts((prev) => ({ ...prev, [role]: varName }));
  }, []);

  const exportCss = useCallback(() => {
    const light = { ...baselineRef.current.light, ...lightOverrides };
    const dark = { ...baselineRef.current.dark, ...darkOverrides };
    return serializeTokens(light, dark);
  }, [lightOverrides, darkOverrides]);

  const resetAll = useCallback(() => {
    setLightOverrides({});
    setDarkOverrides({});
  }, []);

  const value = useMemo<PlaygroundContextValue>(
    () => ({
      mounted,
      mode,
      fonts,
      setTokenValue,
      readValue,
      setFont,
      typeBase,
      typeRatio,
      setTypeBase,
      setTypeRatio,
      exportCss,
      resetAll,
    }),
    [
      mounted,
      mode,
      fonts,
      setTokenValue,
      readValue,
      setFont,
      typeBase,
      typeRatio,
      exportCss,
      resetAll,
    ]
  );

  return (
    <PlaygroundContext.Provider value={value}>
      <div
        ref={wrapperRef}
        data-playground
        className={cn("font-sans", fontVariablesClassName)}
        style={
          {
            "--font-sans": `var(${DEFAULT_FONTS.sans})`,
            "--font-serif": `var(${DEFAULT_FONTS.serif})`,
            "--font-mono": `var(${DEFAULT_FONTS.mono})`,
            ...computeTypeVars(DEFAULT_TYPE.base, DEFAULT_TYPE.ratio),
          } as React.CSSProperties
        }
      >
        <style
          // biome-ignore lint/security/noDangerouslySetInnerHtml: scoped static style block
          dangerouslySetInnerHTML={{
            __html: `[data-playground] .pg-serif{font-family:var(--font-serif);}[data-playground] .pg-mono{font-family:var(--font-mono);}[data-playground] .pg-sans{font-family:var(--font-sans);}[data-playground] .pg-icon svg{width:100%;height:100%;display:block;}`,
          }}
        />
        {children}
      </div>
    </PlaygroundContext.Provider>
  );
}
