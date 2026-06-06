import { notFound } from "next/navigation";
import type React from "react";

import { PlaygroundProvider } from "./_lib/playground-context";

export const metadata = {
  title: "Playground",
  robots: { index: false, follow: false },
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Internal design tool — not available in production builds.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <PlaygroundProvider>{children}</PlaygroundProvider>;
}
