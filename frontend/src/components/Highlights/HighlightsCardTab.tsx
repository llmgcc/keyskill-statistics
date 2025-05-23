import { memo } from 'react';
import { KeySkill } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';
import { SkillDescription } from '@/components/SkillDescription/SkillDescription';

interface HighlightsCardTabProps {
  title: string;
  source: (period: number, experience?: Experience) => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
}

export function _HighlightsCardTab({
  title,
  source,
  valueRenderer,
}: HighlightsCardTabProps) {
  const selectedExperience = useExperienceStore(
    (state) => state.selectedExperience,
  );
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [title, selectedExperience, selectedPeriod],
    queryFn: async () => {
      const data = await source(
        selectedPeriod,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });

  const defaultItem: KeySkill = {
    name: '-'.repeat(10),
    count: 100,
    prev_count: 50,
    domains: [],
    categories: [],
    place: 20,
    prev_place: 10,
    ratio: 1,
  };
  const defaultData = new Array(5)
    .fill(defaultItem)
    .map((s, index) => ({ ...s, name: `${s.name}_${index}` }));

  const loading = isLoading || isFetching;

  return (
    <div>
      {(loading ? defaultData : (data ?? defaultData)).map((h: KeySkill) => {
        return (
          <div className="flex items-center justify-between p-2" key={h.name}>
            <div className="">
              <Skeleton loading={loading}>
                <div>
                  <SkillDescription {...h} />
                </div>
              </Skeleton>
            </div>
            <Skeleton loading={loading} className="min-h-7 min-w-16">
              <div>{valueRenderer(h)}</div>
            </Skeleton>
          </div>
        );
      })}
    </div>
  );
}

export const HighlightsCardTab = memo(_HighlightsCardTab);
