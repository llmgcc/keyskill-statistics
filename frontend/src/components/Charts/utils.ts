export function generateTicks(
  start: number,
  end: number,
  numberOfTicks: number
) {
  const ticks = [];
  const interval = (end - start) / (numberOfTicks - 1);
  let currentTick = start;
  for (let i = 0; i < numberOfTicks; i++) {
    ticks.push(currentTick.toFixed(1));
    currentTick += interval;
  }
  return ticks;
}
