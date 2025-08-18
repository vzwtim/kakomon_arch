import Link from 'next/link';

async function getTopics(subject: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/questions?subject=${encodeURIComponent(subject)}&topics=1`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    console.error('Failed to fetch topics', res.status, res.statusText);
    return [];
  }
  if (!res.ok) {
    console.error('Failed to fetch topics', res.status, res.statusText);
    return [];
  }
  return res.json();
}

export default async function SubjectPage({ params }: { params: { subject: string } }) {
  const topics: string[] = await getTopics(params.subject);
  return (
    <div>
      <h2>{params.subject}</h2>
      <ul>
        {topics.map((t) => (
          <li key={t}>
            <Link href={`/${encodeURIComponent(params.subject)}/${encodeURIComponent(t)}`}>{t}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
