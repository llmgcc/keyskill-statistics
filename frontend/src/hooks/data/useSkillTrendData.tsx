import { API } from '@/api/api';
import { useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillTrendData(
  skill: string | null,
  numberOfBins = 20,
  relatedTo?: string | null
) {
  const { period, experience } = useFilters();

  const queryKey = [
    `skill_trend`,
    period,
    experience,
    skill,
    numberOfBins,
    relatedTo,
  ];

  const { data, isLoading, isFetching } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await API.charts.skillTrend({
        name: skill ?? '',
        period,
        experience,
        numberOfBins,
        relatedTo,
      });
      return data;
    },
    enabled: !!skill,
    placeholderData: keepPreviousData,
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
    from: data?.date_from,
    to: data?.date_to,
    chart: chartData,
    isLoading,
    isFetching,
  };
}
