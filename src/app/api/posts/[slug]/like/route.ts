import { type NextRequest, NextResponse } from "next/server";
import { incrementLikes, rateLimit } from "@/lib/redis";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Rate limit by IP - 5 likes per minute per IP (stricter for likes)
  const ip = request.headers.get("x-forwarded-for") || "anonymous";
  const { success } = await rateLimit(`likes:${ip}`, 5, 10);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  // Increment likes
  const likes = await incrementLikes(slug);

  return NextResponse.json({ likes });
}
