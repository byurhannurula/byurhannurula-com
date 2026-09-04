import { type NextRequest, NextResponse } from "next/server";
import { getPostStats, incrementViews, rateLimit } from "@/lib/redis";
import { getClientIp } from "@/lib/server/ip";
import { SLUG_RE } from "@/lib/validation";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const { success } = await rateLimit(`views:${ip}`, 100, 60);

  if (!success) {
    const stats = await getPostStats(slug);
    return NextResponse.json(stats);
  }

  // Return incr value directly — avoids stale read if another request
  // incremented between incr and get, and saves one round-trip for views.
  const views = await incrementViews(slug);
  const { likes } = await getPostStats(slug);

  return NextResponse.json({ views, likes });
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }
  const stats = await getPostStats(slug);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
