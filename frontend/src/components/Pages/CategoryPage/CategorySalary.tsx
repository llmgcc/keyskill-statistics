import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useCategorySalaryData } from '@/hooks/data/useCategorySalaryData';
import { useCurrencyStore } from '@/store/currencyStore';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { SalaryDistribution } from '../Common/SalaryDistribution';

interface CategorySalaryProps {
  category: Category | null;
  isDataReady: boolean;
}

export function CategorySalary({ category, isDataReady }: CategorySalaryProps) {
  const { from, to, chart, isFetching, isLoading } = useCategorySalaryData(
    category?.name ?? null,
    25
  );
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);
  return (
    <SalaryDistribution
      data={category}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={selectedCurrency?.currency_code ?? ''}
          name={category?.name ? t(`categories.${category.name}`) : null}
          translationKey="charts.tooltips.salary.category"
          count={Math.trunc(
            (category?.average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
          prevCount={Math.trunc(
            (category?.prev_average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
        />
      }
    />
  );
}
