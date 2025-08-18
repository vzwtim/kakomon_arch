const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const file = path.join(__dirname, '../../data/seed/questions.json');
  const questions = JSON.parse(fs.readFileSync(file, 'utf-8'));
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
  .finally(() => prisma.$disconnect());
