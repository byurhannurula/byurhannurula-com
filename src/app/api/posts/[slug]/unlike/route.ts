import { type NextRequest, NextResponse } from "next/server";
import { decrementLikes, rateLimit } from "@/lib/redis";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "anonymous";
  return request.headers.get("x-real-ip")?.trim() || "anonymous";
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const ip = getClientIp(request);
  const { success } = await rateLimit(`unlike:${ip}`, 5, 60);

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  // Increment likes
  const likes = await decrementLikes(slug);

  return NextResponse.json({ likes });
}
