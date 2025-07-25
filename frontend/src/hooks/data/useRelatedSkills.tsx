import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { useFilters } from '../useFilters';

export function useRelatedSkills(
  name: string | null,
  pagination: PaginationState,
  order_by?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'related_skills',
      name,
      period,
      experience,
      order_by,
      pagination,
    ],
    queryFn: async () => {
      const data = await API.relatedSkills(
        encodeURIComponent(name ?? ''),
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
    relatedSkills: data?.skills,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
