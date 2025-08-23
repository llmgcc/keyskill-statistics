import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { buttonsList } from '@/config/buttons';
import { Highlights, OrderByHighlightType } from '@/config/highlights';

import { useFilters } from '../useFilters';

export function useHighlights(name: string | null, limit: number = 10) {
  const { period, experience } = useFilters();

  const highlight = name
    ? buttonsList([OrderByHighlightType[name as Highlights] ?? ''])?.[0]
    : null;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['highlights', name, period, experience, limit],
    queryFn: async () => {
      const data = await API.skills.skillsList(
        {
          limit,
          offset: 0,
        },
        {
          period,
          experience,
        },
        {
          column: highlight!.column,
          descending: highlight?.descending,
        }
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    highlights: data?.skills,
    isLoading,
    isFetching,
  };
}
