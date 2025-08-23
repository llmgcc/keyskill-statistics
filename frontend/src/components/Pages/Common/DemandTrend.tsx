import { Trans, useTranslation } from 'react-i18next';
import colors from 'tailwindcss/colors';

import { Chart } from '@/interfaces';
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

interface ChartData {
  from: number | null;
  to: number | null;
  chart: Chart[];
}

interface DemandTrendProps {
  data: TrendData | null;
  isDataReady: boolean;
  chartData: ChartData;
  isChartLoading: boolean;
  tooltip: JSX.Element;
}

export function DemandTrend({
  data,
  isDataReady,
  chartData,
  isChartLoading,
  tooltip,
}: DemandTrendProps) {
  const { period } = useFilters();

  const from = chartData.from;
  const to = chartData.to;
  const chart = chartData.chart;

  const { t } = useTranslation();

  const mentions = data?.count ?? 0;
  const prevMentions = data?.prev_count ?? 0;
  const difference = prevMentions && mentions ? mentions - prevMentions : null;

  const text = <span className="font-bold" />;

  return (
    <Overlay isLoading={!data} isFetching={isChartLoading || !isDataReady}>
      <div className="z-10 rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="flex items-center gap-1 text-base font-[500]">
          <div>{t('charts.demandTrend')}</div>
          <div className="text-sm text-text-secondary">{tooltip}</div>
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
              strokeWidth={4}
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
    </Overlay>
  );
}
