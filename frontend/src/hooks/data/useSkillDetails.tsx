import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useSkillDetails(name: string) {
  const { period, experience } = useFilters();

  console.log('get data for', period, experience, name);
  const {
    data: skillDetails,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['skill_details', name, period, experience],
    queryFn: async () => {
      const data = await API.skill(name, period, experience);
      return data;
    },
  });

  return {
    skillDetails,
    isLoading,
    isFetching,
  };
}
