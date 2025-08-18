'use client';
import { useState, useEffect } from 'react';

interface Choice {
  id: string;
  label: string;
  text: string;
  correct: boolean;
}

interface Question {
  id: string;
  stem: string;
  explanation: string;
  explanationDeep?: string | null;
  format: string;
  choices: Choice[];
}

export function QuestionCard({ question, onAnswered }: { question: Question; onAnswered?: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time <= 0 || showResult) return;
    const t = setInterval(() => setTime((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [time, showResult]);

  const submit = (choice: Choice) => {
    if (showResult) return;
    setSelected(choice.label);
    setShowResult(true);
    const grade = choice.correct ? 5 : 2;
    fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: question.id, grade }),
    }).then(() => onAnswered && onAnswered());
  };

  return (
    <div>
      <p>残り時間: {time}s</p>
      <p>{question.stem}</p>
      <ul>
        {question.choices.map((c) => (
          <li key={c.label}>
            <button onClick={() => submit(c)} disabled={showResult}>
              {c.label}: {c.text}
            </button>
          </li>
        ))}
      </ul>
      {showResult && (
        <div>
          <p>
            {selected &&
            question.choices.find((c) => c.label === selected)?.correct
              ? '正解'
              : '不正解'}
          </p>
          <p>{question.explanation}</p>
          {question.explanationDeep && <p>{question.explanationDeep}</p>}
        </div>
      )}
    </div>
  );
}
