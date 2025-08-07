import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { ServerFilters, ServerOrderBy } from '@/interfaces';

import { useFilters } from './useFilters';

export function useDomains(
  pagination: PaginationState,
  order_by?: ServerOrderBy,
  filter?: ServerFilters,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'domains_list',
      pagination,
      order_by,
      filter,
      period,
      experience,
    ],
    queryFn: async () => {
      const data = await API.domainsList(
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
    domains: data?.domains,
    isFetching,
    isLoading,
  };
}
