import { Trans, useTranslation } from 'react-i18next';
import { BiInfoCircle } from 'react-icons/bi';
import colors from 'tailwindcss/colors';

import { useSkillTrendData } from '@/hooks/data/useSkillTrendData';
import { useFilters } from '@/hooks/useFilters';
import { Overlay } from '@/components/ui/Overlay';

import { MentionsTooltip } from '../../Charts/Trend/MentionsTooltip';
import { Trend } from '../../Charts/Trend/Trend';
import { ValueChangeRenderer } from '../../Table/renderers/ValueChangeRenderer';

interface TrendData {
  name: string;
  count?: number;
  prev_count?: number;
}

interface DemandTrendProps {
  data: TrendData | null;
  isDataReady: boolean;
}

export function DemandTrend({ data, isDataReady }: DemandTrendProps) {
  const { period } = useFilters();

  const { from, to, chart, isLoading, isFetching } = useSkillTrendData(
    data?.name ?? null,
    25
  );
  const { t } = useTranslation();

  const mentions = data?.count ?? 0;
  const prevMentions = data?.prev_count ?? 0;
  const difference = prevMentions && mentions ? mentions - prevMentions : null;

  const text = <span className="font-bold" />;

  return (
    <div className="relative">
      <Overlay
        isLoading={!data}
        isFetching={isLoading || isFetching || !isDataReady}
      />

      <div className="z-10 rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="flex items-center gap-1 text-base font-[500]">
          <div>{t('charts.demandTrend')}</div>
          <div className="text-text-secondary">
            <BiInfoCircle />
          </div>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="text-3xl font-bold">{mentions ?? 0}</div>
          <div className="flex flex-col items-end">
            <div className="mx-1 flex items-center text-xs text-green-400">
              <ValueChangeRenderer
                current={mentions ?? 0}
                prev={prevMentions ?? 0}
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
                data: chart,
                from,
                to,
              }}
              tooltip={<MentionsTooltip />}
              color={
                difference === 0
                  ? colors.zinc[400]
                  : difference && difference > 0
                    ? colors.emerald[500]
                    : colors.rose[500]
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}
