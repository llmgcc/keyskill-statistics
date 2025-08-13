import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy } from '@/interfaces';
import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavouriteCategories(
  pagination: PaginationState,
  orderBy: OrderBy
) {
  const { period, experience } = useFilters();
  const favourites = useFavoritesStore(state => state.favourites);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['favourite_categories', period, experience, orderBy, pagination],
    queryFn: async () => {
      const data = await API.categories.favoriteCategories(
        favourites.filter(f => f.type === 'categories').map(f => f.name),
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
    favouriteCategories: data?.categories,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
