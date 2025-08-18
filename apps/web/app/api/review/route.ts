import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { sm2 } from '@/lib/srs';

export async function POST(req: Request) {
  const { questionId, grade } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id || 'anon';

  const last = await prisma.reviewLog.findFirst({
    where: { userId, questionId },
    orderBy: { createdAt: 'desc' },
  });

  const { ef, interval } = sm2(grade, last?.ef ?? 2.5, last?.interval ?? 0);
  const due = new Date();
  due.setDate(due.getDate() + interval);

  await prisma.reviewLog.create({
    data: { userId, questionId, grade, ef, interval, due },
  });

  const correct = grade >= 3;
  const stat = await prisma.userStat.findUnique({ where: { userId } });
  if (stat) {
    const total = stat.todaySolved + 1;
    const correctTotal = stat.correctRate * stat.todaySolved + (correct ? 1 : 0);
    await prisma.userStat.update({
      where: { userId },
      data: {
        todaySolved: total,
        correctRate: correctTotal / total,
      },
    });
  } else {
    await prisma.userStat.create({
      data: { userId, streakDays: 1, todaySolved: 1, correctRate: correct ? 1 : 0 },
    });
  }

  return NextResponse.json({ due });
}
