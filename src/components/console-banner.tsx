"use client";

import { useEffect } from "react";

import { SITE_CONFIG } from "@/config/site";

const BANNER = String.raw`
  _                     _
 | |__  _   _ _   _ _ __| |__   __ _ _ __
 | '_ \| | | | | | | '__| '_ \ / _' | '_ \
 | |_) | |_| | |_| | |  | | | | (_| | | | |
 |_.__/ \__, |\__,_|_|  |_| |_|\__,_|_| |_|
        |___/
`;

/** Module-level so React strict mode and HMR remounts do not reprint the banner. */
let hasPrinted = false;

/** Devtools greeting. Prints once per page load. */
export function ConsoleBanner() {
  useEffect(() => {
    if (hasPrinted) return;
    hasPrinted = true;

    console.log(`%c${BANNER}`, "color:#16a34a");
    console.log(
      "%cyou opened devtools. good instinct.",
      "color:#16a34a;font-weight:bold"
    );
    console.log(
      `%chiring, or just want to talk shop? ${SITE_CONFIG.author.email}\nsource: https://github.com/byurhannurula/byurhannurula-com\npress ? on the page for the keyboard shortcuts.`,
      "color:#8f8f8f"
    );
  }, []);

  return null;
}
