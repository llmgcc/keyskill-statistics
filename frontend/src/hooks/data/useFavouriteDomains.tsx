import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy } from '@/interfaces';
import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavouriteDomains(
  pagination: PaginationState,
  orderBy: OrderBy
) {
  const { period, experience } = useFilters();
  const favourites = useFavoritesStore(state => state.favourites);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['favourite_domains', period, experience, orderBy, pagination],
    queryFn: async () => {
      const data = await API.domains.favoriteDomains(
        favourites.filter(f => f.type === 'domains').map(f => f.name),
        {
          limit: pagination.pageSize,
          offset: pagination.pageSize * pagination.pageIndex,
        },
        {
          period,
          experience,
        },
        orderBy
      );
      return data;
    },
  });

  return {
    favouriteDomains: data?.domains,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
