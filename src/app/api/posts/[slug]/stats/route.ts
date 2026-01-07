import { type NextRequest, NextResponse } from "next/server";
import { getPostStats, incrementViews, rateLimit } from "@/lib/redis";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Rate limit by IP - 100 views per minute per IP
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { success } = await rateLimit(`views:${ip}`, 100, 60);

  if (!success) {
    const stats = await getPostStats(slug);
    return NextResponse.json(stats);
  }

  // Increment views
  const views = await incrementViews(slug);
  const stats = await getPostStats(slug);

  return NextResponse.json({ views, likes: stats.likes });
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const stats = await getPostStats(slug);

  return NextResponse.json(stats);
}
