import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { useFilters } from '../useFilters';

export function useSimilarSkills(
  name: string | null,
  pagination: PaginationState,
  order_by?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'similar_skills',
      name,
      period,
      experience,
      order_by,
      pagination,
    ],
    queryFn: async () => {
      const data = await API.similarSkills(
        encodeURIComponent(name ?? '')!,
        period,
        experience,
        order_by ? order_by : undefined,
        pagination.pageSize,
        pagination.pageIndex * pagination.pageSize
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    similarSkills: data?.skills,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
