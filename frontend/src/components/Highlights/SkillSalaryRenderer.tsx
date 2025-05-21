import { memo } from 'react';
import { KeySkill } from '@/interfaces';

import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';

interface SkillSalaryRendererProps {
  skill: KeySkill;
}

function _SkillSalaryRenderer({ skill }: SkillSalaryRendererProps) {
  if (!skill.average_salary) {
    return null;
  }
  return (
    <div className="text-xs text-text-primary">
      <CurrencyDisplay valueInRUB={skill.average_salary} />
    </div>
  );
}

export const SkillSalaryRenderer = memo(_SkillSalaryRenderer);
