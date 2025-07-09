import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

export function useSkillDetailsShort(name: string | null) {
  const {
    data: skillDetailsShort,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['skill_details_short', name],
    queryFn: async () => {
      const data = await API.skill(encodeURIComponent(name)!);
      return data;
    },
    enabled: !!name,
  });

  return {
    skillDetailsShort,
    isLoading,
    isFetching,
  };
}
