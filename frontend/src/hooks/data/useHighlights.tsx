import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { OrderByHighlightType } from '@/components/Pages/Highlights/HighlightTypePage';
import { buttonsList } from '@/components/Tabs/OrderButtons';

import { useFilters } from '../useFilters';

export function useHighlights(name: string | null) {
  const { period, experience } = useFilters();

  const highlight = buttonsList([OrderByHighlightType[name] ?? ''])?.[0];

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['highlights', name, period, experience],
    queryFn: async () => {
      const data = await API.skills.skillsList(
        {
          limit: 10,
          offset: 0,
        },
        {
          period,
          experience,
        },
        {
          column: highlight?.column,
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
