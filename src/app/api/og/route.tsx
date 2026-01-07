import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// Catppuccin Mocha colors
const colors = {
  base: "#1e1e2e",
  surface0: "#313244",
  surface1: "#45475a",
  overlay0: "#6c7086",
  text: "#cdd6f4",
  subtext0: "#a6adc8",
  lavender: "#b4befe",
  green: "#a6e3a1",
  peach: "#fab387",
};

interface OGParams {
  title?: string;
  description?: string;
  type?: "default" | "blog" | "page";
  date?: string;
  readingTime?: string;
}

function parseParams(request: NextRequest): OGParams {
  const { searchParams } = new URL(request.url);
  return {
    title: searchParams.get("title") || "Byurhan Nurula",
    description:
      searchParams.get("description") || "Full-Stack Dev & Technology Tinkerer",
    type: (searchParams.get("type") as OGParams["type"]) || "default",
    date: searchParams.get("date") || undefined,
    readingTime: searchParams.get("readingTime") || undefined,
  };
}

export async function GET(request: NextRequest) {
  const { title, description, type, date, readingTime } = parseParams(request);

  const isBlog = type === "blog";

  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col justify-between p-16"
      style={{
        background: colors.base,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {/* Background pattern - subtle dots */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.4,
        }}
      >
        <defs>
          <pattern
            id="dots"
            x="0"
            y="0"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill={colors.surface1} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* Gradient glow effect */}
      <div
        tw="absolute"
        style={{
          top: "-200px",
          right: "-100px",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${colors.lavender}20 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />
      <div
        tw="absolute"
        style={{
          bottom: "-150px",
          left: "-50px",
          width: "400px",
          height: "400px",
          background: `radial-gradient(circle, ${colors.green}15 0%, transparent 70%)`,
          borderRadius: "50%",
        }}
      />

      {/* Top section - branding */}
      <div tw="flex items-center justify-between">
        <div tw="flex items-center">
          {/* Logo/Avatar placeholder */}
          <div
            tw="flex items-center justify-center rounded-full"
            style={{
              width: "48px",
              height: "48px",
              background: `linear-gradient(135deg, ${colors.lavender}, ${colors.green})`,
            }}
          >
            <span tw="text-2xl font-bold" style={{ color: colors.base }}>
              B
            </span>
          </div>
          <span
            tw="ml-4 text-xl font-medium"
            style={{ color: colors.subtext0 }}
          >
            byurhannurula.com
          </span>
        </div>

        {isBlog && (
          <div tw="flex items-center" style={{ color: colors.overlay0 }}>
            {date && <span tw="text-lg">{date}</span>}
            {date && readingTime && <span tw="mx-3">•</span>}
            {readingTime && <span tw="text-lg">{readingTime}</span>}
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        tw="flex flex-col flex-1 justify-center"
        style={{ maxWidth: "1000px" }}
      >
        {/* Accent line */}
        <div
          tw="mb-6"
          style={{
            width: "80px",
            height: "4px",
            background: `linear-gradient(90deg, ${colors.lavender}, ${colors.green})`,
            borderRadius: "2px",
          }}
        />

        {/* Title */}
        <h1
          tw="m-0 text-6xl font-bold leading-tight"
          style={{
            color: colors.text,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            tw="mt-6 text-2xl leading-relaxed"
            style={{
              color: colors.subtext0,
              maxWidth: "800px",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Bottom section - decorative */}
      <div tw="flex items-center justify-between">
        <div tw="flex items-center" style={{ color: colors.overlay0 }}>
          <span tw="text-lg">Full-Stack Dev & Technology Tinkerer</span>
        </div>

        {/* Decorative element */}
        <div tw="flex items-center">
          <div
            tw="flex"
            style={{
              width: "120px",
              height: "4px",
              background: `linear-gradient(90deg, transparent, ${colors.surface1})`,
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    }
  );
}
