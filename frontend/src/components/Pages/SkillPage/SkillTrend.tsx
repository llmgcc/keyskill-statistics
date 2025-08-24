import { skillName } from '@/utils/common';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { KeySkill } from '@/interfaces';
import { useSkillTrendData } from '@/hooks/data/useSkillTrendData';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { DemandTrend } from '../Common/DemandTrend';

interface SkillTrendProps {
  skill: KeySkill | null;
  isDataReady: boolean;
}

function SkillTrend_({ skill, isDataReady }: SkillTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useSkillTrendData(
    skill?.name ?? null,
    25
  );
  const { i18n, t } = useTranslation();

  const chartData = useMemo(
    () => ({ from: from ?? null, to: to ?? null, chart }),
    [from, to, chart]
  );
  const tooltip = useMemo(
    () => (
      <ChartsTooltip
        unit={t('common.mentions')}
        name={skillName(skill, i18n.language)}
        translationKey="charts.tooltips.demand.skill"
        count={skill?.count}
        prevCount={skill?.prev_count}
      />
    ),
    [skill, i18n.language, t]
  );

  return (
    <DemandTrend
      data={skill}
      isDataReady={isDataReady}
      chartData={chartData}
      isChartLoading={isLoading || isFetching}
      tooltip={tooltip}
    />
  );
}

export const SkillTrend = memo(SkillTrend_);
