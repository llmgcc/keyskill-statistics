import { API } from '@/api/api';
import { useMemo } from 'react';
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
      const data = await API.charts.categoryTrend({
        name: category ?? '',
        period,
        experience,
        numberOfBins,
      });
      return data;
    },
    enabled: !!category,
    placeholderData: keepPreviousData,
  });

  const currentData = data;

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
    from: currentData?.date_from,
    to: currentData?.date_to,
    chart: chartData,
    isLoading,
    isFetching,
  };
}
