import { useTranslation } from 'react-i18next';

import { Category } from '@/interfaces';
import { useDomainSalaryData } from '@/hooks/data/useDomainSalaryData';
import { useCurrencyStore } from '@/store/currencyStore';

import { ChartsTooltip } from '../Common/ChartsTooltip';
import { SalaryDistribution } from '../Common/SalaryDistribution';

interface DomainSalaryProps {
  domain: Category | null;
  isDataReady: boolean;
}

export function DomainSalary({ domain, isDataReady }: DomainSalaryProps) {
  const { from, to, chart, isFetching, isLoading } = useDomainSalaryData(
    domain?.name ?? null,
    25
  );
  const { t } = useTranslation();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);
  return (
    <SalaryDistribution
      data={domain}
      isDataReady={isDataReady}
      chartData={{ from: from ?? null, to: to ?? null, chart }}
      isChartLoading={isLoading || isFetching}
      tooltip={
        <ChartsTooltip
          unit={selectedCurrency?.currency_code ?? ''}
          name={domain?.name ? t(`domains.${domain.name}`) : null}
          translationKey="charts.tooltips.salary.domain"
          count={Math.trunc(
            (domain?.average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
          prevCount={Math.trunc(
            (domain?.prev_average_salary || 0) *
              (selectedCurrency?.currency_rate || 1)
          )}
        />
      }
    />
  );
}
