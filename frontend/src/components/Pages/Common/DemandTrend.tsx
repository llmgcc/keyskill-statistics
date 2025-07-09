import { Trans, useTranslation } from 'react-i18next';
import colors from 'tailwindcss/colors';

import { useSkillTrendData } from '@/hooks/data/useSkillTrendData';
import { useFilters } from '@/hooks/useFilters';

import { MentionsTooltip } from '../../Charts/Trend/MentionsTooltip';
import { Trend } from '../../Charts/Trend/Trend';
import { ValueChangeRenderer } from '../../Table/renderers/ValueChangeRenderer';

interface DemandTrendProps {
  name: string;
  mentions: number;
  prevMentions?: number;
}

export function DemandTrend({
  name,
  mentions,
  prevMentions,
}: DemandTrendProps) {
  const { period } = useFilters();
  const { from, to, data } = useSkillTrendData(name, 25);
  const { t } = useTranslation();

  const difference = prevMentions ? mentions - prevMentions : null;

  const text = <span className="font-bold" />;

  return (
    <div className="rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
      <div className="text-base font-[500]">{t('charts.demandTrend')}</div>
      <div className="mt-1 flex items-center justify-between text-xs">
        <div className="text-3xl font-bold">{mentions}</div>
        <div className="flex flex-col items-end">
          <div className="mx-1 flex items-center text-xs text-green-400">
            <ValueChangeRenderer
              current={mentions}
              prev={prevMentions}
              percent={true}
            />
          </div>
          <div className="mx-1 text-xs text-text-secondary">
            {difference && difference >= 0 ? '+' : ''}
            {difference ?? '-'} {t('columns.mentions').toLowerCase()}
          </div>
        </div>
      </div>
      <div className="mb-2 text-xs text-text-secondary">
        <Trans
          i18nKey="charts.trendSubtitle"
          components={{ text }}
          values={{
            days: period,
          }}
        />
      </div>

      <div className="h-52 w-full">
        {from && to && (
          <Trend
            data={{
              data,
              from,
              to,
            }}
            tooltip={<MentionsTooltip />}
            color={
              difference === 0
                ? colors.gray[400]
                : difference && difference > 0
                  ? colors.green[400]
                  : colors.red[400]
            }
          />
        )}
      </div>
    </div>
  );
}
