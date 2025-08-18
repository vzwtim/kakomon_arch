import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRouteClient } from '@/lib/supabase-server';

export async function GET() {
  const supabase = createRouteClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const stat = await prisma.userStat.findUnique({ where: { userId: user.id } });
  const today = new Date();
  const dueCount = await prisma.reviewLog.count({
    where: { userId: user.id, due: { lte: today } },
  });

  return NextResponse.json({
    todaySolved: stat?.todaySolved ?? 0,
    correctRate: stat?.correctRate ?? 0,
    streakDays: stat?.streakDays ?? 0,
    dueCount,
  });
}
