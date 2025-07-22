interface CircleProgressProps {
  value: number;
  maxValue: number;
}

export function CircleProgress({ value, maxValue }: CircleProgressProps) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 36 36">
      <path
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="rgb(var(--color-background-secondary))"
        strokeWidth="5"
      />
      <path
        d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="rgb(var(--color-background-gray))"
        strokeWidth="5"
        strokeDasharray={`${(value / maxValue) * 100}, 100`}
      />
    </svg>
  );
}
