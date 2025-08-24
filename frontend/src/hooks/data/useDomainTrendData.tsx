import { API } from '@/api/api';
import { useMemo } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useDomainTrendData(domain: string | null, numberOfBins = 20) {
  const { period, experience } = useFilters();

  const queryKey = [`domain_trend`, period, experience, domain, numberOfBins];

  const { data, isLoading, isFetching } = useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      const data = await API.charts.domainTrend({
        name: domain ?? '',
        period,
        experience,
        numberOfBins,
      });
      return data;
    },
    enabled: !!domain,
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
