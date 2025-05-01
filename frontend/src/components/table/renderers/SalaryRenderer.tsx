import { API } from '@/api/api';
import { SalaryChart } from '@/interfaces';
import { Skeleton } from '@radix-ui/themes';

import { Experience } from '@/config/experience';
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
  maxCount,
  isLoading,
  selectedPeriod,
  selectedExperience,
  name,
  key,
  source,
}: SalaryRendererProps) {
  const color = 'rgba(229, 231, 235)';
  const salary = count;
  return (
    <div className="relative w-full">
      <div className="flex justify-end text-text">
        {salary ? (
          <div className="z-40 font-[500]">
            <>
              <span className="">₽</span>
              {Number(count).toFixed(0)}
            </>
          </div>
        ) : (
          <div>N/A</div>
        )}
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
