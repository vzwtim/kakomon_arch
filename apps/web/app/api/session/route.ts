import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const stats = session?.user
    ? await prisma.userStat.findUnique({ where: { userId: session.user.id } })
    : null;
  return NextResponse.json({ session, stats });
}
