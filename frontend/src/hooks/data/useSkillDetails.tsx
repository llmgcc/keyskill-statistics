import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillDetails(name: string | null) {
  const { period, experience } = useFilters();

  const {
    data: skillDetails,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['skill_details', name, period, experience],
    queryFn: async () => {
      const data = await API.skillDetails(
        encodeURIComponent(name)!,
        period,
        experience
      );
      return data;
    },
    enabled: !!name,
  });

  return {
    skillDetails,
    isLoading,
    isFetching,
  };
}
