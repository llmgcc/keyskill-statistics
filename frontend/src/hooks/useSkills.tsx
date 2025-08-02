import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { ServerFilters, ServerOrderBy } from '@/interfaces';
import { SkillsOrderBy } from '@/interfaces/api';
import { Experience } from '@/config/experience';

import { useFilters } from './useFilters';

export function useSkills(
  pagination: PaginationState,
  order_by?: ServerOrderBy,
  filter?: ServerFilters,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['skills', pagination, order_by, filter, period, experience],
    queryFn: async () => {
      const data = await API.skillsList(
        filter?.period === null ? null : period,
        filter?.experience === null ? null : experience,
        pagination.pageSize,
        pagination.pageSize * pagination.pageIndex,
        order_by,
        filter
      );

      return data;
    },
    enabled: enabled,
  });

  return {
    rows: data?.rows,
    skills: data?.skills,
    isFetching,
    isLoading,
  };
}
