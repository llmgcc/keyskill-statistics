import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';

import { useFilters } from '../useFilters';

export function useDomainDetails(name: string | null) {
  const { period, experience } = useFilters();

  const {
    data: domainDetails,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['domains_details', name, period, experience],
    queryFn: async () => {
      const data = await API.domains.domainDetails({
        name: encodeURIComponent(name!),
        period,
        experience,
      });
      return data;
    },
    enabled: !!name,
  });

  return {
    domainDetails,
    isLoading,
    isFetching,
    isError,
  };
}
