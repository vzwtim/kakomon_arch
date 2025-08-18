'use client';
import { useEffect, useState } from 'react';
import { QuestionCard } from '@/components/question-card';

interface Question {
  id: string;
  stem: string;
  explanation: string;
  explanationDeep?: string | null;
  format: string;
  choices: any[];
}

export default function ReviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/questions?due=today').then((r) => r.json()).then(setQuestions);
  }, []);

  const next = () => setIndex((i) => i + 1);
  const q = questions[index];

  if (!q) return <p>復習は完了です</p>;

  return (
    <div>
      <QuestionCard question={q} onAnswered={next} />
      <p>
        {index + 1} / {questions.length}
      </p>
    </div>
  );
}
