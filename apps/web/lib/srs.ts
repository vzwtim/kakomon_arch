export interface ReviewState {
  ef: number;
  interval: number;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function updateSRS(prev: ReviewState | null, grade: number) {
  const state = prev ?? { ef: 2.5, interval: 0 };
  const ef = Math.max(
    1.3,
    state.ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
  );
  const interval =
    grade < 3
      ? 1
      : state.interval === 0
      ? 1
      : state.interval === 1
      ? 6
      : Math.round(state.interval * ef);
  const due = addDays(new Date(), interval);
  return { ef, interval, due };
}
