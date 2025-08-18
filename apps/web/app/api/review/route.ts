import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRouteClient } from '@/lib/supabase-server';
import { updateSRS } from '@/lib/srs';

export async function POST(req: Request) {
  const supabase = createRouteClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { questionId, grade } = body;
  if (!questionId || grade === undefined)
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });

  const lastForQuestion = await prisma.reviewLog.findFirst({
    where: { userId: user.id, questionId },
    orderBy: { createdAt: 'desc' },
  });
  const state = lastForQuestion
    ? { ef: lastForQuestion.ef, interval: lastForQuestion.interval }
    : null;
  const next = updateSRS(state, grade);

  const lastOverall = await prisma.reviewLog.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  await prisma.reviewLog.create({
    data: {
      userId: user.id,
      questionId,
      grade,
      ef: next.ef,
      interval: next.interval,
      due: next.due,
    },
  });

  const stat = await prisma.userStat.upsert({
    where: { userId: user.id },
    update: {},
    create: { userId: user.id },
  });

  const correct = grade >= 3 ? 1 : 0;
  const solved = stat.todaySolved + 1;
  const rate = (stat.correctRate * stat.todaySolved + correct) / solved;

  let streak = stat.streakDays;
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (!lastOverall || lastOverall.createdAt < yesterday) streak = 1;
  else if (lastOverall.createdAt < today && lastOverall.createdAt >= yesterday) streak += 1;

  await prisma.userStat.update({
    where: { userId: user.id },
    data: { todaySolved: solved, correctRate: rate, streakDays: streak },
  });

  return NextResponse.json({ due: next.due });
}
