import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSimilarSkills(
  name: string | null,
  order_by?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();

  const {
    data: similarSkills,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['similar_skills', name, period, experience, order_by],
    queryFn: async () => {
      const data = await API.similarSkills(
        encodeURIComponent(name ?? '')!,
        period,
        experience,
        order_by ? order_by : undefined
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    similarSkills,
    isLoading,
    isFetching,
  };
}
