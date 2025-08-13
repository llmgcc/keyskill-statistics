import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy, ServerFilters } from '@/interfaces';

import { useFilters } from './useFilters';

export function useDomains(
  pagination: PaginationState,
  orderBy?: OrderBy,
  filter?: ServerFilters,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['domains_list', pagination, orderBy, filter, period, experience],
    queryFn: async () => {
      const data = await API.domains.domainsList(
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
    domains: data?.domains,
    isFetching,
    isLoading,
  };
}
