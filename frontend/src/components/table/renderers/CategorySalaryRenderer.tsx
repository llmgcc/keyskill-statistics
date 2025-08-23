import { KeySkill } from '@/interfaces';
import { useStatsStore } from '@/store/statsStore';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { CategoryHistogram } from '@/components/Charts/Histogram/CategoryHistogram';

import { ProgressBar } from './ProgressBar';

interface SalaryRendererProps {
  category: KeySkill | null;
}

export function CategorySalaryRenderer({ category }: SalaryRendererProps) {
  const { stats } = useStatsStore();

  const salary = category?.average_salary ?? 0;
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
            <CategoryHistogram category={category} />
          </div>
        </>
      )}

      <div className="relative z-50 text-text">
        <CurrencyDisplay valueInRUB={salary} />
      </div>
    </div>
  );
}
