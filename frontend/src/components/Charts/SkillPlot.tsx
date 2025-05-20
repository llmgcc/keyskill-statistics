import { Chart } from '@/interfaces';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

import { Plot } from './Plot';

interface SkillPlotProps {
  name: string;
  plotKey: string;
  source(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<Chart[]>;
  period: number;
  color: string;
  strokeWidth: number;
  experience?: Experience;
}

export function SkillPlot({
  name,
  source,
  plotKey,
  period,
  color,
  experience,
}: SkillPlotProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`${name}_plot_${plotKey}`, period, experience],
    queryFn: async () => {
      const data = await source(
        name,
        period,
        experience == Experience.any ? undefined : (experience ?? undefined),
      );
      return data ?? [];
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const chartData = [];
  if (data) {
    const COUNT_BINS = 15;
    for (let i = 1; i <= (COUNT_BINS ?? 1); i++) {
      const index = data.findIndex((p) => p.bin == i);
      if (index !== -1) {
        chartData.push(data[index].count);
      } else {
        chartData.push(0);
      }
    }
  }

  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading || isFetching || !chartData.length}
        className="size-full"
      >
        {!!chartData.length && <Plot data={chartData} color={color} />}
      </Skeleton>
    </div>
  );
}
