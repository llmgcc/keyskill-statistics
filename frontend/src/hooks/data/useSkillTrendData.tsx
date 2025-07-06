import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillTrendData(skill: string, numberOfBins = 20) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`skill_trend`, period, experience, skill, numberOfBins],
    queryFn: async () => {
      const data = await API.skillPlot(skill, period, experience, 25);
      return data;
    },
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
    from: data?.date_from,
    to: data?.date_to,
    data: chartData,
    isLoading,
    isFetching,
  };
}
