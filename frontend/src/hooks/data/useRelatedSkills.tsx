import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useRelatedSkills(
  name: string | null,
  order_by?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();

  const {
    data: relatedSkills,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['related_skills', name, period, experience, order_by],
    queryFn: async () => {
      const data = await API.relatedSkills(
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
    relatedSkills,
    isLoading,
    isFetching,
  };
}
