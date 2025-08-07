import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { ServerFilters, ServerOrderBy } from '@/interfaces';

import { useFilters } from './useFilters';

export function useCategories(
  pagination: PaginationState,
  order_by?: ServerOrderBy,
  filter?: ServerFilters,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'categories_list',
      pagination,
      order_by,
      filter,
      period,
      experience,
    ],
    queryFn: async () => {
      const data = await API.categoriesList(
        filter?.period === null ? null : period,
        filter?.experience === null ? null : experience,
        pagination.pageSize,
        pagination.pageSize * pagination.pageIndex,
        order_by
      );

      return data;
    },
    enabled: enabled,
  });

  return {
    rows: data?.rows,
    categories: data?.categories,
    isFetching,
    isLoading,
  };
}
