import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useCategoryTrendData } from '@/hooks/data/useCategoryTrendData';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { DemandTrend } from '../Common/DemandTrend';

interface CategoryTrendProps {
  category: Category | null;
  isDataReady: boolean;
}

export function CategoryTrend({ category, isDataReady }: CategoryTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useCategoryTrendData(
    category?.name ?? null,
    25
  );
  const { t } = useTranslation();

  return (
    <DemandTrend
      data={category}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={t('common.mentions')}
          name={category?.name ? t(`categories.${category.name}`) : null}
          translationKey="charts.tooltips.demand.category"
          count={category?.count}
          prevCount={category?.prev_count}
        />
      }
    />
  );
}
