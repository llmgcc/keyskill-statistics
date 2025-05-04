import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

interface UseCategoriesOptions {
  selectedPeriod: number;
  selectedExperience?: Experience | null;
}

export function useCategories({
  selectedPeriod,
  selectedExperience,
}: UseCategoriesOptions) {
  return useQuery({
    queryKey: ['categories_list', selectedPeriod, selectedExperience],
    queryFn: async () => {
      const data = await API.categoriesList(
        selectedPeriod ?? 10,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}
