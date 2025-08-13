import colors from 'tailwindcss/colors';

interface CircleProgressProps {
  value: number;
  maxValue: number;
}

export function CircleProgress({ value, maxValue }: CircleProgressProps) {
  const percent = (value / maxValue) * 100;

  function color() {
    if (percent <= 25) return colors.red[500];
    return 'rgb(var(--color-background-accent))';
  }

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
        stroke={color()}
        strokeWidth="5"
        strokeDasharray={`${percent}, 100`}
      />
    </svg>
  );
}
