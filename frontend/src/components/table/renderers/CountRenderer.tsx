import { memo } from 'react';

import { ProgressBar } from './ProgressBar';

interface CountRendererProps {
  count: number;
  maxCount: number;
}

export function _CountRenderer({ count, maxCount }: CountRendererProps) {
  return (
    <div className="relative w-full">
      <div className="flex w-full items-end justify-end font-[500]">
        {count}
      </div>
      <ProgressBar count={count} maxCount={maxCount} offset={-10} />
    </div>
  );
}

export const CountRenderer = memo(_CountRenderer);
