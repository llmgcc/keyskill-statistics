import { memo } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { KeySkill } from '@/interfaces';
import { useDomainSalaryData } from '@/hooks/data/useDomainSalaryData';
import { useCurrencyValue } from '@/hooks/useCurrencyValue';

import { Histogram } from './Histogram';
import { SalaryTooltip } from './SalaryTooltip';

interface DomainHistogramProps {
  domain: KeySkill | null;
}

function DomainHistogram_({ domain }: DomainHistogramProps) {
  const { from, to, chart, isFetching, isLoading } = useDomainSalaryData(
    domain?.name ?? null,
    25
  );
  const { value: medianConverted } = useCurrencyValue(
    domain?.average_salary ?? 0
  );
  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading || !domain?.name}
        className={`size-full ${isLoading && 'bg-background-secondary'}`}
      >
        {!(isLoading || isFetching || !domain?.name) && (
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

export const DomainHistogram = memo(DomainHistogram_);
