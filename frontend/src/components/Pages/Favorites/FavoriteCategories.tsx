import { placeholderData, skillName } from '@/utils/common';
import { useMemo } from 'react';
import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Category, KeySkill, OrderBy } from '@/interfaces';
import { useFavoriteCategories } from '@/hooks/data/useFavoriteCategories';
import { useFilters } from '@/hooks/useFilters';
import { usePaginationState } from '@/hooks/usePaginationState';
import {
  categoryChartAccessor,
  categoryImageAccessor,
  categoryNameAccessor,
  categorySalaryAccessor,
  complexityAccessor,
  countAccessor,
  favoriteAccessor,
  placeAccessor,
  prevPlaceAccessor,
} from '@/components/Table/accessors';
import { DataTable } from '@/components/Table/DataTable';
import { PageSize } from '@/components/Table/PageSize';

interface FavoriteCategoriesProps {
  order_by: OrderBy;
}

export function FavoriteCategories({ order_by }: FavoriteCategoriesProps) {
  const { period, experience } = useFilters();
  const navigate = useNavigate();
  const { pagination, setPagination, pageSizeVariants } = usePaginationState(
    0,
    [10, 25, 50],
    JSON.stringify([period, order_by, experience]),
    'categories'
  );
  const { favoriteCategories, isLoading, isFetching, rows } =
    useFavoriteCategories(pagination, order_by);
  const { t, i18n } = useTranslation();

  const tableColumns = useMemo(
    () =>
      [
        favoriteAccessor({
          accessorKey: 'favorite_category',
          isLoading: isLoading || isFetching,
          displayName: (skill: KeySkill) => skillName(skill, i18n.language),
          favoriteType: 'categories',
        }),
        placeAccessor({ accessorKey: 'place' }),
        prevPlaceAccessor({ accessorKey: 'prev_place' }),
        categoryImageAccessor({ accessorKey: 'image', category: 'categories' }),
        categoryNameAccessor({
          accessorKey: 'name',
          header: t('columns.name'),
          category: 'categories',
        }),
        complexityAccessor({
          accessorKey: 'complexity',
          header: t('complexity.title'),
        }),
        categorySalaryAccessor({
          accessorKey: 'average_salary',
          header: t('columns.salary'),
          isLoading: isLoading || isFetching,
        }),
        countAccessor({ accessorKey: 'count', header: t('columns.mentions') }),
        categoryChartAccessor({
          accessorKey: 'chart',
          header: t('columns.trend'),
          isLoading: isLoading || isFetching,
        }),
      ] as Array<ColumnDef<Category, unknown> & { accessorKey: string }>,
    [t, isLoading, isFetching, i18n]
  );

  return (
    <>
      <div className="my-1 flex items-center justify-between gap-4 overflow-auto">
        <div className="text-sm text-text-secondary">
          {t('favoritesPage.categories')}
        </div>
        <PageSize
          variants={pageSizeVariants}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <DataTable
        columns={tableColumns as Array<ColumnDef<Category, unknown>>}
        data={
          favoriteCategories ??
          (placeholderData(pagination.pageSize) as Category[])
        }
        isLoading={isLoading || !favoriteCategories}
        isFetching={isFetching}
        pinnedLeft={['favorite_category', 'place', 'image']}
        minWidth={1150}
        pagination={pagination}
        setPagination={setPagination as OnChangeFn<PaginationState>}
        pageSizeVariants={pageSizeVariants}
        rows={rows ?? 0}
        onSelect={(rowData: Category) => {
          navigate(`/categories/${encodeURIComponent(rowData.name)}`);
        }}
      />
    </>
  );
}
