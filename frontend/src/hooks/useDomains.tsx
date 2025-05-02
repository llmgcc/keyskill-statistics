import { API } from '@/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { Experience } from '@/config/experience';

interface UseDomainsOptions {
  selectedPeriod: number;
  selectedExperience?: Experience | null;
}

export function useDomains({
  selectedPeriod,
  selectedExperience,
}: UseDomainsOptions) {
  return useQuery({
    queryKey: ['domains_list', selectedPeriod, selectedExperience],
    queryFn: async () => {
      const data = await API.domainsList(
        selectedPeriod,
        selectedExperience == Experience.any
          ? undefined
          : (selectedExperience ?? undefined),
      );
      return data;
    },
    placeholderData: keepPreviousData,
    staleTime: Infinity,
  });
}
