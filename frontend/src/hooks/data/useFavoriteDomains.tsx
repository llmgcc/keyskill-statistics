import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy } from '@/interfaces';
import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavoriteDomains(
  pagination: PaginationState,
  orderBy: OrderBy
) {
  const { period, experience } = useFilters();
  const favorites = useFavoritesStore(state => state.favorites);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'favorite_domains',
      period,
      experience,
      orderBy,
      pagination,
      favorites,
    ],
    queryFn: async () => {
      const data = await API.domains.favoriteDomains(
        favorites.filter(f => f.type === 'domains').map(f => f.name),
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
    favoriteDomains: data?.domains,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
