import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useCurrencyStore } from '@/store/currencyStore';

import { useFilters } from '../useFilters';

export function useDomainSalaryData(domain: string | null, numberOfBins = 20) {
  const { period, experience } = useFilters();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `domain_salary_distribution`,
      period,
      experience,
      numberOfBins,
      domain,
    ],
    queryFn: async () => {
      const data = await API.charts.domainSalary({
        name: domain ?? '',
        period,
        experience,
        numberOfBins,
      });
      return data;
    },
    enabled: !!domain,
  });

  const chartData = [];
  if (data?.chart) {
    for (let i = 1; i <= numberOfBins; i++) {
      const index = data.chart.findIndex(p => p.bin == i);
      if (index !== -1) {
        chartData.push({
          bin: i,
          count: data.chart[index].count,
        });
      } else {
        chartData.push({
          bin: i,
          count: 0,
        });
      }
    }
  }

  return {
    from: (data?.salary_from ?? 0) * (selectedCurrency?.currency_rate ?? 1),
    to: (data?.salary_to ?? 0) * (selectedCurrency?.currency_rate ?? 1),
    chart: chartData,
    isLoading,
    isFetching,
  };
}
