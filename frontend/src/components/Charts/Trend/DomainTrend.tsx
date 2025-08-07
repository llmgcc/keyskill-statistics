import { Skeleton } from '@chakra-ui/react';
import colors from 'tailwindcss/colors';

import { KeySkill } from '@/interfaces';
import { useDomainTrendData } from '@/hooks/data/useDomainTrendData';

import { MentionsTooltip } from './MentionsTooltip';
import { Trend } from './Trend';

interface DomainTrendProps {
  domain: KeySkill | null;
}

export function DomainTrend({ domain }: DomainTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useDomainTrendData(
    domain?.name ?? null,
    25
  );

  const mentions = domain?.count ?? 0;
  const prevMentions = domain?.prev_count ?? 0;
  const difference = prevMentions && mentions ? mentions - prevMentions : null;

  const actualData = chart;
  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading}
        className={`size-full ${isLoading && 'bg-background-secondary'}`}
      >
        {from && to && !(isLoading || isFetching) && (
          <Trend
            data={{
              data: actualData,
              from,
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
