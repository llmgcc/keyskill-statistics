import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavouriteDomains(
  pagination: PaginationState,
  order_by?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();
  const favourites = useFavoritesStore(state => state.favourites);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'favourite_domains',
      // favourites,
      period,
      experience,
      order_by,
      pagination,
    ],
    queryFn: async () => {
      const data = await API.favouriteDomains(
        favourites.filter(f => f.type === 'domains').map(f => f.name),
        period,
        experience,
        order_by ? order_by : undefined,
        pagination.pageSize,
        pagination.pageIndex * pagination.pageSize
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
