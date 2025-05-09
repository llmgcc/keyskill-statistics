import { KeySkill } from '@/interfaces';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { Skeleton } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

import SkillDescription from '../SkillDescription/SkillDescription';

type HighlightsCardTabProps = {
  title: string;
  source: (period: number, experience?: Experience) => Promise<KeySkill[]>;
  valueRenderer: (skill: KeySkill) => JSX.Element | null;
};

export function HighlightsCardTab({
  title,
  source,
  valueRenderer,
}: HighlightsCardTabProps) {
  const { selectedExperience } = useExperienceStore();
  const { selectedPeriod } = usePeriodStore();

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

  const defaultItem = {
    name: '-'.repeat(50),
    count: 100,
    prev_count: 50,
    categories: [],
    technologies: [],
    place: 20,
    prev_place: 10,
  };
  const defaultData = new Array(5)
    .fill(defaultItem)
    .map((s, index) => ({ ...s, name: `${s.name}_${index}` }));

  return (
    <div>
      {(data ?? defaultData).map((h: KeySkill) => {
        return (
          <div className="flex items-center justify-between p-2" key={h.name}>
            <div className="">
              <Skeleton loading={isLoading || isFetching}>
                <div>
                  <SkillDescription {...h} />
                </div>
              </Skeleton>
            </div>
            <Skeleton loading={isLoading || isFetching}>
              <div>{valueRenderer(h)}</div>
            </Skeleton>
          </div>
        );
      })}
    </div>
  );
}
