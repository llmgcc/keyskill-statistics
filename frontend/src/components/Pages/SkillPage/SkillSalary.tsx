import { skillName } from '@/utils/common';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useSkillSalaryData } from '@/hooks/data/useSkillSalaryData';
import { useCurrencyStore } from '@/store/currencyStore';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { SalaryDistribution } from '../Common/SalaryDistribution';

interface SkillSalaryProps {
  skill: KeySkill | null;
  isDataReady: boolean;
}

export function SkillSalary({ skill, isDataReady }: SkillSalaryProps) {
  const { from, to, chart, isFetching, isLoading } = useSkillSalaryData(
    skill?.name ?? null,
    25
  );
  const { i18n } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);
  return (
    <SalaryDistribution
      data={skill}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={selectedCurrency?.currency_code ?? ''}
          name={skillName(skill, i18n.language)}
          translationKey="charts.tooltips.salary.skill"
          count={Math.trunc(
            (skill?.average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
          prevCount={Math.trunc(
            (skill?.prev_average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
        />
      }
    />
  );
}
