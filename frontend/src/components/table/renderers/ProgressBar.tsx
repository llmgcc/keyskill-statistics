interface ProgressBarProps {
  count: number;
  maxCount: number;
  offset: number;
}

export function ProgressBar({ count, maxCount, offset }: ProgressBarProps) {
  const width = (count / maxCount) * 100;

  return (
    <div
      className="absolute flex h-[4px] w-full rounded bg-background-secondary text-text"
      style={{ bottom: offset }}
    >
      <div
        className={`z-20 rounded bg-text-secondary/45`}
        style={{ width: `${Math.max(5, width)}%` }}
      ></div>
    </div>
  );
}
