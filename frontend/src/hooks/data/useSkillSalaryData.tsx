import { API } from '@/api/api';
import { useCurrencyStore } from '@/store/currencyStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillSalaryData(skill: string, numberOfBins = 20) {
  const { period, experience } = useFilters();
  const selectedCurrency = useCurrencyStore((state) => state.selectedCurrency);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`skill_salary_distribution`, period, experience, numberOfBins],
    queryFn: async () => {
      const data = await API.salaryPlot(
        skill,
        period,
        experience,
        numberOfBins,
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const chartData = [];
  if (data?.chart?.length) {
    for (let i = 1; i <= numberOfBins; i++) {
      const index = data.chart.findIndex((p) => p.bin == i);
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
    data: chartData,
    isLoading,
    isFetching,
  };
}
