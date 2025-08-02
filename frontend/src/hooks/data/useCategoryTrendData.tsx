import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useCategoryTrendData(
  category: string | null,
  numberOfBins = 20
) {
  const { period, experience } = useFilters();

  const queryKey = [
    `category_trend`,
    period,
    experience,
    category,
    numberOfBins,
  ];

  const { data, isLoading, isFetching } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await API.categoryPlot(
        category ?? '',
        period,
        experience,
        numberOfBins
      );
      return data;
    },
    enabled: !!category,
    placeholderData: keepPreviousData,
  });

  const currentData = data;

  const chartData = [];
  if (currentData?.chart) {
    for (let i = 1; i <= numberOfBins; i++) {
      const index = currentData.chart.findIndex(p => p.bin == i);
      if (index !== -1) {
        chartData.push({
          bin: i,
          count: currentData.chart[index].count,
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
    from: currentData?.date_from,
    to: currentData?.date_to,
    chart: chartData,
    isLoading,
    isFetching,
  };
}
