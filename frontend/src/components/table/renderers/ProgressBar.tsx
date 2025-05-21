import { memo } from 'react';

interface ProgressBarProps {
  count: number;
  maxCount: number;
  offset: number;
}

function _ProgressBar({ count, maxCount, offset }: ProgressBarProps) {
  const width = (count / maxCount) * 100;

  return (
    <div
      className="absolute flex h-[4px] w-full rounded bg-background-secondary text-text"
      style={{ bottom: offset }}
    >
      <div
        className={`z-20 rounded bg-background-gray`}
        style={{ width: `${Math.min(Math.max(5, width), 100)}%` }}
      ></div>
    </div>
  );
}

export const ProgressBar = memo(_ProgressBar);
