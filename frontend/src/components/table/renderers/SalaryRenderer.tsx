import { KeySkill } from '@/interfaces';
import { useStatsStore } from '@/store/statsStore';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { SkillHistogram } from '@/components/Charts/Histogram/SkillHistogram';

import { ProgressBar } from './ProgressBar';

interface SalaryRendererProps {
  skill: KeySkill | null;
  realtedTo?: string | null;
}

export function SalaryRenderer({ skill, realtedTo }: SalaryRendererProps) {
  const { stats } = useStatsStore();

  const salary = skill?.average_salary ?? 0;
  return (
    <div className="relative size-full">
      {!!salary && (
        <ProgressBar
          count={salary}
          maxCount={stats?.max_salary ?? 0}
          offset={-5}
        />
      )}

      <div className="absolute bottom-[-6px] left-0 z-10 w-full">
        <SkillHistogram skill={skill} relatedTo={realtedTo ?? null} />
      </div>

      <div className="relative z-50 text-text">
        <CurrencyDisplay valueInRUB={salary} />
      </div>
    </div>
  );
}
