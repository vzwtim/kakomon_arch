import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

interface Choice {
  label: string;
  text: string;
  correct: boolean;
}

interface Question {
  subject: string;
  topic: string;
  format: string;
  stem: string;
  explanation: string;
  explanationDeep?: string;
  choices: Choice[];
}

async function main() {
  const file = path.join(__dirname, '../../data/seed/questions.json');
  const questions: Question[] = JSON.parse(fs.readFileSync(file, 'utf-8'));
  for (const q of questions) {
    await prisma.question.create({
      data: {
        subject: q.subject,
        topic: q.topic,
        format: q.format,
        stem: q.stem,
        explanation: q.explanation,
        explanationDeep: q.explanationDeep,
        choices: {
          create: q.choices.map((c) => ({
            label: c.label,
            text: c.text,
            correct: c.correct,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
