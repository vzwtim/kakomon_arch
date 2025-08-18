import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user.id || 'anon';

  const dueLog = await prisma.reviewLog.findFirst({
    where: { userId, due: { lte: new Date() } },
    orderBy: { due: 'asc' },
  });

  let question;
  if (dueLog) {
    question = await prisma.question.findUnique({
      where: { id: dueLog.questionId },
      include: { choices: true },
    });
  } else {
    question = await prisma.question.findFirst({ include: { choices: true } });
  }

  return NextResponse.json(question);
}
