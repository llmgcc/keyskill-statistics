import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { CategoryFilter, OrderBy } from '@/interfaces';

import { useFilters } from '../useFilters';

export function useCategories(
  pagination: PaginationState,
  orderBy?: OrderBy,
  filter?: CategoryFilter,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'categories_list',
      pagination,
      orderBy,
      filter,
      period,
      experience,
    ],
    queryFn: async () => {
      const data = await API.categories.categoriesList(
        {
          limit: pagination.pageSize,
          offset: pagination.pageSize * pagination.pageIndex,
        },
        {
          period: filter?.period === null ? null : period,
          experience: filter?.experience === null ? null : experience,
        },
        orderBy
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
