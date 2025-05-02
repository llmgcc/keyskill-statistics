import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

interface UseSkillsOptions {
  limit: number;
  offset: number;
  period: number;
  experience?: Experience | null;
}

export function useSkills({
  limit,
  offset,
  period,
  experience,
}: UseSkillsOptions) {
  return useQuery({
    queryKey: ['skills', limit, offset, period, experience],
    queryFn: async () => {
      const data = await API.skillsList(
        limit,
        offset,
        period,
        experience == Experience.any ? undefined : (experience ?? undefined),
      );

      return {
        skills: data.skills,
        count_bins: 1,
        salary_bins: 1,
        max_salary: 1,
        rows: data.rows,
      };
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}
