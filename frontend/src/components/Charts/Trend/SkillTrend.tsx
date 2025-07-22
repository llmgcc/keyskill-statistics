import { Skeleton } from '@chakra-ui/react';
import colors from 'tailwindcss/colors';

import { KeySkill } from '@/interfaces';
import { useSkillTrendData } from '@/hooks/data/useSkillTrendData';

import { MentionsTooltip } from './MentionsTooltip';
import { Trend } from './Trend';

interface SkillTrendProps {
  skill: KeySkill | null;
  realtedTo?: string | null;
}

export function SkillTrend({ skill, realtedTo }: SkillTrendProps) {
  const { from, to, chart, isLoading, isFetching } = useSkillTrendData(
    skill?.name ?? null,
    25,
    realtedTo
  );

  const mentions = skill?.count ?? 0;
  const prevMentions = skill?.prev_count ?? 0;
  const difference = prevMentions && mentions ? mentions - prevMentions : null;

  return (
    <div className="size-full">
      <Skeleton
        loading={isLoading}
        className={`size-full ${isLoading && 'bg-background-secondary'}`}
      >
        {from && to && !(isLoading || isFetching) && (
          <Trend
            data={{
              data: chart,
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
