import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { SkillsOrderBy } from '@/interfaces/api';
import { Experience } from '@/config/experience';

interface UseSkillsOptions {
  limit: number;
  offset: number;
  period: number;
  experience?: Experience | null;
  domain?: string;
  category?: string;
  categoryStrict?: boolean;
  domainStrict?: boolean;
  skillName?: string;
  orderBy: SkillsOrderBy;
}

export function useSkills({
  limit,
  offset,
  period,
  experience,
  domain,
  category,
  categoryStrict,
  domainStrict,
  skillName,
  orderBy,
}: UseSkillsOptions) {
  return useQuery({
    queryKey: [
      'skills',
      limit,
      offset,
      period,
      experience,
      domain,
      category,
      categoryStrict,
      domainStrict,
      skillName,
      orderBy,
    ],
    queryFn: async () => {
      const data = await API.skillsList(
        limit,
        offset,
        period,
        experience == Experience.any ? undefined : (experience ?? undefined),
        domain,
        domainStrict,
        category,
        categoryStrict,
        skillName,
        orderBy
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
