import { QuestionCard } from '@/components/question-card';

async function getQuestion(subject: string, topic: string) {
  const res = await fetch(
    `/api/questions?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}`,
    { cache: 'no-store' }
  );
  return res.json();
}

export default async function TopicPage({ params }: { params: { subject: string; topic: string } }) {
  const question = await getQuestion(params.subject, params.topic);
  if (!question) return <p>問題がありません</p>;
  return (
    <div>
      <h3>{params.topic}</h3>
      <QuestionCard question={question} />
    </div>
  );
}
