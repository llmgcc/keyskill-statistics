import { skillName } from '@/utils/common';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useSkillTrendData } from '@/hooks/data/useSkillTrendData';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { DemandTrend } from '../Common/DemandTrend';

interface SkillTrendProps {
  skill: KeySkill | null;
  isDataReady: boolean;
}

export function SkillTrend({ skill, isDataReady }: SkillTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useSkillTrendData(
    skill?.name ?? null,
    25
  );
  const { i18n, t } = useTranslation();

  return (
    <DemandTrend
      data={skill}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={t('common.mentions')}
          name={skillName(skill, i18n.language)}
          translationKey="charts.tooltips.demand.skill"
          count={skill?.count}
          prevCount={skill?.prev_count}
        />
      }
    />
  );
}
