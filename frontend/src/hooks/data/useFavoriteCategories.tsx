import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { OrderBy } from '@/interfaces';
import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavoriteCategories(
  pagination: PaginationState,
  orderBy: OrderBy
) {
  const { period, experience } = useFilters();
  const favorites = useFavoritesStore(state => state.favorites);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['favorite_categories', period, experience, orderBy, pagination],
    queryFn: async () => {
      const data = await API.categories.favoriteCategories(
        favorites.filter(f => f.type === 'categories').map(f => f.name),
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
    favoriteCategories: data?.categories,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
