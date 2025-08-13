import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy, ServerFilters, ServerOrderBy } from '@/interfaces';
import { SkillsOrderBy } from '@/interfaces/api';
import { Experience } from '@/config/experience';

import { useFilters } from './useFilters';

export function useSkills(
  pagination: PaginationState,
  orderBy?: OrderBy,
  filter?: ServerFilters,
  enabled: boolean = true
) {
  const { period, experience } = useFilters();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['skills', pagination, orderBy, filter, period, experience],
    queryFn: async () => {
      const data = await API.skills.skillsList(
        {
          limit: pagination.pageSize,
          offset: pagination.pageSize * pagination.pageIndex,
        },
        {
          ...filter,
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
    skills: data?.skills,
    isFetching,
    isLoading,
  };
}
