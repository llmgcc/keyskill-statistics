import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useHighlights(name: string | null) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['related_skills', name, period, experience],
    queryFn: async () => {
      const data = await API.highlightByType(
        encodeURIComponent(name ?? ''),
        period,
        experience
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    highlights: data,
    isLoading,
    isFetching,
  };
}
