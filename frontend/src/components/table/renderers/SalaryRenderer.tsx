import { SalaryChart } from '@/interfaces';
import { Skeleton } from '@radix-ui/themes';

import { Experience } from '@/config/experience';
import { SkillHist } from '@/components/plot/Hist';

import { ProgressBar } from './ProgressBar';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';

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
  maxCount,
  isLoading,
  selectedPeriod,
  selectedExperience,
  name,
  key,
  source,
}: SalaryRendererProps) {
  const color = 'rgb(var(--color-background-secondary))';
  const salary = count;
  return (
    <div className="relative w-full">
      <div className="flex justify-end text-text">
        <CurrencyDisplay valueInRUB={salary}/>
      </div>
      {salary && <ProgressBar count={count} maxCount={maxCount} offset={-10} />}

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
