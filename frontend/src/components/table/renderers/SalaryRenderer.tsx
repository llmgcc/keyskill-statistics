import { Skeleton } from '@radix-ui/themes';

import { SalaryChart } from '@/interfaces';
import { Experience } from '@/config/experience';
import { useStatsStore } from '@/store/statsStore';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { SkillHist } from '@/components/Charts/SkillHist';

import { ProgressBar } from './ProgressBar';

interface SalaryRendererProps {
  count?: number;
  maxCount: number;
  isLoading: boolean;
  selectedPeriod: number;
  selectedExperience?: Experience;
  name: string;
  plotKey: string;
  source(
    name: string,
    period: number,
    experience?: Experience
  ): Promise<SalaryChart>;
}

export function SalaryRenderer({
  count,
  isLoading,
  selectedPeriod,
  selectedExperience,
  name,
  plotKey,
  source,
}: SalaryRendererProps) {
  const { stats } = useStatsStore();

  const color = 'rgb(var(--color-background-secondary))';
  const salary = count;
  return (
    <div className="relative size-full w-full">
      <div className="z-50 flex justify-end text-text">
        <CurrencyDisplay valueInRUB={salary} />
      </div>
      {!!salary && (
        <ProgressBar
          count={count}
          maxCount={stats?.max_salary ?? 0}
          offset={-10}
        />
      )}

      <Skeleton loading={isLoading} className="size-full">
        {!isLoading && !!salary && salary > 0 && (
          <SkillHist
            name={name}
            plotKey={plotKey}
            source={source}
            period={selectedPeriod}
            color={color}
            average={count ?? 0}
            experience={selectedExperience ?? null}
          />
        )}
      </Skeleton>
    </div>
  );
}
