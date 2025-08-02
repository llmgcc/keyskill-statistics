import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useCategoryDetails(name: string | null) {
  const { period, experience } = useFilters();

  const {
    data: categoryDetails,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['category_details', name, period, experience],
    queryFn: async () => {
      const data = await API.categoryDetails(
        encodeURIComponent(name)!,
        period,
        experience
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    categoryDetails,
    isLoading,
    isFetching,
    isError,
  };
}
