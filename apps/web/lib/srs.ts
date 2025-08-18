export interface ReviewState {
  ef: number;
  interval: number;
}

export function sm2(prev: ReviewState | null, grade: number) {
  let ef = prev?.ef ?? 2.5;
  let interval = prev?.interval ?? 0;

  if (grade < 3) {
    interval = 1;
  } else {
    if (!prev) {
      interval = 1;
    } else if (prev.interval === 1) {
      interval = 6;
    } else {
      interval = Math.round(prev.interval * ef);
    }
    ef = ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (ef < 1.3) ef = 1.3;
  }
  const due = new Date();
  due.setDate(due.getDate() + interval);
  return { ef, interval, due };
}
