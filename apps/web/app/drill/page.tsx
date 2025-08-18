'use client';

import { useEffect, useState } from 'react';

type Choice = { id: string; label: string; text: string; correct: boolean };

type Question = {
  id: string;
  stem: string;
  explanation: string;
  explanationDeep?: string | null;
  choices: Choice[];
};

export default function DrillPage() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    fetch('/api/questions').then(res => res.json()).then(setQuestion);
  }, []);

  useEffect(() => {
    if (!showResult && timeLeft > 0) {
      const id = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(id);
    }
  }, [timeLeft, showResult]);

  const submit = async () => {
    if (!question || !selected) return;
    const correctChoice = question.choices.find(c => c.correct)?.id;
    const grade = selected === correctChoice ? 5 : 2;
    setShowResult(true);
    await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: question.id, grade }),
    });
  };

  if (!question) return <p>Loading...</p>;

  const correctId = question.choices.find(c => c.correct)?.id;

  return (
    <div>
      <p>Time left: {timeLeft}s</p>
      <p>{question.stem}</p>
      <ul>
        {question.choices.map(c => (
          <li key={c.id}>
            <label>
              <input
                type="radio"
                name="choice"
                disabled={showResult}
                onChange={() => setSelected(c.id)}
              />
              {c.label}. {c.text}
            </label>
          </li>
        ))}
      </ul>
      {!showResult ? (
        <button onClick={submit} disabled={!selected}>
          Answer
        </button>
      ) : (
        <div>
          <p>{question.explanation}</p>
          {selected !== correctId && question.explanationDeep && (
            <p>{question.explanationDeep}</p>
          )}
        </div>
      )}
    </div>
  );
}
