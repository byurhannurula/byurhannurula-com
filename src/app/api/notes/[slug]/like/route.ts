import { NextResponse } from 'next/server';

import { clientIp, isSlug } from '@/lib/request';
import { allow, changeLikes } from '@/lib/stats';

type Context = { params: Promise<{ slug: string }> };

async function change(request: Request, { params }: Context, by: 1 | -1) {
  const { slug } = await params;
  if (!isSlug(slug)) {
    return NextResponse.json({ error: 'Unknown note' }, { status: 400 });
  }
  try {
    if (!(await allow(`like:${clientIp(request)}`, 10, 60))) {
      return NextResponse.json(
        { error: 'Too many likes, try again in a minute.' },
        { status: 429, headers: { 'Retry-After': '60' } },
      );
    }
    return NextResponse.json({ likes: await changeLikes(slug, by) });
  } catch {
    return NextResponse.json({ error: 'Counter down' }, { status: 503 });
  }
}

export const POST = (request: Request, context: Context) =>
  change(request, context, 1);

export const DELETE = (request: Request, context: Context) =>
  change(request, context, -1);
