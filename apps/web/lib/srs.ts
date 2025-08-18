export function sm2(grade: number, prevEf: number, prevInterval: number) {
  let ef = prevEf;
  let interval = 1;
  if (grade < 3) {
    interval = 1;
  } else {
    ef = Math.max(
      1.3,
      prevEf + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
    );
    if (prevInterval === 0) interval = 1;
    else if (prevInterval === 1) interval = 6;
    else interval = Math.round(prevInterval * ef);
  }
  return { ef, interval };
}
