import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createRouteClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const subject = searchParams.get('subject');
  const topic = searchParams.get('topic');
  const topicsOnly = searchParams.get('topics');
  const due = searchParams.get('due');

  const supabase = createRouteClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (topicsOnly && subject) {
    const topics = await prisma.question.findMany({
      where: { subject },
      select: { topic: true },
      distinct: ['topic'],
    });
    return NextResponse.json(topics.map((t) => t.topic));
  }

  if (due === 'today') {
    const today = new Date();
    const logs = await prisma.reviewLog.findMany({
      where: { userId: user.id, due: { lte: today } },
      include: {
        Question: {
          include: { choices: true },
        },
      },
    });
    return NextResponse.json(logs.map((l) => l.Question));
  }

  const question = await prisma.question.findFirst({
    where: { subject: subject || undefined, topic: topic || undefined },
    include: { choices: true },
  });

  return NextResponse.json(question);
}
