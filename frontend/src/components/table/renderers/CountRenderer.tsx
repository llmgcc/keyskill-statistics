import { memo } from 'react';

import { ProgressBar } from './ProgressBar';
import { ValueChangeRenderer } from './ValueChangeRenderer';

interface CountRendererProps {
  count: number;
  prev_count?: number;
  maxCount: number;
}

export function _CountRenderer({
  count,
  maxCount,
  prev_count,
}: CountRendererProps) {
  return (
    <div className="relative w-full">
      <div className="flex w-full items-end justify-end font-[500]">
        {count}
      </div>
      <div className="text-xs">
        {/* +23.5% */}
        <ValueChangeRenderer current={count} prev={prev_count} percent={true} />
      </div>
      {/* <ProgressBar count={count} maxCount={maxCount} offset={-10} /> */}
    </div>
  );
}

export const CountRenderer = memo(_CountRenderer);
