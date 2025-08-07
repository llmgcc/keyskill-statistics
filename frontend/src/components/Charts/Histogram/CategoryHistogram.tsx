import { memo } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { KeySkill } from '@/interfaces';
import { useCategorySalaryData } from '@/hooks/data/useCategorySalaryData';

import { Histogram } from './Histogram';
import { SalaryTooltip } from './SalaryTooltip';

interface CategoryHistogramProps {
  category: KeySkill | null;
}

function CategoryHistogram_({ category }: CategoryHistogramProps) {
  const { from, to, chart, isFetching, isLoading } = useCategorySalaryData(
    category?.name ?? null,
    25
  );
  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading || !category?.name}
        className={`size-full ${isLoading && 'bg-background-secondary'}`}
      >
        {!(isLoading || isFetching || !category?.name) && (
          <Histogram
            data={{
              data: chart,
              from,
              to,
            }}
            tooltip={<SalaryTooltip />}
            sparkline={true}
            height={40}
          />
        )}
      </Skeleton>
    </div>
  );
}

export const CategoryHistogram = memo(CategoryHistogram_);
