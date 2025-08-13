import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillDetails(name: string | null) {
  const { period, experience } = useFilters();

  const {
    data: skillDetails,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['skill_details', name, period, experience],
    queryFn: async () => {
      const data = await API.skills.skillDetails({
        skill: encodeURIComponent(name!),
        period,
        experience,
      });
      return data;
    },
    enabled: !!name,
  });

  return {
    skillDetails,
    isLoading,
    isFetching,
    isError,
  };
}
