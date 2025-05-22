import { memo } from 'react';
import { SalaryChart } from '@/interfaces';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

import { Hist } from './Hist';

interface SkillHistProps {
  name: string;
  plotKey: string;
  source(
    name: string,
    period: number,
    experience?: Experience,
  ): Promise<SalaryChart>;
  period: number;
  color: string;
  experience: Experience | null;
  average: number;
  height?: number;
}

export function _SkillHist({
  name,
  source,
  plotKey,
  period,
  color,
  experience,
}: SkillHistProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`${name}_hist_${plotKey}`, period, experience],
    queryFn: async () => {
      const data = await source(
        name,
        period,
        experience == Experience.any ? undefined : (experience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const chartData = [];
  if (data?.chart?.length) {
    const COUNT_BINS = 15;
    for (let i = 1; i <= (COUNT_BINS ?? 1); i++) {
      const index = data.chart.findIndex((p) => p.bin == i);
      if (index !== -1) {
        chartData.push(data.chart[index].count);
      } else {
        chartData.push(0);
      }
    }
  }
  return (
    <div className="relative z-10 size-full">
      <div className="absolute bottom-[-6px] -z-10 h-10 w-full">
        <div className="size-full">
          <div className="size-full">
            <Skeleton loading={isLoading || isFetching} className="size-full">
              {!!chartData?.length && <Hist data={chartData} color={color} />}
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SkillHist = memo(_SkillHist);
