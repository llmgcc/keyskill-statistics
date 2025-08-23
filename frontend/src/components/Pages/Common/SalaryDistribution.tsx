import { useTranslation } from 'react-i18next';

import { Chart } from '@/interfaces';
import { useCurrencyValue } from '@/hooks/useCurrencyValue';
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay';
import { Overlay } from '@/components/ui/Overlay';

import { Histogram } from '../../Charts/Histogram/Histogram';
import { SalaryTooltip } from '../../Charts/Histogram/SalaryTooltip';
import { ValueChangeRenderer } from '../../Table/renderers/ValueChangeRenderer';

export interface HistData {
  name: string;
  average_salary?: number;
  prev_average_salary?: number;
}

interface ChartData {
  from: number | null;
  to: number | null;
  chart: Chart[];
}

interface SalaryDistributionProps {
  data: HistData | null;
  isDataReady: boolean;
  chartData: ChartData;
  isChartLoading: boolean;
  tooltip: JSX.Element;
}

export function SalaryDistribution({
  data,
  isDataReady,
  chartData,
  isChartLoading,
  tooltip,
}: SalaryDistributionProps) {
  const { t } = useTranslation();

  const from = chartData.from;
  const to = chartData.to;
  const chart = chartData.chart;

  const { value: medianConverted, code } = useCurrencyValue(
    data?.average_salary ?? 0
  );
  const { value: prevMedianConverted } = useCurrencyValue(
    data?.prev_average_salary ?? 0
  );

  const difference = medianConverted - prevMedianConverted;

  return (
    <Overlay isLoading={!data} isFetching={isChartLoading || !isDataReady}>
      <div className="rounded border-[1px] border-background-secondary p-3 shadow-sm shadow-background-secondary">
        <div className="flex items-center gap-1 text-base font-[500]">
          <div className="text-base font-[500]">
            {t('charts.salaryDistribution')}
          </div>
          <div className="text-sm text-text-secondary">{tooltip}</div>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="text-3xl font-bold">
            <CurrencyDisplay valueInRUB={data?.average_salary ?? 0} />
          </div>
          <div className="flex flex-col items-end">
            <div className="mx-1 flex items-center text-xs">
              <ValueChangeRenderer
                current={medianConverted}
                prev={prevMedianConverted}
                percent={true}
              />
            </div>
            <div className="mx-1 text-xs text-text-secondary">
              {difference >= 0 ? '+' : ''}
              {difference.toLocaleString([], {
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
              })}{' '}
              {code}
            </div>
          </div>
        </div>
        <div className="mb-2 text-xs text-text-secondary">
          {t('charts.salarySubtitle')}
        </div>

        <div className="h-52 w-full">
          {!!to && (
            <Histogram
              data={{
                data: chart,
                from: from ?? 0,
                to: to ?? 0,
                median: medianConverted,
              }}
              tooltip={<SalaryTooltip />}
            />
          )}
        </div>
      </div>
    </Overlay>
  );
}
