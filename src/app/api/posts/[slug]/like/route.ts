import { type NextRequest, NextResponse } from "next/server";
import { incrementLikes, rateLimit } from "@/lib/redis";
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
  const { success } = await rateLimit(`like:${ip}`, 5, 60);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Increment likes
  const likes = await incrementLikes(slug);

  return NextResponse.json({ likes });
}
