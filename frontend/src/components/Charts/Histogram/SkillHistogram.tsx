import { memo } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { KeySkill } from '@/interfaces';
import { useSkillSalaryData } from '@/hooks/data/useSkillSalaryData';
import { useCurrencyValue } from '@/hooks/useCurrencyValue';

import { Histogram } from './Histogram';
import { SalaryTooltip } from './SalaryTooltip';

interface SkillHistogramProps {
  skill: KeySkill | null;
  relatedTo: string | null;
}

function SkillHistogram_({ skill, relatedTo }: SkillHistogramProps) {
  const { from, to, chart, isFetching, isLoading } = useSkillSalaryData(
    skill?.name ?? null,
    25,
    relatedTo
  );
  const { value: medianConverted } = useCurrencyValue(
    skill?.average_salary ?? 0
  );

  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading || !skill?.name}
        className={`size-full h-[40px] ${isLoading && 'bg-background-secondary'}`}
      >
        {!(isLoading || isFetching || !skill?.name) && (
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

export const SkillHistogram = memo(SkillHistogram_);
