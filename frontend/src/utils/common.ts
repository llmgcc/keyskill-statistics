export function getPercentDifference(current: number, prev: number) {
  return ((current - prev) / prev) * 100;
}
