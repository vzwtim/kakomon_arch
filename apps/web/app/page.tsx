'use client';
import useSWR from 'swr';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

const subjects = ['計画', '環設備', '法規', '構造', '施工'];
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Page() {
  const { data } = useSWR('/api/session', fetcher);
  return (
    <div>
      <h1>Arch Exam Drill</h1>
      <ThemeToggle />
      {data && (
        <div>
          <p>今日の解答数: {data.todaySolved}</p>
          <p>正答率: {(data.correctRate * 100).toFixed(0)}%</p>
          <p>連続学習日数: {data.streakDays}</p>
          <p>今日の復習: {data.dueCount}問</p>
        </div>
      )}
      <ul>
        {subjects.map((s) => (
          <li key={s}>
            <Link href={`/${encodeURIComponent(s)}`}>{s}</Link>
          </li>
        ))}
      </ul>
      <Link href="/review">今日の復習へ</Link>
    </div>
  );
}
