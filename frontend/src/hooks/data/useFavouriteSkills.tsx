import { API } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';

import { useFavoritesStore } from '@/store/favoritesStore';

import { useFilters } from '../useFilters';

export function useFavouriteSkills(
  pagination: PaginationState,
  orderBy?: { order_by: string; descending: boolean }
) {
  const { period, experience } = useFilters();

  const favourites = useFavoritesStore(state => state.favourites);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      'favourite_skills',
      // favourites,
      period,
      experience,
      orderBy,
      pagination,
    ],
    queryFn: async () => {
      const data = await API.skills.favoriteSkills(
        favourites.filter(f => f.type === 'skills').map(f => f.name),
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
    // enabled: !,
  });

  return {
    favouriteSkills: data?.skills,
    rows: data?.rows ?? 0,
    isLoading,
    isFetching,
  };
}
