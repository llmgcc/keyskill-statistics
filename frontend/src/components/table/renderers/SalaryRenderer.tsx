import { SalaryChart } from '@/interfaces';
import { useStatsStore } from '@/store/statsStore';
import { Skeleton } from '@radix-ui/themes';

import { Experience } from '@/config/experience';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { SkillHist } from '@/components/plot/Hist';

import { ProgressBar } from './ProgressBar';

interface SalaryRendererProps {
  count?: number;
  maxCount: number;
  isLoading: boolean;
  selectedPeriod: number;
  selectedExperience?: Experience;
  name: string;
  key: string;
  source(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart>;
}

export function SalaryRenderer({
  count,
  isLoading,
  selectedPeriod,
  selectedExperience,
  name,
  key,
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
        {!isLoading && (
          <SkillHist
            name={name}
            key={key}
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
