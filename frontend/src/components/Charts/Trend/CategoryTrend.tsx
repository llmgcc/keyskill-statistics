import { Skeleton } from '@chakra-ui/react';
import colors from 'tailwindcss/colors';

import { KeySkill } from '@/interfaces';
import { useCategoryTrendData } from '@/hooks/data/useCategoryTrendData';

import { MentionsTooltip } from './MentionsTooltip';
import { Trend } from './Trend';

interface CategoryTrendProps {
  category: KeySkill | null;
}

export function CategoryTrend({ category }: CategoryTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useCategoryTrendData(
    category?.name ?? null,
    25
  );

  const mentions = category?.count ?? 0;
  const prevMentions = category?.prev_count ?? 0;
  const difference = prevMentions && mentions ? mentions - prevMentions : null;

  const actualData = chart;
  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading}
        className={`size-full ${isLoading && 'bg-background-secondary'}`}
      >
        {!!to && !(isLoading || isFetching) && (
          <Trend
            data={{
              data: actualData,
              from: from ?? 0,
              to,
            }}
            sparkline={true}
            tooltip={<MentionsTooltip />}
            color={
              difference === 0
                ? colors.zinc[400]
                : difference && difference > 0
                  ? colors.emerald[500]
                  : colors.rose[500]
            }
            strokeWidth={2}
            height={40}
          />
        )}
      </Skeleton>
    </div>
  );
}
