import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useDomainTrendData } from '@/hooks/data/useDomainTrendData';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { DemandTrend } from '../Common/DemandTrend';

interface DomainTrendProps {
  domain: Category | null;
  isDataReady: boolean;
}

export function DomainTrend({ domain, isDataReady }: DomainTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useDomainTrendData(
    domain?.name ?? null,
    25
  );
  const { t } = useTranslation();

  return (
    <DemandTrend
      data={domain}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={t('common.mentions')}
          name={domain?.name ? t(`domains.${domain.name}`) : null}
          translationKey="charts.tooltips.demand.domain"
          count={domain?.count}
          prevCount={domain?.prev_count}
        />
      }
    />
  );
}
