import { API } from '@/api/api';
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
