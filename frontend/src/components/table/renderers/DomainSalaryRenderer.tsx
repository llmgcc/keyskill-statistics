import { KeySkill } from '@/interfaces';
import { useStatsStore } from '@/store/statsStore';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { DomainHistogram } from '@/components/Charts/Histogram/DomainHistogram';

import { ProgressBar } from './ProgressBar';

interface SalaryRendererProps {
  domain: KeySkill | null;
}

export function DomainSalaryRenderer({ domain }: SalaryRendererProps) {
  const { stats } = useStatsStore();

  const salary = domain?.average_salary ?? 0;
  return (
    <div className="relative size-full">
      {!!salary && (
        <>
          <ProgressBar
            count={salary}
            maxCount={stats?.max_salary ?? 0}
            offset={-5}
          />

          <div className="absolute bottom-[-6px] left-0 z-10 w-full">
            <DomainHistogram domain={domain} />
          </div>
        </>
      )}

      <div className="relative z-50 text-text">
        <CurrencyDisplay valueInRUB={salary} />
      </div>
    </div>
  );
}
