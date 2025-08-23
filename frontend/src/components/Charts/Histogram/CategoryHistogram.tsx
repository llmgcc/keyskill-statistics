import { memo } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { KeySkill } from '@/interfaces';
import { useCategorySalaryData } from '@/hooks/data/useCategorySalaryData';
import { useCurrencyValue } from '@/hooks/useCurrencyValue';

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
  const { value: medianConverted } = useCurrencyValue(
    category?.average_salary ?? 0
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
              median: medianConverted,
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
