import { API } from '@/api/api';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useCurrencyStore } from '@/store/currencyStore';

import { useFilters } from '../useFilters';

export function useCategorySalaryData(
  category: string | null,
  numberOfBins = 20
) {
  const { period, experience } = useFilters();
  const selectedCurrency = useCurrencyStore(state => state.selectedCurrency);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `category_salary_distribution`,
      period,
      experience,
      numberOfBins,
      category,
    ],
    queryFn: async () => {
      const data = await API.charts.categorySalary({
        name: category ?? '',
        period,
        experience,
        numberOfBins,
      });
      return data;
    },
    enabled: !!category,
  });

  const chartData = useMemo(() => {
    const newChart = [];
    if (data?.chart) {
      for (let i = 1; i <= numberOfBins; i++) {
        const index = data.chart.findIndex(p => p.bin == i);
        if (index !== -1) {
          newChart.push({
            bin: i,
            count: data.chart[index].count,
          });
        } else {
          newChart.push({
            bin: i,
            count: 0,
          });
        }
      }
      return newChart;
    }
    return data?.chart ?? [];
  }, [numberOfBins, data]);

  return {
    from: (data?.salary_from ?? 0) * (selectedCurrency?.currency_rate ?? 1),
    to: (data?.salary_to ?? 0) * (selectedCurrency?.currency_rate ?? 1),
    chart: chartData,
    isLoading,
    isFetching,
  };
}
