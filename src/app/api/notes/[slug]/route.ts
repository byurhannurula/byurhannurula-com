import { NextResponse } from 'next/server';

import { clientIp, isSlug } from '@/lib/request';
import { addView, allow, getCounts } from '@/lib/stats';

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params;
  if (!isSlug(slug)) {
    return NextResponse.json({ error: 'Unknown note' }, { status: 400 });
  }
  try {
    return NextResponse.json(await getCounts(slug), {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Counter down' }, { status: 503 });
  }
}

/** Counts one view, then answers with the counts. */
export async function POST(request: Request, { params }: Context) {
  const { slug } = await params;
  if (!isSlug(slug)) {
    return NextResponse.json({ error: 'Unknown note' }, { status: 400 });
  }
  try {
    // My own visits in dev are not readers. Over the limit, the reader
    // still gets the counts, only the view is not added.
    const counted =
      process.env.NODE_ENV === 'production' &&
      (await allow(`view:${clientIp(request)}`, 60, 60));
    const counts = counted ? await addView(slug) : await getCounts(slug);
    return NextResponse.json(counts, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return NextResponse.json({ error: 'Counter down' }, { status: 503 });
  }
}
