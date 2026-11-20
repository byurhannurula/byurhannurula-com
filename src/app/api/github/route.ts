import { NextResponse } from 'next/server';

import { getContributions } from '@/components/layout/social-data';

// The footer card asks for this when its build-time data is a day old.
export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getContributions();
  if (!data) return NextResponse.json(null, { status: 503 });
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=3600' },
  });
}
