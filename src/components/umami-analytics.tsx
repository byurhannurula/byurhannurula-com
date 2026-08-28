import Script from "next/script";
import { env } from "@/env";

export function UmamiAnalytics() {
  const umamiSrc = env.NEXT_PUBLIC_UMAMI_SRC;
  const umamiId = env.NEXT_PUBLIC_UMAMI_ID;

  if (!(umamiSrc && umamiId)) {
    return null;
  }

  return (
    <Script
      id="umami-analytics"
      src={umamiSrc}
      data-website-id={umamiId}
      strategy="afterInteractive"
      async
    />
  );
}
