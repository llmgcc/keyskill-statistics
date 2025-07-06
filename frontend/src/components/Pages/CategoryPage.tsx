import { API } from '@/api/api';
import { useExperienceStore } from '@/store/experienceStore';
import { usePeriodStore } from '@/store/periodStore';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Experience } from '@/config/experience';

export function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const selectedPeriod = usePeriodStore((state) => state.selectedPeriod);
  const selectedExperience = useExperienceStore(
    (state) => state.selectedExperience,
  );

  const {
    data: category,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const data = await API.category(
        name,
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

  return (
    <div className="app-container">
      <div className="rounded bg-background-secondary py-2">
        <h1 className="p-2 text-sm font-bold">{category?.name}</h1>
      </div>
    </div>
  );
}
